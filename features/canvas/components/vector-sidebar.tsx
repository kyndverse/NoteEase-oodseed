"use client";

import Image from "next/image";

import { vectorAssets } from "../lib/vector-assets";

type VectorSidebarProps = {
  onInsert: (src: string) => void;
};

export function VectorSidebar({
  onInsert,
}: VectorSidebarProps) {
  return (
    <div
      className="
        absolute top-4 right-4 z-50
        flex w-64 flex-col gap-3
        rounded-2xl border border-white/10
        bg-[#111111]/90 p-4
        shadow-2xl backdrop-blur-xl
      "
    >
      <div>
        <h2 className="text-sm font-semibold text-white">
          Vector Assets
        </h2>

        <p className="text-xs text-zinc-500">
          Decorate your workspace
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {vectorAssets.map((asset) => (
          <button
            key={asset.id}
            className="
              flex flex-col items-center
              gap-2 rounded-xl
              bg-white/5 p-3
              transition-colors
              hover:bg-white/10
            "
            onClick={() =>
              onInsert(asset.src)
            }
          >
            <div className="relative h-12 w-12">
              <Image
                src={asset.src}
                alt={asset.name}
                fill
                className="object-contain"
              />
            </div>

            <span className="text-xs text-zinc-300">
              {asset.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}