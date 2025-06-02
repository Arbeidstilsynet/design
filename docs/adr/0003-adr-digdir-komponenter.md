# 0003 - Bruk av Digdirs komponenter

## Status

- [x] Foreslått (dato: 2025-06-02)
- [ ] Akseptert (dato: ÅÅÅÅ-MM-DD)
- [ ] Avvist (dato: ÅÅÅÅ-MM-DD)
- [ ] Erstattet (dato: ÅÅÅÅ-MM-DD) _lenke til ADR som erstatter denne_

## Kontekst

Resten av ADR bruker "basiskomponenter" til å beskrive grunnleggende komponenter som `<Button>` og `<Table>`. Dette omfatter alle komponentene som Digdir per i dag tilbyr i sin pakke `@digdir/designsystemet-react`.

Vi må avgjøre hvor vidt og hvordan basiskomponentene fra Digdir skal brukes sammen med nye felleskomponenter som vi etter hvert lager selv. Vi kan potensielt implementere basiskomponentene selv fra bunn i React, og kun benytte Digdirs designsystem for håndtering av CSS.

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

## Deltakere

Forfatter: Grunde Thorheim

## Relaterte dokumenter

- [README.md](../../README.md)
- [packages/react/src/index.ts](../../packages/react/src/index.ts)

## Notater

ADR er skrevet retroaktivt. Jeg har forsøkt å dokumentere tankegangen som ble gjort for ca. en måned siden.
