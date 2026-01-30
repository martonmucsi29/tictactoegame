const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let currentPlayer = "X";
let active = true;

const wins3 = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];


cells.forEach((cell, index) => {
  cell.addEventListener("click", () => clickCell(cell, index));
});

function clickCell(cell, index) {
  if (!active || cell.textContent) return;

  cell.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `${currentPlayer} nyert 🎉`;
    active = false;
    return;
  }

  if ([...cells].every(c => c.textContent)) {
    statusText.textContent = "Döntetlen 😅";
    active = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer} jön`;
}

function checkWin() {
  return wins3.some(combo => {
    const [a,b,c] = combo;
    if (
      cells[a].textContent &&
      cells[a].textContent === cells[b].textContent &&
      cells[a].textContent === cells[c].textContent
    ) {
      cells[a].classList.add("win");
      cells[b].classList.add("win");
      cells[c].classList.add("win");
      return true;
    }
    return false;
  });
}

resetBtn.addEventListener("click", () => {
  currentPlayer = "X";
  active = true;
  statusText.textContent = "X jön";
  cells.forEach(c => {
    c.textContent = "";
    c.classList.remove("win");
  });
});
