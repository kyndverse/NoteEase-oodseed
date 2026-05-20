"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const createDocument = async () => {
    const res = await fetch("/api/documents", {
      method: "POST",
    });

    const document = await res.json();

    router.push(`/documents/${document.id}`);
  };

  return (
    <main className="p-10">
      <button
        onClick={createDocument}
        className="bg-white text-black px-4 py-2 rounded"
      >
        Create Document
      </button>
    </main>
  );
}
