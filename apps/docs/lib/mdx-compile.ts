import React from 'react';
import * as jsxRuntime from 'react/jsx-runtime';
import { serialize } from 'next-mdx-remote/serialize';

type CompileOpts = Parameters<typeof serialize>[1];

export async function compileMdxStable({ source, options, components = {} as Record<string, any> }: { source: string; options?: CompileOpts; components?: Record<string, any> }) {
  const { compiledSource, frontmatter, scope } = await serialize(source, options, true);
  const fullScope = Object.assign({ opts: jsxRuntime }, { frontmatter }, scope);
  const keys = Object.keys(fullScope);
  const values = Object.values(fullScope);
  // eslint-disable-next-line no-new-func
  const hydrateFn = Reflect.construct(Function, keys.concat(`${compiledSource}`));
  const Content = hydrateFn.apply(hydrateFn, values).default;
  return {
    content: React.createElement(Content, { components }),
    frontmatter,
  };
}
