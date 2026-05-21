export const documentsQueryKeys = {
  all: ["documents"] as const,

  lists: () => [...documentsQueryKeys.all, "list"] as const,

  detail: (id: string) => [...documentsQueryKeys.all, id] as const,
};
