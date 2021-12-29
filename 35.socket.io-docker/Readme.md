## Socket Io

#### A socket is one endpoint of a two-way communication link between two programs running on the network

1. In programming, a socket is an endpoint of a communication between two programs running on a network.

2. Here to give a `real-time` solution:

3. what is a real time?

- Is it the user experience?
- Is it the way we update the information?

## Topics:

1. Socket io / client
2. Socket instance:

- Handshakes
- Rooms
- Data

3. Middlewares
4. Client Initialization
5. Emitting events
6. Listening to events
7. Broadcasting events

## Code sinps:

### server:

1. Working with socket

```
io.on("connection", (socket) => {
  console.log("New client connected");
    <!-- only to this connection -->
  socket.emit("message", "Welcome client");

    <!-- to all connections -->
  io.emit("new_client", "new client is connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    io.emit("client_disconnect", "client disconnect");
  });
});

```

### client:

```
const socket = socketIOClient(ENDPOINT);
    socket.on("message", (data) => {
      console.log(data);
    });

    socket.on("new_client", (data) => {
      console.log(data);
    });

    socket.on("client_disconnect", (data) => {
      console.log(data);
    });
```

## Reserved events:

- connect
- connect_error
- disconnect
- disconnecting
- newListener
- removeListener

## Good to know:

- [socket.io-admin](https://github.com/socketio/socket.io-admin-ui/)

## Resources:

- [You tube](https://www.youtube.com/watch?v=ZKEqqIO7n-k)
- [Socket.IO](https://socket.io/)
- [KataCoda course](https://www.katacoda.com/courses/docker)
- [dockerize full stack app](https://medium.com/mozilla-club-bbsr/dockerizing-a-mern-stack-web-application-ebf78babf136)
- [nodejs-docker](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)

#### Super resources:

- [building-node-app-docker](https://jdlm.info/articles/2019/09/06/lessons-building-node-app-docker.html)
- [Emit cheatsheet](https://socket.io/docs/v4/emit-cheatsheet/)

## Task:

### End goal - A chat app which is divided into two containers.

- One container will contain our server side
- Second container will contain our client side

### Requirements:

- The server will contain an array of all users currently logged in to chat.
- The server will notify all users of a user's login and logout.
- There will be a list on the chat side (frontend) which will contain the name / id of everyone who is currently logged in to the chat.
- When clicking on the name / id of a user who is currently logged in to the chat you will be given the option to send a specific message to that user only.
- Dockerize both of your directories (front and back)
- Add a `docker compose` file.
- Run your docker-compose.yml file and see that your full app is running.

### Bonus:

- Add a "typing ..." comment which will be sent to all online users when one of them types (it is recommended to add the name of the same person typing to the comment)
