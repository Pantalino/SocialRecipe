document.addEventListener("DOMContentLoaded", function () {
    // Seleziona gli elementi della chat
    const chatContainer = document.querySelector(".chat-container");
    const messageInput = document.querySelector(".message-input");
    const sendButton = document.querySelector(".send-button");
    const chat = document.querySelector(".chat");

    // Funzione per aggiungere un messaggio alla chat
    function addMessage(text, sent) {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("chat-message", sent ? "sent" : "received");
        messageDiv.innerHTML = `<div class="message-text">${text}</div>`;
        chat.appendChild(messageDiv);

        // Scorrere verso il basso per visualizzare il nuovo messaggio
        chat.scrollTop = chat.scrollHeight;
    }

    // Simula la ricezione di un messaggio
    function receiveMessage() {
        setTimeout(() => {
            addMessage("Messaggio ricevuto", false);
        }, 1000);
    }

    // Gestione dell'invio di un messaggio
    sendButton.addEventListener("click", function () {
        const messageText = messageInput.value;
        if (messageText.trim() !== "") {
            addMessage(messageText, true);

            // Simula una risposta
            receiveMessage();

            // Cancella il campo di input
            messageInput.value = "";
        }
    });

    // Simula l'inizio di una conversazione
    receiveMessage();
});
