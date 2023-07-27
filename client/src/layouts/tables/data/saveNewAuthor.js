export async function saveNewAuthor(author) {

   await fetch('http://localhost:8080/api/authors/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(author)
  });


}