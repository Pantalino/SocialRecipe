document.addEventListener("DOMContentLoaded", function () {

    const user = JSON.parse(localStorage.getItem('user'));

    fetch('http://localhost:8080/api/ricette')
        .then(response => response.json())
        .then(data => {
            const postSection = document.querySelector('.post-section');
            data.reverse();

            data.forEach(ricetta => {
                const postCard = document.createElement('div');
                postCard.classList.add('post-card');
                
                const postUtente = document.createElement('div');
                postUtente.classList.add('post-utente')

                const titolo = document.createElement('h2');
                titolo.innerHTML = ricetta.titolo;

                const imgUtente = document.createElement('img');
                imgUtente.classList.add('foto');
                imgUtente.src = `${ricetta.utente.foto}`;

                const utente = document.createElement('p');
                utente.classList.add('nome-utente')
                utente.innerHTML = `<strong>${ricetta.utente.nome} ${ricetta.utente.cognome}</strong>`;

                const seguiButton = document.createElement('button');
                seguiButton.classList.add('segui');
                seguiButton.innerHTML = `Follow`;
                
                const ingredienti = document.createElement('p');
                ingredienti.innerHTML = `<h3>Ingredienti:</h3> ${ricetta.ingredienti}`;

                const istruzioni = document.createElement('p');
                istruzioni.innerHTML = `<h3>Istruzioni:</h3> ${ricetta.istruzioni}`;

                const imgRic = document.createElement('img');
                imgRic.classList.add('imgRicetta')
                imgRic.src = `${ricetta.urlImmagine}`;

                const date = new Date(ricetta.data);

                const giorno = date.getDate();
                const mese = date.getMonth() + 1;
                const anno = date.getFullYear();

                const dataRicetta = ` Ore: ${date.toLocaleTimeString()} Data: ${giorno}/${mese}/${anno}`;

                const dataElement = document.createElement('p');
                dataElement.innerHTML = `<h3>Postata:</h3> ${dataRicetta}`;

                const hr = document.createElement('hr');

                const like = document.createElement('button');
                like.innerHTML = '&#129316';
                like.classList.add('like-icon');
                like.setAttribute('data-recipe-id', ricetta.id);

                const commentButton = document.createElement('button');
                commentButton.innerHTML = 'Commenti';
                commentButton.classList.add('commenti');
                commentButton.setAttribute('data-recipe-id', ricetta.id);

                const commentInput = document.createElement('textarea');
                commentInput.classList.add('comment-input');
                commentInput.placeholder = 'Aggiungi un commento...';

                const submitButton = document.createElement('button');
                submitButton.innerHTML = 'Invia';
                submitButton.classList.add('submit-button');

                like.addEventListener('click', function () {
                    const recipeId = this.getAttribute('data-recipe-id');

                    fetch('http://localhost:8080/api/likes', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                utenteId: user.id,
                                ricettaId: recipeId,
                            }),
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                this.classList.add('liked');
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
                        if(data.length === 0){
                            likeCount.innerHTML = 'La ricetta non piace a nessuno'
                        }else if(data.length == 1){
                            likeCount.innerHTML = `Piace a: ${data.length} persona`;
                        }else{
                            likeCount.innerHTML = `Piace a: ${data.length} persone`;

                        }
                    })
                    .catch(error => {
                        console.error('Errore nel recupero del conteggio dei Mi Piace:', error);
                    });

                commentButton.addEventListener('click', function () {
                    const recipeId = this.getAttribute('data-recipe-id');

                    fetch(`http://localhost:8080/api/ricette/${recipeId}/commenti`)
                        .then(response => response.json())
                        .then(commenti => {
                            let commentContainer = postCard.querySelector('.comment-container');
                            if (!commentContainer) {
                                commentContainer = document.createElement('div');
                                commentContainer.classList.add('comment-container');
                                postCard.appendChild(commentContainer);
                            }

                            commentContainer.innerHTML = '';

                            commenti.forEach(commento => {
                                const date = new Date(commento.data);
                                const giorno = date.getDate();
                                const mese = date.getMonth() + 1;
                                const anno = date.getFullYear();
                                const dataCommento = ` Ore: ${date.toLocaleTimeString()} Data: ${giorno}/${mese}/${anno}`;
                                const commentElement = document.createElement('p');
                                commentElement.classList.add('new-comment')
                                commentElement.innerHTML = `<hr><strong>${commento.utente.nome} ${commento.utente.cognome}</strong>:<br> ${commento.contenuto}<p>${dataCommento}</p>`;
                                commentContainer.appendChild(commentElement);
                            });

                            if (commentContainer.style.display === 'block') {
                                commentContainer.style.display = 'none';
                            } else {
                                commentContainer.style.display = 'block';
                            }
                        })
                        .catch(error => {
                            console.error('Errore nel recupero dei commenti:', error);
                        });
                });

                submitButton.addEventListener('click', function () {
                    const recipeId = commentButton.getAttribute('data-recipe-id');
                    const nuovoCommento = commentInput.value;
                    if (user && user.id && nuovoCommento.trim() !== '') {
                        fetch(`http://localhost:8080/api/commenti`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    // utenteId: user.id,
                                    contenuto: nuovoCommento,
                                    utente:{
                                        id: user.id,
                                        nome: user.nome,
                                        cognome: user.cognome,
                                        email: user.email,
                                        password: user.password,
                                        data: user.data
                                    },
                                    ricetta:{
                                        id: ricetta.id,
                                        titolo: ricetta.titolo,
                                        ingredienti: ricetta.ingredienti,
                                        istruzioni: ricetta.istruzioni,
                                        data: ricetta.data
                                    }
                                }),
                            })
                            .then(response => response.json())
                            .then(data => {
                                const date = new Date();
                                const giorno = date.getDate();
                                const mese = date.getMonth() + 1;
                                const anno = date.getFullYear();
                                const dataCommento = ` Ore: ${date.toLocaleTimeString()} Data: ${giorno}/${mese}/${anno}`;
                                const commentElement = document.createElement('p');
                                commentElement.innerHTML = `<hr><strong>${user.nome} ${user.cognome}</strong>:<br>${nuovoCommento}<p>${dataCommento}</p>`;
                                const commentContainer = postCard.querySelector('.comment-container');
                                commentContainer.appendChild(commentElement);
                                console.log("commento aggiunto con successo", data);
                            })
                            .catch(error => {
                                console.error('Errore nell\'invio del commento:', error);
                            }); commentInput.value = ''
                    }
                });

                postCard.append(postUtente);
                postUtente.appendChild(imgUtente);
                postUtente.appendChild(utente);
                postUtente.appendChild(seguiButton);
                postCard.appendChild(titolo);
                postCard.appendChild(ingredienti);
                postCard.appendChild(istruzioni);
                postCard.appendChild(imgRic);
                postCard.appendChild(dataElement);
                postCard.appendChild(hr);
                postCard.appendChild(like);
                postCard.appendChild(likeCount);
                postCard.appendChild(hr);
                postCard.appendChild(commentButton);
                postCard.appendChild(hr);
                postCard.appendChild(commentInput);
                postCard.appendChild(submitButton);

                postSection.appendChild(postCard);
            });
        })
        .catch(error => {
            console.error('Errore nel recupero delle ricette:', error);
        });
});
