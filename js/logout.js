document.addEventListener("DOMContentLoaded", function () {

    const logout = document.getElementById("logout");
    logout.addEventListener("click", function (event) {
        event.preventDefault();
        
        localStorage.removeItem("user");
        
        window.location.href = "../html/login.html";
    });

    const cancella = document.getElementById('delete');
    cancella.addEventListener('click', function () {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            const shouldDelete = confirm("Sei sicuro di voler eliminare l'account? Questa azione è irreversibile.");
            if (shouldDelete) {
                const userIdToDelete = user.id;
                fetch(`http://localhost:8080/api/utenti/${userIdToDelete}`, {
                    method: 'DELETE'
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Utente eliminato con successo!');
                        localStorage.removeItem('user');
                        window.location.href = "../html/delete.html"; // Reindirizza alla pagina di eliminazione dopo l'eliminazione
                        console.log(data);
                        console.log(data.success);
                    } else {
                        alert('Errore durante l\'eliminazione dell\'utente.');
                    }
                })
                .catch(error => console.error('Errore nella richiesta:', error));
            }
        }
    });
});
