import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import postcssImport from "postcss-import";
import postcssNesting from "postcss-nesting";

export default {
  plugins: [
    postcssImport,
    postcssNesting,
    autoprefixer,
    ...(process.env.NODE_ENV === "production"
      ? [
          cssnano({
            preset: "default",
          }),
        ]
      : []),
  ],
};
