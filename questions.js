"use strict";
// ==========================================================
// Quiz question bank (draft)
// Every question has 4 options, one correct answer and a short
// explanation that the app can show as feedback.
// The QuizQuestion interface lives in types.ts.
// ==========================================================
const questions = [
    // ---------- Software Engineering and the SDLC ----------
    {
        id: 1,
        topic: "SDLC",
        question: "In the Software Development Life Cycle, which stage is about understanding the problem and what users need?",
        options: ["Deployment", "Requirements", "Testing", "Maintenance"],
        correctIndex: 1,
        explanation: "Requirements is the first stage. You work out the problem and what users need before planning or building anything."
    },
    {
        id: 2,
        topic: "SDLC",
        question: "Which SDLC stage is used to find defects and check that features work correctly?",
        options: ["Design", "Planning", "Testing", "Development"],
        correctIndex: 2,
        explanation: "Testing finds defects and verifies that features work as expected."
    },
    {
        id: 3,
        topic: "SDLC",
        question: "Why are the SDLC stages often described as iterative?",
        options: [
            "Each stage can only happen once and must never be revisited",
            "Developers may return to earlier stages when testing reveals a problem or requirements change",
            "Only the Deployment stage can be repeated",
            "The stages are always finished in a single day"
        ],
        correctIndex: 1,
        explanation: "The stages are not a straight line. Testing or new requirements can send a team back to design or requirements."
    },
    {
        id: 4,
        topic: "SDLC",
        question: "Which activity belongs to the Maintenance stage?",
        options: [
            "Fixing bugs, improving security and adding features",
            "Gathering the requirements for the first version",
            "Drawing the first wireframes",
            "Choosing the project timeline"
        ],
        correctIndex: 0,
        explanation: "Maintenance happens after release: fixing bugs, improving security and adding or improving features."
    },
    {
        id: 5,
        topic: "Software Engineering",
        question: "What is the main difference between programming and Software Engineering?",
        options: [
            "Software Engineering is only about drawing designs",
            "They mean exactly the same thing",
            "Programming is writing code, while Software Engineering covers designing, building, testing, deploying and maintaining software",
            "Programming includes deployment, but Software Engineering does not"
        ],
        correctIndex: 2,
        explanation: "Programming is one part of the work. Software Engineering is the whole systematic process of solving real-world problems with software."
    },
    // ---------- Programming fundamentals ----------
    {
        id: 6,
        topic: "Programming fundamentals",
        question: "Which keyword declares a variable whose value can be reassigned later?",
        options: ["const", "function", "let", "return"],
        correctIndex: 2,
        explanation: "let allows the value to be reassigned. const does not."
    },
    {
        id: 7,
        topic: "Programming fundamentals",
        question: "In JavaScript, what does declaring a variable with const mean?",
        options: [
            "Its binding cannot be reassigned",
            "It can only store numbers",
            "It is deleted when the page loads",
            "It can be changed at any time"
        ],
        correctIndex: 0,
        explanation: "const creates a binding that cannot be reassigned, so it is good for values that should stay the same."
    },
    {
        id: 8,
        topic: "Programming fundamentals",
        question: "Which operator compares two values for strict equality (same type and value)?",
        options: ["==", "=", "===", "!="],
        correctIndex: 2,
        explanation: "=== checks both value and type without coercion. == converts types before comparing."
    },
    {
        id: 9,
        topic: "Programming fundamentals",
        question: "What does an array method that starts with 'map' typically do?",
        options: [
            "Add elements to the end of the array",
            "Create a new array by transforming each element",
            "Remove the last element",
            "Sort the array in place"
        ],
        correctIndex: 1,
        explanation: "map transforms each element and returns a new array of the same length."
    },
    {
        id: 10,
        topic: "Programming fundamentals",
        question: "In JavaScript, what is the result of typeof null?",
        options: ["null", "object", "undefined", "number"],
        correctIndex: 1,
        explanation: "typeof null returns 'object' — a well-known quirk in JavaScript."
    },
    {
        id: 11,
        topic: "Programming fundamentals",
        question: "Which statement is used to exit a loop early?",
        options: ["continue", "return", "break", "exit"],
        correctIndex: 2,
        explanation: "break exits the loop immediately; continue skips to the next iteration."
    },
    {
        id: 12,
        topic: "Programming fundamentals",
        question: "What is the main purpose of a function in programming?",
        options: [
            "To store data permanently",
            "To group reusable code into a named block",
            "To style web pages",
            "To declare variables only"
        ],
        correctIndex: 1,
        explanation: "Functions group code into reusable blocks that can be called multiple times."
    }
];
// Hand the question bank to the app (script.ts reads window.quizQuestions).
window.quizQuestions = questions;
//# sourceMappingURL=questions.js.map