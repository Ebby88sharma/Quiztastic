const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers: ["Paris", "London", "Rome", "Berlin"],
        correctAnswer: 0
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1
    }
    // Add more questions as needed
];

let currentQuestionIndex = 0;
let score = 0;
let username = '';

document.getElementById('startQuizBtn').addEventListener('click', function() {
    username = document.getElementById('username').value;
    if (username) {
        document.querySelector('header').style.display = 'none';
        document.getElementById('quizSection').style.display = 'block';
        displayQuestion();
    }
});

function displayQuestion() {
    const questionData = quizQuestions[currentQuestionIndex];
    document.getElementById('questionTitle').textContent = `Question ${currentQuestionIndex + 1}:`;
    document.getElementById('questionText').textContent = questionData.question;
    
    const answersDiv = document.getElementById('answers');
    answersDiv.innerHTML = '';
    questionData.answers.forEach((answer, index) => {
        const answerBtn = document.createElement('button');
        answerBtn.textContent = answer;
        answerBtn.addEventListener('click', () => checkAnswer(index));
        answersDiv.appendChild(answerBtn);
    });
}

function checkAnswer(selectedAnswer) {
    const correctAnswer = quizQuestions[currentQuestionIndex].correctAnswer;
    if (selectedAnswer === correctAnswer) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    document.getElementById('quizSection').style.display = 'none';
    document.getElementById('resultSection').style.display = 'block';
    document.getElementById('score').textContent = `${score}/${quizQuestions.length}`;
    
    if (score === quizQuestions.length) {
        document.getElementById('feedback').textContent = 'Excellent job!';
    } else if (score > quizQuestions.length / 2) {
        document.getElementById('feedback').textContent = 'Good effort!';
    } else {
        document.getElementById('feedback').textContent = 'Better luck next time!';
    }
}
