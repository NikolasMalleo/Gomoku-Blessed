//'use strict'

var blessed = require('blessed')
  , program = blessed.program();

let xa = 0
let xab = 0
let b = 0
let ya = 0
let gameBoard = []
let currentGame;
let retryBoard = []
let posibility = [0]
let xy = [0, 0]
let j = "_"
let ax = "\033[33mx\033[0m"
let ao = "\033[34mo\033[0m"


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
  if (key.name === 'f') {
    if (xab > 0 && ya > 0 && xab < 15 && ya < 15)
    {if (gameBoard[ya][xab] == j && checkWin() === 0) {
      gameBoard[ya][xab] = ao
      AI();
      checkWin()
    }}
  }
  if (key.name === 'g') {
    if (ax === "\033[33mx\033[0m"){
      ax = "\033[34mo\033[0m"
      ao = "\033[33mx\033[0m"
    }
    else if (ax === "\033[34mo\033[0m"){
      ax = "\033[33mx\033[0m"
      ao = "\033[34mo\033[0m"
    }
    retry()
  }
  if (key.name === 'w') {
    if (ya >= 0) {
      ya = ya - 1
    }
    else {
      ya = 0
    }
    program.move(xa, ya)
  }
  if (key.name === 's') {
    if (ya >= 0) {
      ya = ya + 1
    }
    else {
      ya = 0
    }
    program.move(xa, ya)
  }
  if (key.name === 'a') {
    if (xa >= 0) {
      xa = xa - 3
    }
    else {
      xa = 0
    }
    program.move(xa, ya)
    xab = xa / 3
  }
  if (key.name === 'd') {
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

function makeMainList(gameBoard) {
  for (let x = 0; x < 15; x++) {
    let tempArray = [];
    for (let y = 0; y < 16; y++) {
      if (y === 15) {
        tempArray.push('\n');
      }
      else {
        tempArray.push(j);
      }
    }
    gameBoard.push(tempArray);
  }
};

function checkWin() {
  let winPoints = 0
  if (xab > 0 && ya > 0 && xab < 15 && ya < 15)
  {  
  if ((xab < 12) && (ya < 12)) {
    for (let n = 0; n < 5; n++) {
      if (gameBoard[ya + n][xab + n] === ao) {

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
      if (gameBoard[ya - n][xab + n] === ao) {
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
      if (gameBoard[ya - n][xab - n] === ao) {
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
      if (gameBoard[ya + n][xab - n] === ao) {
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
      if (gameBoard[ya][xab - n] === ao) {
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
      if (gameBoard[ya][xab + n] === ao) {
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
      if (gameBoard[ya - n][xab] === ao) {
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
      if (gameBoard[ya + n][xab] === ao) {
        winPoints++
        if (winPoints === 5) {
          return 1
        }
      }
    }
  }
  winPoints = 0}
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
          if (gameBoard[q + n][w + n] === ax && gameBoard[q][w] === ax) {
            p++
            if (p === 5) { return 2 }
          }
        }
        p = 0
      }

      if ((w < 11) && (q > 3)) {
        for (let n = 0; n < 5; n++) {
          if (gameBoard[q - n][w + n] === ax && gameBoard[q][w] === ax) {
            p++
            if (p === 5) { return 2 }
          }
        }
        p = 0
      }

      if ((w > 3) && (q > 3)) {
        for (let n = 0; n < 5; n++) {
          if (gameBoard[q - n][w - n] === ax && gameBoard[q][w] === ax) {
            p++
            if (p === 5) { return 2 }
          }
        }
        p = 0
      }

      if ((w > 3) && q < 11) {
        for (let n = 0; n < 5; n++) {
          if (gameBoard[q + n][w - n] === ax && gameBoard[q][w] === ax) {
            p++
            if (p === 5) { return 2 }
          }
        }
        p = 0
      }

      if (w > 3) {
        for (let n = 0; n < 5; n++) {
          if (gameBoard[q][w - n] === ax && gameBoard[q][w] === ax) {
            p++
            if (p === 5) { return 2 }
          }
        }
        p = 0
      }

      if (w < 11) {
        for (let n = 0; n < 5; n++) {
          if (gameBoard[q][w + n] === ax && gameBoard[q][w] === ax) {
            p++
            if (p === 5) { return 2 }
          }
        }
        p = 0
      }

      if (q > 3) {
        for (let n = 0; n < 5; n++) {
          if (gameBoard[q - n][w] === ax && gameBoard[q][w] === ax) {
            p++
            if (p === 5) { return 2 }
          }
        }
        p = 0
      }

      if (q < 11) {
        for (let n = 0; n < 5; n++) {
          if (gameBoard[q + n][w] === ax && gameBoard[q][w] === ax) {
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
          if (gameBoard[q + n][w + n] === ax && gameBoard[q][w] === j && gameBoard[q + 1][w + 1] === ax) {
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
          if (gameBoard[q - n][w + n] === ax && gameBoard[q][w] === j && gameBoard[q - 1][w + 1] === ax) {
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
          if (gameBoard[q - n][w - n] === ax && gameBoard[q][w] === j && gameBoard[q - 1][w - 1] === ax) {
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
          if (gameBoard[q + n][w - n] === ax && gameBoard[q][w] === j && gameBoard[q + 1][w - 1] === ax) {
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
          if (gameBoard[q][w - n] === ax && gameBoard[q][w] === j && gameBoard[q][w - 1] === ax) {
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
          if (gameBoard[q][w + n] === ax && gameBoard[q][w] === j && gameBoard[q][w + 1] === ax) {
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
          if (gameBoard[q - n][w] === ax && gameBoard[q][w] === j && gameBoard[q - 1][w] === ax) {
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
          if (gameBoard[q + n][w] === ax && gameBoard[q][w] === j && gameBoard[q + 1][w] === ax) {
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
  gameBoard[xy[0]][xy[1]] = ax
  posibility = [0]
  xy = [0, 0]
}


box.key('r', function (ch, key) {
  screen.render();
  retry()
  screen.render();
});

function retry() {
  gameBoard = []
  makeMainList(gameBoard);
  screen.render();
  currentGame = gameBoard.slice(0);
  gameBoard[7][7] = ax
}

const joinArray = (board) => {
  for (let x = 0; x < board.length; x++) {
    board[x] = board[x].join('  ');
  }
  currentGame = board.join('');
}



function main() {
  makeMainList(gameBoard);
  screen.render();
  currentGame = gameBoard.slice(0);
  gameBoard[7][7] = ax
}

main()


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