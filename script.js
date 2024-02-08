function playerFactory(choice) {
  let wins, sign;
  let winDisplay;
  wins = 0;
  sign = choice;
  //winDisplay = document.querySelector(`.${sign} .winCount`); ////---------------------------------------------------------------------------------screen controller
  const getSign = () => {
    return sign;
  };
  const addWin = () => {
    wins++;
    winDisplay.textContent = wins;
    return wins;
  };
  return { getSign, addWin };
}

function gameboardFactory() {
  let board = [];
  let gameEnd = 0; //0 game in progress, 1 game won, 2 game draw
  const reset = () => {
    board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    gameEnd = 0;
    return;
  };
  const check = () => {
    let f = 2; //default state "draw"
    (function checkNotADraw() {
      //if even 1 cell is empty, it's no longer a draw, so set to 0
      for (let row of board) {
        for (let cell of row) {
          if (cell === "") {
            f = 0;
          }
        }
      }
    })();
    (function checkWin() {
      for (let i = 0; i < board.length; i++) {
        //if someone won set to 1
        if (
          [board[i][0], board[i][1], board[i][2]].every(
            (value, i, arr) => value === arr[i][0]
          )
        ) {
          f = 1;
        }
        if (
          [board[0][i], board[1][i], board[2][i]].every(
            (value, i, arr) => value === arr[0][i]
          )
        ) {
          f = 1;
        }
        if (
          [board[0][2], board[1][1], board[2][0]].every(
            (value, i, arr) => value === arr[0][2]
          ) ||
          [board[0][0], board[1][1], board[2][2]].every(
            (value, i, arr) => value === arr[0][0]
          )
        ) {
          f = 1;
        }
      }
    })();
    if (f == 1) {
      //win
      currentPlayer.addWin();
      gameEnd = 1;
    } else if (f == 2) {
      //draw
      gameEnd = 2;
    }
    return f;
  };
  const mark = (x, y) => {
    if (board[x][y] == "" && gameEnd === 0) {
      board[x][y] = currentPlayer.getSign();
      check();
      currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;
    }
  };
  const display = () => {
    let oldCont = document.querySelector(".boardContainer");
    let newCont = document.createElement("div");
    let elem;
    for (let row of board) {
      for (let cell of row) {
        elem = document.createElement("div");
        elem.classList.add("cell");
        elem.textContent = cell;
        newCont.appendChild(elem);
      }
    }
    oldCont.innerHTML = newCont.innerHTML;
    let cells;
    cells = document.querySelectorAll(".cell");
    for (let row in board) {
      for (let cell in board) {
        let currIndex = +row * 3 + +cell;
        cells[currIndex].addEventListener("click", (e) => {
          mark(+row, +cell);
        });
      }
    }
  };
  const getBoard = () => {
    return board;
  };
  return { reset, mark, display, getBoard };
}
function gameController(gameboard) {
  gameboard.reset();
}
function screenController() {}

let playerOne, playerTwo, currentPlayer;
playerTwo = playerFactory("O");
playerOne = playerFactory("X");
currentPlayer = playerOne;

let gameboard;
gameboard = gameboardFactory();
gameboard.reset();
