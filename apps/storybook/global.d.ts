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
