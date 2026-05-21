"use client";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

import { useMemo } from "react";
import debounce from "lodash.debounce";
import { PartialBlock } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { useDocument } from "@/features/documents/api/get-document";
import { useUpdateDocument } from "@/features/documents/api/update-document";

export default function Editor({ documentId }: { documentId: string }) {
  const { data, isLoading } = useDocument(documentId);

  if (isLoading || !data) {
    return <div className="p-10 text-white">Loading...</div>;
  }

  return (
    <EditorInstance
      key={documentId}
      documentId={documentId}
      initialContent={data.content}
    />
  );
}

const EditorInstance = ({
  documentId,
  initialContent,
}: {
  documentId: string;
  initialContent: PartialBlock[];
}) => {
  const editor = useCreateBlockNote({
    initialContent,
  });

  const { mutate } = useUpdateDocument();

  const saveDocument = useMemo(
    () =>
      debounce((blocks: PartialBlock[]) => {
        mutate({
          id: documentId,
          content: blocks,
        });
      }, 1000),

    [documentId, mutate],
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-8 py-20">
        <BlockNoteView
          editor={editor}
          theme="dark"
          onChange={() => {
            saveDocument(editor.document as PartialBlock[]);
          }}
        />

        <div className="mt-4 text-sm text-zinc-500">Auto-saving enabled</div>
      </div>
    </main>
  );
};
