const createPlayer = (playerMarker, currentPlayer) => {
  playerBoard = [];
  return { playerMarker, currentPlayer, playerBoard };
};

let whoWon = "";
let gameBoard = {
  board: [],
};
const winningArrays = [
  [0, 1, 2],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const divBoard = document.querySelectorAll(".gameDiv");
for (let i = 0; i < divBoard.length; i++) {
  divBoard[i].addEventListener("click", () => makeMove(i));
}
//functions:
//1 função que define qual jogador é (sempre começando com X e variando);
//1 função que recebe qual jogador é e marca X ou O dependendo de qual no allSquares[i], dando claim nesse local
//1 função que verifica se o local clicado está disponível ou não e caso não esteja nada acontece
//1 função que testa todas as combinações possíveis de vitória e verifica se alguma foi atendida - se foi:
//1 função que fala que jogador X ou O ganhou +
//1 função que bloqueia o gameboard

const playerX = createPlayer("X", true);
const playerO = createPlayer("O", false);

const makeMove = (square) => {
  if (checkValidity(square)) {
    writeMove(square);
    changeActivePlayer();
  }
  if (someoneWon()) {
    displayWinner();
  }
};

const writeMove = (square) => {
  if (playerX.currentPlayer) {
    divBoard[square].textContent = "X";
    gameBoard.board.push(square);
    playerX.playerBoard.push(square);
    playerX.currentPlayer = false;
    playerO.currentPlayer = true;
  } else {
    divBoard[square].textContent = "O";
    gameBoard.board.push(square);
    playerO.playerBoard.push(square);
    playerO.currentPlayer = false;
    playerX.currentPlayer = true;
  }
};

const checkValidity = (square) => {
  if (divBoard[square].textContent == "") {
    return true;
  } else {
    return false;
  }
};

const someoneWon = () => {
  for (let i = 0; i < winningArrays.length; i++) {
    if (
      playerX.playerBoard.includes(winningArrays[i][0]) &
      playerX.playerBoard.includes(winningArrays[i][1]) &
      playerX.playerBoard.includes(winningArrays[i][2])
    ) {
      whoWon = "X";
      return true;
    } else if (
      playerO.playerBoard.includes(winningArrays[i][0]) &
      playerO.playerBoard.includes(winningArrays[i][1]) &
      playerO.playerBoard.includes(winningArrays[i][2])
    ) {
      whoWon = "O";
      return true;
    }
  }
  return false;
};

const changeActivePlayer = () => {
  document.querySelector("#xPlayer").classList.toggle("active");
  document.querySelector("#oPlayer").classList.toggle("active");
};

const displayWinner = () => {
  const winParagraph = document.querySelector("#winner");
  // if (whoWon == "") return;
  winParagraph.textContent = `${whoWon} has won!`;
  winParagraph.classList.toggle("hidden");
  document.querySelector("#xPlayer").classList.toggle("hidden");
  document.querySelector("#oPlayer").classList.toggle("hidden");
};

document
  .getElementById("resetButton")
  .addEventListener("click", () => killGame());

const killGame = () => {
  for (let i = 0; i < divBoard.length; i++) {
    divBoard[i].textContent = "";
  }
  playerX.playerBoard = [];
  playerO.playerBoard = [];
  whoWon = "";
  playerX.currentPlayer = true;
  playerO.currentPlayer = false;
  changeActivePlayer();
  displayWinner();
  document.querySelector("#xPlayer").classList.add("active");
  document.querySelector("#oPlayer").classList.remove("active");
};
