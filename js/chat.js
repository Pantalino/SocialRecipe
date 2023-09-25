document.addEventListener('DOMContentLoaded', function () {
    const userLogged = JSON.parse(localStorage.getItem('user'));
    let selectedUserId = null;

    const chatMessages = document.querySelector(".chat-messages");
    const sendButton = document.getElementById("send-button");
    const messageInput = document.getElementById("message-input");
    const chatHeader = document.querySelector(".chat-header");

    // Funzione per aggiungere un messaggio alla finestra di chat
    function addMessage(text, sent) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("chat-message", sent ? "sent" : "received");
        messageDiv.innerHTML = `<div class="message-text">${text}</div>`;
        chatMessages.appendChild(messageDiv);

        // Scorrere verso il basso per visualizzare il nuovo messaggio
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Funzione per caricare la cronologia dei messaggi tra l'utente loggato e il destinatario selezionato
    function loadChatMessages(mittenteId, destinatarioId) {
        // Effettua una richiesta per ottenere la cronologia dei messaggi
        fetch(`http://localhost:8080/api/chat/${mittenteId}/${destinatarioId}`)
            .then(response => response.json())
            .then(messages => {
                chatMessages.innerHTML = ''; // Cancella i messaggi precedenti
                messages.forEach(message => {
                    // Aggiungi il messaggio alla finestra di chat
                    addMessage(message.testo, message.mittente.id === userLogged);
                });

                // Aggiorna l'intestazione della chat con il nome dell'utente selezionato
                const selectedUserName = document.querySelector(`label[for=userCheckbox_${selectedUserId}]`).textContent;
                chatHeader.textContent = selectedUserName;
            })
            .catch(error => {
                console.error('Si è verificato un errore nel caricamento della chat:', error);
            });
    }

    // Codice per caricare la lista degli utenti
    fetch('http://localhost:8080/api/utenti')
        .then(response => response.json())
        .then(users => {
            users.forEach(user => {
                if (user.id !== userLogged) {
                    const userList = document.querySelector('.user-list');
                    const userCheckbox = document.createElement('input');
                    userCheckbox.type = 'radio';
                    userCheckbox.name = 'userRadio';
                    userCheckbox.id = `userCheckbox_${user.id}`;
                    userCheckbox.value = user.id;

                    const userLabel = document.createElement('label');
                    userLabel.htmlFor = `userCheckbox_${user.id}`;
                    userLabel.textContent = `${user.nome} ${user.cognome}`;

                    const userChat = document.createElement('div');
                    userChat.className = 'userChat';
                    userChat.appendChild(userCheckbox);
                    userChat.appendChild(userLabel);

                    userCheckbox.addEventListener('change', () => {
                        if (userCheckbox.checked) {
                            selectedUserId = user.id;
                            // Carica la cronologia dei messaggi quando un utente viene selezionato
                            loadChatMessages(userLogged, selectedUserId);
                        }
                    });

                    userList.appendChild(userChat);
                }
            });
        });

    // Gestione dell'invio di un messaggio
    sendButton.addEventListener("click", function () {
        const messageText = messageInput.value.trim();
        if (messageText !== "") {
            // Creare un oggetto che rappresenti il messaggio da inviare al backend
            const messageData = {
                mittenteId: userLogged, // ID del mittente (l'utente loggato)
                destinatarioId: selectedUserId, // ID del destinatario (l'utente con cui stai chattando)
                testo: messageText, // Testo del messaggio
                dataOraInvio: new Date().toISOString() // Data e ora di invio
            };
        
            // Effettuare una richiesta POST al tuo endpoint API del backend per salvare il messaggio
            fetch("http://localhost:8080/api/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(messageData),
            })
            .then(response => response.json())
            .then(data => {
                // Gestisci la risposta dal backend, ad esempio mostrando un messaggio di conferma
                console.log("Messaggio inviato con successo:", data);
        
                // Dopo aver inviato il messaggio con successo, puoi anche aggiungerlo alla finestra di chat
                addMessage(messageText, true);
        
                // Cancella il campo di input
                messageInput.value = "";
            })
            .catch(error => {
                console.error("Si è verificato un errore durante l'invio del messaggio:", error);
            });
        }
    });

});
