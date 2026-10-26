import {readFile} from 'node:fs/promises';
import path from 'node:path';
import {cache} from 'react';
export const getPostMd = cache(async (id: string) => {
  if (!/^\d+$/.test(id)) throw new Error('Invalid post ID');
  return readFile(
    path.join(process.cwd(), 'public', 'posts', `${id}.md`),
    'utf8',
  );
});
