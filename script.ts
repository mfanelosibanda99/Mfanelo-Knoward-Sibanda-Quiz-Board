// SE Quiz app logic: dashboard, quiz, scoring, history and achievements.
// The shared interfaces live in types.ts and the question bank lives in questions.ts.

const HISTORY_KEY = "seQuizAttempts";
const NAME_KEY = "seQuizLearnerName";
const QUIZ_LENGTH = 10;
const SECONDS_PER_QUESTION = 35;
const QUIZ_TITLE = "Software Engineering Quiz";
const CIRCUMFERENCE = 2 * Math.PI * 44;

function el<T extends Element = HTMLElement>(id: string): T {
    const node = document.getElementById(id);
    if (!node) throw new Error(`Required HTML element #${id} was not found.`);
    return node as unknown as T;
}

const dashboardView = el<HTMLElement>("dashboard-view");
const quizView = el<HTMLElement>("quiz-view");
const resultsView = el<HTMLElement>("results-view");
const startButton = el<HTMLAnchorElement>("start-quiz-btn");
const answerForm = el<HTMLFormElement>("answer-form");
const optionsBox = el<HTMLFieldSetElement>("options");
const nextButton = el<HTMLButtonElement>("next-btn");
const quitButton = el<HTMLButtonElement>("quit-btn");
const restartButton = el<HTMLButtonElement>("restart-btn");
const backButton = el<HTMLAnchorElement>("back-dashboard-btn");
const clearButton = el<HTMLButtonElement>("clear-history-btn");
const navDashboard = el<HTMLAnchorElement>("nav-dashboard");
const navQuiz = el<HTMLAnchorElement>("nav-quiz");

const userName = el<HTMLElement>("user-name");
const statTaken = el<HTMLElement>("stat-taken");
const statAverage = el<HTMLElement>("stat-average");
const statBest = el<HTMLElement>("stat-best");
const statCorrect = el<HTMLElement>("stat-correct");
const achievementsGrid = el<HTMLElement>("achievements-grid");
const achievementsCount = el<HTMLElement>("achievements-count");
const historyList = el<HTMLUListElement>("history-list");
const historyEmpty = el<HTMLElement>("history-empty");
const questionCounter = el<HTMLElement>("question-counter");
const quizProgress = el<HTMLElement>("quiz-progress");
const progressBar = el<HTMLElement>("progress-bar");
const answeredCounter = el<HTMLElement>("answered-counter");
const timerProgress = el<SVGCircleElement>("timer-progress");
const timerText = el<HTMLElement>("timer-text");
const questionTopic = el<HTMLElement>("question-topic");
const questionNumber = el<HTMLElement>("question-number");
const quizCategory = el<HTMLElement>("quiz-category");
const questionText = el<HTMLElement>("question-text");
const formHint = el<HTMLElement>("form-hint");
const scoreRing = el<HTMLElement>("score-ring");
const resultPercent = el<HTMLElement>("result-percent");
const resultMessage = el<HTMLElement>("result-message");
const resultCorrect = el<HTMLElement>("result-correct");
const resultWrong = el<HTMLElement>("result-wrong");
const resultTime = el<HTMLElement>("result-time");
const newBadges = el<HTMLElement>("new-badges");
const newBadgesList = el<HTMLUListElement>("new-badges-list");
const reviewList = el<HTMLOListElement>("review-list");

let activeQuestions: QuizQuestion[] = [];
let currentIndex = 0;
let selectedAnswers: (number | null)[] = [];
let review: AnswerReview[] = [];
let startedAt = 0;
let secondsRemaining = 0;
let timerId: number | undefined;
let newlyUnlocked: string[] = [];
let quizActive = false;

const badgeNames: Record<string, string> = {
    "first-steps": "First Steps",
    "sharp-mind": "Sharp Mind",
    "perfect-score": "Perfect Score",
    "five-quizzes": "Five Quizzes",
    "level-up": "Level Up"
};

