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
const quizTitle = document.getElementById('quizTitle');  
let currentQuestionIndex;
let score = 0;
let timeLeft = 20;
let timerInterval;


    const goodSound = document.getElementById('good-sound');
    const poorSound = document.getElementById('poor-sound');

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
            question: 'Who wrote "Hamlet"?',
            answers: [
                { text: 'J.K. Rowling', correct: false },
                { text: 'William Shakespeare', correct: true },
                { text: 'Charles Dickens', correct: false },
            ]
        },
        {
            question: 'Which country hosted the 2012 Olympics?',
            answers: [
                { text: 'China', correct: false },
                { text: 'UK', correct: true },
                { text: 'Russia', correct: false },
            ]
        },
        {
            question: 'What is the world’s smallest country?',
            answers: [
                { text: 'Monaco', correct: false },
                { text: 'Vatican City', correct: true },
                { text: 'Malta', correct: false },
            ]
        },
        {
            question: 'Which language is spoken in Brazil?',
            answers: [
                { text: 'Spanish', correct: false },
                { text: 'Portuguese', correct: true },
                { text: 'French', correct: false },
            ]
        },
        {
            question: 'What is the largest desert in the world?',
            answers: [
                { text: 'Sahara', correct: true },
                { text: 'Gobi', correct: false },
                { text: 'Kalahari', correct: false },
            ]
        },
        {
            question: 'How many continents are there?',
            answers: [
                { text: '5', correct: false },
                { text: '7', correct: true },
                { text: '6', correct: false },
            ]
        },
        {
            question: 'Who painted the Mona Lisa?',
            answers: [
                { text: 'Vincent van Gogh', correct: false },
                { text: 'Leonardo da Vinci', correct: true },
                { text: 'Pablo Picasso', correct: false },
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
        },
        {
            question: 'What is the powerhouse of the cell?',
            answers: [
                { text: 'Nucleus', correct: false },
                { text: 'Mitochondria', correct: true },
                { text: 'Chloroplast', correct: false },
            ]
        },
        {
            question: 'What is the speed of light?',
            answers: [
                { text: '300,000 km/s', correct: true },
                { text: '30,000 km/s', correct: false },
                { text: '300 km/s', correct: false },
            ]
        },
        {
            question: 'What is the atomic number of carbon?',
            answers: [
                { text: '12', correct: false },
                { text: '6', correct: true },
                { text: '14', correct: false },
            ]
        },
        {
            question: 'What is the largest organ in the human body?',
            answers: [
                { text: 'Heart', correct: false },
                { text: 'Skin', correct: true },
                { text: 'Liver', correct: false },
            ]
        },
        {
            question: 'What gas do plants absorb from the atmosphere?',
            answers: [
                { text: 'Oxygen', correct: false },
                { text: 'Carbon Dioxide', correct: true },
                { text: 'Nitrogen', correct: false },
            ]
        },
        {
            question: 'Who developed the theory of relativity?',
            answers: [
                { text: 'Isaac Newton', correct: false },
                { text: 'Albert Einstein', correct: true },
                { text: 'Galileo Galilei', correct: false },
            ]
        }
    ],
    "History": [
        {
            question: 'Who was the first President of the United States?',
            answers: [
                { text: 'Abraham Lincoln', correct: false },
                { text: 'George Washington', correct: true },
                { text: 'Thomas Jefferson', correct: false },
            ]
        },
        {
            question: 'In which year did World War II end?',
            answers: [
                { text: '1945', correct: true },
                { text: '1918', correct: false },
                { text: '1939', correct: false },
            ]
        },
        {
            question: 'Who discovered America?',
            answers: [
                { text: 'Christopher Columbus', correct: true },
                { text: 'Ferdinand Magellan', correct: false },
                { text: 'Vasco da Gama', correct: false },
            ]
        },
        {
            question: 'What year was the Declaration of Independence signed?',
            answers: [
                { text: '1776', correct: true },
                { text: '1789', correct: false },
                { text: '1812', correct: false },
            ]
        },
        {
            question: 'Who was the British Prime Minister during WWII?',
            answers: [
                { text: 'Winston Churchill', correct: true },
                { text: 'Neville Chamberlain', correct: false },
                { text: 'Margaret Thatcher', correct: false },
            ]
        },
        {
            question: 'Which Roman emperor built a massive wall across Northern Britain?',
            answers: [
                { text: 'Hadrian', correct: true },
                { text: 'Nero', correct: false },
                { text: 'Augustus', correct: false },
            ]
        },
        {
            question: 'Who was the first woman to fly solo across the Atlantic?',
            answers: [
                { text: 'Amelia Earhart', correct: true },
                { text: 'Bessie Coleman', correct: false },
                { text: 'Harriet Quimby', correct: false },
            ]
        },
        {
            question: 'What year did the Titanic sink?',
            answers: [
                { text: '1912', correct: true },
                { text: '1905', correct: false },
                { text: '1918', correct: false },
            ]
        }
    ],
    "Sports": [
        {
            question: 'How many players are there on a soccer team?',
            answers: [
                { text: '11', correct: true },
                { text: '9', correct: false },
                { text: '7', correct: false },
            ]
        },
        {
            question: 'Which country hosted the 2016 Summer Olympics?',
            answers: [
                { text: 'China', correct: false },
                { text: 'Brazil', correct: true },
                { text: 'Russia', correct: false },
            ]
        },
        {
            question: 'What is the national sport of Japan?',
            answers: [
                { text: 'Baseball', correct: false },
                { text: 'Sumo Wrestling', correct: true },
                { text: 'Karate', correct: false },
            ]
        },
        {
            question: 'Which sport uses a shuttlecock?',
            answers: [
                { text: 'Tennis', correct: false },
                { text: 'Badminton', correct: true },
                { text: 'Squash', correct: false },
            ]
        },
        {
            question: 'What is the diameter of a basketball hoop in inches?',
            answers: [
                { text: '16 inches', correct: false },
                { text: '18 inches', correct: true },
                { text: '20 inches', correct: false },
            ]
        },
        {
            question: 'Which country won the first ever World Cup in 1930?',
            answers: [
                { text: 'Brazil', correct: false },
                { text: 'Uruguay', correct: true },
                { text: 'Argentina', correct: false },
            ]
        },
        {
            question: 'In what sport do players aim to hit a birdie?',
            answers: [
                { text: 'Tennis', correct: false },
                { text: 'Badminton', correct: true },
                { text: 'Table Tennis', correct: false },
            ]
        },
        {
            question: 'Which sport is known as the "king of sports"?',
            answers: [
                { text: 'Basketball', correct: false },
                { text: 'Soccer', correct: true },
                { text: 'Cricket', correct: false },
            ]
        }
    ],
    "Geography": [
        {
            question: 'Which is the largest continent by land area?',
            answers: [
                { text: 'Africa', correct: false },
                { text: 'Asia', correct: true },
                { text: 'Europe', correct: false },
            ]
        },
        {
            question: 'Which is the longest river in the world?',
            answers: [
                { text: 'Amazon River', correct: true },
                { text: 'Nile River', correct: false },
                { text: 'Yangtze River', correct: false },
            ]
        },
        {
            question: 'Which country has the most natural lakes?',
            answers: [
                { text: 'Canada', correct: true },
                { text: 'Russia', correct: false },
                { text: 'United States', correct: false },
            ]
        },
        {
            question: 'What is the capital city of Australia?',
            answers: [
                { text: 'Sydney', correct: false },
                { text: 'Canberra', correct: true },
                { text: 'Melbourne', correct: false },
            ]
        },
        {
            question: 'What is the tallest mountain in the world?',
            answers: [
                { text: 'Mount Everest', correct: true },
                { text: 'K2', correct: false },
                { text: 'Kangchenjunga', correct: false },
            ]
        },
        {
            question: 'Which ocean is the largest?',
            answers: [
                { text: 'Atlantic Ocean', correct: false },
                { text: 'Pacific Ocean', correct: true },
                { text: 'Indian Ocean', correct: false },
            ]
        },
        {
            question: 'Which country is both an island and a continent?',
            answers: [
                { text: 'New Zealand', correct: false },
                { text: 'Australia', correct: true },
                { text: 'Greenland', correct: false },
            ]
        },
        {
            question: 'What is the smallest continent by land area?',
            answers: [
                { text: 'Australia', correct: true },
                { text: 'Europe', correct: false },
                { text: 'Antarctica', correct: false },
            ]
        }
    ]
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
    questions = shuffle([...allQuestions[selectedCategory]]);

    currentQuestionIndex = 0;

    quizTitle.innerText = `Question 1/${questions.length}`;
    questionContainer.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);

    quizTitle.innerText = `Question ${currentQuestionIndex + 1}/${questions.length}`;

    updateProgressBar();

    resetTimer();
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    
    const shuffledAnswers = shuffle([...question.answers]);
    
    shuffledAnswers.forEach(answer => {
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

    const clickSound = document.getElementById('click-sound');
    clickSound.play();

    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
        button.disabled = true;
    });

    if (correct) {
        score++;
    }

    clickSound.onended = () => {
        if (questions.length > currentQuestionIndex + 1) {
            currentQuestionIndex++;
            setNextQuestion();
        } else {
            clearInterval(timerInterval);
            showFinalScore();
        }
    };
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

    const performancePercentage = (score / questions.length) * 100;

    goodSound.pause();
    poorSound.pause();
    goodSound.currentTime = 0;
    poorSound.currentTime = 0;

    if (performancePercentage > 70) {
        animationContainer.classList.remove('hide');
        animationContainer.classList.add('success');
        animationContainer.innerHTML = 'Congratulations! 🎉';
        goodSound.play(); 
    } else {
        animationContainer.classList.remove('hide');
        animationContainer.classList.add('fail');
        animationContainer.innerHTML = 'Try Again! 😔';
        poorSound.play(); 
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

    progressBar.style.width = '0%';


    goodSound.pause();
    poorSound.pause();
    goodSound.currentTime = 0;
    poorSound.currentTime = 0;
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

const progressBar = document.getElementById('progress');

function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = progress + '%';
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}