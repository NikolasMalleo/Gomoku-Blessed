'use strict'

var blessed = require('blessed')
, program = blessed.program();

let xa = 0
let xab = 0
let b = 0
let ya = 0
let check = 0
let gameBoard = []
let currentGame;
let win = 0

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
    if (gameBoard[ya][xab] == "#"){
      if (b == 0){
        gameBoard[ya][xab] = "o"
      b = 0
    }
      else if (b == 1){
        gameBoard[ya][xab] = "x"
        b = 0      
      }
    }
    check = checkWin()
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
    xab = xa/3
  }
  if (key.name === 'd') {
    if (xa >= 0){
    xa = xa + 3
    }
    else {
      xa = 0
    }
    program.move(xa, ya)
    xab = xa/3
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
      } 
      else {
      tempArray.push('#');
      }
    }
    gameBoard.push(tempArray);
  }
};

function checkWin(){
  let winPoints = 0
  let winPointsAI = 0
  if ((xab < 12) && (ya < 12)){
    for (let n = 0; n < 5; n++){
      if (gameBoard[ya + n][xab + n] === 'o')  {
        
        winPoints = winPoints + 1
        if (winPoints === 5){
          return 1
        }
        else if (gameBoard[ya+n][xab+n] === 'x'){
          winPointsAI ++
          if (winPointsAI === 5){
            return 2
          }
        }
      }
    }
  }
  winPoints = 0
  winPointsAI = 0

  if ((xab < 12) && (ya > 3)){
    for (let n = 0; n < 5; n++){
        if (gameBoard[ya-n][xab+n] === 'o')  {              
        winPoints ++
        if (winPoints === 5){
           return 1
        }
      }
      else if (gameBoard[ya-n][xab+n] === 'x'){
        winPointsAI ++
        if (winPointsAI === 5){
          return 2
        }
      }
    }
  }
  winPoints = 0
  winPointsAI = 0
    

  if ((xab > 3) && (ya > 3)){
    for (let n = 0; n < 5; n++){ 
      if (gameBoard[ya-n][xab-n] === 'o')  {                
        winPoints ++
        if (winPoints === 5){
           return 1
        }
        else if (gameBoard[ya-n][xab-n] === 'x'){
          winPointsAI ++
          if (winPointsAI === 5){
            return 2
          }
        }
      }
    }
  }
  winPoints = 0
  winPointsAI = 0
  if ((xab > 3) && ya < 12){
    for (let n = 0; n < 5; n++){
      if (gameBoard[ya+n][xab-n] === 'o')  {              
        winPoints ++
        if (winPoints === 5){
           return 1
        }
        else if (gameBoard[ya+n][xab-n] === 'x'){
          winPointsAI ++
          if (winPointsAI === 5){
            return 2
          }
        }
      }
    }
  }
  winPoints = 0
  winPointsAI = 0
  return 0
}

  


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
  if (checkWin() === 0){
    box.setContent(currentGame)}
  else if (checkWin() === 1){
    box.setContent("you win");
  }
  //program.write('Mouse wheel up at: ' + ya + ', ' + xab)
  screen.render();
},100)