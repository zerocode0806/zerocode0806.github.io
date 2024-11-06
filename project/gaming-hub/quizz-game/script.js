const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: 2,
  },
  {
    question: "What is 5 + 7?",
    options: ["10", "11", "12", "13"],
    correctAnswer: 2,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    correctAnswer: 1,
  },
  {
    question: "When the Black Death be a serious pandemic ?",
    options: ["1945", "1855", "1346", "1294"],
    correctAnswer: 2,
  },
];

let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
let totalQuestions = questions.length;

function startQuiz() {
  document.getElementById("start-screen").classList.add("hide"); // Hides the start screen
  document.getElementById("quiz").classList.remove("hide"); // Shows the quiz
  document.getElementById("start-btn").style.display = "none"; // Hides the Start Quiz button
  updateProgress();
  showQuestion();
  startTimer();
}

function startTimer() {
  let timeLeft = 20;
  document.getElementById("timer").textContent = timeLeft;
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      nextQuestion();
    }
  }, 1000);
}

function stopQuiz() {
  clearInterval(timerInterval); // Stop the timer
  showScore(); // Show the final score
}

function updateProgress() {
  const progressText = document.getElementById("progress-text");
  const progressBar = document.getElementById("progress-bar");
  progressText.textContent = `${currentQuestionIndex + 1}/${totalQuestions}`;
  progressBar.style.width = `${
    ((currentQuestionIndex + 1) / totalQuestions) * 100
  }%`;
}

function showQuestion() {
  const questionElement = document.getElementById("question");
  const options = document.querySelectorAll(".option");

  questionElement.textContent = questions[currentQuestionIndex].question;
  options.forEach((option, index) => {
    option.textContent = questions[currentQuestionIndex].options[index];
    option.disabled = false;
    option.classList.remove("correct", "incorrect");
  });

  document.getElementById("next-btn").style.display = "none";
}

function selectAnswer(selectedIndex) {
  clearInterval(timerInterval); // Stop the timer
  const correctIndex = questions[currentQuestionIndex].correctAnswer;
  const options = document.querySelectorAll(".option");

  options.forEach((option, index) => {
    option.disabled = true;
    if (index === correctIndex) {
      option.classList.add("correct");
    } else if (index === selectedIndex) {
      option.classList.add("incorrect");
    }
  });

  if (selectedIndex === correctIndex) {
    score++;
  }

  document.getElementById("next-btn").style.display = "block";
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < totalQuestions) {
    updateProgress();
    showQuestion();
    startTimer();
  } else {
    stopQuiz(); // Stop the quiz if there are no more questions
  }
}

function showScore() {
  document.getElementById("quiz").classList.add("hide");
  document.getElementById("score-container").classList.remove("hide");
  document.getElementById("score").textContent = score;
  document.getElementById("feedback").textContent = getFeedback();
}

function getFeedback() {
  if (score === totalQuestions) {
    return "Excellent! You got all questions right!";
  } else if (score > totalQuestions / 2) {
    return "Great job! You did well!";
  } else {
    return "Keep practicing! You'll get better!";
  }
}

function restartQuiz() {
  score = 0;
  currentQuestionIndex = 0;
  document.getElementById("score-container").classList.add("hide");
  document.getElementById("quiz").classList.remove("hide");
  showQuestion();
  startTimer();
}

window.onload = () => {
  document.getElementById("quiz").classList.add("hide");
  document.getElementById("start-screen").classList.remove("hide");
};
