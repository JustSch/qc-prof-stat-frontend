import { useEffect, useState } from "react";

export default function useClassResult(classParams) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Object.keys(classParams).length > 0) {
      let url = new URL(window.location.origin + "/api/result/class/");
      for (let x of Object.keys(classParams)) {
        url.searchParams.append(x, classParams[x]);
      }
      setIsLoading(() => true);

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw Error("This Class Does Not Exist In Our Database.");
          }
          return response.json();
        })
        .then((data) => {
          if (data.length === 0) {
            throw Error("No data received. This Class Does Not Exist In Our Database.");
          }

          const indexValue = 0;
          setData(() => data[indexValue]);
        })
        .catch((err) => {
          setError(() => err.message);
        })
        .finally(() => {
          setIsLoading(() => false);
        });
    }
  }, [classParams]);
  return { data, error, isLoading };
}
