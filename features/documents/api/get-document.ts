import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { documentsQueryKeys } from "../constants/query-keys";
import type { Document } from "../types/document";

export const getDocument = async (id: string) => {
  const response = await apiClient.get<Document>(`/documents/${id}`);

  return response.data;
};

export const useDocument = (id: string) => {
  return useQuery({
    queryKey: documentsQueryKeys.detail(id),
    queryFn: () => getDocument(id),

    enabled: !!id,
  });
};
