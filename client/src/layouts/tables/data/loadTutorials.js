export async function loadTutorials(){
    const response = await fetch('http://localhost:8080/api/tutorials');
    console.log(response)

}

