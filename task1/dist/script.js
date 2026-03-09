import { generateQuestion, getFeedbackMessage, showSection } from "./utils.js";
(function () {
    const TEMP_EMAIL = "user@test.com";
    const TEMP_PASS = "admin123";
    const MAX_LOGIN_ATTEMPTS = 3;
    let attempts = 0;
    const loginSection = document.getElementById("login-section");
    const quizSetupSection = document.getElementById("quiz-setup-section");
    const quizSection = document.getElementById("quiz-section");
    const resultsSection = document.getElementById("results-section");
    const lockedSection = document.getElementById("locked-section");
    const loginForm = document.getElementById("login-form");
    const emailInput = document.getElementById("email-input");
    const passwordInput = document.getElementById("password-input");
    const loginMessage = document.getElementById("login-message");
    const quizSetupForm = document.getElementById("quiz-setup-form");
    const numQuestionsInput = document.getElementById("num-questions-input");
    const setupMessage = document.getElementById("setup-message");
    const questionsContainer = document.getElementById("questions-container");
    const submitQuizBtn = document.getElementById("submit-quiz-btn");
    const resultsContainer = document.getElementById("results-container");
    const scoreDisplay = document.getElementById("score-display");
    const scoreFeedback = document.getElementById("score-feedback");
    const playAgainBtn = document.getElementById("play-again-btn");
    let questions = [];
    let sections = [loginSection, quizSetupSection, quizSection, resultsSection, lockedSection];
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let email = emailInput.value.trim();
        let password = passwordInput.value.trim();
        if (email === TEMP_EMAIL && password === TEMP_PASS) {
            showSection(quizSetupSection, sections);
        }
        else {
            attempts += 1;
            if (attempts === MAX_LOGIN_ATTEMPTS) {
                alert("You have exceeded the maximum number of login attempts. Please try again later.");
                showSection(lockedSection, sections);
            }
            else {
                loginMessage.textContent = `Invalid email or password. You have ${MAX_LOGIN_ATTEMPTS - attempts} trial(s) left.`;
            }
        }
        emailInput.value = "";
        passwordInput.value = "";
    });
    quizSetupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const numOfQuestions = parseInt(numQuestionsInput.value);
        if (isNaN(numOfQuestions) || numOfQuestions < 1 || numOfQuestions > 5) {
            setupMessage.textContent = "Please enter a valid number between 1 and 5.";
            return;
        }
        setupMessage.textContent = "";
        questions = [];
        questionsContainer.innerHTML = "";
        for (let i = 0; i < numOfQuestions; i++) {
            const question = generateQuestion();
            questions.push(question);
            const questionDiv = document.createElement("div");
            questionDiv.innerHTML = `
                <p><strong>Question ${i + 1}:</strong> ${question.num1} ${question.operator} ${question.num2} = ?</p>
                <label>Your answer: <input type="number" id="answer-${i}" /></label>
            `;
            questionsContainer.appendChild(questionDiv);
        }
        showSection(quizSection, sections);
    });
    submitQuizBtn.addEventListener("click", () => {
        let score = 0;
        const total = questions.length;
        resultsContainer.innerHTML = "";
        for (let i = 0; i < questions.length; i++) {
            let userInput = document.getElementById(`answer-${i}`);
            const userAnswer = parseInt(userInput.value);
            const isCorrect = userAnswer === questions[i].answer;
            if (isCorrect) {
                score++;
            }
            const resultP = document.createElement("p");
            resultP.textContent = `Q${i + 1}: ${questions[i].num1} ${questions[i].operator} ${questions[i].num2} = ${questions[i].answer} | Your answer: ${isNaN(userAnswer) ? "No answer" : userAnswer} | ${isCorrect ? "✅ Correct (+1 point)" : "❌ Wrong (0 points)"}`;
            resultsContainer.appendChild(resultP);
        }
        scoreDisplay.textContent = `Final Score: ${score} out of ${total}`;
        scoreFeedback.textContent = getFeedbackMessage(score, total);
        showSection(resultsSection, sections);
    });
    playAgainBtn.addEventListener("click", () => {
        numQuestionsInput.value = "";
        showSection(quizSetupSection, sections);
    });
})();
