export async function saveNewTutorial(tutorial) {

    await fetch('http://localhost:8080/api/tutorials/', {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(tutorial)
   });
}