# @arbeidstilsynet/design

[![npm (react)](https://img.shields.io/npm/v/@arbeidstilsynet/design-react?label=%40arbeidstilsynet%2Fdesign-react)](https://www.npmjs.com/package/@arbeidstilsynet/design-react) [![npm (css)](https://img.shields.io/npm/v/@arbeidstilsynet/design-css?label=%40arbeidstilsynet%2Fdesign-css)](https://www.npmjs.com/package/@arbeidstilsynet/design-css) [![npm (theme)](https://img.shields.io/npm/v/@arbeidstilsynet/design-theme?label=%40arbeidstilsynet%2Fdesign-theme)](https://www.npmjs.com/package/@arbeidstilsynet/design-theme)

The Norwegian Labour Inspection Authority's design system, based on [designsystemet.no](https://www.designsystemet.no).

## Packages

- [@arbeidstilsynet/design-react](./packages/react/)
- [@arbeidstilsynet/design-css](./packages/css/)
- [@arbeidstilsynet/design-theme](./packages/theme/)

## Usage

`npm i @arbeidstilsynet/design-react @arbeidstilsynet/design-css @arbeidstilsynet/design-theme`

```tsx
// layout.tsx or other top level component
import "@arbeidstilsynet/design-css";
import "@arbeidstilsynet/design-theme";
...

// myComponent.tsx
import { Button } from "@arbeidstilsynet/design-react";

export function MyComponent() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
    </div>
  );
}
```

## Font (optional)

The design system is developed with the font Inter, but you can choose any font.

### Example

```css
/* globals.css */
body {
  font-family: "Inter", sans-serif;
  font-feature-settings: "cv05" 1; /* Enable lowercase l with tail */
}
```

```tsx
// layout.tsx or other top level component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://at-static.arbeidstilsynet.no"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://at-static.arbeidstilsynet.no/fonts/inter/v4.1/inter.css"
          crossOrigin=""
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```