function readHistory(): QuizAttempt[] {
    try {
        const raw = localStorage.getItem(HISTORY_KEY);
        if (!raw) return [];
        const value: unknown = JSON.parse(raw);
        if (!Array.isArray(value)) return [];
        return value
            .filter((x): x is QuizAttempt =>
                x && typeof x.score === "number" && typeof x.correct === "number" &&
                typeof x.total === "number" && typeof x.date === "string"
            )
            .map(attempt => ({
                ...attempt,
                id: typeof attempt.id === "string" ? attempt.id : String(attempt.date),
                durationSeconds: typeof attempt.durationSeconds === "number" ? attempt.durationSeconds : 0,
                topic: typeof attempt.topic === "string" ? attempt.topic : QUIZ_TITLE
            }));
    } catch {
        return [];
    }
}

function saveHistory(history: QuizAttempt[]): void {
    try {
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch {
        alert("Your browser could not save quiz history. Check your browser storage settings.");
    }
}

function readLearnerName(): string {
    try {
        const stored = localStorage.getItem(NAME_KEY);
        if (stored && stored.trim()) return stored.trim();
    } catch {
        return "Learner";
    }
    return "Learner";
}

function saveLearnerName(name: string): void {
    try {
        localStorage.setItem(NAME_KEY, name);
    } catch {
        // Storage is full or blocked, the name just will not survive a reload.
    }
}

function duration(seconds: number): string {
    const n = Math.max(0, Math.floor(seconds));
    return `${String(Math.floor(n / 60)).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`;
}

function readableDate(value: string): string {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString(undefined, {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

function percentLabel(score: number): string {
    return `${Math.round(score)}%`;
}

function percentClass(score: number): string {
    if (score >= 80) return "good";
    if (score >= 50) return "average";
    return "poor";
}

function getQuestionBank(): QuizQuestion[] {
    const bank = window.quizQuestions ?? [];
    return bank.filter(q =>
        q && typeof q.question === "string" && Array.isArray(q.options) &&
        q.options.length > 0 && q.correctIndex >= 0 && q.correctIndex < q.options.length
    );
}

function shuffle<T>(items: T[]): T[] {
    const copy = items.slice();
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const swap = copy[i];
        copy[i] = copy[j];
        copy[j] = swap;
    }
    return copy;
}

function showView(view: HTMLElement): void {
    dashboardView.hidden = view !== dashboardView;
    quizView.hidden = view !== quizView;
    resultsView.hidden = view !== resultsView;

    const onQuiz = view === quizView;
    navDashboard.classList.toggle("active", !onQuiz);
    navQuiz.classList.toggle("active", onQuiz);
    if (onQuiz) {
        navDashboard.removeAttribute("aria-current");
    } else {
        navDashboard.setAttribute("aria-current", "page");
    }
}

function renderStats(history: QuizAttempt[]): void {
    const taken = history.length;
    statTaken.textContent = String(taken);

    if (taken === 0) {
        statAverage.textContent = "0%";
        statBest.textContent = "0%";
        statCorrect.textContent = "0";
        return;
    }

    const total = history.reduce((sum, attempt) => sum + attempt.score, 0);
    const best = history.reduce((max, attempt) => Math.max(max, attempt.score), 0);
    const correct = history.reduce((sum, attempt) => sum + attempt.correct, 0);

    statAverage.textContent = percentLabel(total / taken);
    statBest.textContent = percentLabel(best);
    statCorrect.textContent = String(correct);
}

function unlockedBadgeIds(history: QuizAttempt[]): string[] {
    const ordered = history.slice().sort((a, b) => a.date.localeCompare(b.date));
    const unlocked: string[] = [];

    if (ordered.length >= 1) unlocked.push("first-steps");
    if (ordered.some(a => a.score >= 80)) unlocked.push("sharp-mind");
    if (ordered.some(a => a.total > 0 && a.correct === a.total)) unlocked.push("perfect-score");
    if (ordered.length >= 5) unlocked.push("five-quizzes");

    let bestSoFar: number | null = null;
    let beatPrevious = false;
    for (const attempt of ordered) {
        if (bestSoFar !== null && attempt.score > bestSoFar) beatPrevious = true;
        bestSoFar = bestSoFar === null ? attempt.score : Math.max(bestSoFar, attempt.score);
    }
    if (beatPrevious) unlocked.push("level-up");

    return unlocked;
}

function renderAchievements(history: QuizAttempt[]): void {
    const unlocked = unlockedBadgeIds(history);
    const cards = achievementsGrid.querySelectorAll<HTMLElement>(".achievement");

    cards.forEach(card => {
        const id = card.dataset.id ?? "";
        card.classList.toggle("unlocked", unlocked.indexOf(id) !== -1);
    });

    achievementsCount.textContent = `${unlocked.length} of ${cards.length} unlocked`;
}

function renderHistory(history: QuizAttempt[]): void {
    historyList.replaceChildren();
    historyEmpty.hidden = history.length > 0;

    for (const attempt of history) {
        const item = document.createElement("li");
        item.className = "history-item";

        const main = document.createElement("div");
        main.className = "history-main";

        const title = document.createElement("span");
        title.className = "history-title";
        title.textContent = attempt.topic || QUIZ_TITLE;

        const date = document.createElement("span");
        date.className = "history-date";
        date.textContent = readableDate(attempt.date);

        const points = document.createElement("span");
        points.className = "history-points";
        points.textContent = `${attempt.correct}/${attempt.total} correct - ${duration(attempt.durationSeconds)}`;

        main.append(title, date, points);

        const score = document.createElement("div");
        score.className = "history-score";

        const percent = document.createElement("span");
        percent.className = `history-percent ${percentClass(attempt.score)}`;
        percent.textContent = percentLabel(attempt.score);

        score.append(percent);
        item.append(main, score);
        historyList.append(item);
    }
}

function renderDashboard(): void {
    const history = readHistory();
    renderStats(history);
    renderAchievements(history);
    renderHistory(history);
}

function updateProgressBar(): void {
    const total = activeQuestions.length || 1;
    const percent = Math.round((currentIndex / total) * 100);
    progressBar.style.width = `${percent}%`;
    quizProgress.setAttribute("aria-valuenow", String(percent));

    const answered = selectedAnswers.filter(a => a !== null).length;
    answeredCounter.textContent = `${answered} answered`;
}

function updateTimer(): void {
    const remaining = Math.max(0, secondsRemaining);
    timerText.textContent = duration(remaining);
    const ratio = remaining / SECONDS_PER_QUESTION;
    timerProgress.style.strokeDasharray = String(CIRCUMFERENCE);
    timerProgress.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - ratio));
}

function stopTimer(): void {
    if (timerId !== undefined) {
        window.clearInterval(timerId);
        timerId = undefined;
    }
}

function startTimer(): void {
    stopTimer();
    timerId = window.setInterval(() => {
        secondsRemaining -= 1;
        updateTimer();
        if (secondsRemaining <= 0) {
            stopTimer();
            advance();
        }
    }, 1000);
}

function renderOptions(question: QuizQuestion): void {
    optionsBox.replaceChildren();

    question.options.forEach((text, index) => {
        const label = document.createElement("label");
        label.className = "option";

        const input = document.createElement("input");
        input.type = "radio";
        input.name = "answer";
        input.value = String(index);
        input.checked = selectedAnswers[currentIndex] === index;

        const span = document.createElement("span");
        span.className = "option-text";
        span.textContent = text;

        const check = document.createElement("span");
        check.className = "option-check";
        check.setAttribute("aria-hidden", "true");

        label.append(input, span, check);
        optionsBox.append(label);
    });
}

function renderQuestion(): void {
    const question = activeQuestions[currentIndex];
    if (!question) return;

    const position = String(currentIndex + 1).padStart(2, "0");
    questionCounter.textContent = `${position} of ${String(activeQuestions.length).padStart(2, "0")}`;
    questionNumber.textContent = position;
    questionTopic.textContent = question.topic;
    quizCategory.textContent = QUIZ_TITLE;
    questionText.textContent = question.question;
    nextButton.textContent = currentIndex === activeQuestions.length - 1 ? "Finish" : "Next";
    formHint.hidden = true;

    updateProgressBar();
    renderOptions(question);
    updateTimer();
}

function startQuiz(): void {
    const bank = getQuestionBank();
    if (bank.length === 0) {
        alert("No quiz questions are available. Make sure questions.js is loaded.");
        return;
    }

    activeQuestions = shuffle(bank).slice(0, Math.min(QUIZ_LENGTH, bank.length));
    currentIndex = 0;
    selectedAnswers = activeQuestions.map(() => null);
    review = [];
    newlyUnlocked = [];
    startedAt = Date.now();
    secondsRemaining = SECONDS_PER_QUESTION;
    quizActive = true;

    showView(quizView);
    renderQuestion();
    startTimer();
}

function advance(): void {
    if (currentIndex >= activeQuestions.length - 1) {
        finishQuiz();
        return;
    }
    currentIndex += 1;
    secondsRemaining = SECONDS_PER_QUESTION;
    renderQuestion();
    startTimer();
}

function buildReview(): AnswerReview[] {
    return activeQuestions.map((question, index) => {
        const selected = selectedAnswers[index];
        return {
            question,
            selectedIndex: selected,
            isCorrect: selected === question.correctIndex
        };
    });
}

function finishQuiz(): void {
    stopTimer();
    quizActive = false;
    review = buildReview();

    const total = activeQuestions.length;
    const correct = review.filter(item => item.isCorrect).length;
    const score = total > 0 ? (correct / total) * 100 : 0;
    const durationSeconds = Math.max(0, Math.round((Date.now() - startedAt) / 1000));

    const attempt: QuizAttempt = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        date: new Date().toISOString(),
        score,
        correct,
        total,
        durationSeconds,
        topic: QUIZ_TITLE
    };

    const history = readHistory();
    const unlockedBefore = unlockedBadgeIds(history);
    const updated = [attempt, ...history];
    saveHistory(updated);

    const unlockedAfter = unlockedBadgeIds(updated);
    newlyUnlocked = unlockedAfter.filter(id => unlockedBefore.indexOf(id) === -1);

    renderResults(attempt);
    renderNewBadges();
    renderReview();
    showView(resultsView);
}

