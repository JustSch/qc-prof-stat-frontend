import { useEffect, useState } from "react";

import groupResult from "../utils/groupResult";
import sortStat from "../utils/sortStat";

export default function useSearchResult(search) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const options = {
      timeout: 12_000,
    };

    if (search) {
      const url = "/api/instructor/" + search;
      setError(() => null);
      setIsLoading(() => true);

      fetch(url, options)
        .then(function (response) {
          if (!response.ok) {
            throw Error("The Professor You Have Searched For Does Not Exist In Our Database");
          }
          return response.json();
        })
        .then((stat) => {
          return sortStat(stat);
        })
        .then((r) => {
          return groupResult(r);
        })
        .then((rData) => {
          setData(() => rData);
          setError(() => null);
        })
        .catch(function (err) {
          setError(() => err.message);
          setData(() => null);
        })
        .finally(() => {
          setIsLoading(() => false);
        });
    }
  }, [search]);
  return { data, error, isLoading };
}
