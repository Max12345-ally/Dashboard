export async function deleteTutorial(tutorialId) {

    await fetch(`http://localhost:8080/api/tutorials/${tutorialId}`, {
     method: 'DELETE',
   });
 
 
 }