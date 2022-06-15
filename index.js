'use strict'

var blessed = require('blessed')
  , program = blessed.program();

let xa = 21
let xab = 7
let b = 0
let ya = 7
let gameBoard = []
let currentGame;
let retryBoard = []
let posibility = [0]
let xy = [7, 7]

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

screen.on('keypress', function (data, key) {
  if (key.name === 'q') {
    program.clear();
    program.disableMouse();
    program.showCursor();
    program.normalBuffer();
    process.exit(0);
  }
  if (key.name === 'f' && checkWin() === 0) {
    if (gameBoard[ya][xab] == "#") {
      gameBoard[ya][xab] = "o"
      AI();

    }
    checkWin()
  }
  if (key.name === 'w' && checkWin() === 0) {
    if (ya >= 0) {
      ya = ya - 1
    }
    else {
      ya = 0
    }
    program.move(xa, ya)
  }
  if (key.name === 's' && checkWin() === 0) {
    if (ya >= 0) {
      ya = ya + 1
    }
    else {
      ya = 0
    }
    program.move(xa, ya)
  }
  if (key.name === 'a' && checkWin() === 0) {
    if (xa >= 0) {
      xa = xa - 3
    }
    else {
      xa = 0
    }
    program.move(xa, ya)
    xab = xa / 3
  }
  if (key.name === 'd' && checkWin() === 0) {
    if (xa >= 0) {
      xa = xa + 3
    }
    else {
      xa = 0
    }
    program.move(xa, ya)
    xab = xa / 3
  }
});

screen.key(['escape', 'q', 'C-c'], function (ch, key) {
  return process.exit(0);
});

function makeMainList() {
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
  retryBoard = gameBoard
};

function checkWin() {
  let winPoints = 0
  let winPointsAI = 0
  if ((xab < 12) && (ya < 12)) {
    for (let n = 0; n < 5; n++) {
      if (gameBoard[ya + n][xab + n] === 'o') {

        winPoints = winPoints + 1
        if (winPoints === 5) {
          return 1
        }
      }
    }
  }
  winPoints = 0
  if ((xab < 12) && (ya > 3)) {
    for (let n = 0; n < 5; n++) {
      if (gameBoard[ya - n][xab + n] === 'o') {
        winPoints++
        if (winPoints === 5) {
          return 1
        }
      }
    }
  }
  winPoints = 0
  if ((xab > 3) && (ya > 3)) {
    for (let n = 0; n < 5; n++) {
      if (gameBoard[ya - n][xab - n] === 'o') {
        winPoints++
        if (winPoints === 5) {
          return 1
        }
      }
    }
  }
  winPoints = 0
  if ((xab > 3) && ya < 12) {
    for (let n = 0; n < 5; n++) {
      if (gameBoard[ya + n][xab - n] === 'o') {
        winPoints++
        if (winPoints === 5) {
          return 1
        }
      }
    }
  }
  winPoints = 0
  if (xab > 3) {
    for (let n = 0; n < 5; n++) {
      if (gameBoard[ya][xab - n] === 'o') {
        winPoints++
        if (winPoints === 5) {
          return 1
        }
      }
    }
  }
  winPoints = 0
  if (xab < 12) {
    for (let n = 0; n < 5; n++) {
      if (gameBoard[ya][xab + n] === 'o') {
        winPoints++
        if (winPoints === 5) {
          return 1
        }
      }
    }
  }
  winPoints = 0
  if (ya > 3) {
    for (let n = 0; n < 5; n++) {
      if (gameBoard[ya - n][xab] === 'o') {
        winPoints++
        if (winPoints === 5) {
          return 1
        }
      }
    }
  }
  winPoints = 0
  if (ya < 12) {
    for (let n = 0; n < 5; n++) {
      if (gameBoard[ya + n][xab] === 'o') {
        winPoints++
        if (winPoints === 5) {
          return 1
        }
      }
    }
  }
  winPoints = 0
  return 0
}

function check() {
  if (posibility[0] >= posibility[1]) {
    posibility.pop();
    xy.pop();
    xy.pop();
  }
  else {
    posibility.splice(0, 1);
    xy.splice(0, 2);
  }
}

