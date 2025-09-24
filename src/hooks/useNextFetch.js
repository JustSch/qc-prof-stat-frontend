import { useEffect, useState } from "react";

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
          throw new Error(await getErrorText(resp));
        }

        return resp.json();
      })
      .then((data) => {
        setData(() => data);

        return { ok: true, data: data, error: null };
      })
      .catch((error) => {
        setData(() => null);

        setErrorMessage(() => error.message);
        return {
          ok: false,
          data: null,
          error: error.message,
        };
      })
      .finally(() => {
        setIsLoading(() => false);
      });
  }, [routerQuery, url]);

  return { data, isLoading, errorMessage };
}

async function getErrorText(resp) {
  const respText = await resp.text();

  if (!respText.trim()) {
    return "An unexpected error occurred";
  }

  let respJson;
  try {
    respJson = JSON.parse(respText);
  } catch {
    return respText.trim();
  }

  if ("detail" in respJson) {
    return respJson.detail;
  }

  // fallback to original text if JSON object not in expected format
  return respText.trim();
}
