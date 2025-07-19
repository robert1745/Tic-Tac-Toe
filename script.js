document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const resetBtn = document.querySelector("#reset-btn");
  const message = document.querySelector("#message");
  const playerXScoreEl = document.querySelector("#player-x-score");
  const playerOScoreEl = document.querySelector("#player-o-score");
  const drawScoreEl = document.querySelector("#draw-score");

  let currPlayer = "X";
  let board = ["", "", "", "", "", "", "", "", ""];
  let gameActive = true;

  let playerXScore = 0;
  let playerOScore = 0;
  let drawScore = 0;

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6], // diagonals
  ];

  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      const index = cell.getAttribute("data-index");

      if (board[index] !== "" || !gameActive || currPlayer !== "X") return;

      makeMove(index, "X");

      if (checkWinner("X")) {
        message.textContent = `Player X wins!`;
        playerXScore++;
        updateScoreboard();
        gameActive = false;
        return;
      }

      if (!board.includes("")) {
        message.textContent = "It's a draw!";
        drawScore++;
        updateScoreboard();
        gameActive = false;
        return;
      }

      currPlayer = "O";
      message.textContent = "AI is thinking...";
      setTimeout(() => {
        makeAIMove();
        currPlayer = "X";
      }, 500);
    });
  });

  resetBtn.addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currPlayer = "X";
    message.textContent = "Player X's turn";
    cells.forEach((cell) => (cell.textContent = ""));
  });

  function makeMove(index, player) {
    board[index] = player;
    cells[index].textContent = player;
  }

  function makeAIMove() {
    if (!gameActive) return;

    const emptyIndices = board
      .map((val, idx) => (val === "" ? idx : null))
      .filter((idx) => idx !== null);

    if (emptyIndices.length === 0) return;

    const randomIndex =
      emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    makeMove(randomIndex, "O");

    if (checkWinner("O")) {
      message.textContent = "AI (O) wins!";
      playerOScore++;
      updateScoreboard();
      gameActive = false;
      return;
    }

    if (!board.includes("")) {
      message.textContent = "It's a draw!";
      drawScore++;
      updateScoreboard();
      gameActive = false;
      return;
    }

    message.textContent = "Player X's turn";
  }

  function checkWinner(player) {
    return winningCombos.some(([a, b, c]) => {
      return board[a] === player && board[b] === player && board[c] === player;
    });
  }

  function updateScoreboard() {
    playerXScoreEl.textContent = playerXScore;
    playerOScoreEl.textContent = playerOScore;
    drawScoreEl.textContent = drawScore;
  }
  const themeToggle = document.getElementById("theme-toggle");

  document.body.classList.add("light-theme");

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    document.body.classList.toggle("dark-theme");
  });
});
