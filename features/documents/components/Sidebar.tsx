"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Document = {
  id: string;
  title: string;
};

export default function Sidebar() {
  const router = useRouter();

  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const res = await fetch("/api/documents");

      const data = await res.json();

      setDocuments(data);
    };

    fetchDocuments();
  }, []);

  const createDocument = async () => {
    const res = await fetch("/api/documents", {
      method: "POST",
    });

    const document = await res.json();

    router.push(`/documents/${document.id}`);
  };

  return (
    <aside className="w-72 border-r border-zinc-800 p-4">
      <button
        onClick={createDocument}
        className="mb-4 w-full rounded bg-white px-4 py-2 text-black"
      >
        New Document
      </button>

      <div className="space-y-2">
        {documents.map((doc) => (
          <button
            key={doc.id}
            onClick={() => router.push(`/documents/${doc.id}`)}
            className="w-full rounded px-3 py-2 text-left hover:bg-zinc-900"
          >
            {doc.title}
          </button>
        ))}
      </div>
    </aside>
  );
}
