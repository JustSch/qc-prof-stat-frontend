import { useEffect, useState } from "react";

export function useClassResult(classSearchParams) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(classSearchParams).length === 0) {
      console.error("No class search parameters provided.");
      return;
    }

    const url = new URL(window.location.origin + "/api/result/class/");
    url.search = new URLSearchParams(classSearchParams).toString();

    setData(() => null);
    setError(() => null);
    setIsLoading(() => true);

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("This Class Does Not Exist In Our Database.");
        }

        return response.json();
      })
      .then((data) => {
        if (data.length === 0) {
          throw new Error("No data received. This Class Does Not Exist In Our Database.");
        }

        // API endpoint returns an array of objects
        // Since we are querying for only one specific class, it should only return an array of size 1
        // We just return first object in the array
        setData(() => data[0]);
      })
      .catch((error) => {
        setError(() => error.message);
      })
      .finally(() => {
        setIsLoading(() => false);
      });
  }, [classSearchParams]);
  return { data, error, isLoading };
}
