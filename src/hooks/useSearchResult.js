import { useEffect, useState } from "react";

import { getSortedClassResults, groupClassResultsByInstructor } from "@lib/utils/common";

/**
 * @param {string} searchQuery
 * @returns
 */
export function useSearchResult(searchQuery) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const options = {
      timeout: 12_000,
    };

    if (!searchQuery) return;

    const url = "/api/instructor/" + searchQuery;

    setData(() => null);
    setError(() => null);
    setIsLoading(() => true);

    fetch(url, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("The Professor You Have Searched For Does Not Exist In Our Database");
        }

        return response.json();
      })
      .then((classResults) => {
        const sortedClassResults = getSortedClassResults(classResults);
        const groupedClassResults = groupClassResultsByInstructor(sortedClassResults);

        setData(() => groupedClassResults);
        setError(() => null);
      })
      .catch((error) => {
        setError(() => error.message);
        setData(() => null);
      })
      .finally(() => {
        setIsLoading(() => false);
      });
  }, [searchQuery]);
  return { data, error, isLoading };
}
