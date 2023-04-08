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
let timeLeft = 60; // Adjust the time as needed
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
  if (!isCorrect) {
    timeLeft -= 10;
  }
  currentQuestionIndex++;
  showQuestion();
}
 
function gameOver() {
  quiz.style.display = "none";
  results.style.display = "block";
  scoreElement.innerText = timeLeft;
}
 
function saveScore() {
  const initials = initialsInput.value;
  if (initials) {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    const newScore = { initials, score: timeLeft };
    highScores.push(newScore);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    alert("Score saved!");
    location.reload();
  } else {
    alert("Please enter your initials.");
  }
  alert ("Score saved!");
  window.location.href = "highscore.html"; // Redirect to highscore.html
}
 
startButton.addEventListener("click", startQuiz);
saveButton.addEventListener("click", saveScore);




