export function formatResponse(response) {
  return {
    id: response.id,
    webformatURL: response.webformatURL,
    largeImageURL: response.largeImageURL,
    tags: response.tags,
  };
}
