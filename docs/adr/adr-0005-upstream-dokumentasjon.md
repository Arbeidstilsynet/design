# 0005 - Upstream-dokumentasjon fra designsystemet.no som tilpassede kopier

## Status

- [x] Foreslått (dato: 2026-10-22)
- [ ] Akseptert (dato: ÅÅÅÅ-MM-DD)
- [ ] Avvist (dato: ÅÅÅÅ-MM-DD)
- [ ] Erstattet (dato: ÅÅÅÅ-MM-DD) _lenke til ADR som erstatter denne_

## Kontekst

Storybook mangler dokumentasjonen Digdir skriver for komponentene vi
re-eksporterer ([issue #553](https://github.com/Arbeidstilsynet/design/issues/553)).
Digdir har flyttet komponentdokumentasjonen fra Storybook til www-appen som
driver designsystemet.no (`apps/www/app/content/components/<komponent>/{en,no}/{overview,code,accessibility}.mdx`),
og strippet Storybook-MDX-en i `packages/react` ned til en lenke dit
([digdir/designsystemet#4330](https://github.com/digdir/designsystemet/pull/4330)).

Upstream-dokumentasjonen publiseres ikke på npm, bruker www-spesifikke
MDX-komponenter (`<Story story="…">`, `<DoDont>`, `<ReactComponentDocs>`,
`<CssVariables>`, `<CssAttributes>`) og viser til egne, argumentløse
eksempelkomponenter i stedet for Storybook-stories. Den kan derfor ikke brukes
direkte i Storybook. www-eksemplene mangler også play-funksjoner, som vi trenger
i Chromatic for å fange regresjoner i komponenter med skjult tilstand.

Vi blir på Storybook, og ønsker at oppdateringen mot upstream i hovedsak gjøres
av agenter.

## Beslutning

Upstream-dokumentasjon og -stories hentes inn som **tilpassede kopier**
(se `GLOSSARY.md`): filer i repoet som er mekanisk oversatt til Storybook-MDX og
CSF Next, og som oppgir hvilken upstream-fil og hvilken
Designsystemet-versjon de stammer fra i en header-kommentar.

- Kilden er www-appen i `digdir/designsystemet`, låst til release-taggen
  (`v<versjon>`) som tilsvarer installert `@digdir/designsystemet-react`.
- Kun engelsk. Hver komponent får dokumentasjonsoppføringene Overview, Code og
  Accessibility i Storybook, i stedet for autodocs-siden.
- Komponenter uten overstyringer (`stories/digdir/`) erstattes i sin helhet ved
  **upstream-synk**. Gnist-tillegg (play-funksjoner, Chromatic-oppsett,
  visuelle matrise-stories, args for kontroller) legges inn på nytt av agenten.
- Komponenter med overstyringer (`stories/digdir-overrides/`) får upstream-diffen
  mellom registrert og installert versjon anvendt oppå vår versjon. Agenten
  stopper og ber om manuell gjennomgang når diffen berører noe vi overstyrer.
- Fremgangsmåten for upstream-synk beskrives i en agent-skill i
  `.agents/skills/`, uavhengig av hva som utløser den.

## Konsekvenser

### Positive

- Brukerne av Gnist får hele dokumentasjonen fra designsystemet.no i Storybook, med
  Gnist-styling, interaktive kontroller og ekte prop-tabeller.
- Hver fil beskriver selv hvilken upstream-versjon den tilsvarer, så upstream-synk
  kan gjøres med en avgrenset diff.
- Rom for Gnist-spesifikke tilpasninger der vi overstyrer komponenter.

### Negative og risiko

- Flere filer å vedlikeholde (tre MDX-filer og en story-fil per komponent),
  og avhengighet av at agenten følger skillen. Avbøtes av Storybook-bygg,
  tester og Chromatic i CI.
- Upstream kan endre struktur eller MDX-komponenter i www-appen uten varsel;
  da må skillen oppdateres.

## Alternativer vurdert

1. **Ordrett speiling med et skript.** Laste ned upstream-MDX uendret og
   implementere www-komponentene i Storybook. Forkastet: gir ikke rom for
   overstyrings-tilpasninger, args-baserte kontroller eller play-funksjoner, og
   eksemplene er ikke Storybook-stories.
2. **Speiling med patch-lag.** Forkastet: skjøre patcher på MDX-prosa gir mer
   vedlikehold enn agentstyrt mekanisk oversettelse.
3. **Lenke til designsystemet.no fra hver komponent.** Forkastet: brukerne må da
   bruke to steder, og dokumentasjonen viser ikke Gnist-styling.

## Deltakere

Forfatter: Grunde Thorheim

## Relaterte dokumenter

- [issue #553](https://github.com/Arbeidstilsynet/design/issues/553)
- [ADR-0003 - Bruk av Digdirs komponenter](./adr-0003-digdir-komponenter.md)
- [ADR-0004 - Docgen-wrappere for Digdir-komponenter i Storybook](./adr-0004-storybook-docgen-wrappers.md)
- [GLOSSARY.md](../../GLOSSARY.md)
