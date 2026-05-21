import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/api-client";
import { queryClient, type MutationConfig } from "@/lib/query-client";
import { documentsQueryKeys } from "../constants/query-keys";
import type { PartialBlock } from "@blocknote/core";

export type UpdateDocumentInput = {
  id: string;
  content: PartialBlock[];
};

export const updateDocument = async ({ id, content }: UpdateDocumentInput) => {
  const response = await apiClient.patch(`/documents/${id}`, {
    content,
  });

  return response.data;
};

type UseUpdateDocumentOptions = {
  mutationConfig?: MutationConfig<typeof updateDocument>;
};

export const useUpdateDocument = (options: UseUpdateDocumentOptions = {}) => {
  return useMutation({
    mutationFn: updateDocument,

    ...options.mutationConfig,

    onSuccess: (data, variables, onMutateResult, context) => {
      queryClient.invalidateQueries({
        queryKey: documentsQueryKeys.detail(variables.id),
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
