// ==========================================================
// Shared type definitions for the SE Quiz app.
// This file is loaded first so that questions.ts and script.ts
// can both use the same interfaces.
// ==========================================================

// One question from the quiz question bank.
interface QuizQuestion {
    id: number;
    topic: string;
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

// One completed quiz, stored in localStorage.
interface QuizAttempt {
    id: string;
    date: string;
    score: number;
    correct: number;
    total: number;
    durationSeconds: number;
    topic: string;
}

// One answered question, used on the results screen.
interface AnswerReview {
    question: QuizQuestion;
    selectedIndex: number | null;
    isCorrect: boolean;
}

// questions.js puts the question bank on the window object.
interface Window {
    quizQuestions?: QuizQuestion[];
}
