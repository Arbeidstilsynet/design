# 0004 - Docgen-wrappere for Digdir-komponenter i Storybook

## Status

- [x] Foreslått (dato: 2026-06-25)
- [x] Akseptert (dato: 2026-06-25)
- [ ] Avvist (dato: ÅÅÅÅ-MM-DD)
- [ ] Erstattet (dato: ÅÅÅÅ-MM-DD) _lenke til ADR som erstatter denne_

## Kontekst

I [ADR-0003](./adr-0003-digdir-komponenter.md) valgte vi å re-eksportere Digdirs
basiskomponenter. En kjent ulempe er at Storybook sin autodocs blir mangelfull
for dem: react-docgen-typescript ("RDT", via
`@joshwooding/vite-plugin-react-docgen-typescript`) utleder prop-tabeller fra
TypeScript-kilden, men analyserer ikke `node_modules`. Siden komponentene bor i
`@digdir/designsystemet-react`, faller autodocs tilbake til ubrukelige typer som
`variant: string` i stedet for unionen `variant?: "tinted" | "default"`. Dette
gjelder alle ~80 re-eksporterte komponenter
([issue #554](https://github.com/Arbeidstilsynet/design/issues/554)).

ADR-0003 nevnte under alternativ 4 at vi kunne lage wrappere "kun i Storybook".
Denne ADR-en realiserer det.

## Beslutning

Vi genererer en tynn docgen-wrapper per re-eksportert Digdir-komponent, og lar
kun Storybook (ikke konsumentpakken) bruke dem.

- Vite-alias og `paths` i Storybook-appen omdirigerer
  `@arbeidstilsynet/design-react` til
  `apps/storybook/docgen-wrappers/index.tsx`. Story-filer importerer uendret.
- Hver wrapper er en lokal komponent med samme navn som tar
  `ComponentProps<typeof Base.X>`. Fordi kilden er lokal, klarer RDT å utlede de
  ekte typene — og vi gjenbruker Digdirs props i stedet for å redefinere dem.
- Egne komponenter (FilePicker, Header m.fl.) flyter uendret gjennom `export *`.
  Sammensatte komponenter re-kobler sub-komponentene sine mot de wrappede
  søsknene (`Card.Block = CardBlock`), så de får docgen som bonus.

Fila genereres av `apps/storybook/utils/generate-docgen-wrappers.ts`, som er
eneste sannhetskilde. Den leser navnelista fra `packages/react/src/digdir.ts`,
klassifiserer hver mot Digdirs kjøretidsmodul, og kjøres med
`pnpm --filter @arbeidstilsynet/storybook gen:docgen-wrappers`.

## Konsekvenser

### Positive

- Autodocs viser ekte union-typer for alle Digdir-komponenter (løser issue #554).
- Konsumentpakken er uberørt — ingen `<Button> -> <Button>`-støy i komponenttreet
  (hovedinnvendingen mot wrappere i ADR-0003).
- Ingen endring i story-filer; løsningen virker via alias.

### Negative og risiko

- En wrapper **overstyrer** den trygge re-eksporten for samme navn. Blir den
  genererte fila utdatert, kan Storybook vise feil eller manglende komponenter
  (drift). Avbøtes ved at fila alltid regenereres, og en vitest-dekningstest
  (`apps/storybook/utils/generate-docgen-wrappers.test.ts`) feiler hvis et
  re-eksportert navn mangler en wrapper.

## Alternativer vurdert

1. **Status quo (kun re-eksport).** Forkastet — etterlater problemet i issue #554.
2. **Håndskrevne wrappere per behov.** Forkastet — ~80 komponenter gir for mye
   manuelt vedlikehold og garantert drift.
3. **Wrappere i konsumentpakken (ADR-0003 alt. 4, ubegrenset).** Forkastet —
   gir `<Button> -> <Button>`-støy. Vi avgrenser derfor til Storybook.

## Deltakere

Forfatter: Grunde Thorheim

## Relaterte dokumenter

- [ADR-0003 - Bruk av Digdirs komponenter](./adr-0003-digdir-komponenter.md)
- [issue #554](https://github.com/Arbeidstilsynet/design/issues/554)
- [packages/react/src/digdir.ts](../../packages/react/src/digdir.ts)
- [apps/storybook/utils/generate-docgen-wrappers.ts](../../apps/storybook/utils/generate-docgen-wrappers.ts)
