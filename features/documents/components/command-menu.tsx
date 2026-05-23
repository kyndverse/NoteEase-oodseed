"use client";

import * as React from "react";
import { FileText, Plus, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useDocuments } from "@/features/documents/api/get-documents";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);

  const router = useRouter();

  const { data } = useDocuments();

  // keyboard shortcut
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();

        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 sm:max-w-2xl" aria-describedby={undefined}>
        <DialogHeader className="hidden">
          <DialogTitle>Command Menu</DialogTitle>
        </DialogHeader>

        <Command className="bg-transparent">
          <CommandInput placeholder="Search documents..." className="h-12" />

          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            {/* Actions */}
            <CommandGroup heading="Actions">
              <CommandItem>
                <Plus className="mr-2 h-4 w-4" />
                Create Document
              </CommandItem>

              <CommandItem>
                <Upload className="mr-2 h-4 w-4" />
                Import PDF
              </CommandItem>
            </CommandGroup>

            {/* Documents */}
            <CommandGroup heading="Documents">
              {data?.map((document) => (
                <CommandItem
                  key={document.id}
                  onSelect={() => {
                    router.push(`/app/documents/${document.id}`);

                    setOpen(false);
                  }}
                >
                  <FileText className="mr-2 h-4 w-4" />

                  {document.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
