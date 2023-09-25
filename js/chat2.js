document.addEventListener('DOMContentLoaded', function () {

    const user = JSON.parse(localStorage.getItem('user'));

    fetch('http://localhost/api/chat')
    .then(response => response.json())
    .then(data => {
        const chatContainer = document.querySelector('.chat-container')

        data.forEach(message => {
            const usrList = document.querySelector('.user-list');
            const chatWindow = document.querySelector('.chat-window');
            const chatHeader = document.querySelector('.chat-header');
            const chatMessages = document.querySelector('.chat-messages');
            const messagesInput = document.querySelector('#messages-input');
            const buttonMessage = document.querySelector('#send-buttob');
            
            
        });
    })
})