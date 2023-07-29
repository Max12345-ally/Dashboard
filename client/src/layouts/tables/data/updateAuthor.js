export async function updateAuthor(author) {
  await fetch(`http://localhost:8080/api/authors/${author.id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(author),
  });
}
