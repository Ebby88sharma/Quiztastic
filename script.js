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
const quizTitle = document.querySelector('h1');  // Select the title element

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
        {
            question: 'What is 2 + 2?',
            answers: [
                { text: '3', correct: false },
                { text: '4', correct: true },
                { text: '5', correct: false },
            ]
        }
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
        {
            question: 'What is the chemical symbol for water?',
            answers: [
                { text: 'H2O', correct: true },
                { text: 'O2', correct: false },
                { text: 'CO2', correct: false },
            ]
        }
    ],
};

let questions = [];

// Event listeners
startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
restartButton.addEventListener('click', restartQuiz);

function startQuiz() {
    const username = document.getElementById('username').value;
    
    if (username.trim() === "") {
        alert("Please enter your username.");
        return;
    }

    // Reset score and timer
    score = 0;
    timeLeft = 20; 
    clearInterval(timerInterval); 

    // Hide start container and button
    startButton.classList.add('hide');
    document.querySelector('.start-container').classList.add('hide');

    const selectedCategory = categorySelect.value;
    questions = allQuestions[selectedCategory];
    currentQuestionIndex = 0;

    // Update the title to show "Question X/Y"
    quizTitle.innerText = `Question 1/${questions.length}`;

    questionContainer.classList.remove('hide'); 
    setNextQuestion(); 
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);

    // Update the title dynamically with the current question number
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
    if (correct) {
        score++;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    });
    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
    } else {
        clearInterval(timerInterval);
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
    
    // Keep the title showing the final score
    quizTitle.innerText = `Your Final Score: ${score}`;
    
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
    questionContainer.classList.add('hide');  // Hide question container on restart

    // Reset the title back to "Welcome to Quiztastic!" on restart
    quizTitle.innerText = "Welcome to Quiztastic!";
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
