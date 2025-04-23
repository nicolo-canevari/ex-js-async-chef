
// Funzione asincrona che restituisce la data di nascita dello chef di una ricetta
async function getChefBirthday(id) {
    try {
        // Recupera la ricetta dal server usando l'id
        const recipeResponse = await fetch(`https://dummyjson.com/recipes/${id}`);

        // Verifica che la risposta sia ok, altrimenti lancia un errore
        if (!recipeResponse.ok) {
            throw new Error("Ricetta non trovata");
        }

        // Converte la risposta in JSON
        const recipe = await recipeResponse.json();
        console.log("Ricetta trovata:", recipe);

        // Estrae l'userId (l'id dello chef)
        const userId = recipe.userId;

        // Recupera le informazioni dello chef usando userId
        const userResponse = await fetch(`https://dummyjson.com/users/${userId}`);

        // Verifica che la risposta sia ok
        if (!userResponse.ok) {
            throw new Error("Chef non trovato");
        }

        // Converte la risposta in JSON
        const user = await userResponse.json();
        console.log("Dati dello chef:", user);


        // Restituisce la data di nascita dello chef
        // return user.birthDate;

        // Usa dayjs per formattare la data in formato DD/MM/YYYY
        const formattedDate = dayjs(user.birthDate).format('DD/MM/YYYY');

        return formattedDate

    } catch (error) {
        // In caso di errore, lo rilancia per permettere al chiamante di gestirlo
        throw new Error(error.message);
    }
}

// Esempio di utilizzo della funzione
getChefBirthday(1)
    .then(birthday => console.log("📅 Data di nascita dello chef:", birthday))
    .catch(error => console.error("❌ Errore:", error.message));
