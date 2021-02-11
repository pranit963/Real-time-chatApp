// const { appendFile } = require("fs")

// var http = require('https');
const socket = io('http://localhost:8000')

// Get dom elements in respective js variables
const form = document.getElementById('container-send')
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")

// Audio that will play on recieving message
const audio = new Audio('iphone.mp3')

// Function that will append event to the container
const append = (message , position) =>{
    const messageElement = document.createElement('div')
    messageElement.innerHTML = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
     audio.play();
    }
   
}


// Ask new user for his name and let the server know
const name1 = prompt("enter your name to join")
socket.emit('new-user-joined', name1)

// If new user join, then recieve his name from the server
socket.on('user-joined', name1 =>{
    append(`${name1} joined the chat` ,'right')
})


// If server sends a message, receive it
socket.on('recieve', data =>{
    append(`${data.name1}:${data.message}` ,'left')
})

// If user leave the chat append the info to the container
socket.on('left', name1 =>{
    append(`${name1}:leave the chat` ,'left')
})


// If the form get submitted, then send message to
form.addEventListener('submit', (e)=>{
    // This will not reload the page
    e.preventDefault();
    const message = messageInput.value;
    socket.emit('send', message)
    append(`you:${message}`, 'right')
    messageInput.value = ''
})