function renderResults(attempt: QuizAttempt): void {
    resultPercent.textContent = percentLabel(attempt.score);
    scoreRing.style.setProperty("--score", String(Math.round(attempt.score)));
    resultCorrect.textContent = String(attempt.correct);
    resultWrong.textContent = String(attempt.total - attempt.correct);
    resultTime.textContent = duration(attempt.durationSeconds);

    if (attempt.score >= 100) {
        resultMessage.textContent = "Perfect score. Outstanding work!";
    } else if (attempt.score >= 80) {
        resultMessage.textContent = "Great result. You really know this topic.";
    } else if (attempt.score >= 50) {
        resultMessage.textContent = "Good effort. Review the answers below and try again.";
    } else {
        resultMessage.textContent = "Keep going. Review the answers below and try again.";
    }
}

function renderNewBadges(): void {
    newBadges.hidden = newlyUnlocked.length === 0;
    newBadgesList.replaceChildren();

    for (const id of newlyUnlocked) {
        const item = document.createElement("li");
        item.textContent = badgeNames[id] ?? id;
        newBadgesList.append(item);
    }
}

function renderReview(): void {
    reviewList.replaceChildren();

    review.forEach((item, index) => {
        const entry = document.createElement("li");
        entry.className = `review-item ${item.isCorrect ? "correct" : "wrong"}`;

        const head = document.createElement("div");
        head.className = "review-head";

        const status = document.createElement("span");
        status.className = "review-status";
        status.textContent = item.isCorrect ? "✔" : "✘";
        status.setAttribute("aria-hidden", "true");

        const question = document.createElement("p");
        question.className = "review-question";
        question.textContent = `${index + 1}. ${item.question.question}`;

        head.append(status, question);

        const answer = document.createElement("p");
        answer.className = "review-answer";
        const answerText = document.createElement("strong");
        answerText.textContent = item.selectedIndex === null
            ? "No answer"
            : item.question.options[item.selectedIndex];
        answer.append("Your answer: ", answerText);

        const correct = document.createElement("p");
        correct.className = "review-correct";
        const correctText = document.createElement("strong");
        correctText.textContent = item.question.options[item.question.correctIndex];
        correct.append("Correct answer: ", correctText);

        const explanation = document.createElement("p");
        explanation.className = "review-explanation";
        explanation.textContent = item.question.explanation;

        entry.append(head, answer, correct, explanation);
        reviewList.append(entry);
    });
}

