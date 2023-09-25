// Importa il pacchetto Socket.IO
const io = require('socket.io-client');

// Connessione al server Socket.IO
const socket = io('http://localhost:8080'); // Sostituisci con l'URL del tuo server

// Gestisci l'evento di connessione
socket.on('connect', () => {
  console.log('Connesso al server Socket.IO');
});

// Gestisci altri eventi ricevuti dal server
socket.on('message', (data) => {
  console.log('Messaggio ricevuto:', data);
});

// Invia messaggi al server
socket.emit('message', 'Ciao server, sono il client!');
