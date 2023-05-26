// Quiz questions and answers
var questions = [
    {
        title: "1. Some files are referenced in HTML. Inside which HTML element do we put JavaScript?",
        choices: ["A. <scripting>", "B. <javaScript>", "C. <script>", "D. <js>"],
        answer: "C. <script>"
    },
    {
        title: "2. Where is the exact place to insert a JavaScript in HTML?",
        choices: ["A. The <head> section", "B. The <body> section", "C. Both the <head> section and the <body> section are correct", "D. The <start> section"],
        answer: "C. Both the <head> section and the <body> section are correct"
    },
    {
        title: "3. How do you create a function in JavaScript?",
        choices: ["A. function = myFunction()", "B. function:myFunction()", "C. function myFunction()", "D. all of the above"],
        answer: "C. function myFunction()"
    },
    {
        title: "4. How do you call a function named myFunction?",
        choices: ["A. myFunction()", "B. call function myFunction()", "C. call myFunction()", "D. none of the above"],
        answer: "A. myFunction()"
    },
    {
        title: "5. How can you add a comment in a JavaScript file?",
        choices: ["A. //This is a comment", "B. This is a comment", "C. <!--This is a comment-->", "D. all of the above"],
        answer: "A. //This is a comment"
    },

];
// Variables
var score = 0;
var questionList = 0;
var presentTime = document.querySelector("#presentTime");
var timer = document.querySelector("#beginTime");
var questionContainer = document.querySelector("#questionContainer");
var consolidate = document.querySelector("#consolidate");

var secondsRemaining = 76; // 15 seconds per question:
var holdWait = 0; // Holds wait time
var punishment = 10; // This is the penalty time
var ulCreate = document.createElement("ul"); // This creates a new element

timer.addEventListener("click", function () {  // This triggers timer on button, and it displays on the screen

    if (holdWait === 0) {
        holdWait = setInterval(function () {
            secondsRemaining--;
            presentTime.textContent = "Time: " + secondsRemaining;

            if (secondsRemaining <= 0) {
                clearInterval(holdWait);
                allDone();
                presentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionList);
});

function render(questionList) {  // This renders the questions and options to the screen. 
    questionContainer.innerHTML = ""; 
    ulCreate.innerHTML = "";
    
    for (var i = 0; i < questions.length; i++) {
        
        var userQuestion = questions[questionList].title;
        var userChoices = questions[questionList].choices;
        questionContainer.textContent = userQuestion;
    }
    
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionContainer.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
function compare(event) { // This event compares options with the answer.
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        
        if (element.textContent == questions[questionList].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionList].answer;
            
        } else {
            secondsRemaining = secondsRemaining - punishment; // This will deduct -5 seconds off secondsRemaining for wrong answers
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionList].answer;
        }

    }
    questionList++; // This is the Question Index which determines the question number quiz taker is on

    if (questionList >= questions.length) {
        allDone(); // All done will append last page with the quiz takers' statistics.
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionList);
    }
    questionContainer.appendChild(createDiv);

}

function allDone() {
    questionContainer.innerHTML = "";
    presentTime.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionContainer.appendChild(createH1);

    var createParagraph = document.createElement("p");
    createParagraph.setAttribute("id", "createParagraph");

    questionContainer.appendChild(createParagraph);

    // Calculates time remaining and replaces it with score
    if (secondsRemaining >= 0) {
        var timeRemaining = secondsRemaining;
        var createParagraph2 = document.createElement("p");
        clearInterval(holdWait);
        createParagraph.textContent = "Your final score is: " + timeRemaining;

        questionContainer.appendChild(createParagraph2);
    }

    // Label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionContainer.appendChild(createLabel);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionContainer.appendChild(createInput);

    // submit button
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionContainer.appendChild(createSubmit);

    // addEventlistener captures initials. It stores initials and scores in the local storage.
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var totalScores = localStorage.getItem("totalScores");
            if (totalScores === null) {
                totalScores = [];
            } else {
                totalScores = JSON.parse(totalScores);
            }
            totalScores.push(finalScore);
            var newScore = JSON.stringify(totalScores);
            localStorage.setItem("totalScores", newScore);
            
            window.location.replace("./HighScores.html");
        }
    });

}

