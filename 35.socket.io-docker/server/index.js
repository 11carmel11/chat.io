//#region DB
const logged = [];
const connections = [];
const combined = [];
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

  combined.push({ name: logged[index], id: socket.id });

  connections.forEach((id) => {
    if (id !== socket.id) {
      io.to(id).emit("joined", logged[index]);
    }
  });

  io.emit("loggedList", combined);

  socket.on("message", ({ name, message, address }) => {
    if (!message || !name) return;

    if (address.id) {
      const relevantId = connections[logged.indexOf(address.name)];
      io.to(relevantId).emit("messageBack", { name, message, direct: true });
    } else {
      io.emit("messageBack", { name, message, direct: false });
    }
  });

  socket.on("disconnect", () => {
    connections.splice(index, 1);
    combined.splice(index, 1);
    const leaving = logged.splice(index, 1);
    io.emit("loggedList", combined);
    io.emit("disconnected", leaving[0]);
  });
});

http.listen(4000, () => {
  console.log("listening on port 4000");
});
