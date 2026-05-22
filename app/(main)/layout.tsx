import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AppSidebar from "@/features/documents/components/app-sidebar";
import { CommandMenu } from "@/features/documents/components/command-menu";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <CommandMenu />
      <AppSidebar />

      <SidebarInset className="overflow-hidden bg-[#111111] text-white transition-all duration-200">
        {/* Topbar */}

        <header className="flex h-14 items-center border-b border-white/10 px-4">
          <SidebarTrigger />
          <div className="ml-auto">
            <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-400 hover:bg-white/10">
              Ctrl + K
            </button>
          </div>
        </header>

        {/* Workspace */}
        <main className="relative flex-1 overflow-auto">
          {/* subtle gradient */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.04),transparent_40%)]" />

          <div className="relative h-full">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
