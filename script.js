const startButton = document.getElementById('start-quiz');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const finalScoreText = document.getElementById('final-score');
const restartButton = document.getElementById('restart-btn');
const animationContainer = document.getElementById('animation-container');
const timerElement = document.getElementById('timer');
const categorySelect = document.getElementById('category');
const quizTitle = document.getElementById('quizTitle');  // For dynamic updates of the title

let currentQuestionIndex;
let score = 0;
let timeLeft = 20;
let timerInterval;

const allQuestions = {
    "General Knowledge": [
        {
            question: 'What is the capital of France?',
            answers: [
                { text: 'Berlin', correct: false },
                { text: 'Paris', correct: true },
                { text: 'Madrid', correct: false },
            ]
        },
        // Additional questions for each category
    ],
    "Science": [
        {
            question: 'What planet is known as the Red Planet?',
            answers: [
                { text: 'Mars', correct: true },
                { text: 'Jupiter', correct: false },
                { text: 'Venus', correct: false },
            ]
        },
        // Additional questions for each category
    ],
    // Add more categories and questions as needed
};

let questions = [];

// Event listeners
startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', restartQuiz);

function startQuiz() {
    const username = document.getElementById('username').value;
    
    if (username.trim() === "") {
        alert("Please enter your username.");
        return;
    }
    score = 0;
    timeLeft = 20;
    clearInterval(timerInterval);

    startButton.classList.add('hide');
    document.querySelector('.start-container').classList.add('hide');
    const selectedCategory = categorySelect.value;
    questions = allQuestions[selectedCategory];
    currentQuestionIndex = 0;

    quizTitle.innerText = `Question 1/${questions.length}`;

    questionContainer.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);

    quizTitle.innerText = `Question ${currentQuestionIndex + 1}/${questions.length}`;

    resetTimer();
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
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;

    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
        button.disabled = true;
    });

    if (correct) {
        score++;
    }

    setTimeout(() => {
        if (questions.length > currentQuestionIndex + 1) {
            currentQuestionIndex++;
            setNextQuestion();
        } else {
            clearInterval(timerInterval);
            showFinalScore();
        }
    }, 1000);
}

function setStatusClass(element, correct, isSelected = false) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct'); 
    } else {
        element.classList.add('wrong');  
    }
    if (isSelected) {
        element.classList.add('selected');
    }
    element.disabled = true; 
}


function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function showFinalScore() {
    questionContainer.classList.add('hide');
    resultContainer.classList.remove('hide');
    finalScoreText.innerText = `Your Final Score: ${score}`;
    clearInterval(timerInterval);
    if (score > questions.length / 2) {
        animationContainer.classList.remove('hide');
        animationContainer.classList.add('success');
        animationContainer.innerHTML = 'Congratulations! 🎉';
    } else {
        animationContainer.classList.remove('hide');
        animationContainer.classList.add('fail');
        animationContainer.innerHTML = 'Try Again! 😔';
    }
}

function restartQuiz() {
    resultContainer.classList.add('hide');
    animationContainer.classList.add('hide');
    startButton.classList.remove('hide');
    document.querySelector('.start-container').classList.remove('hide');
    questionContainer.classList.add('hide');
    quizTitle.innerText = "Welcome to Quiztastic!";

    document.getElementById('username').value = '';
    categorySelect.selectedIndex = 0;
}

function resetTimer() {
    timeLeft = 20;
    clearInterval(timerInterval);
    timerElement.innerHTML = `Time Left: ${timeLeft}s`;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.innerHTML = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert('Time is up!');
            if (questions.length > currentQuestionIndex + 1) {
                currentQuestionIndex++;
                setNextQuestion();
            } else {
                showFinalScore();
            }
        }
    }, 1000);
}
