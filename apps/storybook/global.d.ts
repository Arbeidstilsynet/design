declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.jpg" {
  const src: string;
  export default src;
}

// Generic fallback for any CSS files
declare module "*.css" {
  const content: void;
  export default content;
}

interface ImportMetaEnv {
  /** Set by vitest.upstream.config.ts to run plays without axe. */
  readonly STORYBOOK_SKIP_A11Y?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
