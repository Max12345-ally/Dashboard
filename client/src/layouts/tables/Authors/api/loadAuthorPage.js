export async function loadAuthorPage(offset, limit){
    const response = await fetch(`http://localhost:8080/api/authors/get-page?offset=${offset}&limit=${limit}`);
    
    const data = await response.json(); 
    return data;
}
