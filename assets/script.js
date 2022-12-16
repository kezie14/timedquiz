const questions = [
  {
    question: "What are avacados?",
    answers: ["Stone", "Animal", "A Car", "A Fruit"],
    correctAnswer: "A Fruit",
  },

  {
    question: "What is Australia wider than?",
    answers: ["A Window", "The Moon", "The Titanic", "Jupiter"],
    correctAnswer: "The Moon",
  },

  {
    question: "Which bird can't fly backwards?",
    answers: ["An Ostrich", "A Rooster", "A Penguin", "A Hummingbird"],
    correctAnswer: "A Hummingbird",
  },

  {
    question: "What country gifted the US with the statue of liberty in 1885?",
    answers: ["France", "Austrailia", "England", "China"],
    correctAnswer: "France",
  },
];

const startButton = document.getElementById("start");
const scoreContainer = document.querySelector(".score-container")
const timeContainer = document.querySelector("#timer");
const questionContainer = document.querySelector(".question-container")
const time = 60;
let score=0;
let timeInt;
let currentQuestionIndex = 0;
let title = document.querySelector("#title");
scoreContainer.classList.add("hide")
let initialsElement = document.querySelector("#initials-input")

function startTimer() {
  const timeElement = document.createElement("p");
  timeContainer.appendChild(timeElement);
  timeElement.textContent = time;
  timeInt = setInterval(function () {
    timeContainer.textContent--;
    if (timeContainer.textContent <= 0) {
      quizEnd();
    }
  }, 1000);
}
function displayCurrentQuestion() {
  let currentQuestion = questions[currentQuestionIndex];
  title.innerText = currentQuestion.question;
  for(let i=0; i<currentQuestion.answers.length; i++) {
    const element=currentQuestion.answers[i]
    const optionbtn=document.getElementById("op"+i)
    optionbtn.textContent=element
  }
}

function answerCheck(event) {
    let chosenAnswer=event.target.textContent
    let correctAnswer=questions[currentQuestionIndex].correctAnswer
    if(chosenAnswer===correctAnswer) {
        score+=5
    }else{
        time-5
        score-=5
    } 
    currentQuestionIndex++
    if(questions.length>currentQuestionIndex) {
        displayCurrentQuestion()
    }else{
        quizEnd()
    }
  }

function quizEnd() {
  clearInterval(timeInt);
  questionContainer.classList.add("hide")
  scoreContainer.classList.remove("hide")
  let quizResults=document.createElement("p")
  quizResults.textContent="Congrats! YOUR SCORE IS!" + score 
  scoreContainer.appendChild(quizResults)
}

function saveHighScore() {
    let initials=initialsElement.value 
    let highScores=JSON.parse(localStorage.getItem("highScores"))|| []
    let scoreEntry={
        initials:initials,
        score:score,
    }

    highScores.push(scoreEntry)
    localStorage.setItem("highScores",JSON.stringify(highScores))
}

function displayScores() {
    let newScore=JSON.parse(window.localStorage.getItem("highScores"))
    
}

startButton.addEventListener("click", function () {
  startButton.classList.add("hide")
  questionContainer.classList.remove("hide")  
  startTimer();
  displayCurrentQuestion();
});
