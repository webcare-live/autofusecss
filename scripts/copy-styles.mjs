import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const src = resolve('src/css/styles.css');
const out = resolve('dist/styles.css');
mkdirSync(dirname(out), { recursive: true });
copyFileSync(src, out);
console.log('✔ Copied styles.css');

