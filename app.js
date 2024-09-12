const url = "https://rickandmortyapi.com/api/character"; // URL base de la API
const containerCards = document.querySelector("#cards-container"); 
const inputCharacter = document.querySelector("#input-character"); 

// Función para obtener todos los personajes
const fetchCharacters = async () => {
    try {
        const response = await fetch(url); // Obtiene todos los personajes
        const data = await response.json(); 
        const characters = data.results.slice(0, 20);   

        characters.forEach(character => {
            makeCharacterCard(character); 
        });
    } catch (error) {
        console.error("Error fetching characters:", error); 
    }
};

// Función para crear una card de personaje
const makeCharacterCard = (character) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", character.id); // Agrega el atributo data-id

    const imgCard = document.createElement("img");
    imgCard.src = character.image; 
    imgCard.alt = character.name; 

    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");

    const nameCard = document.createElement("h3");
    nameCard.textContent = character.name; 

    const statusCard = document.createElement("p");
    statusCard.textContent = `Status: ${character.status}`; // Corregido

    const speciesCard = document.createElement("p");
    speciesCard.textContent = `Species: ${character.species}`; // Corregido

    cardContent.appendChild(nameCard);
    cardContent.appendChild(statusCard);
    cardContent.appendChild(speciesCard);
    card.appendChild(imgCard);
    card.appendChild(cardContent);

    containerCards.appendChild(card); 
};

// Función para filtrar las cards de personajes
const filterCards = async (searchText) => {
    const searchUrl = `https://rickandmortyapi.com/api/character/?name=${searchText}`; // Construye la URL de búsqueda

    try {
        const response = await fetch(searchUrl); // Realiza la búsqueda utilizando la URL construida
        const data = await response.json();
        const filteredCharacters = data.results;

        // Oculta todas las cards
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.display = 'none';
        });

        // Muestra las cards de los personajes filtrados
        filteredCharacters.forEach(character => {
            const card = document.querySelector(`.card[data-id="${character.id}"]`); // Corregido
            if (card) {
                card.style.display = 'flex';
            }
        });

        if (filteredCharacters.length === 0) {
            alert("No se encontraron resultados."); 
        }
    } catch (error) {
        console.error("Error filtering characters:", error);
    }
};

// Evento de entrada para el input de búsqueda
inputCharacter.addEventListener('input', () => {
    const searchText = inputCharacter.value.toLowerCase(); 
    filterCards(searchText); 
});

// Llama a la función para obtener personajes al cargar la página
fetchCharacters();
