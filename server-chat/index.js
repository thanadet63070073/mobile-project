const express = require('express');
const cors = require('cors');
const http = require("http");
const {Server} = require("socket.io");



const app = express();
app.use(cors())

const server = http.createServer(app);

const io = new Server(server, {
  cors:{
    origin: ["exp://localhost:19000","http://localhost:19006"],
    methods: ("GET", "POST"),
  },
});

io.on("connection", (socket)=> {
  console.log(`User Connected: ${socket.id}`);
  
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`)
  })

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    console.log(data)
  })

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

server.listen(3001, () => {
  console.log("SERVER RUNING");
});