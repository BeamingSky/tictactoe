let currentPlayer = "X";

let gameActive = true;

const cells = document.querySelectorAll(".cell");

const statusText = document.querySelector("#statusText");

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", function (event) {
    handleCellClick(event);
  });
}

function handleCellClick(event) {
  const cell = event.target;
  if (!gameActive || cell.textContent !== "") return;

  cell.textContent = currentPlayer;

  if (checkWin()) endGame(`${currentPlayer} wins!`);
  else if (checkDraw()) endGame("It's a draw!");

  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWin() {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (
      cells[a].textContent === currentPlayer &&
      cells[b].textContent === currentPlayer &&
      cells[c].textContent === currentPlayer
    )
      return true; // The current player has won
  }

  return false; // No winning condition met
}

function checkDraw() {
  for (let i = 0; i < cells.length; i++)
    if (cells[i].textContent === "") return false;

  return true;
}


function endGame(message) {
  statusText.textContent = message;
  gameActive = false;
}


document.querySelector("#restartBtn").addEventListener("click", function () {
  cells.forEach(function (cell) {
    cell.textContent = "";
  });

  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Play";
});
