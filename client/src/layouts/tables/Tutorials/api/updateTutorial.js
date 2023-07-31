export async function updateTutorial(tutorial) {
  await fetch(`http://localhost:8080/api/tutorials/${tutorial.id}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tutorial),
  });
}
