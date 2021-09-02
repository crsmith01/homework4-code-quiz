// Globally scoped variables
const username = document.querySelector("#username");
const saveScoreBtn = document.querySelector("#saveScoreBtn");
const finalScore = document.querySelector("#finalScore");
const mostRecentScore = document.querySelector("#mostRecentScore");

// local storage to get the high score
const highScores = JSON.parse(localStorage.getItem("highScores")) || []

// only want to show 5 highest scores
const MAX_HIGH_SCORES = 5;


finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () => {
    saveScoreBtn.disables = !username.value
})

//  function to save the high score to local storage
saveHighScore = event => {
    event.preventDefault()

    let score = {
        score: mostRecentScore,
        name: username.value
    }
    // push method to add that most recent score to the high score list
    highScores.push(score);

    highScores.sort((a,b) => {
        return b.score - a.score
    })

    highScores.splice(5);

    // set the high school to local storage - used stringify 
    localStorage.setItem("highScores", JSON.stringify(highScores))
    // assign method to take us to the next appropriate page
    location.assign("/")
}