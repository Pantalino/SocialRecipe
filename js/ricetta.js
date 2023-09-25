document.addEventListener("DOMContentLoaded", function () {
    const formRicetta = document.getElementById('formRicetta');
    const user = JSON.parse(localStorage.getItem('user'));

    formRicetta.addEventListener("submit", function (event){
        event.preventDefault();

        const titolo = document.getElementById('titolo').value;
        const ingredienti = document.getElementById('ingredienti').value;
        const istruzioni = document.getElementById('istruzioni').value;
        const urlImmagine = document.getElementById('urlImmagine').value;

        const newRicetta = {
            titolo: titolo,
            ingredienti: ingredienti,
            istruzioni: istruzioni,
            urlImmagine: urlImmagine,
            utente:{
                id: user.id,
                nome: user.nome,
                cognome: user.gognome,
                email: user.email,
                password: user.password,
                foto: user.foto,
                data: user.data,

            }
        };

        const formData = new FormData(formRicetta);

        fetch("http://localhost:8080/api/ricette", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newRicetta)
            // body: newRicetta,
        })
        .then(response => response.json())
        .then(data =>{
            console.log('Risposta al servere: ', data);
            if(data.success){
                console.log('Ricetta caricata con successo', data);
                alert('Ricetta caricata con successo');
            }else{
                console.log('Else', data);
                console.error("caricamento fallito.");
                    alert("caricamento fallito.");
                    formRicetta.innerHTML='';
            }
        })
        .catch(error => {
            console.error("Errore nella richiesta di caricamento:", error);
        });
    })
})
