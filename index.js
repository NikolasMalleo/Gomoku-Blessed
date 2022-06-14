'use strict'

var blessed = require('blessed')
, program = blessed.program();

let xa = 0
let ya = 0
let b = 0
let gameBoard = []
let currentGame;

const screen = blessed.screen({
  fastCSR: true
});

const box = blessed.box({
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  content: ' 0 \n  0',
  tags: true,
  style: {
    fg: 'white',
    bg: 'black'
  }
});

screen.append(box);

screen.on('keypress', function(data, key) {
  if (key.name === 'q') {
    program.clear();
    program.disableMouse();
    program.showCursor();
    program.normalBuffer();
    process.exit(0);
  }
  if (key.name === 'c') {
    program.write(gameBoard.length)
  }
  if (key.name === 'f'){
    if (gameBoard[ya][xa/3] == "#"){
      if (b == 0){
        gameBoard[ya][xa/3] = "o"
      b = 1
    }
      else if (b == 1){
        gameBoard[ya][xa/3] = "x"
        b = 0      
      }
    }
  }
  if (key.name === 'w') {
    if (ya >= 0){
      ya = ya - 1
    }
    else {
      ya = 0
    }
    program.move(xa, ya)
  }
  if (key.name === 's') {
    if (ya >= 0){
    ya = ya + 1
    }
    else {
      ya = 0
    }
    program.move(xa, ya)
  }
  if (key.name === 'a') {
    if (xa >= 0){
    xa = xa - 3
    }
    else {
      xa = 0
    }
    program.move(xa, ya)
  }
  if (key.name === 'd') {
    if (xa >= 0){
    xa = xa + 3
    }
    else {
      xa = 0
    }
    program.move(xa, ya)
  }
});

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

function makeMainList(){
  for (let x = 0; x < 15; x++) {
    let tempArray = [];
    for (let y = 0; y < 16; y++) {
      if (y === 15) {
        tempArray.push('\n');
      } else {
      tempArray.push('#');
     }
    }
    gameBoard.push(tempArray);
  }
};


box.key('enter', function(ch, key) {
  screen.render();
  box.setContent(currentGame)
  screen.render();
});

const joinArray = (board) => {
  for (let x = 0; x < board.length; x++) {
    board[x] = board[x].join('  ');
  }
  currentGame = board.join('');
}

const main = () => {
  makeMainList();
  screen.render();
  currentGame = gameBoard.slice(0);
  program.move(0, 0);
}

main();

setInterval(() => {
  currentGame = gameBoard.slice(0);
  joinArray(currentGame);
  if (win == 0){  
    box.setContent(currentGame);
  }
  screen.render();
},100)