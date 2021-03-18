var startButton = document.getElementById("#start-btn");
var questionContainerEl = document.getElementById("#question-container");
var questionEl = document.getElementById("#question");
var answerButtonsEl = document.getElementById("#answer-buttons");

// sets both to defualt of undefined, which works for us here
var shuffledQuestions, currentQuestionIndex;




startButton.addEventListener("click", startGame);



function startGame () {
    console.log("Started");
    startButton.classList.add("hide");
    // gives us a randomly chosen number in the array (50% of the time will be above 0 and 50% of the time will be below zero)
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    // starting on very first question so currentQuestionIndex is set to 0
    currentQuestionIndex = 0; 
    questionContainerEl.classList.remove("hide");
    setNextQuestion()
} 

function showQuestion(question) {
    questionEl.innerText = question.question;
}


function setNextQuestion() {
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}


function selectAnswer() {

}




// Creating array of questions, each of which has an array of answers
var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: [
            {text: "Alerts", correct: true},
            {text: "Strings", correct: false}
            {text: "Numbers", correct: false}
            {text: "Booleans", correct: false}
        ]
    }

    {
        question: "The condition in an if / else statement is enclosed within:",
        answers: [
            {text: "Quotation marks", correct: true},
            {text: "Curly brackets", correct: false}
            {text: "Parentheses", correct: false}
            {text: "Square brackets", correct: false}
        ]
    }

    {
        question: "Arrays in JavaScript can be used to store:",
        answers: [
            {text: "All of the above", correct: true},
            {text: "Numbers and strings", correct: false}
            {text: "Other arrays", correct: false}
            {text: "Booleans", correct: false}
        ]
    }

    {
        question: "String values must be enclosed within _______ when being assigned to variables.",
        answers: [
            {text: "Quotation marks", correct: true},
            {text: "Curly brackets", correct: false}
            {text: "Commas", correct: false}
            {text: "Parentheses", correct: false}
        ]
    }

    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: [
            {text: "Console log", correct: true},
            {text: "JavaScript", correct: false}
            {text: "Terminal / bash", correct: false}
            {text: "For loops", correct: false}
        ]
    }

]

