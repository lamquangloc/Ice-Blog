import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";

export default async function markdownToHtml(markdown: string) {
  // Use remark-rehype pipeline to allow for rehype plugins (like highlight)
  const result = await remark()
    .use(remarkGfm) // GFM support (markdown -> markdown AST)
    .use(remarkRehype, { allowDangerousHtml: true }) // Turn markdown AST to HTML AST
    .use(rehypeSlug) // Add IDs to headings (HTML AST)
    .use(rehypeHighlight) // Syntax highlighting (HTML AST)
    .use(rehypeStringify, { allowDangerousHtml: true }) // Turn HTML AST to HTML string
    .process(markdown);
  return result.toString();
}
