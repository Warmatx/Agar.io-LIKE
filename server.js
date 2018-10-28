const express = require('express');
const socket = require('socket.io');
const Player = require('./class/player.js');
const Food = require('./class/food.js');

const hostname = '127.0.0.1';
const port = 3000;

let app = express();
let server = app.listen(port);
const io = socket(server);

// GAME VARIABLE
const speed = 5;
let players = [];
let foods = [];
const WIDTH    = 2000;
const HEIGHT   = 2000;
const NBR_FOOD = 500;
const GROW     = 5;

app.use(express.static('public'));

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  for( let i = 0; i < NBR_FOOD; i++) {
    foods.push(new Food(Math.random() * Math.floor(WIDTH), Math.random() * Math.floor(HEIGHT)))
  }
});


// SOCKET LISTENERS

io.sockets.on('connection', (socket) => {
  players.push(new Player( Math.random() * Math.floor(WIDTH), Math.random() * Math.floor(HEIGHT), socket.id));

  socket.on('disconnect', () => {
    players = players.filter(elt => (elt.id  != socket.id))
  })

  socket.on('direction', (data) => {
    players.map(elt => {
      if(elt.id == data.id) {
        elt.direction = data.direction;
      }
    })
  })
});

setInterval(() => {

  players.map(elt => {
    switch(elt.direction){
      case 1: {
        if(elt.y - speed > 0) { elt.y -= speed; };
        break;
      }
      case 2: {
        if(elt.x + speed < WIDTH) { elt.x += speed; };
        break;
      }
      case 3: {
        if(elt.y + speed < HEIGHT) { elt.y += speed; };
        break;
      }
      case 4: {
        if(elt.x - speed > 0) { elt.x -= speed; };
        break;
      }
    }
    foods.map((elt2, index) => {
      if (Math.sqrt((Math.pow((elt2.x - elt.x), 2)) + Math.pow((elt2.y - elt.y), 2)) < elt.size/2 + elt2.size/2) {
        foods.splice(index, 1);
        elt.size += GROW;
      }
    })
  })
  let data = {
    'players': players,
    'foods': foods
  }

  io.sockets.emit('display', data);
}, 1000 / 60);


