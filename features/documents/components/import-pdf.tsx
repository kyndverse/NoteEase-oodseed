"use client";

import { useState } from "react";
import { Upload, FileText, Loader2, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useImportPdf } from "../api/import-pdf";
import { useRouter } from "next/navigation";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { useDropzone } from "react-dropzone";

export const ImportPdf = () => {
  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },

    multiple: false,

    onDrop: (acceptedFiles) => {
      const selected = acceptedFiles[0];

      if (selected) {
        setFile(selected);
      }
    },
  });

  const importPdfMutation = useImportPdf();

  const handleImport = async () => {
    if (!file) return;

    const document = await importPdfMutation.mutateAsync(file);

    router.push(`/app/documents/${document.id}`);

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SidebarMenuButton tooltip="Import PDF" className="h-11">
          <Upload className="h-4 w-4" />

          <span>Import PDF</span>
        </SidebarMenuButton>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import PDF</DialogTitle>

          <DialogDescription>
            Upload a PDF and let AI convert it into smart notes.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div
            {...getRootProps()}
            className={`flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-10 text-center transition-all duration-200 ${
              isDragActive
                ? "border-white bg-white/10"
                : "border-white/10 bg-white/5 hover:bg-white/10"
            }`}
          >
            <input {...getInputProps()} />

            {file ? (
              <>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <FileText className="h-7 w-7 text-white" />
                </div>

                <p className="text-sm font-medium text-white">{file.name}</p>

                <p className="mt-1 text-xs text-zinc-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </>
            ) : (
              <>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <Upload className="h-7 w-7 text-white" />
                </div>

                <p className="text-sm font-medium text-white">
                  Drop your PDF here
                </p>

                <p className="mt-1 text-xs text-zinc-500">or click to browse</p>
              </>
            )}
          </div>

          <Button
            className="h-11 w-full rounded-xl"
            onClick={handleImport}
            disabled={!file || importPdfMutation.isPending}
          >
            {importPdfMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                AI is processing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate AI Notes
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImportPdf;