function goToDashboard(): void {
    stopTimer();
    showView(dashboardView);
    renderDashboard();
}

function goToQuiz(): void {
    if (quizActive) {
        showView(quizView);
        renderQuestion();
        startTimer();
        return;
    }
    startQuiz();
}

function clearHistory(): void {
    if (!window.confirm("Clear your quiz history and unlocked achievements?")) return;
    saveHistory([]);
    renderDashboard();
}

function route(): void {
    if (window.location.hash === "#quiz") {
        goToQuiz();
    } else {
        goToDashboard();
    }
}

answerForm.addEventListener("submit", (event: Event) => {
    event.preventDefault();

    const selected = optionsBox.querySelector<HTMLInputElement>("input[name='answer']:checked");
    if (!selected) {
        formHint.hidden = false;
        return;
    }

    formHint.hidden = true;
    selectedAnswers[currentIndex] = Number(selected.value);
    updateProgressBar();
    advance();
});

optionsBox.addEventListener("change", () => {
    formHint.hidden = true;
});

startButton.addEventListener("click", (event: Event) => {
    event.preventDefault();
    window.history.replaceState(null, "", "#quiz");
    goToQuiz();
});

navQuiz.addEventListener("click", (event: Event) => {
    event.preventDefault();
    window.history.replaceState(null, "", "#quiz");
    goToQuiz();
});

navDashboard.addEventListener("click", (event: Event) => {
    event.preventDefault();
    window.history.replaceState(null, "", "#dashboard");
    goToDashboard();
});

backButton.addEventListener("click", (event: Event) => {
    event.preventDefault();
    window.history.replaceState(null, "", "#dashboard");
    goToDashboard();
});

restartButton.addEventListener("click", () => {
    window.history.replaceState(null, "", "#quiz");
    goToQuiz();
});

quitButton.addEventListener("click", () => {
    if (!window.confirm("Quit this quiz? Your answers will not be saved.")) return;
    quizActive = false;
    window.history.replaceState(null, "", "#dashboard");
    goToDashboard();
});

clearButton.addEventListener("click", clearHistory);

userName.addEventListener("click", () => {
    const entered = window.prompt("What is your name?", readLearnerName());
    if (entered === null) return;
    const name = entered.trim();
    if (!name) return;
    userName.textContent = name;
    saveLearnerName(name);
});

window.addEventListener("hashchange", route);

function init(): void {
    userName.textContent = readLearnerName();
    renderDashboard();
    if (window.location.hash === "#quiz") {
        goToQuiz();
    } else {
        showView(dashboardView);
    }
}

init();
