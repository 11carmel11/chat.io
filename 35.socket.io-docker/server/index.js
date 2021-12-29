//#region DB
const logged = [];
const connections = [];
//#endregion
const app = require("express")();
app.post("/", (req, res) => {
  const { name } = req.query;
  logged.push(name);
  res.sendStatus(201);
});
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  const index = connections.push(socket.id) - 1;

  connections.forEach((id) => {
    if (id !== socket.id) {
      io.to(id).emit("joined", logged[index]);
    }
  });

  io.emit("loggedList", logged);

  socket.on("message", ({ name, message }) => {
    if (!message || !name) return;
    io.emit("messageBack", { name, message });
  });

  socket.on("disconnect", () => {
    connections.splice(index, 1);
    const leaving = logged.splice(index, 1);
    io.emit("loggedList", logged);
    io.emit("disconnected", leaving[0]);
  });
});

http.listen(4000, () => {
  console.log("listening on port 4000");
});
