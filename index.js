const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
let past_messages = [
  {"author":"tester","content":"dasd"},
  {"author":"tester","content":"dsa"},
  {"author":"tester","content":"aa"},
  {"author":"tester","content":"a"},
  {"author":"tester","content":"a"},
  {"author":"tester","content":"a"},
  {"author":"tester","content":"aa"},
  {"author":"tester","content":"a"},
  {"author":"tester","content":"a"},
  {"author":"tester","content":"a"},
  {"author":"tester","content":"a"},
  {"author":"tester","content":"a"},
  {"author":"tester","content":"a"},
  {"author":"tester","content":"a"},
  {"author":"tester","content":"aa"},
  {"author":"tester","content":"dfa"},
  {"author":"tester","content":"f"},
  {"author":"tester","content":"faka"}
]

past_messages = [];

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('dont test me');
});

app.get('/chat', (req, res) => {
  res.sendFile(__dirname + '/html/chat.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/html/login.html');
});

io.on('connection', (socket) => {
  console.log('a user connected from the ip: ' + socket.handshake.address);
  for (msg of past_messages) 
    socket.emit('chat_message', JSON.stringify(msg));
  io.emit("chat_message", JSON.stringify({ author: "System", content: "Someone just entered the chat" }))

  socket.on('send_chat_message', (message) => {
    console.log(message);
    message_json = JSON.parse(message)
    if (message_json.author.toLowerCase() != "system") {
      past_messages.push(message_json)
      io.emit('chat_message', message);
      // socket.emit('chat_message_confirmed', message)
    }
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log('listening on http://localhost:3000');
  console.log('open on http://localhost:3000/chat?username=tester');
});