export async function deleteAuthor(authorId) {

    await fetch(`http://localhost:8080/api/authors/${authorId}`, {
     method: 'DELETE',
   });
 
 
 }