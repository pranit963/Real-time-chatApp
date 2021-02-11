// Node server which will handle ichat socket io

// Assigning a module, socket.io is a server which attach to the instance of http and it listen the incoming event
const io = require('socket.io')(8000)

// For the users which are connected
const users = {};

// whenever there is a connection in socket, run the function
// io.on is an instance of socket.io which listen the event from many sockets
io.on('connection', socket =>{
    // Whenever there is something happen with particular connection then socket.on works
    // When socket.on sends user event then do this
    // when any new user joins, then let others know who join the server
    socket.on('new-user-joined', name1 =>{
        console.log('new user', name1)
        // when user event got by socket.io then set socket.id equals to name to users
        users[socket.id] = name1;
        // when new user joined accept current user then lets know everone that new-user joined
        socket.broadcast.emit('user-joined', name1);

    });

    // when anyone send the message then broadcast it to everyone
    socket.on('send', message =>{
        socket.broadcast.emit('recieve', {message: message, name1: users[socket.id]}) 
    });

    // If someone leaves the chat then let others know
    // disconnect is build in event, it wil fired when user leaves
    socket.on("disconnect", message =>{
        socket.broadcast.emit('left', users[socket.id])
        delete users[socket.id];
    });

});


