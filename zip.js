const path = require('path');
const zip = require('cross-zip');
const package = require('./package.json');

const srcDir = path.join(__dirname, 'src');
const zipFile = path.join(__dirname, `${package.name}@${package.version}.zip`);

zip.zipSync(srcDir, zipFile);
