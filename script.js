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

  const checkGameState = () => {
    if (gameEnd != 0) {
      return gameEnd;
    }
    let f = 2; //default state "draw"
    for (let row of board) {
      //if even 1 cell is empty, it's no longer a draw, so set to 0
      for (let cell of row) {
        if (cell === "") {
          f = 0;
        }
      }
    }
    for (let i = 0; i < board.length; i++) {
      //check for a win
      if (
        [board[i][0], board[i][1], board[i][2]].every(
          (value, i, arr) => value === arr[i][0]
        ) ||
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
    gameEnd = f;
    return f;
  };

  const mark = (x, y, sign) => {
    if (board[x][y] == "" && gameEnd === 0) {
      board[x][y] = sign;
      checkGameState();
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
  return { reset, mark, /*display,*/ getBoard, checkGameState };
}
function gameController() {
  let playerOne, playerTwo, currentPlayer;
  playerTwo = playerFactory("O");
  playerOne = playerFactory("X");
  currentPlayer = playerOne;

  let gameboard = gameboardFactory();
  gameboard.reset();

  const switchPlayer = () => {
    currentPlayer = currentPlayer == playerOne ? playerTwo : playerOne;
  };

  const playTurn = (x, y) => {
    let gameState = 0;
    gameboard.mark(x, y, currentPlayer.getSign);
    gameState = gameboard.checkGameState();
    if (gameState == 1) {
      currentPlayer.addWin();
      return gameState;
    } else if (gameState == 2) {
      return gameState;
    }
    switchPlayer();
    return gameState;
  };
  const resetGame = (playerOneSign, playerTwoSign) => {
    playerOne = playerFactory(playerOneSign);
    playerTwo = playerFactory(playerTwoSign);
    gameboard.reset();
  };
}
function screenController() {}

let gameboard;
gameboard = gameboardFactory();
gameboard.reset();
