const quizData = [
    {
        question: "What is the capital of France?",
        type: "text", // Normal text-based question
        answers: [
            "Berlin",
            "Madrid",
            "Paris",
            "Rome"
        ],
        correct: 2  // Correct answer is "Paris"
    },
    {
        question: "Which of these is the Eiffel Tower?",
        type: "image", // Image-based question
        answers: [
            "./assets/images/eifel-tower.jpg",
            "./assets/images/statue-of-liberty.jpg",
            "./assets/images/coloseum.jpg",
            "./assets/images/big-ben.jpg"
        ],
        correct: 0  // Correct answer is the first image
    },
    {
        question: "Which is the most widely spoken language in the world?",
        type: "text", // Another text-based question
        answers: [
            "English",
            "Mandarin",
            "Spanish",
            "Hindi"
        ],
        correct: 1  // Correct answer is "Mandarin"
    },
    {
        question: "Which painting was created by Leonardo da Vinci?",
        type: "image", // Image-based question
        answers: [
            "assets/images/starry-night.jpg",
            "assets/images/mona-lisa.jpg",
            "assets/images/the-scream.jpg",
            "assets/images/girl-with-pearl.jpg"
        ],
        correct: 1  // Correct answer is "Mona Lisa"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let username = '';

function startQuiz() {
    username = document.getElementById('username').value;
    if (username.trim() === '') {
        alert("Please enter your name to start.");
        return;
    }
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('username').style.display = 'none';
    loadQuestion();
}

function loadQuestion() {
    const questionData = quizData[currentQuestionIndex];

    // Display question text
    document.getElementById('question').innerText = questionData.question;

    // Display the answers (text or image)
    const answersContainer = document.getElementById('answers-container');
    answersContainer.innerHTML = '';  // Clear previous answers

    if (questionData.type === "text") {
        // Render text-based answers
        questionData.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.innerText = answer;
            button.classList.add('text-option');
            button.addEventListener('click', () => selectAnswer(index));
            answersContainer.appendChild(button);
        });
    } else if (questionData.type === "image") {
        // Render image-based answers
        questionData.answers.forEach((imageSrc, index) => {
            const imgOption = document.createElement('img');
            imgOption.src = imageSrc;
            imgOption.classList.add('image-option');
            imgOption.addEventListener('click', () => selectAnswer(index));
            answersContainer.appendChild(imgOption);
        });
    }

    // Show the next question button
    document.getElementById('next-btn').style.display = 'none';
}

function loadNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        // End of quiz, show final score
        showFinalScore();
    }
}

function selectAnswer(selectedIndex) {
    const questionData = quizData[currentQuestionIndex];
    if (selectedIndex === questionData.correct) {
        alert("Correct!");
        score++;
    } else {
        alert("Wrong answer.");
    }
    document.getElementById('next-btn').style.display = 'inline-block';
}

function showFinalScore() {
    document.getElementById('answers-container').style.display = 'none';
    document.getElementById('question').style.display = 'none';
    document.getElementById('next-btn').style.display = 'none';

    document.getElementById('final-score').innerText = `${username}, your final score is ${score}/${quizData.length}`;
    document.getElementById('restart-btn').style.display = 'inline-block';
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('answers-container').style.display = 'flex';
    document.getElementById('question').style.display = 'block';
    document.getElementById('restart-btn').style.display = 'none';
    document.getElementById('final-score').innerText = '';
    loadQuestion();
}
