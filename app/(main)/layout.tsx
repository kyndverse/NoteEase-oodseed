import Sidebar from "@/features/documents/components/Sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex h-screen bg-black text-white">
      <Sidebar />

      <div className="flex-1 overflow-auto">{children}</div>
    </main>
  );
}
