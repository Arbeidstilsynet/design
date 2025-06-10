# 0003 - Bruk av Digdirs komponenter

## Status

- [x] Foreslått (dato: 2025-06-02)
- [x] Akseptert (dato: 2025-06-10)
- [ ] Avvist (dato: ÅÅÅÅ-MM-DD)
- [ ] Erstattet (dato: ÅÅÅÅ-MM-DD) _lenke til ADR som erstatter denne_

## Kontekst

Resten av ADR bruker "basiskomponenter" til å beskrive grunnleggende komponenter som `<Button>` og `<Table>`. Dette omfatter alle komponentene som Digdir per i dag tilbyr i sin pakke `@digdir/designsystemet-react`.

Vi må avgjøre hvor vidt og hvordan basiskomponentene fra Digdir skal brukes sammen med nye felleskomponenter som vi etter hvert lager selv. Vi kan potensielt implementere basiskomponentene selv fra bunn i React, og kun benytte Digdirs designsystem for håndtering av CSS.

Konsument kan finne på å installere `@digdir/designsystemet-react` direkte via `package.json`, eller importere fra den uten direkte avhengighet hvis de bruker en package manager som NPM (som også er den vanligste). Bedre package managers som PNPM [sørger for](https://pnpm.io/pnpm-vs-npm#npms-flat-tree) at bare avhengigheter fra `package.json` kan importeres.

Hvis konsument bruker basiskomponentene direkte fra `@digdir/designsystemet-react` så vil det fortsatt styles med vårt theme.

## Beslutning

Re-eksporterer Digdirs basiskomponenter. De kan potensielt brukes via Digdirs pakke også, men vår dokumentasjon oppfordrer til å importere alt via våre pakker.

Basiskomponentene vises fortsatt frem i vår Storybook, ved å benytte (kopiere) stories som Digdir har laget.

## Konsekvenser

### Positive konsekvenser

- Gir et samkjørt API som tilsvarer Digdirs, bare med andre pakkenavn.
- Utnytter alt arbeidet Digdir har lagt i å produsere basiskomponenter av høy teknisk kvalitet. Trenger ikke legge betydelig arbeid å implementere alle selv.
- Åpner for å erstatte/tilpasse enkeltkomponenter fra Digdir. Dette kan f.eks. være relevant for `<Label>` hvor vi per i dag har flere varianter enn Digdir har.
- Konsumerende prosjekter trenger ikke installere Digdirs pakke direkte i sin `package.json`.

### Negative konsekvenser

- Kan lage forvirring om hva forskjellen er på å importere basiskomponentene fra Digdirs pakke.
- Noen utfordringer med Storybook og automatisk dokumentasjon av basiskomponentene, men de kan i det minste vises frem med vår designprofil.
- Stories kan være mangelfulle eller bli utdaterte.

### Risiko

Et uventet problem oppstår med re-eksporteringen. Vi kan i så fall falle tilbake til at konsument importerer direkte fra Digdirs pakke.

### Avhengigheter

Ingen nye avhengigheter.

### Teknisk gjeld som oppstår

Listen med re-eksporterte symboler i `packages/react/src/index.ts` må vedlikeholdes, ettersom det oppstod problemer når vi prøvde `export * from`.

## Alternativer vurdert

1. Implementere alle basiskomponenter selv
   Vil medføre betydelig arbeid og gi lite gevinst.

2. Forke basiskomponentene
   Kan gi bedre samspill med Storybook, men virker ellers som unødvendig ekstraarbeid for lite gevinst. Er alltid et alternativ vi kan falle tilbake til i fremtiden.

3. Tving konsument til å bruke Digdirs pakke
   Fjerner vår mulighhet til å overstyre enekeltkomponenter. Lager forvirring rundt hva som skal importeres fra hvor.

4. Lage wrappers for alle komponenter
   Dvs. at vi kan lage vårt eget `<Button>`-komponent som bare returnerer Digdirs `<Button>` og tar samme props. Dette forbedrer autodocs i Storybook, men det har flere ulemper. Det medfører mer vedlikeholdsarbeid enn re-eksportering. Det lager også støy i komponenttreet for konsumenter, som da får `<Button> -> <Button>` i f.eks. React Dev Tools. I likhet med alternativ 2 kan vi når som helst bytte til dette i fremtiden. Vi kan vurdere å gjøre det kun i Storybook, eller finne en annen løsning for stories.

## Deltakere

Forfatter: Grunde Thorheim

## Relaterte dokumenter

- [README.md](../../README.md)
- [packages/react/src/index.ts](../../packages/react/src/index.ts)

## Notater

ADR er skrevet retroaktivt. Jeg har forsøkt å dokumentere tankegangen som ble gjort for ca. en måned siden.
