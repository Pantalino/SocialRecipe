document.addEventListener("DOMContentLoaded", function () {
    const URL = 'http://localhost:8080';
    const userSelection = document.getElementById('userSelection');
    const recipeSelection = document.getElementById('recipeSelection');
    const recipeDetails = document.getElementById('recipeDetails');
    const commentiTitle = document.getElementById('commentiTitle');
    const commentiList = document.getElementById('commentiList');
    const toggleCommentButton = document.getElementById('toggleCommentButton');

    let selectedUserId = null;
    let selectedRecipeId = null;
    let commentsVisible = false;

    // Carica gli utenti all'avvio della pagina
    fetch(`${URL}/api/utenti`)
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                const userCheckbox = document.createElement('input');
                userCheckbox.type = 'radio';
                userCheckbox.name = 'userRadio';
                userCheckbox.id = `userCheckbox_${user.id}`;
                userCheckbox.value = user.id;

                const userLabel = document.createElement('label');
                userLabel.htmlFor = `userCheckbox_${user.id}`;
                userLabel.textContent = `${user.nome} ${user.cognome}`;

                const userCard = document.createElement('div');
                userCard.className = 'userCard';
                userCard.appendChild(userCheckbox);
                userCard.appendChild(userLabel);

                userCheckbox.addEventListener('change', () => {
                    if (userCheckbox.checked) {
                        selectedUserId = user.id;
                        selectedRecipeId = null;
                        loadRecipesAndRender();
                    }
                });

                userSelection.appendChild(userCard);
            });
        });

    function loadRecipesAndRender() {
        recipeSelection.innerHTML = '';
        recipeDetails.style.display = 'none';
        commentiTitle.style.display = 'none';
        commentiList.innerHTML = '';
        toggleCommentButton.style.display = 'none';

        if (selectedUserId !== null) {
            fetch(`${URL}/api/utenti/${selectedUserId}/ricette`)
                .then(data => data.json())
                .then(response => {
                    if (response.length === 0) {
                        recipeSelection.innerHTML = '<p>L\'utente non ha caricato nessuna ricetta</p>';
                    } else {
                        const allRecipesRadio = document.createElement('input');
                        allRecipesRadio.type = 'radio';
                        allRecipesRadio.name = 'recipeRadio';
                        allRecipesRadio.id = 'allRecipesRadio';
                        allRecipesRadio.value = 'all';

                        const allRecipesLabel = document.createElement('label');
                        allRecipesLabel.htmlFor = 'allRecipesRadio';
                        allRecipesLabel.textContent = 'Tutte le ricette';

                        allRecipesRadio.addEventListener('change', () => {
                            selectedRecipeId = 'all';
                            renderRecipeDetails();
                            commentiTitle.style.display = 'none';
                            commentiList.innerHTML = '';
                            toggleCommentButton.style.display = 'none';
                            commentsVisible = false;
                        });

                        recipeSelection.appendChild(allRecipesRadio);
                        recipeSelection.appendChild(allRecipesLabel);

                        response.forEach(ricetta => {
                            const recipeCheckbox = document.createElement('input');
                            recipeCheckbox.type = 'radio';
                            recipeCheckbox.name = 'recipeRadio';
                            recipeCheckbox.id = `recipeCheckbox_${ricetta.id}`;
                            recipeCheckbox.value = ricetta.id;

                            const recipeLabel = document.createElement('label');
                            recipeLabel.htmlFor = `recipeCheckbox_${ricetta.id}`;
                            recipeLabel.textContent = ricetta.titolo;

                            const recipeCard = document.createElement('div');
                            recipeCard.className = 'recipeCard';
                            recipeCard.appendChild(recipeCheckbox);
                            recipeCard.appendChild(recipeLabel);

                            recipeCheckbox.addEventListener('change', () => {
                                if (recipeCheckbox.checked) {
                                    selectedRecipeId = ricetta.id;
                                    renderRecipeDetails();
                                    commentiTitle.style.display = 'block';
                                    toggleCommentButton.style.display = 'block';
                                    toggleCommentButton.textContent = 'Mostra Commenti';
                                    commentsVisible = false;
                                }
                            });

                            recipeSelection.appendChild(recipeCard);
                        });
                    }
                });
        }
    }

    function renderRecipeDetails() {
        if (selectedRecipeId !== null) {
            if (selectedRecipeId === 'all') {
                // Carica tutte le ricette dell'utente
                fetch(`${URL}/api/utenti/${selectedUserId}/ricette`)
                    .then(data => data.json())
                    .then(response => {
                        ricettaDetails.innerHTML = '';
                        response.forEach(ricetta => {
                            const ricettaDiv = document.createElement('div');
                            ricettaDiv.innerHTML = `
                            <p><strong>Titolo:</strong> ${ricetta.titolo}</p>
                            <p><strong>Ingredienti:</strong> ${ricetta.ingredienti}</p>
                            <p><strong>Istruzioni:</strong> ${ricetta.istruzioni}</p>
                            <img src="${ricetta.urlImmagine}" alt="Ricetta Image">
                            <hr>
                            `;
                            ricettaDetails.appendChild(ricettaDiv);
                        });
                    });
            } else {
                // Carica dettagli di una singola ricetta
                fetch(`${URL}/api/ricette/${selectedRecipeId}`)
                    .then(response => response.json())
                    .then(ricetta => {
                        ricettaDetails.innerHTML = `
                        <p><strong>Titolo:</strong> ${ricetta.titolo}</p>
                        <p><strong>Ingredienti:</strong> ${ricetta.ingredienti}</p>
                        <p><strong>Istruzioni:</strong> ${ricetta.istruzioni}</p>
                        <img src="${ricetta.urlImmagine}" alt="Ricetta Image">
                        `;
                    });
            }
            recipeDetails.style.display = 'block';
        } else {
            recipeDetails.style.display = 'none';
        }
    }

    toggleCommentButton.addEventListener('click', () => {
        if (commentsVisible) {
            commentiTitle.style.display = 'none';
            commentiList.innerHTML = '';
            toggleCommentButton.textContent = 'Mostra Commenti';
        } else {
            commentiTitle.style.display = 'block';
            fetch(`${URL}/api/ricette/${selectedRecipeId}/commenti`)
                .then(response => response.json())
                .then(commenti => {
                    commentiList.innerHTML = '';
                    commenti.forEach(commento => {
                        const commentoDiv = document.createElement('div');
                        commentoDiv.innerHTML = `
                        <p><strong>Contenuto:</strong> ${commento.contenuto}</p>
                        <p><strong>Utente:</strong> ${commento.utente.nome}</p>
                        <p><strong>Data:</strong>${commento.data}</p>
                        <hr>
                        `;
                        commentiList.appendChild(commentoDiv);
                    });
                });
            toggleCommentButton.textContent = 'Nascondi Commenti';
        }
        commentsVisible = !commentsVisible;
    });

    // Inizializza il caricamento delle ricette
    loadRecipesAndRender();
});

