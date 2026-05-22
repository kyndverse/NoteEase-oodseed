"use client";

import { useState } from "react";
import { Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useImportPdf } from "../api/import-pdf";
import { useRouter } from "next/navigation";

export const ImportPdf = () => {
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();

  const importPdfMutation = useImportPdf();

  const handleImport = async () => {
    if (!file) return;

    const document = await importPdfMutation.mutateAsync(file);

    router.push(`/documents/${document.id}`);

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Upload className="mr-2 h-4 w-4" />
          Import PDF
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import PDF</DialogTitle>

          <DialogDescription>
            Upload a PDF and let AI convert it into smart notes.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Input
            type="file"
            accept=".pdf"
            onChange={(e) => {
              const selected = e.target.files?.[0];

              if (selected) {
                setFile(selected);
              }
            }}
          />

          <Button
            className="w-full"
            onClick={handleImport}
            disabled={!file || importPdfMutation.isPending}
          >
            {importPdfMutation.isPending ? "Processing..." : "Import PDF"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportPdf;
