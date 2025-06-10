# 0001 - Repostruktur for nytt designsystem

## Status

- [x] Foreslått (dato: 2025-06-02)
- [x] Akseptert (dato: 2025-06-10)
- [ ] Avvist (dato: ÅÅÅÅ-MM-DD)
- [ ] Erstattet (dato: ÅÅÅÅ-MM-DD) _lenke til ADR som erstatter denne_

## Kontekst

Arbeidstilsynet ønsker å benytte [nasjonalt designsystem](designsystemet.no) på tvers av ulike løsninger. Det er viktig at dette kan bli en ny standardløsning som er minst mulig avhengig av spesifikk teknologi hos konsument. Det forutsetter en helt annen løsning for CSS/design tokens/theming enn vårt eksisterende designsystem [@at/ads-core-react](https://dev.azure.com/Atil-utvikling/Produkter%20og%20tjenester/_git/designsystem-web). Derfor er det veldig vanskelig å ta utgangspunkt i repoet vi har fra før.

## Beslutning

Opprettelse av et nytt monorepo i GitHub med tre publiserte pakker (css, theme, react). Bruker PNPM med [workspace](https://pnpm.io/workspaces) til å installere avhengigheter. Pakkene @arbeidstilsynet/design-css og @arbeidstilsynet/design-theme består kun av CSS, mens @arbeidstilsynet/design-react har React-komponenter.

Designtokens er synkronisert med Figma Tokens Studio som det er anbefalt av [Digdirs oppskrift](https://www.designsystemet.no/grunnleggende/for-designere/eget-tema#alternativ-2-med-kobling). Egen workflow sørger for å automatisk kjøre Digdir sin CLI for å generere CSS når endringer på tokens dyttes fra Figma til en branch.

Pakkestrukturen (css, theme, react) er tilsvarende som [digdir/designsystemet](https://github.com/digdir/designsystemet) bruker. Håndtering av designtokens er inspirert av [brreg/designsytemet](https://github.com/brreg/designsystemet).

## Konsekvenser

### Positive konsekvenser

- Tilsvarende API som `@digdir/designsystemet` for installasjon og bruk gjør det gjenkjennelig og lett å komme i gang for konsumenter.
- Kan tydelig skille mellom CSS og rammeverk-spesifikk kode (React).
- Konsumenter kan benytte styling av basiskomponenter med andre rammeverk enn React.
- Tydelig separasjon mellom applikasjoner som Storybook og pakkene som konsumenter forholder seg til.
- Håndtering av designtokens blir i stor grad automatisk.

### Negative konsekvenser

- Pakkeversjonering blir mer komplisert.
- Konsumenter må installere tre pakker i stedet for en.

### Risiko

- Digdir legger ned satsningen for et nasjonalt designsystem. Anses som usannsynlig. I det tilfellet kan vi kopiere alt vi trenger fra Digdir sin kodebase ettersom den har MIT-lisens.

### Avhengigheter

- Avhengig av Digdir sitt designsystem.
- Benytter per i dag PNPM for håndtering av flere prosjekt i monorepo. PNPM [er et sunnt og levende prosjekt](https://snyk.io/advisor/npm-package/pnpm) som er sentral i JS sitt økosystem, men dette repoet kan migrere til f.eks. Yarn om det er nødvendig.

### Teknisk gjeld som oppstår

- **Kompetansespredning**: designere/utviklere som lager designsystemet må lære nye verktøy (PNPM workspaces, Figma Tokens Studio, Digdir CLI) som krever en viss grad av opplæring. Oppveies av god dokumentasjon i readmes.
- **Migreringsarbeid**: Dagens basiskomponenter som ikke tilbys av Digdir må implementeres etter behov. Det trengs en kartlegging og vurdering av hvilke komponenter vi trenger. Dette gjelder hovedsakelige mer komplekse komponent som bygger på basiskomponentene, f.eks. Sjekklistepunkt/Mangelpanel/Dokumentliste/Virksomhetsinfo.
- **Workflow-kompleksitet**: Workflows må håndtere at det er flere pakker som kan endres individuelt eller samtidig. Automatisk synkronisering fra Figma til CSS krever manuell oppfølging i form av å opprette PR.
- **Versjonshåndtering på tvers av pakker**: Koordinering av releases mellom css, theme og react-pakkene kan skape inkonsistente tilstander for konsumenter.

## Alternativer vurdert

1. Alt i en pakke.
   Dette er gjort av [@mattilsynet/design](https://github.com/Mattilsynet/design). Det ble ikke valgt fordi det skaper tettere binding mellom styling/themeing og komponentimplementasjon. Det låser oss også mer til React. Eventuell håndtering av flere rammeverk i samme pakke kan bli forvirrende og konsument vil måtte installere unødvendige avhengigheter.

2. Gradvis implementasjon i eksisterende kodebase.
   Helt forskjellig CSS-håndtering og sterke koblinger i den eksisterende kodebasen gjør det vanskelig å gjøre en gradvis omskriving med samme prosjektstruktur. Den er 100% basert på styled-components som CSS-løsning. Repoet er heller ikke rigget opp som et skikkelig monorepo.

## Deltakere

Forfatter: Grunde Thorheim

## Notater

ADR er skrevet retroaktivt. Jeg har forsøkt å dokumentere tankegangen som ble gjort for ca. en måned siden.
