import { fetchApi } from "@lib/utils/http-utils";

import { useQuery } from "@tanstack/react-query";

/**
 * @param {QueryKey} queryKey - Unique identifier for caching and invalidating this query
 * @param {string} url - the url to fetch
 * @param {UseQueryOptions} [options] - Optional: react query options
 */
export function useApiQuery(queryKey, url, options = {}) {
  const { data, isLoading, error, isError } = useQuery({
    ...options,
    queryKey,
    queryFn: async () => {
      const result = await fetchApi(url);
      if (!result.ok) {
        throw new Error(result.error || "An unexpected error occurred");
      }

      return result.data;
    },
    staleTime: 5 * 60 * 1000, // 5 min
    gcTime: 10 * 60 * 1000, // 10 min
    retry: 1, // retry once on failure
  });

  return {
    data: isError ? null : data || null,
    isLoading,
    errorMessage: isError ? error?.message || "An unexpected error occurred" : null,
  };
}