function checkWinAI() {

  let p = 0
  for (let q = 0; q < 15; q++) {
    for (let w = 0; w < 15; w++) {
      if ((w < 11) && (q < 11)) {
        for (let n = 0; n < 5; n++) {
          if (gameBoard[q + n][w + n] === 'x' && gameBoard[q][w] === 'x') {
            p++
            if (p === 5) { return 2 }
          }
        }
        p = 0
      }

      if ((w < 11) && (q > 3)) {
        for (let n = 0; n < 5; n++) {
          if (gameBoard[q - n][w + n] === 'x' && gameBoard[q][w] === 'x') {
            p++
            if (p === 5) { return 2 }
          }
        }
        p = 0
      }

      if ((w > 3) && (q > 3)) {
        for (let n = 0; n < 5; n++) {
          if (gameBoard[q - n][w - n] === 'x' && gameBoard[q][w] === 'x') {
            p++
            if (p === 5) { return 2 }
          }
        }
        p = 0
      }

      if ((w > 3) && q < 11) {
        for (let n = 0; n < 5; n++) {
          if (gameBoard[q + n][w - n] === 'x' && gameBoard[q][w] === 'x') {
            p++
            if (p === 5) { return 2 }
          }
        }
        p = 0
      }

      if (w > 3) {
        for (let n = 0; n < 5; n++) {
          if (gameBoard[q][w - n] === 'x' && gameBoard[q][w] === 'x') {
            p++
            if (p === 5) { return 2 }
          }
        }
        p = 0
      }

      if (w < 11) {
        for (let n = 0; n < 5; n++) {
          if (gameBoard[q][w + n] === 'x' && gameBoard[q][w] === 'x') {
            p++
            if (p === 5) { return 2 }
          }
        }
        p = 0
      }

      if (q > 3) {
        for (let n = 0; n < 5; n++) {
          if (gameBoard[q - n][w] === 'x' && gameBoard[q][w] === 'x') {
            p++
            if (p === 5) { return 2 }
          }
        }
        p = 0
      }

      if (q < 11) {
        for (let n = 0; n < 5; n++) {
          if (gameBoard[q + n][w] === 'x' && gameBoard[q][w] === 'x') {
            p++
            if (p === 5) { return 2 }
          }
        }
        p = 0
      }
    }
  }
  return 0
}

function AI() {

  let p = 0
  for (let q = 0; q < 15; q++) {
    for (let w = 0; w < 15; w++) {
      if ((w < 11) && (q < 11)) {
        for (let n = 0; n < 5; n++) {
          if (gameBoard[q + n][w + n] === 'x' && gameBoard[q][w] === '#' && gameBoard[q + 1][w + 1] === 'x') {
            p++
          }

        }
        xy.push(q, w)
        posibility.push(p)
        check(posibility, xy)
        p = 0
      }

      if ((w < 11) && (q > 3)) {
        for (let n = 0; n < 5; n++) {
          if (gameBoard[q - n][w + n] === 'x' && gameBoard[q][w] === '#' && gameBoard[q - 1][w + 1] === 'x') {
            p++
          }
        }
        xy.push(q, w)
        posibility.push(p)
        check(posibility, xy)
        p = 0
      }

      if ((w > 3) && (q > 3)) {
        for (let n = 0; n < 5; n++) {
          if (gameBoard[q - n][w - n] === 'x' && gameBoard[q][w] === '#' && gameBoard[q - 1][w - 1] === 'x') {
            p++
          }
        }
        xy.push(q, w)
        posibility.push(p)
        check(posibility, xy)
        p = 0
      }

      if ((w > 3) && q < 11) {
        for (let n = 0; n < 5; n++) {
          if (gameBoard[q + n][w - n] === 'x' && gameBoard[q][w] === '#' && gameBoard[q + 1][w - 1] === 'x') {
            p++
          }
        }
        xy.push(q, w)
        posibility.push(p)
        check(posibility, xy)
        p = 0
      }

      if (w > 3) {
        for (let n = 0; n < 5; n++) {
          if (gameBoard[q][w - n] === 'x' && gameBoard[q][w] === '#' && gameBoard[q][w - 1] === 'x') {
            p++
          }
        }
        xy.push(q, w)
        posibility.push(p)
        check(posibility, xy)
        p = 0
      }

      if (w < 11) {
        for (let n = 0; n < 5; n++) {
          if (gameBoard[q][w + n] === 'x' && gameBoard[q][w] === '#' && gameBoard[q][w + 1] === 'x') {
            p++
          }
        }
        xy.push(q, w)
        posibility.push(p)
        check(posibility, xy)
        p = 0
      }

      if (q > 3) {
        for (let n = 0; n < 5; n++) {
          if (gameBoard[q - n][w] === 'x' && gameBoard[q][w] === '#' && gameBoard[q - 1][w] === 'x') {
            p++
          }
        }
        xy.push(q, w)
        posibility.push(p)
        check(posibility, xy)
        p = 0
      }

      if (q < 11) {
        for (let n = 0; n < 5; n++) {
          if (gameBoard[q + n][w] === 'x' && gameBoard[q][w] === '#' && gameBoard[q + 1][w] === 'x') {
            p++
          }
        }
        xy.push(q, w)
        posibility.push(p)
        check(posibility, xy)
        p = 0
      }
    }
  }
  gameBoard[xy[0]][xy[1]] = "x"
  posibility = [0]
  xy = [0, 0]
}


box.key('r', function (ch, key) {
  screen.render();
  retry()
  screen.render();
});

function retry() {
  gameBoard = retryBoard
  checkWin()
  screen.render();
}

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
  program.move(7, 7);
  gameBoard[7][7] = "x"
}

main();

setInterval(() => {
  currentGame = gameBoard.slice(0);
  joinArray(currentGame);
  if (checkWin() === 0 && checkWinAI() === 0) {
    box.setContent(currentGame)
  }
  else if (checkWin() === 1) {
    box.setContent("you win!\nfor quit press \"q\".");
  }
  else if (checkWinAI() === 2) {
    box.setContent("you lose!\nfor quit press \"q\".");
  }
  screen.render();
}, 100)