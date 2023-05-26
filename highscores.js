// Variables
var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var goBack = document.querySelector("#goBack");

// addEventListener to clear scores 
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});
// Retreives local stroage 
var totalScores = localStorage.getItem("totalScores");
totalScores = JSON.parse(totalScores);

if (totalScores !== null) {

    for (var i = 0; i < totalScores.length; i++) {

        var createLi = document.createElement("li");
        createLi.textContent = totalScores[i].initials + " " + totalScores[i].score;
        highScore.appendChild(createLi);

    }
}

goBack.addEventListener("click", function () {
    window.location.replace("./index.html");
});