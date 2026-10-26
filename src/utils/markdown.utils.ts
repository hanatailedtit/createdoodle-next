import {fromMarkdown} from 'mdast-util-from-markdown';
export type PostHeading = {id: string; title: string; depth: number};
export const headingId = (line: number) => `section-${line}`;
export function getPostHeadings(markdown: string): PostHeading[] {
  const tree = fromMarkdown(markdown);
  const text = (node: {value?: string; children?: unknown[]}): string =>
    node.value ||
    (node.children || []).map((child) => text(child as typeof node)).join('');
  return tree.children.flatMap((node) =>
    node.type === 'heading' && (node.depth === 2 || node.depth === 3)
      ? [
          {
            id: headingId(node.position!.start.line),
            title: text(node),
            depth: node.depth,
          },
        ]
      : [],
  );
}
