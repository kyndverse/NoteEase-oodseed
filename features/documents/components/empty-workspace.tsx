"use client";

import { FileText, Sparkles, Upload } from "lucide-react";

const EmptyWorkspace = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-xl text-center">
        {/* icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
          <Sparkles className="h-10 w-10 text-white" />
        </div>

        {/* title */}
        <h1 className="text-4xl font-bold tracking-tight text-white">
          Your AI Knowledge Workspace
        </h1>

        {/* subtitle */}
        <p className="mt-4 text-lg leading-relaxed text-zinc-400">
          Create notes, import PDFs, and let AI transform information into
          structured knowledge.
        </p>

        {/* actions */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-300">
            <FileText className="h-4 w-4" />
            Create a document
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-300">
            <Upload className="h-4 w-4" />
            Import PDF with AI
          </div>
        </div>

        {/* footer hint */}
        <p className="mt-10 text-sm text-zinc-600">
          Press{" "}
          <span className="rounded bg-white/10 px-2 py-1 text-zinc-300">
            Ctrl + K
          </span>{" "}
          to quickly navigate.
        </p>
      </div>
    </div>
  );
};

export default EmptyWorkspace;
