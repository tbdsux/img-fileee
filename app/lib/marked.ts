import { marked } from "marked";

export const parseMarkdown = (markdown: string) => {
  return marked.parse(markdown);
};
