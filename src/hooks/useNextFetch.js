import { useEffect, useState } from "react";

const TIMEOUT_MS = 10 * 1000; // 10 seconds

export function useNextFetch(routerQuery, url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  function reset() {
    setData(null);
    setIsLoading(false);
    setErrorMessage(null);
  }

  useEffect(() => {
    if (Object.keys(routerQuery).length === 0) return;

    setData(() => null);
    setIsLoading(() => true);
    setErrorMessage(() => null);

    // abort controller for cancelling request if it exceeds timeout threshold
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => {
      abortController.abort();
    }, TIMEOUT_MS);

    fetch(url, { signal: abortController.signal })
      .then(async (resp) => {
        if (!resp.ok) {
          throw new Error(await getErrorText(resp));
        }

        return resp.json();
      })
      .then((data) => {
        setData(() => data);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          setErrorMessage(() => `Request timed out after ${TIMEOUT_MS / 1000} seconds`);
        } else {
          setData(() => null);
          setErrorMessage(() => error.message);
        }
      })
      .finally(() => {
        clearTimeout(timeoutId);
        setIsLoading(() => false);
      });

    // Cleanup function to abort request if component unmounts or dependencies change
    return () => {
      clearTimeout(timeoutId);
      abortController.abort();
    };
  }, [routerQuery, url]);

  return { data, isLoading, errorMessage, reset };
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
