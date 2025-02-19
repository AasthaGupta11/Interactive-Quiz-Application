//Slide Change
let slideIndex = 1;
function nextSlide() {
    const slides = document.querySelectorAll(".slide");
    slides[slideIndex - 1].classList.remove("active");
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    slides[slideIndex - 1].classList.add("active");
    timerload();
    loadQuestion();
}

//Questions with options and answers
const questions = [
    {
        question: "What does CPU stand for?",
        options: ["Central Process Unit", "Central Processing Unit", "Centralized Processing Unit", "Central Processor Unit"],
        answer: "Central Processing Unit"
    },
    {
        question: "Which programming language is known as the mother of all languages?",
        options: ["Python", "HTML", "Java", "C"],
        answer: "C"
    },
    {
        question: "What is the full form of HTML?",
        options: ["HyperText Markup Language", "HyperTool Markup Language", "HyperText Making Language", "Hyper Transfer Markup Language"],
        answer: "HyperText Markup Language"
    },
    {
        question: "Which of the following is the main component of the computer's central processing unit (CPU)?",
        options: ["ALU", "RAM", "GPU", "HDD"],
        answer: "ALU"
    },
    {
        question: "Which of the following is not a type of computer memory?",
        options: ["ROM", "RAM", "CPU", "Cache"],
        answer: "CPU"
    },
    {
        question: "Which data structure follows the Last In First Out (LIFO) principle?",
        options: ["Queue", "Stack", "LinkedList", "Array"],
        answer: "Stack"
    },
    {
        question: "Which of the following is a markup language used to structure content on the web?",
        options: ["Python", "HTML", "Java", "SQL"],
        answer: "HTML"
    },
    {
        question: "Which of these is a commonly used version control system?",
        options: ["MySQL", "Git", "Oracle", "PHP"],
        answer: "Git"
    },
    {
        question: "Which of the following is an example of an input device?",
        options: ["Printer", "Monitor", "Keyboard", "Speaker"],
        answer: "Keyboard"
    },
    {
        question: "Which of the following is NOT an object-oriented programming language?",
        options: ["Python", "C++", "Java", "C"],
        answer: "C"
    }
];

//Timer Setup
let timerInterval;
function timerload() {
    let timeLeft = 30;
    if (timerInterval) {
        clearInterval(timerInterval);
    }
    timerInterval = setInterval(function () {
        if (timeLeft > 0) {
            if (timeLeft < 10) {
                document.getElementById('time').innerHTML = "00:0" + timeLeft;
            } else {
                document.getElementById('time').innerHTML = "00:" + timeLeft;
            }
            timeLeft--;
        } else {
            clearInterval(timerInterval);
            document.getElementById('time').innerHTML = "Oops! Time's Up";
        }
    }, 1000);
}

//submit button
//On clicking submit button, it will verify the answer there itself as well as load the next question + reloads the timer.
let currentQuestionIndex = 0;
let score = 0;
function loadQuestion() {
    const questionData = questions[currentQuestionIndex];
    document.getElementById('question-text').textContent = questionData.question;
    document.getElementById('op1').textContent = questionData.options[0];
    document.getElementById('op2').textContent = questionData.options[1];
    document.getElementById('op3').textContent = questionData.options[2];
    document.getElementById('op4').textContent = questionData.options[3];

    const radios = document.getElementsByName('option');
    for (var i = 0; i < radios.length; i++) {
        radios[i].checked = false;
    }

    timerload();
}
function submit() {
    const radios = document.getElementsByName('option');
    let selectedIndex = -1;

    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            selectedIndex = parseInt(radios[i].value);
            break;
        }
    }

    if (selectedIndex !== -1) {
        let selectedAnswer = questions[currentQuestionIndex].options[selectedIndex];
        if (selectedAnswer === questions[currentQuestionIndex].answer) {
            score++;
        }

        console.log(`Selected Answer: ${selectedAnswer}, Correct Answer: ${questions[currentQuestionIndex].answer}, Score: ${score}`);
    } else {
        console.log("No answer selected!");
    }
    currentQuestionIndex++;
    if (currentQuestionIndex == questions.length){
        Swal.fire({
            title: 'Quiz Over!',
            text: `Your final score is: ${score}`,
            icon: 'success',
            confirmButtonText: 'Try Again'
        }).then((result) => {
            if (result.isConfirmed) {
                // Restart quiz or navigate to a different page
                currentQuestionIndex = 0;
                score = 0;
                loadQuestion();  // Restart the quiz
            }
        });
    } else {
    loadQuestion();
    }
}