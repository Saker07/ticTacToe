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
    //  winDisplay.textContent = wins;
    return wins;
  };
  const getWins = () => {
    return wins;
  };
  return { getSign, addWin, getWins };
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
          (value, index, arr) => value === arr[0] && value != ""
        ) ||
        [board[0][i], board[1][i], board[2][i]].every(
          (value, index, arr) => value === arr[0] && value != ""
        )
      ) {
        f = 1;
      }
      if (
        [board[0][2], board[1][1], board[2][0]].every(
          (value, index, arr) => value === arr[0] && value != ""
        ) ||
        [board[0][0], board[1][1], board[2][2]].every(
          (value, index, arr) => value === arr[0] && value != ""
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
      return 1;
    } else {
      return null;
    }
  };

  const getBoard = () => {
    return board;
  };
  return { reset, mark, /*display,*/ getBoard, checkGameState };
}
function gameController() {
  let currentPlayer;
  let playerOne = playerFactory("X");
  let playerTwo = playerFactory("O");
  currentPlayer = switchPlayer();
  let gameboard = gameboardFactory();
  resetGame("X", "O");

  function switchPlayer() {
    currentPlayer = currentPlayer == playerOne ? playerTwo : playerOne;
  }

  function playTurn(x, y) {
    let gameState = 0;
    let marked = gameboard.mark(x, y, currentPlayer.getSign());
    gameState = gameboard.checkGameState();
    if (gameState == 1 && marked) {
      currentPlayer.addWin();
    } else if (marked) {
      switchPlayer();
    }
    return {
      board: gameboard.getBoard(),
      gameState: gameState,
    };
  }

  function resetGame() {
    gameboard.reset();
    switchPlayer();
    return {
      board: gameboard.getBoard(),
      gameState: gameboard.checkGameState(),
    };
  }
  function getScore() {
    return {
      playerOne: playerOne.getWins(),
      playerTwo: playerTwo.getWins(),
    };
  }

  function getCurrentPlayer() {
    return currentPlayer;
  }
  const getGameState = () => {
    return { board: gameboard.getBoard(), gameState: gameboard.checkGameState };
  };
  return { getCurrentPlayer, resetGame, playTurn, getScore, getGameState };
}
function screenController() {
  //to add handler to input player signs, and function to show game wins, and function to show round/match end and result, also match reset.
  let game = gameController();

  const displayT = () => {
    let boardContainer = document.querySelector(".boardContainer");
    let board = game.getGameState().board;
    boardContainer.innerHTML = "";
    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
      for (let colIndex = 0; colIndex < board[rowIndex].length; colIndex++) {
        let elem = document.createElement("button");
        elem.classList.add("cell");
        elem.textContent = board[rowIndex][colIndex];
        boardContainer.appendChild(elem);
        elem.addEventListener("click", (e) => {
          cellClickHandler(rowIndex, colIndex);
        });
      }
    }
    return board;
  };
  const cellClickHandler = (x, y) => {
    game.playTurn(x, y);
    displayT();
  };

  function displayWins() {
    let playerWinsDivs = document.querySelectorAll(".winCount");
    let score = game.getScore();
    playerWinsDivs[0].textContent = score.playerOne;
    playerWinsDivs[1].textContent = score.playerTwo;
    return score;
  }

  function resetRound() {
    game.resetGame();
  }

  return { game, displayT, displayWins };
}
