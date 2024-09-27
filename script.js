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
const soundIcon = document.getElementById('sound-icon');
let currentQuestionIndex;
let score = 0;
let timeLeft = 20;
let timerInterval;

// Audio elements
const goodSound = document.getElementById('good-sound');
const poorSound = document.getElementById('poor-sound');
const clickSound = document.getElementById('click-sound');

// Sound control state
let isMuted = false;

// Function to toggle sound on/off
soundIcon.addEventListener('click', toggleSound);

function toggleSound() {
    isMuted = !isMuted;
    // Toggle icon
    soundIcon.classList.toggle('fa-volume-up', !isMuted);
    soundIcon.classList.toggle('fa-volume-mute', isMuted);
    
    // Mute/unmute sounds
    goodSound.muted = isMuted;
    poorSound.muted = isMuted;
    clickSound.muted = isMuted;
}

// Fetch questions data (JSON) and initialize quiz
function loadQuestions() {
    fetch('./assets/data/questions.json')
        .then(response => response.json())
        .then(data => {
            allQuestions = data;
        })
        .catch(error => {
            console.error('Error loading questions:', error);
        });
}

window.onload = loadQuestions;

// Toast message function
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.innerText = message;
    toast.className = "toast show";

    setTimeout(function() {
        toast.className = toast.className.replace("show", "");
    }, 3000);
}

startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', restartQuiz);

function startQuiz() {
    const username = document.getElementById('username').value;

    if (username.trim() === "") {
        showToast("Please enter your username.");
        return;
    }

    score = 0;
    timeLeft = 20;
    clearInterval(timerInterval);

    startButton.classList.add('hide');
    document.querySelector('.start-container').classList.add('hide');

    const selectedCategory = categorySelect.value;

    if (!allQuestions[selectedCategory]) {
        showToast("No questions available for the selected category.");
        return;
    }

    // Use the fetched questions
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
            showToast('Time is up!');
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
