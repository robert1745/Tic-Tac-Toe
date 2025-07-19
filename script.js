document.addEventListener("DOMContentLoaded", () => {
  const cells = document.querySelectorAll(".cell");
  const resetbtn = document.querySelector("#reset-btn");
  const message = document.querySelector("#message");

  let currPlayer = "X";
  let board = ["", "", "", "", "", "", "", "", ""];
  let gameactive = true;

  cells.forEach((cell) => {
    cell.addEventListener("click", (e) => {
      if (cell.textContent !== "") {
        return;
      }
      cell.textContent = currPlayer; 
      message.textContent = `Player ${currPlayer === "X" ? "O" : "X"}'s turn`;
      currPlayer = currPlayer === "X" ? "O" : "X";
    });
  });
});
