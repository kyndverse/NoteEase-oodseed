import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { queryClient, type MutationConfig } from "@/lib/query-client";
import { documentsQueryKeys } from "../constants/query-keys";

export type DocumentItemRequest = {
  title: string;
};

export const createDocument = async (document: DocumentItemRequest) => {
  const response = await apiClient.post("/documents", document);

  return response.data;
};

type UseCreateDocumentOptions = {
  mutationConfig?: MutationConfig<typeof createDocument>;
};

export const useCreateDocument = (options: UseCreateDocumentOptions = {}) => {
  return useMutation({
    mutationFn: createDocument,
    ...options.mutationConfig,

    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({
        queryKey: documentsQueryKeys.lists(),
      });

      options.mutationConfig?.onSuccess?.(
        data,
        variables,
        onMutateResult,
        context,
      );
    },
  });
};
