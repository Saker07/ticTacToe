function playerFactory(choice){
    let wins, sign;
    wins= 0;
    sign= choice;
    const getSign = ()=>{return sign};
    const addWin = ()=>{return ++wins};
    return {getSign, addWin}
}
function gameboardFactory(){
    let board = [["", "", ""], ["", "", ""], ["", "", ""]];
    const reset = ()=>{
        board = [["", "", ""], ["", "", ""], ["", "", ""]];
    };
    const check = ()=>{
        let f=2;                    //default state "draw"
        (function checkDraw() {      //if even 1 cell is empty, it's no longer a draw, so set to 0
            for (let row of board){
                for(let cell of row){
                    if (cell === ""){
                        f=0;
                    }
                }
            }
        })();
        (function checkWin() {
            for (let i=0; i<board.length; i++){    //if someone won set to 1
                if (board[i][0] == board[i][1] == board[i][2]){
                    f=1;
                }
                if (board[0][i] == board[1][i] == board[2][i]){
                    f=1;
                }
                if ((board[0][0] == board[1][1] == board[2][2]) || (board[0][2] == board[1][1] == board[2][0])){
                    f=1;
                }
            };
        })();
        if(f==1){   //win
            currentPlayer.addWin();
            gameboard.reset();
        }else if(f==2){     //draw
            gameboard.reset();
        }
        return f;
    };
    const mark = (player, x, y)=>{
        board[x][y] = board[x][y] == "" ? player.getSign() : board[x][y];
    };
    const display = ()=>{
    };
    return {reset, check, mark, display}
}


let playerOne, playerTwo, currentPlayer;
playerOne = playerFactory("x");
playerTwo = playerFactory("o");
let gameboard = gameboardFactory();
console.log("1");