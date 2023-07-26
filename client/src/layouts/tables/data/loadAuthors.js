export async function loadAuthors(){
    const response = await fetch('http://localhost:8080/api/authors');
    const data = await response.json(); 
    return data;
}
