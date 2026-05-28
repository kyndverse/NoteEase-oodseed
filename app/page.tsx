"use client";

import Link from 'next/link'
import { useRouter } from "next/navigation";
import NoteEaseLanding from "@/components/landing-page/LandingPage";

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
    <main >
      <div onClick={() => router.push("/app")}>
        <NoteEaseLanding/>
      </div>
      {/* <button
        onClick={createDocument}
        className="bg-white text-black px-4 py-2 rounded"
      >
        Create Document
      </button> */}
     
      
      
      
    </main>
  );
}
