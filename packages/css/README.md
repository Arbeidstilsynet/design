# @arbeidstilsynet/design-css

This package wraps [@digdir/designsystemet-css](https://www.npmjs.com/package/@digdir/designsystemet-css) and adds CSS for additional components based on [designsystemet.no](https://www.designsystemet.no).

Our additional components use the [@layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer) `at.components`. CSS tweaks to base components use the layer `at.overrides`. Base components still use layers prefixed with `ds`.

## Usage

```ts
// layout.tsx or other top level component.
// This only has to be imported once.
import "@arbeidstilsynet/design-css";
```

Alternatively, import in CSS:

```css
/* global.css */
@import "@arbeidstilsynet/design-css";
```

## Individual component CSS

For convenience, upstream individual files can be imported from this package:

```ts
import "@arbeidstilsynet/design-css/digdir/button.css";
```

Our components can also be imported standalone:

```ts
import "@arbeidstilsynet/design-css/filepicker.css";
```
