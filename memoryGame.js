const gameContainer = document.getElementById("game");
let moves = 0;
let personalBest = 0;
const newGameBtn = document.querySelector("#newGameBtn");
let pBCounter = document.querySelector("#pBCounter");

const images = [
  "coco",
  "lolly",
  "marlo",
  "joey",
  "marshal",
  "coco",
  "lolly",
  "marlo",
  "joey",
  "marshal",
];

function newGame() {
  gameContainer.innerHTML = "";

  let shuffledImages = shuffle(images);
  createDivsForImages(shuffledImages);

  moves = 0;
  movesCounter.innerHTML = moves;

  personalBest = Number(localStorage.getItem("pBCounter")) || 0;
  pBCounter.innerHTML = personalBest;
}

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

function createDivsForImages(imageArray) {
  for (let img of imageArray) {
    const newDiv = document.createElement("div");
    newDiv.dataset.img = img;
    newDiv.addEventListener("click", cardClick);
    gameContainer.append(newDiv);
  }
}

function cardClick(event) {
  if (
    event.target.classList.contains("matched") ||
    document.querySelectorAll(".faceUp").length === 2 ||
    event.target.classList.contains("faceUp")
  ) {
    return;
  }

  event.target.classList.toggle("faceUp");

  const flipped = Array.from(document.getElementsByClassName("faceUp"));
  let movesCounter = document.querySelector("#movesCounter");

  if (
    flipped.length === 2 &&
    flipped[0].dataset.img != flipped[1].dataset.img
  ) {
    setTimeout(function () {
      flipped.forEach((element) => element.classList.toggle("faceUp"));
    }, 1000);
    moves = moves + 1;
    movesCounter.innerHTML = moves;
  } else if (
    flipped.length === 2 &&
    flipped[0].dataset.img === flipped[1].dataset.img
  ) {
    flipped.forEach((element) => element.classList.add("matched")); // add new matched class
    flipped.forEach((element) => element.classList.remove("faceUp")); // remove faceUp
    moves = moves + 1;
    movesCounter.innerHTML = moves;

    if (images.length === document.querySelectorAll(".matched").length) {
      updatePB(moves);
    }
  }
}

function updatePB(moves) {
  if (personalBest === 0 || personalBest > moves) {
    pBCounter.innerHTML = moves;
    personalBest = moves;
    localStorage.setItem("pBCounter", moves);
  }
}

newGameBtn.addEventListener("click", newGame);
newGame();