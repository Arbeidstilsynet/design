/* This file is deprecated and will be removed in a future release. Use types.d.ts instead */
/* build: v1.1.10 */
import type {} from '@digdir/designsystemet/types';

// Augment types based on theme
declare module '@digdir/designsystemet/types' {
  export interface ColorDefinitions {
    primary: never;
    inspirator: never;
    'brand-2': never;
    'brand-3': never;
    neutral: never;
  }
  export interface SeverityColorDefinitions {
    info: never;
    success: never;
    warning: never;
    danger: never;
  }
}
