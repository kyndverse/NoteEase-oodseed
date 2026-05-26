"use client";

import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import { useCanvasStore } from "../store/canvas-store";
import { useEffect, useState } from "react";
import { sendDocumentToCanvas } from "../lib/send-document-to-canvas";
import { CanvasToolbar } from "./canvas-toolbar";
import { useRouter } from "next/navigation";

export default function CanvasEditor() {
  const editor = useCanvasStore((state) => state.editor);
  const setEditor = useCanvasStore((state) => state.setEditor);

  const router = useRouter();

  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (!editor) return;

    const pending = localStorage.getItem("pending-document");

    if (!pending) return;

    const parsed = JSON.parse(pending);

    sendDocumentToCanvas({
      documentId: parsed.documentId,

      title: parsed.title,
    });

    localStorage.removeItem("pending-document");
  }, [editor]);

  return (
    <div className="h-[calc(100vh-56px)]">
      <Tldraw
        persistenceKey="notebook-ai-canvas"
        onMount={(editor) => {
          setEditor(editor);

          editor.store.listen(() => {
            const selectedShapes = editor.getSelectedShapes();

            if (!selectedShapes.length) {
              setSelectedDocumentId(null);

              return;
            }

            const shape = selectedShapes[0];

            const documentId = shape.meta?.documentId;

            if (!documentId) {
              setSelectedDocumentId(null);

              return;
            }

            setSelectedDocumentId(String(documentId));
          });
        }}
      />
      {selectedDocumentId && (
        <CanvasToolbar
          onOpen={() => {
            router.push(`/app/documents/${selectedDocumentId}`);
          }}
          onConnect={() => {
            const editor = useCanvasStore.getState().editor;

            if (!editor) return;

            editor.setCurrentTool("arrow");
          }}
        />
      )}
    </div>
  );
}
