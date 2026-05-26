"use client";

import { ExternalLink } from "lucide-react";

type CanvasToolbarProps = {
  onOpen: () => void;
};

export const CanvasToolbar = ({ onOpen }: CanvasToolbarProps) => {
  return (
    <div className="absolute top-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-2xl border border-white/10 bg-[#111111]/90 px-3 py-2 shadow-2xl backdrop-blur-xl">
      <button
        className="flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm text-white transition-colors hover:bg-white/20"
        onClick={onOpen}
      >
        <ExternalLink className="h-4 w-4" />
        Open Document
      </button>
    </div>
  );
};
