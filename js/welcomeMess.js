document.addEventListener("DOMContentLoaded", function () {
    // Controlla se l'utente è autenticato
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedInUser) {
        window.location.href = "../html/login.html"; // Reindirizza alla pagina di login se non autenticato
    } else {
        //Visualizza il messaggio di benvenuto utilizzando le informazioni dell'utente
        const welcomeMessage = document.createElement("h1");
        welcomeMessage.innerHTML = `<a href="profilo.html"><img class="foto-nav" src="${loggedInUser.foto}"></a> ${loggedInUser.nome}`;

        // Aggiungi il messaggio di benvenuto al div container
        const container = document.getElementById("welcomeMessage");
        container.appendChild(welcomeMessage);

        console.log(loggedInUser);
    }
});
