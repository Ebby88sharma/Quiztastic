const startButton = document.getElementById('start-quiz');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const finalScoreText = document.getElementById('final-score');
const restartButton = document.getElementById('restart-btn');
const animationContainer = document.getElementById('animation-container');
const categorySelect = document.getElementById('quiz-category');
const timerElement = document.getElementById('timer'); // Timer element

let currentQuestionIndex;
let score = 0;
let timer;
let timeLeft = 30;

// Quiz Questions categorized
const questions = {
    general: [
        { question: 'What is the capital of France?', answers: [{ text: 'Berlin', correct: false }, { text: 'Paris', correct: true }, { text: 'Madrid', correct: false }] },
        { question: 'What is 2 + 2?', answers: [{ text: '3', correct: false }, { text: '4', correct: true }, { text: '5', correct: false }] },
    ],
    science: [
        { question: 'What is the chemical symbol for water?', answers: [{ text: 'H2O', correct: true }, { text: 'CO2', correct: false }, { text: 'NaCl', correct: false }] },
        { question: 'What planet is known as the Red Planet?', answers: [{ text: 'Venus', correct: false }, { text: 'Mars', correct: true }, { text: 'Jupiter', correct: false }] },
    ],
    sports: [
        { question: 'Which country won the FIFA World Cup in 2018?', answers: [{ text: 'Germany', correct: false }, { text: 'France', correct: true }, { text: 'Brazil', correct: false }] },
        { question: 'How many players are there in a football team?', answers: [{ text: '9', correct: false }, { text: '11', correct: true }, { text: '12', correct: false }] },
    ]
};

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
restartButton.addEventListener('click', restartQuiz);

function startQuiz() {
    score = 0;
    const selectedCategory = categorySelect.value;
    currentQuestionIndex = 0;
    questionContainer.classList.remove('hide');
    startButton.classList.add('hide');
    setNextQuestion(selectedCategory);
}

function setNextQuestion(selectedCategory) {
    resetState();
    startTimer();
    showQuestion(questions[selectedCategory][currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearInterval(timer); // Reset the timer
    timeLeft = 30; // Reset the time to 30 seconds
    timerElement.innerHTML = `Time Left: ${timeLeft}s`; // Reset timer display
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    if (correct) {
        score++;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    clearInterval(timer); // Stop the timer when the answer is selected
    if (questions[categorySelect.value].length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        showFinalScore();
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showFinalScore() {
    questionContainer.classList.add('hide');
    resultContainer.classList.remove('hide');
    finalScoreText.innerText = `Your Final Score: ${score}`;
    
    let highScore = localStorage.getItem('highScore') || 0;
    if (score > highScore) {
        localStorage.setItem('highScore', score);
        highScore = score;
    }
    
    finalScoreText.innerHTML += `<p>High Score: ${highScore}</p>`;
}

function restartQuiz() {
    resultContainer.classList.add('hide');
    startButton.classList.remove('hide');
    nextButton.classList.add('hide');
}

// Timer function
function startTimer() {
    timeLeft = 30;
    timerElement.innerHTML = `Time Left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerHTML = `Time Left: ${timeLeft}s`;
        if (timeLeft === 0) {
            clearInterval(timer);
            nextButton.classList.remove('hide');
        }
    }, 1000);
}
