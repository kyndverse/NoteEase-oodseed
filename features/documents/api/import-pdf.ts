import { useMutation } from "@tanstack/react-query";
import { aiClient } from "@/lib/ai-client";
import { markdownToBlocks } from "@/lib/markdown-to-block";
import apiClient from "@/lib/api-client";

export const importPdf = async (file: File) => {
  const formData = new FormData();

  formData.append("file", file);

  const aiResponse = await aiClient.post("/process-pdf", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  const markdown = aiResponse.data.markdown;
  const title = aiResponse.data.title;

  const blocks = markdownToBlocks(markdown);

  const response = await apiClient.post("/documents", {
    title,
    content: blocks,
  });

  return response.data;
};

export const useImportPdf = () => {
  return useMutation({
    mutationFn: importPdf,
  });
};
