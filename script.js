const quizData = [
  {
    question: "What is the correct syntax for a javascript function?",
    answers: [
      'function myFunction() {}',
      'func myFunction() {}',
      'def myFunction() {}',
    ],
    correctAnswerIndex: 0,
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    answers: [
      'alertBox("Hello World");',
      'msg("Hello World");',
      'alert("Hello World");',
    ],
    correctAnswerIndex: 2,
  },
  {
    question: "How do you create a function in JavaScript?",
    answers: [
      'function:myFunction()',
      'function = myFunction()',
      'function myFunction()',
    ],
    correctAnswerIndex: 2,
  },
];

const startButton = document.getElementById("start");
const quiz = document.getElementById("quiz");
const results = document.getElementById("results");
const scoreElement = document.getElementById("score");
const initialsInput = document.getElementById("initials");
const saveButton = document.getElementById("save");

let currentQuestionIndex = 0;
let correctAnswers = 0;
let timeLeft = 60;
let timer;

function startQuiz() {
  startButton.remove();
  timer = setInterval(updateTimer, 1000);
  showQuestion();
  document.getElementById("timer").style.display = "block";
  document.getElementById("timer").innerHTML = "Time: " + timeLeft;
}

function updateTimer() {
  if (timeLeft > 0) {
    timeLeft--;
  } else {
    clearInterval(timer);
    gameOver();
  }
  document.getElementById("timer").innerHTML = "Time: " + timeLeft;
}

function showQuestion() {
  if (currentQuestionIndex < quizData.length) {
    const questionData = quizData[currentQuestionIndex];
    quiz.innerHTML = `<h2>${questionData.question}</h2>`;
    questionData.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.innerText = answer;
      button.addEventListener("click", () =>
        handleAnswerClick(index === questionData.correctAnswerIndex)
      );
      quiz.appendChild(button);
    });
  } else {
    clearInterval(timer);
    gameOver();
  }
}

function handleAnswerClick(isCorrect) {
  if (isCorrect) {
    correctAnswers++;
  } else {
    timeLeft -= 10;
  }
  currentQuestionIndex++;
  showQuestion();
}

function gameOver() {
  clearInterval(timer);
  quiz.style.display = "none";
  results.style.display = "block";
  const maxScore = quizData.length;
  const score = Math.round((correctAnswers / maxScore) * 100); // Calculate score as a percentage
  scoreElement.innerText = score;
}

function saveScore() {
  const initials = initialsInput.value;
  if (initials) {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const maxScore = quizData.length;
    const score = Math.round((correctAnswers / maxScore) * 100); // Calculate score as a percentage
    const newScore = { initials, score: score };
    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.href = "highscores.html";
    alert("Your score has been saved!");
  } else {
    alert("Please enter your initials.");
  }
}


startButton.addEventListener("click", startQuiz);
saveButton.addEventListener("click", saveScore);






