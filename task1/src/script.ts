import { Question } from "./question.js";
import { generateQuestion, getFeedbackMessage, showSection } from "./utils.js";

(function() {
    const TEMP_EMAIL: string = "user@test.com";
    const TEMP_PASS: string = "admin123";
    const MAX_LOGIN_ATTEMPTS: number = 3;
    let attempts: number = 0;

    const loginSection = document.getElementById("login-section") as HTMLDivElement;
    const quizSetupSection = document.getElementById("quiz-setup-section") as HTMLDivElement;
    const quizSection = document.getElementById("quiz-section") as HTMLDivElement;
    const resultsSection = document.getElementById("results-section") as HTMLDivElement;
    const lockedSection = document.getElementById("locked-section") as HTMLDivElement;

    const loginForm = document.getElementById("login-form") as HTMLFormElement;
    const emailInput = document.getElementById("email-input") as HTMLInputElement;
    const passwordInput = document.getElementById("password-input") as HTMLInputElement;
    const loginMessage = document.getElementById("login-message") as HTMLParagraphElement;

    const quizSetupForm = document.getElementById("quiz-setup-form") as HTMLFormElement;
    const numQuestionsInput = document.getElementById("num-questions-input") as HTMLInputElement;
    const setupMessage = document.getElementById("setup-message") as HTMLParagraphElement;

    const questionsContainer = document.getElementById("questions-container") as HTMLDivElement;
    const submitQuizBtn = document.getElementById("submit-quiz-btn") as HTMLButtonElement;

    const resultsContainer = document.getElementById("results-container") as HTMLDivElement;
    const scoreDisplay = document.getElementById("score-display") as HTMLHeadingElement;
    const scoreFeedback = document.getElementById("score-feedback") as HTMLParagraphElement;
    const playAgainBtn = document.getElementById("play-again-btn") as HTMLButtonElement;

    let questions: Question[] = [];
    let sections: HTMLDivElement[] = [loginSection, quizSetupSection, quizSection, resultsSection, lockedSection];

    loginForm.addEventListener("submit", (e: Event): void => {
        e.preventDefault();

        let email: string = emailInput.value.trim();
        let password: string = passwordInput.value.trim();

        if(email === TEMP_EMAIL && password === TEMP_PASS) {
            showSection(quizSetupSection, sections);
        } else {
            attempts += 1;
            if(attempts === MAX_LOGIN_ATTEMPTS) {
                alert("You have exceeded the maximum number of login attempts. Please try again later.");
                showSection(lockedSection, sections);
            } else {
                loginMessage.textContent = `Invalid email or password. You have ${MAX_LOGIN_ATTEMPTS - attempts} trial(s) left.`;
            }
        }

        emailInput.value = "";
        passwordInput.value = "";
    });

    quizSetupForm.addEventListener("submit", (e: Event): void => {
        e.preventDefault();

        const numOfQuestions: number = parseInt(numQuestionsInput.value);
        if(isNaN(numOfQuestions) || numOfQuestions < 1 || numOfQuestions > 5) {
            setupMessage.textContent = "Please enter a valid number between 1 and 5.";
            return;
        }
        setupMessage.textContent = "";
        questions = [];
        questionsContainer.innerHTML = "";

        for (let i = 0; i < numOfQuestions; i++) {
            const question: Question = generateQuestion();
            questions.push(question);

            const questionDiv: HTMLDivElement = document.createElement("div");
            questionDiv.innerHTML = `
                <p><strong>Question ${i + 1}:</strong> ${question.num1} ${question.operator} ${question.num2} = ?</p>
                <label>Your answer: <input type="number" id="answer-${i}" /></label>
            `;

            questionsContainer.appendChild(questionDiv);
        }

        showSection(quizSection, sections);
    });

    submitQuizBtn.addEventListener("click", (): void => {
        let score: number = 0;
        const total: number = questions.length;
        resultsContainer.innerHTML = "";

        for (let i = 0; i < questions.length; i++) {
            let userInput = document.getElementById(`answer-${i}`) as HTMLInputElement;
            const userAnswer = parseInt(userInput.value);
            const isCorrect: boolean = userAnswer === questions[i].answer;

            if(isCorrect) {
                score++;
            }
            const resultP: HTMLParagraphElement = document.createElement("p");
            resultP.textContent = `Q${i + 1}: ${questions[i].num1} ${questions[i].operator} ${questions[i].num2} = ${questions[i].answer} | Your answer: ${isNaN(userAnswer) ? "No answer" : userAnswer} | ${isCorrect ? "✅ Correct (+1 point)" : "❌ Wrong (0 points)"}`;
            resultsContainer.appendChild(resultP);
        }
        scoreDisplay.textContent = `Final Score: ${score} out of ${total}`;
        scoreFeedback.textContent = getFeedbackMessage(score, total);

        showSection(resultsSection, sections);
    });

    playAgainBtn.addEventListener("click", (): void => {
        numQuestionsInput.value = "";
        showSection(quizSetupSection, sections);
    });
})();