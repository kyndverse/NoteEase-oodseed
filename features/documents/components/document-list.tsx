"use client";

import { useRouter } from "next/navigation";

import { useDocuments } from "../api/get-documents";

export function DocumentList() {
  const router = useRouter();

  const { data: documents, isLoading } = useDocuments();

  if (isLoading) {
    return <div className="text-sm text-zinc-500">Loading...</div>;
  }

  return (
    <div className="space-y-1">
      {documents?.map((doc) => (
        <button
          key={doc.id}
          onClick={() => router.push(`/documents/${doc.id}`)}
          className="w-full rounded px-3 py-2 text-left hover:bg-zinc-900"
        >
          {doc.title}
        </button>
      ))}
    </div>
  );
}
