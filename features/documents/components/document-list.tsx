"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { FileText } from "lucide-react";

import { useDocuments } from "../api/get-documents";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function DocumentList() {
  const pathname = usePathname();

  const { data, isLoading } = useDocuments();

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

  return (
    <SidebarMenu>
      {data.map((document) => {
        const isActive = pathname === `/app/documents/${document.id}`;

        return (
          <SidebarMenuItem key={document.id}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              className="
                h-11 rounded-xl
                transition-all duration-200
                hover:bg-white/5
                data-[active=true]:bg-white/10
                data-[active=true]:shadow-sm
              "
            >
              <Link href={`/app/documents/${document.id}`}>
                <FileText className="h-4 w-4 shrink-0" />

                <span className="truncate text-sm">{document.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
