import { BlockNoteEditor } from "@blocknote/core";

export const markdownToBlocks = (markdown: string) => {
  const editor = BlockNoteEditor.create();
  const blocks = editor.tryParseMarkdownToBlocks(markdown);

  return blocks;
};
