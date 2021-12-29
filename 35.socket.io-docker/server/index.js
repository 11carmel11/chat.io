const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  socket.on("message", ({ name, message }) => {
    io.emit("messageBack", { name, message });
  });

  socket.on("disconnect", () => {
    io.emit("messageBack", { name: "wow", message: "render" });
  });
});

http.listen(4000, () => {
  console.log("listening on port 4000");
});
