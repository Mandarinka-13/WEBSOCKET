const chatbox = document.getElementById('chatbox');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

const ws = new WebSocket('ws//localhost:8080');

ws.onopen = () => {
    console.log('Connected to WebSocket');
};

ws.onmessage = event => {
    const message = event.data;
    displayMessage(message);
};

ws.onclose = () => {
    console.log('Disconnected from WebSocket');
};

ws.onerror = error => {
    console.log('WebSocket error:', error);
};

function displayMessage(message) {
    const newMessage = document.createElement('p');
    newMessage.textContent = message;
    chatbox.appendChild(newMessage);
    chatbox.scrollTop = chatbox.scrollHeight;
};

sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keyup', event => {
    if (event.key === 'Enter'){
        sendMessage();
    }
});

function sendMessage(){
    const message = messageInput.value;
    if (message.trim() !== ''){
        messageInput.value = '';
        displayMessage("Я:" + message);
    }
};

var wsSend = function(data) {
    if(!ws.readyState){
        setTimeout(function (){
            wsSend(data);
        },100);
    }else{
        ws.send(data);
    }
};