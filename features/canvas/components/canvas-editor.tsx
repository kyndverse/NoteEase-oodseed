"use client";

import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";

export default function CanvasEditor() {
  return (
    <div className="h-[calc(100vh-56px)]">
      <Tldraw persistenceKey="notebook-ai-canvas" />
    </div>
  );
}
