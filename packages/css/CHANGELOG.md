# @arbeidstilsynet/design-css

## 0.7.0

Released: 2026-02-06

### Minor Changes

- Updated the styles of the header component + New header menu row component ([#606](https://github.com/Arbeidstilsynet/design/pull/606))

### Patch Changes

- Updated dependency `@types/node` to `24.10.10`. ([#613](https://github.com/Arbeidstilsynet/design/pull/613))

- Updated dependency `autoprefixer` to `10.4.24`. ([#577](https://github.com/Arbeidstilsynet/design/pull/577))

## 0.6.0

Released: 2026-01-28

### Minor Changes

- Header: set max-width on contents, configurable with CSS variable `--at-header-max-width`. Defaults to 82.5rem (~1320px). ([#563](https://github.com/Arbeidstilsynet/design/pull/563))

- Header: full rewrite, new API using compound components ([#563](https://github.com/Arbeidstilsynet/design/pull/563))

### Patch Changes

- Header: fix background overlay in mobile covering Header logo and menu button ([#563](https://github.com/Arbeidstilsynet/design/pull/563))

- Updated dependency `postcss-nesting` to `14.0.0`. ([#541](https://github.com/Arbeidstilsynet/design/pull/541))

- Updated dependency `@digdir/designsystemet-css` to `1.11.0`. ([#557](https://github.com/Arbeidstilsynet/design/pull/557))
  Updated dependency `@digdir/designsystemet` to `1.11.0`.
  Updated dependency `@digdir/designsystemet-react` to `1.11.0`.
  Updated dependency `@digdir/designsystemet-types` to `1.11.0`.

- Updated dependency `@types/node` to `24.10.9`. ([#546](https://github.com/Arbeidstilsynet/design/pull/546))

## 0.5.0

Released: 2026-01-08

### Minor Changes

- Export upstream individual CSS files ([#519](https://github.com/Arbeidstilsynet/design/pull/519))

### Patch Changes

- Updated dependency `@digdir/designsystemet-css` to `1.9.0`. ([#519](https://github.com/Arbeidstilsynet/design/pull/519))
  Updated dependency `@digdir/designsystemet` to `1.9.0`.
  Updated dependency `@digdir/designsystemet-react` to `1.9.0`.
  Updated dependency `@digdir/designsystemet-types` to `1.9.0`.

- Updated dependency `autoprefixer` to `10.4.23`. ([#512](https://github.com/Arbeidstilsynet/design/pull/512))

- FilePicker: Decrease font size to small. Delete button now scales with data-size. ([#523](https://github.com/Arbeidstilsynet/design/pull/523))

## 0.4.1

Released: 2025-12-11

### Patch Changes

- Header: use nav for links ([#492](https://github.com/Arbeidstilsynet/design/pull/492))

- Header: moved links into menu in mobile view, added close button ([#492](https://github.com/Arbeidstilsynet/design/pull/492))

## 0.4.0

Released: 2025-12-09

### Minor Changes

- Header: complete redesign ([#487](https://github.com/Arbeidstilsynet/design/pull/487))

- Update upstream @digdir/designsystemet to v1.8.0 ([#489](https://github.com/Arbeidstilsynet/design/pull/489))

## 0.3.6

Released: 2025-11-26

### Patch Changes

- Activate release immutability ([#456](https://github.com/Arbeidstilsynet/design/pull/456))

## 0.3.5

Released: 2025-11-17

### Patch Changes

- Updated dependency `autoprefixer` to `10.4.22`. ([#433](https://github.com/Arbeidstilsynet/design/pull/433))

## 0.3.4

Released: 2025-11-04

### Patch Changes

- FilePicker: remove duplicate selector ([#411](https://github.com/Arbeidstilsynet/design/pull/411))

- Updated dependency `cssnano` to `7.1.2`. ([#408](https://github.com/Arbeidstilsynet/design/pull/408))

## 0.3.3

Released: 2025-10-21

### Patch Changes

- Updated dependency `@digdir/designsystemet-css` to `1.6.1`. ([#374](https://github.com/Arbeidstilsynet/design/pull/374))
  Updated dependency `@digdir/designsystemet` to `1.6.1`.
  Updated dependency `@digdir/designsystemet-react` to `1.6.1`.

## 0.3.2

Released: 2025-10-13

### Patch Changes

- chore: use trusted publisher for npm ([#367](https://github.com/Arbeidstilsynet/design/pull/367))

## 0.3.1

Released: 2025-10-02

### Patch Changes

- Update FilePicker look, render semantic list for files ([#318](https://github.com/Arbeidstilsynet/design/pull/318))

- FilePicker: scale width with data-size ([#332](https://github.com/Arbeidstilsynet/design/pull/332))

- Rename --ds-disabled-opacity to --ds-opacity-disabled ([#326](https://github.com/Arbeidstilsynet/design/pull/326))

- FilePicker: show files as table instead of list ([#331](https://github.com/Arbeidstilsynet/design/pull/331))

- Updated dependency `@digdir/designsystemet-css` to `1.6.0`. ([#336](https://github.com/Arbeidstilsynet/design/pull/336))
  Updated dependency `@digdir/designsystemet` to `1.6.0`.
  Updated dependency `@digdir/designsystemet-react` to `1.6.0`.

- Fix missing opacity on disabled button ([#324](https://github.com/Arbeidstilsynet/design/pull/324))

## 0.3.0

Released: 2025-09-22

### Minor Changes

- LightDarkLogo: New component ([#306](https://github.com/Arbeidstilsynet/design/pull/306))

### Patch Changes

- Updated dependency `@digdir/designsystemet-css` to `1.5.1`. ([#313](https://github.com/Arbeidstilsynet/design/pull/313))
  Updated dependency `@digdir/designsystemet` to `1.5.1`.
  Updated dependency `@digdir/designsystemet-react` to `1.5.1`.

## 0.2.0

Released: 2025-09-16

### Minor Changes

- Add Header component ([#283](https://github.com/Arbeidstilsynet/design/pull/283))
  Add Logo for light/dark mode

### Patch Changes

- Updated dependency `@digdir/designsystemet-css` to `1.5.0`. ([#290](https://github.com/Arbeidstilsynet/design/pull/290))
  Updated dependency `@digdir/designsystemet` to `1.5.0`.
  Updated dependency `@digdir/designsystemet-react` to `1.5.0`.

- FilePicker: change border and background on Dropzone when dragging files ([#291](https://github.com/Arbeidstilsynet/design/pull/291))

- FilePicker: accessibility tweaks, avoid nested button and input ([#291](https://github.com/Arbeidstilsynet/design/pull/291))

## 0.1.5

Released: 2025-09-04

### Patch Changes

- Updated dependency `cssnano` to `7.1.1`. ([#248](https://github.com/Arbeidstilsynet/design/pull/248))

- Updated dependency `@digdir/designsystemet-css` to `1.4.0`. ([#243](https://github.com/Arbeidstilsynet/design/pull/243))
  Updated dependency `@digdir/designsystemet` to `1.4.0`.
  Updated dependency `@digdir/designsystemet-react` to `1.4.0`.

## 0.1.4

Released: 2025-08-19

### Patch Changes

- Updated dependency `@digdir/designsystemet-css` to `1.1.10`. ([#215](https://github.com/Arbeidstilsynet/design/pull/215))
  Updated dependency `@digdir/designsystemet` to `1.1.10`.
  Updated dependency `@digdir/designsystemet-react` to `1.1.10`.

## 0.1.3

Released: 2025-08-05

### Patch Changes

- Add type declarations ([#201](https://github.com/Arbeidstilsynet/design/pull/201))

## 0.1.2

Released: 2025-08-04

### Patch Changes

- Updated dependency `cssnano` to `7.1.0`. ([#181](https://github.com/Arbeidstilsynet/design/pull/181))

- Updated dependency `@digdir/designsystemet-css` to `1.1.9`. ([#187](https://github.com/Arbeidstilsynet/design/pull/187))
  Updated dependency `@digdir/designsystemet` to `1.1.9`.
  Updated dependency `@digdir/designsystemet-react` to `1.1.9`.

## 0.1.1

Released: 2025-06-24

### Patch Changes

- Update readme ([#154](https://github.com/Arbeidstilsynet/design/pull/154))

## 0.1.0

Released: 2025-06-20

### Minor Changes

- **FilePicker**: New component ([#137](https://github.com/Arbeidstilsynet/design/pull/137))

### Patch Changes

- Remove EXPERIMENTAL_MultiSuggestion ([#141](https://github.com/Arbeidstilsynet/design/pull/141))

- Updated dependency `@digdir/designsystemet-css` to `1.1.0`. ([#141](https://github.com/Arbeidstilsynet/design/pull/141))
  Updated dependency `@digdir/designsystemet` to `1.1.0`.
  Updated dependency `@digdir/designsystemet-react` to `1.1.0`.

## 0.0.8

Released: 2025-06-04

### Patch Changes

- Updated dependency `@digdir/designsystemet-css` to `1.0.8`. ([#100](https://github.com/Arbeidstilsynet/design/pull/100))

## 0.0.7

Released: 2025-05-20

### Patch Changes

- Updated dependency `@digdir/designsystemet-css` to `1.0.6`. ([#59](https://github.com/Arbeidstilsynet/design/pull/59))

## 0.0.6

Released: 2025-05-13

### Patch Changes

- Add changelog date as a new paragraph instead of in version heading. This fixes an issue with the versioning PR description containing the entire changelog. ([#38](https://github.com/Arbeidstilsynet/design/pull/38))

## 0.0.5 (2025-05-13)

### Patch Changes

- Add dates to changelog ([#33](https://github.com/Arbeidstilsynet/design/pull/33))

## 0.0.4

### Patch Changes

- Simplify changelog ([#11](https://github.com/Arbeidstilsynet/design/pull/11))

## 0.0.3

### Patch Changes

- [#8](https://github.com/Arbeidstilsynet/design/pull/8) [`aef4b92`](https://github.com/Arbeidstilsynet/design/commit/aef4b924b310115ad6112f67fd0300bf0437cbc5) Thanks [@vaernion](https://github.com/vaernion)! - Trigger release

## 0.0.2

### Patch Changes

- [#1](https://github.com/Arbeidstilsynet/design/pull/1) [`e6a015b`](https://github.com/Arbeidstilsynet/design/commit/e6a015bac275df8c344523fbb5925897a3cb4645) Thanks [@vaernion](https://github.com/vaernion)! - Prettier format

- [#1](https://github.com/Arbeidstilsynet/design/pull/1) [`e6a015b`](https://github.com/Arbeidstilsynet/design/commit/e6a015bac275df8c344523fbb5925897a3cb4645) Thanks [@vaernion](https://github.com/vaernion)! - Add concurrency config for workflows

- [#2](https://github.com/Arbeidstilsynet/design/pull/2) [`30d348a`](https://github.com/Arbeidstilsynet/design/commit/30d348a7712b47c70130525b09475d5acdc0edcc) Thanks [@vaernion](https://github.com/vaernion)! - Use @changesets/changelog-github

- [#2](https://github.com/Arbeidstilsynet/design/pull/2) [`30d348a`](https://github.com/Arbeidstilsynet/design/commit/30d348a7712b47c70130525b09475d5acdc0edcc) Thanks [@vaernion](https://github.com/vaernion)! - Use changesets/action for release
