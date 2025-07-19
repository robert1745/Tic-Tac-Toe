document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const resetbtn = document.querySelector("#reset-btn");
  const message = document.querySelector("#message");
  let scoreX = 0;
  let scoreO = 0;
  const scoreXEl = document.querySelector("#score-x");
  const scoreOEl = document.querySelector("#score-o");

  let currPlayer = "X";
  let board = ["", "", "", "", "", "", "", "", ""];
  let gameactive = true;
  const winningCombos = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row

    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column

    [0, 4, 8], // diagonal
    [2, 4, 6], // other diagonal
  ];
  const themeToggle = document.querySelector("#theme-toggle");

    themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
  });
  cells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      const index = cell.getAttribute("data-index");

      if (cell.textContent !== "" || !gameactive) {
        return;
      }
      cell.textContent = currPlayer;
      board[index] = currPlayer;
      if (checkWinner()) {
        message.textContent = `Player ${currPlayer} wins!`;
        if (currPlayer === "X") {
          scoreX++;
          scoreXEl.textContent = scoreX;
        } else {
          scoreO++;
          scoreOEl.textContent = scoreO;
        }
        gameactive = false;
        return;
      }

      if (!board.includes("")) {
        message.textContent = `Its a draw!`;
        gameactive = false;
        return;
      }
      message.textContent = `Player ${currPlayer === "X" ? "O" : "X"}'s turn`;
      currPlayer = currPlayer === "X" ? "O" : "X";
    });
  });

  function checkWinner() {
    return winningCombos.some((combo) => {
      const [a, b, c] = combo;
      return board[a] && board[a] === board[b] && board[a] === board[c];
    });
  }

  resetbtn.addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach((cell) => {
      cell.textContent = "";
    });
    currPlayer = "X";
    gameactive = true;
    message.textContent = `Player ${currPlayer}'s turn`;
  });
});
