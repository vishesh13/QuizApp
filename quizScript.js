const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});

function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random - .5);
    currentQuestionIndex = 0;
    questionContainer.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
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

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    }
    else {
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    correct ? element.classList.add('correct') : element.classList.add('wrong');
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

const questions = [
    {
        question: 'Javascript is _________ language.',
        answers: [
            { text: 'A. Application', correct: false },
            { text: 'B. Scripting', correct: true },
            { text: 'C. None of These', correct: false },
            { text: 'D. Programming', correct: false },
        ]
    },
    {
        question: 'JavaScript is ______ Side Scripting Language.',
        answers: [
            { text: 'A. None of These', correct: false },
            { text: 'B. ISP', correct: false },
            { text: 'C. Browser', correct: true },
            { text: 'D. Server', correct: true },
        ]
    },
    {
        question: 'JavaScript is designed for following purpose',
        answers: [
            { text: 'A. To add interactivity to HTML Pages.', correct: true },
            { text: 'B. To Style HTML Pages', correct: false },
            { text: 'C. To Perform Server Side Scripting Opertion', correct: false },
            { text: 'D. To Execute Query Related to DB on Server', correct: true },
        ]
    },
    {
        question: 'JavaScript is can be written -',
        answers: [
            { text: 'A. directly into HTML pages', correct: true },
            { text: 'B. directly on the Server Script', correct: false },
            { text: 'C. directly into JS file and included into HTML', correct: true },
            { text: 'D. None of these', correct: false },
        ]
    },
    {
        question: 'JavaScript is an ________ language.',
        answers: [
            { text: 'A. compiled', correct: false },
            { text: 'B. interpreted', correct: true },
        ]
    }
];

