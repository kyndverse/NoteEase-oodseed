import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { documentsQueryKeys } from "../constants/query-keys";
import { Document } from "@/generated/prisma/client";

export const getDocuments = async () => {
  const response = await apiClient.get<Document[]>("/documents");

  return response.data;
};

export const useDocuments = () => {
  return useQuery({
    queryKey: documentsQueryKeys.lists(),
    queryFn: getDocuments,
  });
};
