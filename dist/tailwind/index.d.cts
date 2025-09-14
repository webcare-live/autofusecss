import { A as AutofuseTokens } from '../tokens-CFYw5wM2.cjs';
export { d as defaultTokens } from '../tokens-CFYw5wM2.cjs';

interface AutofuseTailwindOptions {
    tokens?: Partial<AutofuseTokens>;
}
declare function autofusePlugin(_opts?: AutofuseTailwindOptions): any;

export { type AutofuseTailwindOptions, autofusePlugin as default };
