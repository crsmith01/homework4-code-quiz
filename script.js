// Globally scoped variables

// Variables for actually taking the quiz
const startButton = document.getElementById("start-btn");
const introEl = document.getElementById("intro");
const questionEl = document.getElementById("question");
const questionContainerEl = document.getElementById("question-container");
// used let because these will not remain the same throughout 
let shuffledQuestions;
let currentQuestionIndex;

const answerBtnsEl = document.getElementById("answer-btns");
const controlsEl = document.getElementById("controls");
const showTimer = document.getElementById("timeRemaining");
const endGameEl = document.getElementById("endGameEl");
const displayScore = document.getElementById("score");
const highscoreBtn = document.getElementById("highscore-btn");
const clearBtn = document.getElementById("clear-btn");
const reloadBtn = document.getElementById("reload-btn");

// Variables for the timer (60 seconds provided at the start - function 
var counter = 60;
var interval;

// Variables for scoring
const mostRecentScore = localStorage.getItem("mostRecentScore");
const initialsEl = document.getElementById("initials");
const highScoresEl = document.getElementById("highScoresEl");
const highScoresList = document.getElementById("highScoresList");
var storedHighScores = JSON.parse(localStorage.getItem("highScores"));
const maxHighScores = 10;
var highScores = [];
let score = 0;

// Creating array of questions, each of which has an array of answers
const questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: [
            {text: "Alerts", correct: true},
            {text: "Strings", correct: false},
            {text: "Numbers", correct: false},
            {text: "Booleans", correct: false}
        ],
    },
    {
        question: "The condition in an if / else statement is enclosed within:",
        answers: [
            {text: "Quotation marks", correct: true},
            {text: "Curly brackets", correct: false},
            {text: "Parentheses", correct: false},
            {text: "Square brackets", correct: false}
        ],
    },
    {
        question: "Arrays in JavaScript can be used to store:",
        answers: [
            {text: "All of the above", correct: true},
            {text: "Numbers and strings", correct: false},
            {text: "Other arrays", correct: false},
            {text: "Booleans", correct: false}
        ],
    },
    {
        question: "String values must be enclosed within _______ when being assigned to variables.",
        answers: [
            {text: "Quotation marks", correct: true},
            {text: "Curly brackets", correct: false},
            {text: "Commas", correct: false},
            {text: "Parentheses", correct: false}
        ],
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: [
            {text: "Console log", correct: true},
            {text: "JavaScript", correct: false},
            {text: "Terminal / bash", correct: false},
            {text: "For loops", correct: false}
        ],
    },
];

// Starting the quiz and timer
function startQuiz() {
    startTimer();
    startButton.classList.add("hide");
    introEl.classList.add("hide");

    // Shuffles the order of the questions - gives us a randomly chosen number in the array (50% of the time will be above 0 and 50% of the time will be below zero)

    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    // starting on very first question so currentQuestionIndex is set to 0
    currentQuestionIndex = 0;
    // reveals the question container element
    questionContainerEl.classList.remove("hide");

    // Displays first question
    setNextQuestion();
}

// Shows the next question
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// Shows the questions and answers and then checks for correct answers
function showQuestion(question) {
    // Shows the question value based on the question key within the currently indexed question
    questionEl.innerText = question.question;

    // Create buttons for each answer
    question.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");

        // Checks to see which answer is correct
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerBtnsEl.appendChild(button);
    });
}

// Clears the answer buttons in preparation for the next question (if there is one)
function resetState() {
    while (answerBtnsEl.firstChild) {
        answerBtnsEl.removeChild(answerBtnsEl.firstChild);
    }
}

function correctAnswer() {
    // Adds 10 points to the score
    score += 10;
    // Displays "Correct!" and changes background color of element - green for corret
    controlsEl.innerHTML = "<h5>Correct!</h5>";
    controlsEl.style.backgroundColor = "hsl(145, 100%, 50%)";
}

function wrongAnswer() {
    // Reduces remaining time by 10 seconds for incorrect answers
    counter -= 10;
    // Displays "Wrong!" and changes background color of element - red for wrong
    controlsEl.innerHTML = "<h5>Wrong!</h5>";
    controlsEl.style.backgroundColor = "hsl(0, 100%, 50%)";
}

function selectAnswer(event) {
    // Function occurs when an answer is selected

    // Identifies which answer is selected
    const selectedButton = event.target;
    const correct = selectedButton.dataset.correct;
    

    // Checks accuracy of answer and provides the corresponding response
    if (correct) {
        correctAnswer();
    } else {
        wrongAnswer();
    }

    // Check to see if there are more questions.
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        // Sets the next question (if there are any remaining)
        currentQuestionIndex++;
        setNextQuestion();
    } else {
        // Ends quiz if there are no remaining questions
        endGame();
    }
}

function startTimer() {
    // Creates and operates timer (decreases 1 second at a time)
    interval = setInterval(function () {
        counter--;
        if (counter >= 0) {
            showTimer.innerHTML = counter;
        }
        if (counter <= 0) {
            clearInterval(interval);
            endGame();
        }
    }, 1000);
}


function endGame() {
    // Ends game
    questionContainerEl.classList.add("hide");
    controlsEl.classList.add("hide");
    endGameEl.classList.remove("hide");
    displayScore.innerText = score;
    clearInterval(interval);
}

function showHighScores() {
     // Utilizes local storage to save user's information.
    endGameEl.classList.add("hide");
    startButton.classList.add("hide");
    questionContainerEl.classList.add("hide");
    controlsEl.classList.add("hide");
    highScoresEl.classList.remove("hide");
    introEl.classList.add("hide");
    clearInterval(interval);
    init();
    renderHighScore();
}

function init() { 
    // Function to get the stored high scores from local storage
    // Parsing JSON string to an object
    var storedHighScores = JSON.parse(localStorage.getItem("highScores"));

    // Updates array after going to local storage 
    if (storedHighScores !== null) {
        highScores = storedHighScores;
    }
}

function storeHighScore() {
    // Stringifies highscore key for local storage array
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function renderHighScore() {
    // Uses jQuery to create a new list item for each high score
    highScoresList.innerHTML = highScores
        .map((highScores) => {
            return `<li>${highScores.initials}: ${highScores.score}</li>`;
        })
        .join("");
}

function clearHighScores() {
    localStorage.clear();
    highScoresList.innerHTML = "";
}


// Additional event listeners 
startButton.addEventListener("click", startQuiz);
highscoreBtn.addEventListener("click", showHighScores);
clearBtn.addEventListener("click", clearHighScores);
reloadBtn.addEventListener("click", function () {
    location.reload();
});
initialsForm.addEventListener("submit", function (e) {
    e.preventDefault();
    init();

    // Adds high score to array (trim to make whole number)
    const highscore = {
        initials: initialsEl.value.trim(),
        score: score.toString(),
    };
    highScores.push(highscore);
    initialsEl.value = "";

    // Ranks high scores and caps at 10 scores
    highScores.sort((a, b) => b.score - a.score);

    highScores.splice(10);

    // Stores scores in local storage and adds to the DOM
    storeHighScore();
    renderHighScore();

    endGameEl.classList.add("hide");
    highScoresEl.classList.remove("hide");
});