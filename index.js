var blessed = require('blessed')
  , program = blessed.program();

process.title = 'blessed';

x = 0
y = 0
let GameBoard = []


program.on('keypress', function(data, key) {
  if (key.name === 'q') {
    program.clear();
    program.disableMouse();
    program.showCursor();
    program.normalBuffer();
    process.exit(0);
  }
  if (key.name === 'c') {
    program.write(x + " " + y)
  }
  if (key.name === 'w') {
    if (y >= 0){
      y = y - 1
    }
    else {
      y = 0
    }
    program.move(x, y)
  }
  if (key.name === 's') {
    if (y >= 0){
    y = y + 1
    }
    else {
      y = 0
    }
    program.move(x, y)
  }
  if (key.name === 'a') {
    if (x >= 0){
    x = x - 1
    }
    else {
      x = 0
    }
    program.move(x, y)
  }
  if (key.name === 'd') {
    if (x >= 0){
    x = x + 1
    }
    else {
      x = 0
    }
    program.move(x, y)
  }
});

function makeMainList(){
  for (let x = 0; x < 15; x++) {
    let tempArray = [];
    for (let y = 0; y < 15; y++) {
      if (y === 16) {
        tempArray.push('\n');
      } else {
      tempArray.push(' ');
     }
    }
    GameBoard.push(tempArray);
  }
 };

 makeMainList()
 program.clear();
 console.log(GameBoard[0].length);

