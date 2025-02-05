const questions = [
    { 
        question: "Which is the tallest mountain in the world?", 
        options: ["K2", "Mount Everest", "Kangchenjunga", "Lhotse"], 
        answer: 1,
        hint: "It's located in the Himalayas.",
        image: "mount.jpg"
    },
    { 
        question: "What is the capital of France?", 
        options: ["Berlin", "Madrid", "Paris", "Lisbon"], 
        answer: 2,
        hint: "It's known as the city of love.",
        image: "paris.jpg"
    },
    { 
        question: "Who painted the Mona Lisa?", 
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"], 
        answer: 2,
        hint: "The artist was also an inventor.",
        image: "leonardo.jpg"
    },
    { 
        question: "What is the chemical symbol for water?", 
        options: ["O2", "CO2", "H2O", "H2SO4"], 
        answer: 2,
        hint: "It contains hydrogen and oxygen.",
        image: "water.jpg"
    },
    { 
        question: "Which planet is known as the Red Planet?", 
        options: ["Earth", "Mars", "Jupiter", "Saturn"], 
        answer: 1,
        hint: "It is named after the Roman god of war.",
        image: "mars.jpg"
    }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 10;

const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const questionElement = document.getElementById("question");
const imageElement = document.getElementById("answer-image");
const optionsElement = document.getElementById("options");
const feedbackElement = document.getElementById("feedback");
const finalScoreElement = document.getElementById("final-score");
const congratsImage = document.getElementById("congrats-image");
const hintElement = document.getElementById("hint");
const hintButton = document.getElementById("hint-btn");
const nextButton = document.getElementById("next-btn");
const submitButton = document.getElementById("submit-btn");

function startTimer() {
    timeLeft = 10;
    document.getElementById("timer").innerText = `Time Left: ${timeLeft} seconds`;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = `Time Left: ${timeLeft} seconds`;
        if (timeLeft === 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function loadQuestion() {
    clearInterval(timer);
    startTimer();

    let question = questions[currentQuestion];
    questionElement.innerText = question.question;
    imageElement.src = question.image;
    imageElement.style.display = "none"; 
    optionsElement.innerHTML = "";
    hintElement.innerText = "";
    hintElement.style.display = "none";
    feedbackElement.innerText = "";
    feedbackElement.style.display = "none";

    question.options.forEach((option, index) => {
        let button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option");
        button.addEventListener("click", function () {
            document.querySelectorAll(".option").forEach(opt => opt.classList.remove("selected", "correct", "wrong"));
            button.classList.add("selected");

            if (index === question.answer) {
                button.classList.add("correct");
                feedbackElement.innerText = "Correct ✅";
                score++;
            } else {
                button.classList.add("wrong");
                feedbackElement.innerText = "Wrong ❌";
            }

            feedbackElement.style.display = "block";
            imageElement.style.display = "block"; 
        });
        optionsElement.appendChild(button);
    });

    nextButton.style.display = currentQuestion < questions.length - 1 ? "block" : "none";
    submitButton.style.display = currentQuestion === questions.length - 1 ? "block" : "none";
}

function startQuiz() {
    document.getElementById("start-btn").style.display = "none"; 
    document.getElementById("quiz-container").style.display = "block"; 
    loadQuestion(); 
    startTimer(); 
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    }
}

function showHint() {
    hintElement.innerText = questions[currentQuestion].hint;
    hintElement.style.display = "block";
}

function showResults() {
    quizContainer.style.display = "none";
    resultContainer.style.display = "block";
    finalScoreElement.innerText = `You scored ${score} out of 5!`;

    if (score === 5) {
        finalScoreElement.innerText += " 🎉 Congratulations!";
        congratsImage.style.display = "block";
    }
}

function restartQuiz() {
    location.reload();
}

loadQuestion();
