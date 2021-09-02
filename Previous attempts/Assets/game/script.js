const startButton = document.getElementById("#start-btn");
const nextButton = document.getElementById("#next-btn");
const questionContainerEl = document.getElementById("#question-container");
const questionEl = document.getElementById("#question");
const answerButtonsEl = document.getElementById("#answer-buttons");

// sets both to defualt of undefined, which works for us here
const shuffledQuestions, currentQuestionIndex;

// Timer
const counter = 60;
const interval;

// Event listeners
// button to start the quiz
startButton.addEventListener("click", startQuiz);
// button to go to the next question
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    setNextQuestion();
})
// for high scores
highScoreBtn.addEventListener("click", showHighScores);
clearBtn.addEventListener("click", clearHighScores);
reloadBtn.addEventListener("click", function () {
    location.reload();
})


// function starts the game when start button is pressed
function startQuiz() {
    // console.log("Started");
    startButton.classList.add("hide");
    // gives us a randomly chosen number in the array (50% of the time will be above 0 and 50% of the time will be below zero)
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    // starting on very first question so currentQuestionIndex is set to 0
    currentQuestionIndex = 0; 
    questionContainerEl.classList.remove("hide");
    setNextQuestion();
}) 

// function to set next question when next button is clicked
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionEl.innerText = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsEl.appendChild(button);
    })
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add("hide");
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }
}

// function occurs when an answer is selected
function selectAnswer(e) {
    var selectedButton = e.target;
    var correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsEl.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
    } else {
        startButton.innerText = "Restart"
        startButton.classList.remove("hide")
    }    
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct");
    
    } else {
        element.classList.add("wrong");
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}


// Creating array of questions, each of which has an array of answers
let questions = [
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

