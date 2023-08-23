const green = document.querySelectorAll(".green")[0];
const red = document.querySelector("#red");
const yellow = document.querySelector("#yellow");
const blue = document.querySelector("#blue");
const levelTitle = document.querySelector("#level-title");
const greenAudio = new Audio("./sounds/green.mp3");
const redAudio = new Audio("./sounds/red.mp3");
const yellowAudio = new Audio("./sounds/yellow.mp3");
const blueAudio = new Audio("./sounds/blue.mp3");
const wrongAudio = new Audio("./sounds/wrong.mp3");

const elementAndAudio = [
  [green, greenAudio],
  [red, redAudio],
  [yellow, yellowAudio],
  [blue, blueAudio],
];

let levelPatters = [
  {
    pattern: [elementAndAudio[0], elementAndAudio[1], elementAndAudio[2]],
    isCompleted: false,
  },
  {
    pattern: [elementAndAudio[0], elementAndAudio[2], elementAndAudio[1]],
    isCompleted: false,
  },
  {
    pattern: [
      elementAndAudio[0],
      elementAndAudio[2],
      elementAndAudio[1],
      elementAndAudio[1],
    ],
    isCompleted: false,
  },
  {
    pattern: [
      elementAndAudio[0],
      elementAndAudio[3],
      elementAndAudio[3],
      elementAndAudio[1],
    ],
    isCompleted: false,
  },
];

const levelTitles = ["level 1", "level 2", "level 3", "level 4"];

let userInput = [];
let levelCount = 0; 
let ifGameStarted = false; //To handle the unwanted mouse click

window.addEventListener("keypress", main);

// Adding Click events to elements
elementAndAudio.forEach(([element, audio]) => {
  element.addEventListener("click", (e) => {
    if (ifGameStarted) {
      element.classList.add("pressed");
      setTimeout(() => {
        element.classList.remove("pressed");
      }, 30);
      userInput.push(e.target);
      checkIfLevelCompleted();
    }
  });
});

function main() {
  ifGameStarted = true;
  levelCount = 0;
  userInput = [];
  const changedArray = levelPatters.map((element) => {
    if (element.isCompleted) {
      element.isCompleted = false;
    }
    return element;
  });
  levelPatters = changedArray;
  startGame();
}

function startGame() {
  if (levelCount === 4) {
    changeLevelTitle("You Win Press Any Key To Restart");
  } else {
    changeLevelTitle(levelTitles[levelCount]);
    handleRipppleAnimation(levelPatters[levelCount]);
  }
}

function checkIfLevelCompleted() {
  if (
    levelPatters[levelCount].pattern.length === userInput.length &&
    checkUserInput(levelPatters[levelCount])
  ) {
    updateCompletedLevels(levelCount);
    userInput = [];
  } else if (
    levelPatters[levelCount].pattern.length === userInput.length &&
    !checkUserInput(levelPatters[levelCount])
  ) {
    changeLevelTitle("game over press any key");
    ifGameStarted = false;
    wrongAudio.play();
  }
  if (levelPatters[levelCount].isCompleted) {
    handleLevels();
  }
}

function handleLevels() {
  levelCount++;
  startGame();
}

// changing the value of isCompleted to true
function updateCompletedLevels(levelCount) {
  levelPatters[levelCount].isCompleted = true;
}

// checking the userInput and pattern is equal or not then returning the value
function checkUserInput({ pattern }) {
  return pattern.every(
    ([element, audio], index) => element == userInput[index]
  );
}

function changeLevelTitle(title) {
  levelTitle.innerText = title;
}

function handleRipppleAnimation({ pattern }) {
  let count = 0;
  let patternLength = pattern.length;
  const intervelId = setInterval(() => {
    if (count < patternLength) {
      rippleAnimation(pattern[count]);
      count++;
      ifGameStarted = false;
    } else {
      clearInterval(intervelId);
      ifGameStarted = true;
    }
  }, 400);
}

function rippleAnimation([element, audio]) {
  element.classList.add("ripple-effect");
  audio.play();
  setTimeout(() => {
    element.classList.remove("ripple-effect");
  }, 300);
}
