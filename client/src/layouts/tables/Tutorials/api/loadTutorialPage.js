export async function loadTutorialPage(offset, limit) {
  const response = await fetch(
    `http://localhost:8080/api/tutorials/get-page?offset=${offset}&limit=${limit}`
  );

  const data = await response.json();
  return data;
}
