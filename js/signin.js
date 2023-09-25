document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("loginUser");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value;
        const cognome = document.getElementById("cognome").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const uomo = document.querySelector("#uomo").checked;

        let foto;
        if (uomo) {
            foto = "https://us.123rf.com/450wm/grgroup/grgroup1705/grgroup170503204/78193675-sagoma-blu-con-met%C3%A0-corpo-di-chef-maschile-illustrazione-vettoriale.jpg";
        } else {
            foto = "https://us.123rf.com/450wm/grgroup/grgroup1705/grgroup170503399/78202782-sagoma-di-colore-e-spessore-contorno-di-met%C3%A0-corpo-di-illustrazione-vettoriale-cuoco-femminile.jpg?ver=6";
        }

        const newUser = {
            nome: nome,
            cognome: cognome,
            email: email,
            password: password,
            foto: foto
        };

        fetch("http://localhost:8080/api/utenti", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Risposta al server: ', data);
                if (data) {
                    // Registrazione avvenuta con successo, puoi effettuare ulteriori azioni come reindirizzamento, ecc.
                    console.log("Registrazione avvenuta con successo!");
                    window.location.href = "../html/homepage.html";
                } else {
                    // Registrazione fallita, puoi gestire l'errore qui
                    console.error("Registrazione fallita.");
                    alert("Registrazione fallita.");
                }
            })
            .catch(error => {
                console.error("Errore nella richiesta di registrazione:", error);
            });
    });
});


function mostraPassword(event) {
    event.preventDefault(); // Impedisci la propagazione dell'evento al modulo di login
    
    const passwordInput = document.getElementById("password");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}
// Associa l'evento click al bottone per mostrare/nascondere la password
const show = document.getElementById("mostraPass");
show.addEventListener("click", mostraPassword);