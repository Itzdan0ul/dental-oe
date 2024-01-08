import path from 'path';
import fs from 'fs-extra';

const imagesDir: string = path.join(__dirname, '../src/renderer/assets/images');
const filesDir: string = path.join(__dirname, '../src/renderer/assets/files');

const imagesDest: string = path.join(__dirname, '../src/renderer/dist/assets/images');
const filesDest: string = path.join(__dirname, '../src/renderer/dist/assets/files');

fs.copySync(imagesDir, imagesDest);
fs.copySync(filesDir, filesDest);
