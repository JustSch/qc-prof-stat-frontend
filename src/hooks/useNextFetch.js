import { useEffect, useState } from "react";

import { getRespErrorText } from "@lib/utils/http-utils";

/**
 * @param {NextRouter} routerQuery
 * @param {string} url
 * @returns
 */
export function useNextFetch(routerQuery, url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (Object.keys(routerQuery).length === 0) return;

    setData(() => null);
    setIsLoading(() => true);
    setErrorMessage(() => null);

    fetch(url)
      .then(async (resp) => {
        if (!resp.ok) {
          throw new Error(await getRespErrorText(resp));
        }

        return resp.json();
      })
      .then((data) => {
        setData(() => data);
      })
      .catch((error) => {
        setData(() => null);
        setErrorMessage(() => error.message);
      })
      .finally(() => {
        setIsLoading(() => false);
      });
  }, [routerQuery, url]);

  function reset() {
    setData(() => null);
    setIsLoading(() => false);
    setErrorMessage(() => null);
  }

  return { data, isLoading, errorMessage, reset };
}
