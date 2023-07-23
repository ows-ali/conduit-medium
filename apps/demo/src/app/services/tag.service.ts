export async function getPopularTags(): Promise<string[]> {
  // return fetch('https://conduit.productionready.io/api/tags')
  return fetch('http://localhost:3000/api/tags')
    .then(res => res.json())
    .then(res => res.tags);
}
