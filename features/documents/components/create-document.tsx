"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  createDocumentSchema,
  type CreateDocumentSchema,
} from "@/schemas/documents/create-document-schema";
import { useCreateDocument } from "../api/create-document";
import { useState } from "react";
import { SidebarMenuButton } from "@/components/ui/sidebar";

const CreateDocument = () => {
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();
  const createDocumentMutation = useCreateDocument();

  const { handleSubmit, reset, register, formState } =
    useForm<CreateDocumentSchema>({
      resolver: zodResolver(createDocumentSchema),
    });

  const onSubmit = (values: CreateDocumentSchema) => {
    createDocumentMutation.mutate(values, {
      onSuccess: (document) => {
        reset();
        setOpen(false);
        router.push(`/app/documents/${document.id}`);
      },
    });
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <SidebarMenuButton tooltip="New Document" className="h-11">
          <Plus className="h-4 w-4" />

          <span>New Document</span>
        </SidebarMenuButton>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create Document</DialogTitle>

            <DialogDescription>
              Create a new document to start writing.
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Label htmlFor="title">Document Title</Label>

            <Input
              id="title"
              placeholder="My Awesome Notes"
              {...register("title")}
            />

            {formState.errors.title && (
              <p className="mt-1 text-sm text-red-500">
                {formState.errors.title.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={createDocumentMutation.isPending}>
              {createDocumentMutation.isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDocument;
