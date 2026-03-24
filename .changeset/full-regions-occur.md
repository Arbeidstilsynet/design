---
"@arbeidstilsynet/design-theme": minor
---

- Increased size scale by reducing `--ds-size-base` from 24 to 20. `--ds-size-base` is a divisor for calculating `--ds-size-unit` and `--_ds-font-size-factor`. This affects all size tokens and all text. This is an increase back up between the previous change (version `0.6.0`) and the original default value. Body text is now `16px`, up from previous `14px` but still smaller than the original `18px`.
