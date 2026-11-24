import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const extDir = path.resolve(rootDir, 'extension');
const distDir = path.resolve(rootDir, 'dist');
const distExtDir = path.resolve(rootDir, 'dist/extension');

fs.mkdirSync(distExtDir, { recursive: true });

// Copy manifest, background, content
const filesToCopy = ['manifest.json', 'background.js', 'content.js'];

filesToCopy.forEach((file) => {
  const src = path.join(extDir, file);
  const dest = path.join(distExtDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${file} to dist/extension/`);
  }
});

// Copy icons
const iconsSrc = path.join(extDir, 'icons');
const iconsDest = path.join(distExtDir, 'icons');
if (fs.existsSync(iconsSrc)) {
  fs.mkdirSync(iconsDest, { recursive: true });
  fs.readdirSync(iconsSrc).forEach((icon) => {
    fs.copyFileSync(path.join(iconsSrc, icon), path.join(iconsDest, icon));
  });
  console.log('Copied icons to dist/extension/icons/');
}

// Copy dist/assets to dist/extension/assets so absolute or root-relative paths also work
const distAssets = path.join(distDir, 'assets');
const distExtAssets = path.join(distExtDir, 'assets');
if (fs.existsSync(distAssets)) {
  fs.mkdirSync(distExtAssets, { recursive: true });
  fs.readdirSync(distAssets).forEach((file) => {
    fs.copyFileSync(path.join(distAssets, file), path.join(distExtAssets, file));
  });
  console.log('Copied assets to dist/extension/assets/');
}

// Copy demo-pages to dist/extension/demo-pages
const demoPagesSrc = path.join(rootDir, 'demo-pages');
const demoPagesDest = path.join(distExtDir, 'demo-pages');
if (fs.existsSync(demoPagesSrc)) {
  fs.mkdirSync(demoPagesDest, { recursive: true });
  fs.readdirSync(demoPagesSrc).forEach((file) => {
    fs.copyFileSync(path.join(demoPagesSrc, file), path.join(demoPagesDest, file));
  });
  console.log('Copied demo-pages to dist/extension/demo-pages/');
}

console.log('Successfully prepared loadable extension at dist/extension');
