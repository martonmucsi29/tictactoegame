const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let currentPlayer = "X";
let active = true;

const wins4 = [
  [0,1,2,3],[4,5,6,7],[8,9,10,11],[12,13,14,15],
  [0,4,8,12],[1,5,9,13],[2,6,10,14],[3,7,11,15],
  [0,5,10,15],[3,6,9,12]
];

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => clickCell(cell, index));
});

function clickCell(cell) {
  if (!active || cell.textContent) return;

  cell.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `${currentPlayer} nyert`;
    active = false;
    return;
  }

  if ([...cells].every(c => c.textContent)) {
    statusText.textContent = "Döntetlen";
    active = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `${currentPlayer} jön`;
}

function checkWin() {
  for (const combo of wins4) {
    if (combo.every(i => cells[i].textContent === currentPlayer)) {
      combo.forEach(i => cells[i].classList.add("win"));
      return true;
    }
  }
  return false;
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
