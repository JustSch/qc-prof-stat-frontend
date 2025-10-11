/**
 * Extracts the error message from a fetch response
 * @param {Response} resp - Fetch response object
 * @returns {Promise<string>} - A promise that resolves to the error message
 */
export async function getRespErrorText(resp) {
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

/**
 * All-in-one wrapper around `fetch` that returns JSON data or an error message
 * @param {Parameters<typeof fetch>} args - The arguments to pass to fetch
 */
export async function fetchApi(...args) {
  try {
    const response = await fetch(...args);

    if (!response.ok) {
      const errorText = await getRespErrorText(response);
      return { ok: false, data: null, error: errorText };
    }

    const data = await response.json();
    return { ok: true, data, error: null };
  } catch (error) {
    if (error instanceof Error) {
      return { ok: false, data: null, error: error.message };
    }

    return { ok: false, data: null, error: "An unexpected error occurred" };
  }
}
