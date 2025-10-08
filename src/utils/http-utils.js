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
