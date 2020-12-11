let ws = require('ws')
let url = require('url')

let wss = new ws.Server({ port: 8000 });

let config = {
    port: 8000,
    wshost: 'ws://localhost:8000'
}

/* With a real backend the connection with web socket server should happen after user login.
    For this test the client first connect to the server (without auth) and then it will register.
    A client can connect with or without user token:
    - without token => it must communicate its login attempt, and it's not still authenticated in this phase.
      After a successfull login the client will send a message with USER_WS_REGISTER type for real registration.
    - with token => user was still connected, but socket connection was closed (e.g for a browser refresh)
*/

// Array that contains authenticated clients; authentication is faked
let realUsers = []

wss.on('connection', (socket, request) => {
    const parsedUrl = url.parse(request.url);
    //Fake authentication: parsedUrl.query contains the token 
    if (parsedUrl.query) {
        const username = parsedUrl.pathname.slice(1);
        const token = parsedUrl.query.slice(6);
        // checking authentication using token
        realUsers.push(socket);
        console.log(`Users online: ${realUsers.length}`)
    }

    socket.on('close', () => {
        for( var i = 0; i < realUsers.length; i++){
            if ( realUsers[i] === socket) {
                realUsers.splice(i, 1); 
            }
        }
        console.log(`Users online: ${realUsers.length}`)
    })

    socket.on('message', (msg) => {
        try {
            msg = JSON.parse(msg)
        } catch (e) {
            return
        }
        
        switch (msg.type) {
            case 'USER_WS_REGISTER':
            //Fake authentication: after successful login the client sent user data (including token for checking authorization)
            // and it's saved as authenticated user
                realUsers.push(socket);
                console.log(`Users online: ${realUsers.length}`)
                break
            case 'USER_LOGIN_REQUEST':
            //On login attempt ONLY real Users receive a notification
                wss.clients.forEach(function each(client) {
                    if (client !== socket && client.readyState === ws.OPEN && realUsers.includes(client)) {
                        client.send(JSON.stringify(msg));
                    }
                });
                break
            default:
                console.log("Unhandled message..")
        }
    })

})

wss.on('error', err => console.error(err))