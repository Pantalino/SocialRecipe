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
                postUtente.classList.add('post-utente');

                const postButton = document.createElement('div');
                postUtente.classList.add('post-button')

                const postAdd = document.createElement('div');
                postUtente.classList.add('post-add')

                const titolo = document.createElement('h2');
                titolo.innerHTML = ricetta.titolo;

                const imgUtente = document.createElement('img');
                imgUtente.classList.add('foto');
                imgUtente.src = `${ricetta.utente.foto}`;

                const utente = document.createElement('p');
                utente.classList.add('nome-utente')
                utente.innerHTML = `${ricetta.utente.nome} ${ricetta.utente.cognome}`;

                const followButton = document.createElement('button');
                followButton.classList.add('follow-button');
                followButton.innerHTML = `Follow`;

                const ingredienti = document.createElement('p');
                ingredienti.classList.add('ingredienti')
                ingredienti.innerHTML = `<h3>Ingredienti:</h3> ${ricetta.ingredienti}`;

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
                })

                const istruzioni = document.createElement('p');
                istruzioni.classList.add('istruzioni')
                istruzioni.innerHTML = `<h3>Istruzioni:</h3> ${ricetta.istruzioni}`;

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
                })

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
                commentButton.innerHTML = 'Visualizza commenti';
                commentButton.classList.add('commentiButton');
                commentButton.setAttribute('data-recipe-id', ricetta.id);

                const commentInput = document.createElement('textarea');
                commentInput.classList.add('comment-input');
                commentInput.placeholder = 'Aggiungi un commento...';

                const submitButton = document.createElement('button');
                submitButton.innerHTML = 'Invia';
                submitButton.classList.add('submit-button');

                const followerCount = document.createElement('span');
                followerCount.classList.add('follower-count');

                const followingCount = document.createElement('span');
                followingCount.classList.add('following-count');

                followButton.addEventListener('click', function () {
                    const userId = ricetta.utente.id;

                    // Verifica se l'utente sta già seguendo l'utente corrente
                    fetch(`http://localhost:8080/api/follows/${user.id}/following`)
                        .then(response => response.json())
                        .then(followingList => {
                            const isFollowing = followingList.some(following => following.following.id === userId);

                            if (isFollowing) {
                                // Se l'utente sta già seguendo, rimuovi il follow
                                fetch(`http://localhost:8080/api/follow/${user.id}/unfollow/${userId}`, {
                                        method: 'DELETE'
                                    })
                                    .then(response => response.json())
                                    .then(data => {
                                        if (data) {
                                            console.log('Follow rimosso con successo');
                                            followButton.innerHTML = 'Follow';
                                        } else {
                                            console.error('Errore durante la rimozione del follow');
                                        }
                                    })
                                    .catch(error => {
                                        console.error('Si è verificato un errore:', error);
                                        console.log(error);
                                    });
                            } else {
                                // Se l'utente non sta seguendo, aggiungi il follow
                                fetch('http://localhost:8080/api/follows', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                            follower: {
                                                id: user.id
                                            },
                                            following: {
                                                id: userId
                                            },
                                        }),
                                    })
                                    .then(response => response.json())
                                    .then(data => {
                                        if (data.id) {
                                            console.log('Follow aggiunto con successo');
                                            followButton.innerHTML = 'Unfollow';
                                        } else {
                                            console.error('Errore durante l\'aggiunta del follow');
                                        }
                                    })
                                    .catch(error => {
                                        console.error('Si è verificato un errore:', error);
                                    });
                            }
                        })
                        .catch(error => {
                            console.error('Si è verificato un errore:', error);
                        });
                });





                fetch(`http://localhost:8080/api/follows/${ricetta.utente.id}/followers`)
                    .then(response => response.json())
                    .then(followers => {
                        const followerNumber = followers.length;
                        followerCount.innerHTML = `Follower: ${followerNumber}`;
                    })
                    .catch(error => {
                        console.error('Errore nel recupero dei follower:', error);
                    });

                fetch(`http://localhost:8080/api/follows/${ricetta.utente.id}/following`)
                    .then(response => response.json())
                    .then(followings => {
                        const followingNumber = followings.length;
                        followingCount.innerHTML = `Seguiti: ${followingNumber}`;
                    })
                    .catch(error => {
                        console.error('Errore nel recupero dei following:', error);
                    });

                // Verifica lo stato del "Mi Piace" per questa ricetta
                // Inizializza la variabile ricetta.isLiked con il valore corretto quando la pagina viene caricata
                fetch(`http://localhost:8080/api/likes/${ricetta.id}/utente/${user.id}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.length > 0) {
                            ricetta.isLiked = true;
                            like.classList.add('liked');
                        } else {
                            ricetta.isLiked = false;
                        }
                    })
                    .catch(error => {
                        console.error('Errore nella verifica dello stato del Mi Piace:', error);
                    });


                like.addEventListener('click', function () {
                    const recipeId = ricetta.id;
                    const isLiked = ricetta.isLiked;

                    if (isLiked) {
                        // Rimozione "Mi Piace"
                        fetch(`http://localhost:8080/api/likes/${recipeId}`, {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    utenteId: user.id,
                                    ricettaId: recipeId,
                                }),
                            })
                            .then(response => {
                                if (response.ok) {
                                    console.log('Mi piace rimosso con successo');
                                    ricetta.isLiked = false;
                                    like.classList.remove('liked');
                                    updateLikeCount(); // Aggiorna il conteggio dei "Mi Piace"
                                } else {
                                    console.error('Errore durante la rimozione del Mi Piace');
                                }
                            })
                            .catch(error => {
                                console.error('Si è verificato un errore:', error);
                            });
                    } else {
                        // Aggiunta "Mi Piace"
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
                                if (data.id) {
                                    console.log('Mi piace aggiunto con successo');
                                    ricetta.isLiked = true;
                                    like.classList.add('liked');
                                    updateLikeCount(); // Aggiorna il conteggio dei "Mi Piace"
                                } else {
                                    console.error('Errore durante l\'aggiunta del Mi Piace');
                                }
                            })
                            .catch(error => {
                                console.error('Si è verificato un errore:', error);
                            });
                    }
                });



                // Funzione per aggiornare il conteggio dei "Mi Piace"
                function updateLikeCount() {
                    fetch(`http://localhost:8080/api/likes/${ricetta.id}`)
                        .then(response => response.json())
                        .then(data => {
                            const likeCountText = data.length === 1 ? `Piace a: ${data.length} persona` : `Piace a: ${data.length} persone`;
                            likeCount.innerHTML = likeCountText;
                        })
                        .catch(error => {
                            console.error('Errore nel recupero del conteggio dei Mi Piace:', error);
                        });
                }



                const likeCount = document.createElement('span');
                likeCount.classList.add('like-count');

                fetch(`http://localhost:8080/api/likes/${ricetta.id}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.length === 0) {
                            likeCount.innerHTML = 'La ricetta non piace a nessuno'
                        } else if (data.length == 1) {
                            likeCount.innerHTML = `Piace a: ${data.length} persona`;
                        } else {
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
                                    utente: {
                                        id: user.id,
                                        nome: user.nome,
                                        cognome: user.cognome,
                                        email: user.email,
                                        password: user.password,
                                        data: user.data
                                    },
                                    ricetta: {
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
                            });
                        commentInput.value = ''
                    }
                });

        

                    const searchButton = document.getElementById('buttonSearch');
                    const searchInput = document.getElementById('search');
            
                    searchButton.addEventListener('click', function () {
                        const query = searchInput.value;
                        if (query.trim() !== '') {
                            searchUser(query);
                        }
                    });
            
                    function searchUser(query) {
                        fetch(`http://localhost:8080/api/utenti/search/by-cognome?cognome=${query}`)
                            .then(response => response.json())
                            .then(data => displayResults(data))
                            .catch(error => console.error('Errore durante la ricerca:', error));

                        fetch(`http://localhost:8080/api/utenti/search/by-nome?nome=${query}`)
                            .then(response => response.json())
                            .then(data => displayResults(data))
                            .catch(error => console.error('Errore durante la ricerca:', error));

                        //     const formattedQuery = encodeURIComponent(query);

                        // // fetch(`http://localhost:8080/api/utenti/search/by-nome-cognome?nome-cognome=${query}`)
                        // //     .then(response => response.json())
                        // //     .then(data => displayResults(data))
                        // //     .catch(error => console.error('Errore durante la ricerca:', error));
                    }
            
                    function displayResults(user) {
                        if (user) {
                            console.log('Id:', user.id);
                            console.log('Nome:', user.nome);
                            console.log('Cognome:', user.cognome);
                            console.log('Email:', user.email);
                            // Aggiungi altre proprietà se necessario

                            const link = document.createElement('a')
                            link.href = `../html/ricerca.html?utenteID=${user.id}`;

                            link.click();
                        } else {
                            alert('Nessun utente trovato.');
                        }
                    }
            
               


                postCard.append(postUtente);
                postUtente.appendChild(imgUtente);
                postUtente.appendChild(utente);
                postUtente.appendChild(followButton);
                postUtente.appendChild(followerCount);
                postUtente.appendChild(followingCount);
                postCard.appendChild(titolo);
                postCard.appendChild(imgRic);
                postCard.appendChild(dataElement);
                postCard.appendChild(ingredienti);
                postCard.appendChild(istruzioni);;
                postCard.appendChild(like);
                postCard.appendChild(likeCount);
                postCard.appendChild(hr);
                postCard.append(postButton);
                postButton.appendChild(ingredientiButton);
                postButton.appendChild(istruzioniButton);
                postCard.appendChild(hr);
                postCard.append(postAdd);
                postAdd.appendChild(commentButton);
                postAdd.appendChild(commentInput);
                postAdd.appendChild(submitButton);

                postSection.appendChild(postCard);


            });
        })
        .catch(error => {
            console.error('Errore nel recupero delle ricette:', error);
        });
});