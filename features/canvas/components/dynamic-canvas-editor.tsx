"use client";

import dynamic from "next/dynamic";

export const Editor = dynamic(
  () => import("@/features/canvas/components/canvas-editor"),
  {
    ssr: false,
  },
);

export default function CanvasEditor() {
  return <Editor />;
}
