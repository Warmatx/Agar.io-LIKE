var socket;

function setup() {
  createCanvas(400, 400);
  background(51);
  
  socket = io('http://127.0.0.1:3000');
  socket.on('display', (data) => {
    background(51);
    let current = data.players.find(elt => {
      return elt.id == socket.id;
    })
    push();
    translate(400 / 2 - current.x, 400 / 2 - current.y);
    
    for(let i = data.foods.length - 1; i >= 0; i--) {
      noStroke();
      ellipseMode(CENTER);
      fill(data.foods[i].r, data.foods[i].g, data.foods[i].b);
      ellipse(data.foods[i].x, data.foods[i].y, data.foods[i].size);
    }

    data.players.map(elt => {
      if(elt.id != socket.id) {
        noStroke();
        ellipseMode(CENTER);
        fill(elt.r, elt.g, elt.b);
        ellipse(elt.x, elt.y, elt.size);

      } else {
        noStroke();
        ellipseMode(CENTER);
        fill(elt.r, elt.g, elt.b);
        ellipse(elt.x, elt.y, elt.size);
      }
    })
    pop();
  });
}


function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    let data = {
      'id': socket.id,
      'direction': 4
    };
    socket.emit('direction', data);
  } else if (keyCode === RIGHT_ARROW) {
    let data = {
      'id': socket.id,
      'direction': 2
    };
    socket.emit('direction', data);
    
  }else if (keyCode === UP_ARROW) {
    let data = {
      'id': socket.id,
      'direction': 1
    };
    socket.emit('direction', data);
    
  }else if (keyCode === DOWN_ARROW) {
    let data = {
      'id': socket.id,
      'direction': 3
    };
    socket.emit('direction', data);
  }
}

function keyReleased() {
  data = {
    'id': socket.id,
    'direction': -1
  };
  socket.emit('direction', data);
}
