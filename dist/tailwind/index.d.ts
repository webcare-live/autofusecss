import { A as AutofuseTokens } from '../tokens-CFYw5wM2.js';
export { d as defaultTokens } from '../tokens-CFYw5wM2.js';

interface AutofuseTailwindOptions {
    tokens?: Partial<AutofuseTokens>;
}
declare function autofusePlugin(_opts?: AutofuseTailwindOptions): any;

export { type AutofuseTailwindOptions, autofusePlugin as default };
