import {
  queryOptions,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { authClient } from "@/client/lib/auth-client";
import type { ResourceDataSchema } from "@/client/types/resource";

// ---------------------------------------------------------------------------
// Query Keys
// ---------------------------------------------------------------------------

export const resourceKeys = {
  all: (resource: string) => ["resource", resource] as const,
  lists: (resource: string) => [...resourceKeys.all(resource), "list"] as const,
  list: (resource: string, params?: ListParams) =>
    [...resourceKeys.lists(resource), params] as const,
  details: (resource: string) =>
    [...resourceKeys.all(resource), "detail"] as const,
  detail: (resource: string, id: string) =>
    [...resourceKeys.details(resource), id] as const,
  metadata: (resource: string) =>
    [...resourceKeys.all(resource), "metadata"] as const,
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ListParams {
  page?: number;
  perPage?: number;
  sort?: { name: string; desc: boolean }[];
  filters?: { name: string; operation: string; value: string }[];
}

// ---------------------------------------------------------------------------
// Query Options
// ---------------------------------------------------------------------------

export const resourceMetadataQueryOptions = (resource: string) =>
  queryOptions({
    queryKey: resourceKeys.metadata(resource),
    queryFn: async () => {
      const { data, error } = await authClient.resource.metadata.get({
        query: { resource },
      });
      if (error) throw error;
      return data.data;
    },
  });

export const resourceDetailQueryOptions = (resource: string, id: string) =>
  queryOptions({
    queryKey: resourceKeys.detail(resource, id),
    queryFn: async () => {
      const { data, error } = await authClient.resource.get({
        query: { resource, resourceId: id },
      });
      if (error) throw error;
      return data;
    },
  });

export const resourceListQueryOptions = (
  resource: string,
  params?: ListParams,
) =>
  queryOptions({
    queryKey: resourceKeys.list(resource, params),
    queryFn: async () => {
      const query: Record<string, string | number> = { resource };

      if (params?.page) query.page = params.page;
      if (params?.perPage) query.perPage = params.perPage;
      if (params?.sort?.length) query.sort = JSON.stringify(params.sort);
      if (params?.filters?.length)
        query.filters = JSON.stringify(params.filters);

      const { data, error } = await authClient.resource.list({
        query: query as any,
      });

      if (error) throw error;
      return data.data as {
        results: ResourceDataSchema[];
        total: number;
        page: number;
        perPage: number;
        pageCount: number;
      };
    },
  });

// ---------------------------------------------------------------------------
// Query Hooks
// ---------------------------------------------------------------------------

export function useResourceMetadata(resource: string) {
  return useSuspenseQuery(resourceMetadataQueryOptions(resource));
}

export function useResourceDetail(resource: string, id: string) {
  return useSuspenseQuery(resourceDetailQueryOptions(resource, id));
}

export function useResourceList(resource: string, params?: ListParams) {
  return useSuspenseQuery(resourceListQueryOptions(resource, params));
}

// ---------------------------------------------------------------------------
// Mutation Hooks
// ---------------------------------------------------------------------------

export function useCreateResource(resource: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: Record<string, unknown>) => {
      const { data, error } = await authClient.resource.create({
        query: { resource },
        body,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: resourceKeys.lists(resource),
      });
    },
  });
}

export function useUpdateResource(resource: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      body,
    }: {
      id: string;
      body: Record<string, unknown>;
    }) => {
      const { data, error } = await authClient.resource.update({
        query: { resource, resourceId: id },
        body,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: resourceKeys.detail(resource, variables.id),
      });
      queryClient.invalidateQueries({
        queryKey: resourceKeys.lists(resource),
      });
    },
  });
}

export function useDeleteResource(resource: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await authClient.resource.delete({
        query: { resource, resourceId: id },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: resourceKeys.lists(resource),
      });
    },
  });
}
