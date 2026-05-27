"use client";

import { AssetRecordType, Tldraw } from "tldraw";
import "tldraw/tldraw.css";
import { useCanvasStore } from "../store/canvas-store";
import { useEffect, useState } from "react";
import { sendDocumentToCanvas } from "../lib/send-document-to-canvas";
import { CanvasToolbar } from "./canvas-toolbar";
import { useRouter } from "next/navigation";
import { VectorSidebar } from "./vector-sidebar";

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

  const handleInsertVector = (src: string) => {
    const editor = useCanvasStore.getState().editor;

    if (!editor) return;

    editor.selectNone();
    const viewport = editor.getViewportPageBounds();

    const assetId = AssetRecordType.createId();

    editor.createAssets([
      {
        id: assetId,
        typeName: "asset",
        type: "image",
        props: {
          name: "vector",
          src,
          w: 120,
          h: 120,
          mimeType: "image/svg+xml",
          isAnimated: false,
        },
        meta: {},
      },
    ]);

    editor.createShape({
      type: "image",
      parentId: editor.getCurrentPageId(),
      x: viewport.center.x - 60,
      y: viewport.center.y - 60,
      props: {
        assetId,
        w: 120,
        h: 120,
      },
    });
  };

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
        <>
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
          <VectorSidebar onInsert={handleInsertVector} />
        </>
      )}
    </div>
  );
}
