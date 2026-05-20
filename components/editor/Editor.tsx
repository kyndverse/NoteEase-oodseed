"use client";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";

import { PartialBlock } from "@blocknote/core";

export default function Editor({ documentId }: { documentId: string }) {
  const [initialContent, setInitialContent] = useState<PartialBlock[] | null>(
    null,
  );

  useEffect(() => {
    const fetchDocument = async () => {
      const res = await fetch(`/api/documents/${documentId}`);

      const data = await res.json();

      setInitialContent(data.content || []);
    };

    fetchDocument();
  }, [documentId]);

  if (initialContent === null) {
    return <div className="text-white p-10">Loading...</div>;
  }

  return (
    <EditorInstance documentId={documentId} initialContent={initialContent} />
  );
}

function EditorInstance({
  documentId,
  initialContent,
}: {
  documentId: string;
  initialContent: PartialBlock[];
}) {
  const editor = useCreateBlockNote({
    initialContent,
  });

  const saveDocument = useMemo(
    () =>
      debounce(async () => {
        const blocks = editor.document;

        await fetch(`/api/documents/${documentId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: blocks,
          }),
        });
      }, 1000),
    [editor, documentId],
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-8 py-20">
        <BlockNoteView
          editor={editor}
          theme="dark"
          onChange={() => {
            saveDocument();
          }}
        />
      </div>
    </main>
  );
}
