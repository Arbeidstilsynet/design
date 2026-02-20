---
"@arbeidstilsynet/design-theme": minor
---

Reduced size scale by increasing `--ds-size-base` from 18 to 24. `--ds-size-base` is a divisor for calculating `--ds-size-unit` and `--_ds-font-size-factor`. This affects all use of`--ds-size-[1-10]`tokens. It also affects all text, e.g. medium paragraph (`--ds-body-md-font-size` -> `--ds-font-size-4`) goes from 18px to 14px.
