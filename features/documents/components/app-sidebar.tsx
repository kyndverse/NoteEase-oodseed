"use client";

import { Sparkles, PenSquare } from "lucide-react";
import CreateDocument from "./create-document";
import { DocumentList } from "./document-list";
import { ImportPdf } from "./import-pdf";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import DocumentSearch from "./document-search";
import Link from "next/link";

export const AppSidebar = () => {
  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="border-r border-white/10"
    >
      {/* Header */}
      <SidebarHeader className="px-4 py-4">
        <div className=" flex items-center gap-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:gap-0">
          <div className=" flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-lg  shrink-0   ">
            <Sparkles className="h-4 w-4" />
          </div>

          <div className="group-data-[collapsible=icon]:hidden">
            <h1 className="text-sm font-semibold tracking-tight">NoteEase</h1>

            <p className="text-xs text-zinc-500">Smart notebook</p>
          </div>
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        {/* Actions */}
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/app/canvas" className="h-11">
                    <PenSquare className="h-4 w-4" />

                    <span>Canvas</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>

            <CreateDocument />
            <ImportPdf />
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Documents */}
        <SidebarGroup className="flex-1">
          <SidebarGroupLabel>Documents</SidebarGroupLabel>

          <DocumentSearch />

          <SidebarGroupContent className="mt-2">
            <DocumentList />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
