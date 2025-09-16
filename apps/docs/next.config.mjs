import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.resolve(process.cwd(), '../../'),
  experimental: {
    mdxRs: true,
  },
  transpilePackages: ['autofusecss'],
  // No custom webpack aliases; rely on single React version and package transpilation
};

export default nextConfig;
