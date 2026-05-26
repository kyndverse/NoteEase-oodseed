"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, PlusSquare } from "lucide-react";
import { useDocuments } from "../api/get-documents";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { useSearch } from "@/components/providers/SearchProvider";
import { formatDistanceToNow } from "date-fns";

export const DocumentList = () => {
  const pathname = usePathname();

  const { data, isLoading } = useDocuments();

  const { query } = useSearch();

  if (isLoading) {
    return (
      <div className="space-y-2 px-2">
        {Array.from({
          length: 6,
        }).map((_, i) => (
          <div key={i} className="h-10 animate-pulse rounded-lg bg-white/5" />
        ))}
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="px-3 py-8 text-center">
        <p className="text-sm text-zinc-500">No documents yet</p>

        <p className="mt-1 text-xs text-zinc-600">Create your first AI note</p>
      </div>
    );
  }

  const filteredDocuments =
    data?.filter((document) =>
      document.title.toLowerCase().includes(query.toLowerCase()),
    ) || [];

  if (!filteredDocuments.length) {
    return (
      <div className="px-3 py-8 text-center">
        <p className="text-sm text-zinc-500">No documents found</p>
      </div>
    );
  }

  return (
    <SidebarMenu>
      {filteredDocuments.map((document) => {
        const isActive = pathname === `/app/documents/${document.id}`;

        return (
          <SidebarMenuItem key={document.id}>
            <div
              className={`group flex h-11 items-center gap-2 rounded-xl px-2  transition-all duration-200 ${isActive ? "bg-white/10 shadow-sm" : "hover:bg-white/5"}`}
            >
              <Link
                href={`/app/documents/${document.id}`}
                className="flex min-w-0 flex-1 items-center gap-2"
              >
                <FileText className="h-4 w-4 shrink-0" />

                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-sm">{document.title}</span>

                  <span className="text-xs text-zinc-500">
                    {formatDistanceToNow(new Date(document.updatedAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </Link>

              <button
                className="opacity-0 transition-opacity group-hover:opacity-100"
                onClick={(e) => {
                  e.preventDefault();

                  localStorage.setItem(
                    "pending-document",
                    JSON.stringify({
                      documentId: document.id,
                      title: document.title,
                    }),
                  );

                  window.location.href = "/app/canvas";
                }}
              >
                <PlusSquare className="h-4 w-4 text-zinc-500 hover:text-white" />
              </button>
            </div>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
};
