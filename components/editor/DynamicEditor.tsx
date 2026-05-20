"use client";

import dynamic from "next/dynamic";

export const Editor = dynamic(() => import("./Editor"), { ssr: false });

export default function NoteEditor({ documentId }: { documentId: string }) {
  return <Editor documentId={documentId} />;
}