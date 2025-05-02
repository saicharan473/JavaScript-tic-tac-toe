let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGame = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnO = true; //playerX, playerO

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // console.log("box was clicked!");
    if (turnO) {
      //playerO turn
      box.innerText = "O";
      box.style.color = "red"; // change color of O to red

      turnO = false; // for otherplayer turn(X), O stops
    } else {
      box.innerText = "X"; //playerX turn
      box.style.color = "green"; // change color of X to red
      turnO = true; // for otherplayer turn(O)
    }
    box.disabled = true;
    checkWinner();
  });
});
const disableBoxes = () => {
  for (box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (box of boxes) {
    box.disabled = false;
    box.innerText = ""; // reset the boxes to empty string
  }
};
const showWinner = (winner) => {
  msgContainer.classList.remove("hide");
  msg.innerText = `congratulations, winner is ${winner}`;
  disableBoxes();
};
const checkWinner = () => {
  for (pattern of winPatterns) {
    ///// this below code is to check winPatterns, pattern[0,1,2] are all possibilities.
    ///// same logical code is shorten in the below.
    // console.log(pattern[0], pattern[1], pattern[2]);
    // console.log(
    //   boxes[pattern[0]].innerText,
    //   boxes[pattern[1]].innerText,
    //   boxes[pattern[2]].innerText
    // );
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;
    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        // console.log("winner", pos1val);
        showWinner(pos1val);
        return; // stop the loop if we found a winner
      }
    }
  }

  // Check for draw
  // Check if all boxes are filled
  let isDraw = true;
  boxes.forEach((box) => {
    if (box.innerText === "") {
      isDraw = false; // If any box is empty, it's not a draw
    }
  });

  if (isDraw) {
    msgContainer.classList.remove("hide");
    msg.innerText = "It's a draw! try again.";
    disableBoxes(); // Disable all boxes as the game is over
  }
};

newGame.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
// resetBtn.addEventListener("click", () => { this both buttons for restGame by function calling.
