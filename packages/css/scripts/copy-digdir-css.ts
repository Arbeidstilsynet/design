import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Correct conversion from file:// URL to Windows path
const pkgRoot = fileURLToPath(new URL("..", import.meta.url));

const digdirPkg = path.join(
  pkgRoot,
  "node_modules",
  "@digdir",
  "designsystemet-css",
  "dist",
  "src",
);

// Adjust these if the upstream package structure differs
const sourceDir = digdirPkg;
const targetDir = path.join(pkgRoot, "dist", "digdir");

await fs.mkdir(targetDir, { recursive: true });

const entries = await fs.readdir(sourceDir, { withFileTypes: true });

const cssFiles = entries
  .filter(
    // exclude index.css to avoid confusion, since then our index.css should be used
    (e) => e.isFile() && e.name.endsWith(".css") && e.name !== "index.css",
  )
  .map((e) => e.name);

if (cssFiles.length === 0) {
  throw new Error(
    `No .css files found in ${sourceDir}. Check upstream package structure/exports.`,
  );
}

await Promise.all(
  cssFiles.map((file) =>
    fs.copyFile(path.join(sourceDir, file), path.join(targetDir, file)),
  ),
);

console.log(
  `Copied ${cssFiles.length} CSS files from @digdir/designsystemet-css -> dist/digdir`,
);
