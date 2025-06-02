# 0002 - Pakkeversjonering

## Status

- [x] Foreslått (dato: 2025-06-02)
- [ ] Akseptert (dato: ÅÅÅÅ-MM-DD)
- [ ] Avvist (dato: ÅÅÅÅ-MM-DD)
- [ ] Erstattet (dato: ÅÅÅÅ-MM-DD) _lenke til ADR som erstatter denne_

## Kontekst

Bygger på [0001-adr-repo-init](0001-adr-repo-init.md). Tre forskjellige NPM-pakker skal versjoneres med hver sin endringslogg. Vi ønsker å følge semantic versioning.

## Beslutning

Bruker [Changesets](https://github.com/changesets/changesets) til å automatisk generere endringslogg, publisere pakker og lage git tags. En [GitHub action](https://github.com/changesets/action) håndterer publisering og slår sammen alle changesets til en release PR. Konfigurerer [changeset-bot](https://github.com/apps/changeset-bot) til å gi tilbakemelding til utviklere i vanlige PRs.

`RELEASE.md` skal dokumentere flyten for å publisere endringer av pakkene våre.

## Konsekvenser

### Positive konsekvenser

- Pakker blir automatisk versjonert og publisert. Repoet blir automatisk tagget og får godt synlige GitHub releases.
- Deklarativ publisering ut i fra repoets tilstand: Changesets forstår hva den skal gjøre ut i fra `package.json`, publiserte versjoner i NPM og eventuelle changesets.
- Utviklere forholder seg bare til et `changeset`: hvilke pakker som er endret, endringstype, og en beskrivelse av endringen.
- Changesets CLI hjelper med å generere `changeset`-fil.
- Utviklere får en tydelig oversikt over alt som er endret før de trigger en release ved å godkjenne og merge changesets sin PR.
- Changesets er industristandard innenfor open source NPM-monorepos.

### Negative konsekvenser

- Kan være en uvant flyt for mange utviklere.
- Hvis det ikke er noen andre upubliserte endringer og en utvikler skal publisere en liten endring umiddelbart, må de vente ~1 minutt fra utviklers PR er merged til changesets oppretter en release PR, og så et par minutt til før CI passerer så de kan godkjenne den.

### Risiko

En utvikler misforstår flyten og publiserer en pakke for tidlig. Anses som svært usannsynlig siden det krever godkjenning av en separat PR. I verste fall kan vi publisere en ny versjon med samme semver-inkrementering som ruller tilbake endringen.

### Avhengigheter

Changesets er en kritisk avhengighet for denne versjonshåndteringen. Hvis de legger ned kan vi se etter alternativ eller falle tilbake til manuell tagging. Changesets er en viktig del av økosystemet rundt NPM-pakker, så det er sannsynlig at en erstatning vil dukke opp.

### Teknisk gjeld som oppstår

- Mer kompliserte pipelines som krever en viss kjennskap til Changesets for vedlikehold og feilsøking.
- Utviklere må lære Changesets-spesifikke kommandoer og konsepter for å bidra effektivt.

## Alternativer vurdert

1. Manuell tagging for å trigge publisering
   Dette gir direkte kontroll, men er både slitsomt og lett å gjøre feil med. Det er ingen samspill mellom endringslogg og versjonering. Versjonsnummer blir fort vilkårlige, som er uheldig for konsumenter av pakkene.

2. Direkte publisering basert på versjonsnummer i `package.json`
   Det fjerner det manuelle arbeidet med tagging, men sikrer fortsatt ikke samspill mellom versjonering og endringslogg. Det legger også opp til at hver minste endring blir publisert umiddelbart, eller at noen som gjør det senere sjekker tidligere PRs for hvordan de skal inkrementere semver.

3. Changesets med umiddelbart publisering
   Dette ble forsøkt helt i starten av repoet. Hver PR hadde fortsatt en `changeset`-fil, som genererte oppdatering av endringslogg og publisering så snart endringslogg var publisert. Release workflow kjørte `changeset publish` rett etterpå. Dette er mindre fleksibelt og lettere å gjøre feil enn "normal" bruk av changesets, selv om det er raskere.

## Deltakere

Forfatter: Grunde Thorheim

## Relaterte dokumenter

- [0001-adr-repo-init.md](0001-adr-repo-init.md)
- [RELEASE.md](../../RELEASE.md)

## Notater

ADR er skrevet retroaktivt. Jeg har forsøkt å dokumentere tankegangen som ble gjort for ca. en måned siden.
