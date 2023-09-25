//login.js
document.getElementById('loginUser').addEventListener('submit', function (event) {
    event.preventDefault();

    // const nome = document.getElementById('nome').value;
    // const cognome = document.getElementById('cognome').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({ nome, cognome, email, password }),
            body: JSON.stringify({
                email,
                password
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                ;

                // Effettua una seconda chiamata al backend per ottenere tutte le informazioni dell'utente
                fetch(`http://localhost:8080/api/utenti/email/${email}`)
                    .then(response => response.json())
                    .then(user => {
                        // Salva l'utente nella localStorage
                        localStorage.setItem("user", JSON.stringify(user));

                        setTimeout(function () {
                            alert('Utente trovato')
                            window.location.href = "../html/homepage.html";

                        }, 1000);
                    })
                    .catch(error => {
                        console.error("Errore durante la richiesta di informazioni utente:", error);
                    });
            } else {
                alert("Credenziali non valide. Riprova.");
            }
        })
        .catch(error => {
            console.error("Errore durante la richiesta di accesso:", error);
        });

    // Funzione per mostrare/nascondere la password

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