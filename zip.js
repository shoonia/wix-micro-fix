import { resolve } from 'path';
import { createRequire } from 'module';
import { zipSync } from 'cross-zip';

const require = createRequire(import.meta.url);

const pkg = require('./package.json');
const manifest = require('./src/manifest.json');

if (pkg.version !== manifest.version) {
  console.error(`\n\nInvalid version number in manifest: ${manifest.version}\n\n`);
  process.exit(1);
}

const srcDir = resolve('./src');
const zipFile = resolve(`./${pkg.name}@${pkg.version}.zip`);

zipSync(srcDir, zipFile);
