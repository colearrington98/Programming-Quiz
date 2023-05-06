const highScoresList = document.getElementById("high-scores-list");
const clearButton = document.getElementById("clear");
const goBackButton = document.getElementById("go-back");

function loadHighScores() {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScoresList.innerHTML = highScores
        .map(score => `<li>${score.initials} - ${score.score}</li>`)
        .join("");
}

function clearHighScores() {
    localStorage.removeItem("highScores");
    loadHighScores();
}

function goBack() {
    window.location.href = "index.html";
}

clearButton.addEventListener("click", clearHighScores);
goBackButton.addEventListener("click", goBack);
loadHighScores();
