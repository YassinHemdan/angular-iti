function getRandInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function generateQuestion() {
    const operators = ["+", "-", "*", "/"];
    let operator = operators[getRandInt(0, 3)];
    let num1 = getRandInt(1, 50);
    let num2 = getRandInt(1, 50);
    let answer;
    switch (operator) {
        case "+":
            answer = num1 + num2;
            break;
        case "-":
            if (num2 > num1) {
                [num1, num2] = [num2, num1];
            }
            answer = num1 - num2;
            break;
        case "*":
            num1 = getRandInt(1, 12);
            num2 = getRandInt(1, 12);
            answer = num1 * num2;
            break;
        case "/":
            num2 = getRandInt(1, 12);
            answer = getRandInt(1, 12);
            num1 = num2 * answer;
            break;
        default:
            answer = 0;
    }
    return { num1, num2, operator, answer };
}
export function showSection(activeSection, sections) {
    for (let i = 0; i < sections.length; i++) {
        sections[i].hidden = sections[i] !== activeSection;
    }
}
export function getFeedbackMessage(score, total) {
    const percentage = (score / total) * 100;
    if (percentage === 100) {
        return "Perfect score! Excellent work!";
    }
    else if (percentage >= 60) {
        return "Good job! Keep practicing!";
    }
    else if (percentage > 0) {
        return "Nice try! You can do better next time!";
    }
    else {
        return "Don't worry, try again and you'll improve!";
    }
}
