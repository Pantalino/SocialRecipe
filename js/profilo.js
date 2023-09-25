//i like qui funziona, anche se in console va in errore
document.addEventListener("DOMContentLoaded", function () {
    // Controlla se l'utente è autenticato
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        window.location.href = "../html/login.html"; // Reindirizza alla pagina di login se non autenticato
    } else {
        // Visualizza le ricette dell'utente loggato
        fetch(`http://localhost:8080/api/ricette`)
            .then(response => response.json())
            .then(data => {
                const ricetteContainer = document.querySelector(".post-section");
                console.log(data);
                // Filtra le ricette dell'utente loggato
                const ricetteUtente = data.filter(ricetta => ricetta.utente.id === user.id);

                ricetteUtente.reverse();

                if (ricetteUtente.length === 0) {
                    // L'utente non ha ancora pubblicato alcuna ricetta
                    const messaggio = document.createElement("p");
                    messaggio.innerHTML = "Non hai ancora postato alcuna ricetta.";
                    ricetteContainer.appendChild(messaggio);
                } else {
                    // Itera attraverso le ricette e crea le card
                    ricetteUtente.forEach(ricetta => {

                        const postSection = document.querySelector('.post-section');

                        const postCard = document.createElement("div");
                        postCard.classList.add("post-card"); // Aggiungi classe per lo stile CSS

                        const postUtente = document.createElement('div');
                        postUtente.classList.add('post-utente');

                        const postButton = document.createElement('div');
                        postButton.classList.add('pot-button');

                        const postAdd = document.createElement('div');
                        postAdd.classList.add('post-add');

                        const imgUtente = document.createElement('img');
                        imgUtente.classList.add('foto');
                        imgUtente.src = `${user.foto}`;

                        const utente = document.createElement('p');
                        utente.classList.add('nome-utente');
                        utente.innerHTML = `${user.nome} ${user.cognome}`;



                        // Costruisci il contenuto della card con i dati della ricetta
                        const titolo = document.createElement("h2");
                        titolo.innerHTML = ricetta.titolo;

                        const ingredienti = document.createElement("p");
                        ingredienti.innerHTML = `<h3>Ingredienti:</h3> ${ricetta.ingredienti}`;
                        ingredienti.style.display = 'none';

                        const ingredientiButton = document.createElement('button');
                        ingredientiButton.classList.add('ingredientiButton');
                        ingredientiButton.innerHTML = 'Ingredienti';


                        ingredientiButton.addEventListener('click', function () {
                            ingredienti.querySelector('.ingredienti')
                            if (ingredienti.style.display === 'block') {
                                ingredienti.style.display = 'none'
                            } else {
                                ingredienti.style.display = 'block'
                            }
                        });

                        const istruzioni = document.createElement("p");
                        istruzioni.innerHTML = `<h3>Istruzioni:</h3> ${ricetta.istruzioni}`;
                        istruzioni.style.display = 'none';

                        const istruzioniButton = document.createElement('button');
                        istruzioniButton.classList.add('istruzioniButton');
                        istruzioniButton.innerHTML = 'Istruzioni';

                        istruzioniButton.addEventListener('click', function () {
                            istruzioni.querySelector('.istruzioni')
                            if (istruzioni.style.display === 'block') {
                                istruzioni.style.display = 'none'
                            } else {
                                istruzioni.style.display = 'block'
                            }
                        });

                        const imgRic = document.createElement('img');
                        imgRic.classList.add('imgRicetta');
                        imgRic.src = `${ricetta.urlImmagine}`;

                        const date = new Date(ricetta.data);
                        const giorno = date.getDate();
                        const mese = date.getMonth() + 1;
                        const anno = date.getFullYear();
                        const dataRicetta = `Ore: ${date.toLocaleDateString()} Data: ${giorno}/${mese}/${anno}`;
                        const dataElement = document.createElement('p');
                        dataElement.innerHTML = `<h3>Postata:</h3> ${dataRicetta}`

                        const hr = document.createElement('hr');

                        const like = document.createElement('button');
                        like.innerHTML = '&#129316';
                        like.classList.add('like-icon');
                        like.setAttribute('data-recipe-id', ricetta.id);

                        const commentButton = document.createElement('button');
                        commentButton.innerHTML = 'Visualizza commenti';
                        commentButton.classList.add('commentiButton');
                        commentButton.setAttribute('data-recipe-id', ricetta.id);

                        const commentInput = document.createElement('textarea');
                        commentInput.classList.add('comment-input');
                        commentInput.placeholder = 'Aggiungi un commento... ';

                        const submitButton = document.createElement('button');
                        submitButton.innerHTML = 'Invia';
                        submitButton.classList.add('submit-button');

                        const followerCount = document.createElement('span');
                        followerCount.classList.add('follower-count');

                        const followingCount = document.createElement('span');
                        followingCount.classList.add('following-count');
                        
                        fetch(`http://localhost:8080/api/follows/${user.id}/followers`)
                            .then(response => response.json())
                            .then(followers => {
                                const followerNumber = followers.length;
                                followerCount.innerHTML = `Follwer: ${followerNumber}`;
                                console.log('follower: ',followers);
                                console.log('follower numero: ', followerNumber);
                                
                            })
                            .catch(error => {
                                console.error('Errore nel recupero dei follower:', error);
                            });


                        fetch(`http://localhost:8080/api/follows/${user.id}/following`)
                            .then(response => response.json())
                            .then(followings => {
                                const followingNumber = followings.length;
                                followingCount.innerHTML = `Seguiti: ${followingNumber}`;
                                console.log('segui: ', followings);
                                console.log('segui numero: ', followingNumber);
                        
                               
                            })
                            .catch(error => {
                                console.error('Errore nel recupero dei follower:', error);
                            });

                        like.addEventListener('click', function () {
                            const recipeId = this.getAttribute('data-recipe-id');



                            fetch('http://localhost:8080/api/likes', {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/json',
                                    },
                                    body: JSON.stringify({
                                        utenteId: user.id, // Sostituisci con l'ID dell'utente attuale
                                        ricettaId: recipeId,
                                    }),
                                })
                                .then(response => response.json())
                                .then(data => {
                                    if (data.success) {
                                        // Aggiorna l'interfaccia per riflettere il "Mi Piace" aggiunto
                                        this.classList.add('liked'); // Aggiungi classe per cambiare lo stile dell'icona
                                    } else {
                                        console.error('Errore durante l\'aggiunta del Mi Piace');
                                    }
                                })
                                .catch(error => {
                                    console.error('Si è verificato un errore:', error);
                                });
                        });

                        const likeCount = document.createElement('span');
                        likeCount.classList.add('like-count');

                        fetch(`http://localhost:8080/api/likes/${ricetta.id}`)
                            .then(response => response.json())
                            .then(data => {
                                if (data.length === 0) {
                                    likeCount.innerHTML = 'La ricetta non piace a nessuno'
                                } else if (data.length === 1) {

                                    likeCount.innerHTML = `Piace ad ${data.length} persona`;
                                } else {
                                    likeCount.innerHTML = `Piace a ${data.length} persone`
                                }
                            })
                            .catch(error => {
                                console.error('Errore nel recupero del conteggio dei Mi Piace:', error);
                            });

                        // Aggiungi gli elementi alla card
                        postCard.append(postUtente);
                        postUtente.appendChild(imgUtente);
                        postUtente.appendChild(utente);
                        postUtente.appendChild(followerCount);
                        postUtente.appendChild(followingCount);
                        postCard.appendChild(titolo);
                        postCard.appendChild(imgRic);
                        postCard.appendChild(dataElement);
                        postCard.appendChild(ingredienti);
                        postCard.appendChild(istruzioni);
                        postCard.appendChild(like);
                        postCard.appendChild(likeCount);
                        postCard.appendChild(hr);
                        postCard.append(postButton)
                        postCard.appendChild(ingredientiButton);
                        postCard.appendChild(istruzioniButton);
                        postCard.appendChild(hr);
                        postCard.append(postAdd);
                        postAdd.appendChild(commentButton);
                        postAdd.appendChild(commentInput);
                        postAdd.appendChild(submitButton);

                        // Aggiungi la card al contenitore delle ricette
                        postSection.appendChild(postCard);

                        commentButton.addEventListener('click', function () {
                            const recipeId = this.getAttribute('data-recipe-id');
                            const commentContainer = postCard.querySelector('.comment-container');

                            if (commentContainer) {
                                commentContainer.style.display = commentContainer.style.display === 'block' ? 'none' : 'block';
                            } else {
                                // Effettua una chiamata Fetch per recuperare i commenti correlati a questa ricetta
                                fetch(`http://localhost:8080/api/ricette/${recipeId}/commenti`)
                                    .then(response => response.json())
                                    .then(commenti => {
                                        const commentContainer = document.createElement('div');
                                        commentContainer.classList.add('comment-container');

                                        commenti.forEach(commento => {
                                            const date = new Date(commento.data);
                                            const giorno = date.getDate();
                                            const mese = date.getMonth() + 1;
                                            const anno = date.getFullYear();
                                            const dataCommento = `Ore: ${date.toLocaleTimeString()} Data: ${giorno}/${mese}/${anno}`;

                                            const commentElement = document.createElement('p');
                                            commentElement.innerHTML = `<hr><strong>${commento.utente.nome} ${commento.utente.cognome}</strong>:<br> ${commento.contenuto}<p>${dataCommento}</p>`;

                                            commentContainer.appendChild(commentElement);
                                        });

                                        postCard.appendChild(commentContainer);
                                    })
                                    .catch(error => {
                                        console.error('Errore nel recupero dei commenti:', error);
                                    });
                            }
                        });
                    });
                }
            })
            .catch(error => {
                console.error("Errore nel recupero delle ricette dell'utente:", error);
            });
    }
});