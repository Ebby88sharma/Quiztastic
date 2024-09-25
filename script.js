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


let currentQuestionIndex;
let score = 0;

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
    setNextQuestion(selectedCategory);
    startButton.classList.add('hide');
}


function setNextQuestion(selectedCategory) {
    resetState();
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
}

function restartQuiz() {
    resultContainer.classList.add('hide');
    animationContainer.classList.add('hide');
    startButton.classList.remove('hide');
}
