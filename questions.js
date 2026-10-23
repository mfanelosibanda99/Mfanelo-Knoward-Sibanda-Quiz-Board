"use strict";
const questions = [
    // ==========================================
    // LEVEL 1: SOFTWARE ENGINEERING & SDLC
    // ==========================================
    {
        id: 1,
        level: 1,
        topic: "SDLC",
        question: "In the Software Development Life Cycle, which stage identifies what users need?",
        options: ["Deployment", "Requirements", "Testing", "Maintenance"],
        correctIndex: 1,
        explanation: "Requirements gathering identifies the problem and what users need before development begins."
    },
    {
        id: 2,
        level: 1,
        topic: "SDLC",
        question: "Which SDLC stage checks software for defects?",
        options: ["Design", "Planning", "Testing", "Development"],
        correctIndex: 2,
        explanation: "Testing checks whether the software works correctly and helps identify defects."
    },
    {
        id: 3,
        level: 1,
        topic: "SDLC",
        question: "Why are SDLC stages often described as iterative?",
        options: [
            "Each stage happens only once",
            "Teams may revisit earlier stages when requirements change or testing reveals problems",
            "Only deployment can be repeated",
            "All stages must finish in one day"
        ],
        correctIndex: 1,
        explanation: "Development teams can revisit earlier stages when problems or new requirements arise."
    },
    {
        id: 4,
        level: 1,
        topic: "SDLC",
        question: "Which activity belongs to software maintenance?",
        options: [
            "Fixing bugs and improving security after release",
            "Gathering initial requirements only",
            "Drawing the first wireframes only",
            "Choosing the original project name"
        ],
        correctIndex: 0,
        explanation: "Maintenance includes fixing defects, improving security and updating released software."
    },
    {
        id: 5,
        level: 1,
        topic: "Software Engineering",
        question: "What is the main difference between programming and Software Engineering?",
        options: [
            "Software Engineering is only graphic design",
            "They mean exactly the same thing",
            "Programming involves writing code, while Software Engineering covers the broader process of designing, building, testing and maintaining software",
            "Software Engineering excludes testing"
        ],
        correctIndex: 2,
        explanation: "Programming is one part of the wider Software Engineering process."
    },
    {
        id: 6,
        level: 1,
        topic: "Software Testing",
        question: "What is the main purpose of software testing?",
        options: [
            "To guarantee that software never needs maintenance",
            "To identify defects and check whether requirements are met",
            "To replace all documentation",
            "To make the application look attractive only"
        ],
        correctIndex: 1,
        explanation: "Testing helps discover defects and evaluate whether the software behaves as expected."
    },
    {
        id: 7,
        level: 1,
        topic: "Requirements",
        question: "Which is an example of a functional requirement for IdleBid?",
        options: [
            "The website should use purple colours",
            "A buyer should be able to place a bid on an item",
            "The team should meet every Monday",
            "The project should use a particular font"
        ],
        correctIndex: 1,
        explanation: "A functional requirement describes something the system must do."
    },
    {
        id: 8,
        level: 1,
        topic: "Software Design",
        question: "What is the purpose of a wireframe during software design?",
        options: [
            "To show a basic layout of a screen",
            "To store user passwords",
            "To run automated tests",
            "To publish the application"
        ],
        correctIndex: 0,
        explanation: "A wireframe outlines a screen's structure and placement of key elements."
    },
    {
        id: 9,
        level: 1,
        topic: "Deployment",
        question: "What does deploying a web application generally mean?",
        options: [
            "Deleting the source code",
            "Making the application available in its target environment",
            "Writing the first requirement",
            "Creating a wireframe"
        ],
        correctIndex: 1,
        explanation: "Deployment makes software available in an environment where its intended users can access it."
    },
    {
        id: 10,
        level: 1,
        topic: "Project Planning",
        question: "Why is project planning important in Software Engineering?",
        options: [
            "It removes the need for communication",
            "It helps organize tasks, time, resources and project goals",
            "It guarantees there will be no bugs",
            "It replaces the development process"
        ],
        correctIndex: 1,
        explanation: "Planning helps a team coordinate resources, responsibilities, schedules and goals."
    },
    // ==========================================
    // LEVEL 2: JAVASCRIPT FUNDAMENTALS
    // ==========================================
    {
        id: 11,
        level: 2,
        topic: "JavaScript Variables",
        question: "Which keyword declares a variable whose value can be reassigned?",
        options: ["const", "function", "let", "return"],
        correctIndex: 2,
        explanation: "let declares a variable that can be reassigned."
    },
    {
        id: 12,
        level: 2,
        topic: "JavaScript Variables",
        question: "What does const mean in JavaScript?",
        options: [
            "The variable binding cannot be reassigned",
            "It can store numbers only",
            "It is deleted when the page loads",
            "Its value must always be null"
        ],
        correctIndex: 0,
        explanation: "const prevents reassignment of the binding, although objects and arrays declared with const can still have their contents changed."
    },
    {
        id: 13,
        level: 2,
        topic: "JavaScript Operators",
        question: "Which operator checks strict equality in JavaScript?",
        options: ["==", "=", "===", "!="],
        correctIndex: 2,
        explanation: "The === operator compares both value and type without automatic type conversion."
    },
    {
        id: 14,
        level: 2,
        topic: "JavaScript Arrays",
        question: "What does the map() method normally return?",
        options: [
            "A new array containing transformed elements",
            "The last array element only",
            "A sorted version of the original array in every case",
            "A Boolean value only"
        ],
        correctIndex: 0,
        explanation: "map() applies a callback to each element and returns a new array."
    },
    {
        id: 15,
        level: 2,
        topic: "JavaScript Types",
        question: "What does typeof null return in JavaScript?",
        options: ["null", "object", "undefined", "number"],
        correctIndex: 1,
        explanation: "typeof null returns object due to a longstanding JavaScript behaviour."
    },
    {
        id: 16,
        level: 2,
        topic: "JavaScript Loops",
        question: "Which statement exits a loop immediately?",
        options: ["continue", "return", "break", "exit"],
        correctIndex: 2,
        explanation: "break terminates the nearest enclosing loop."
    },
    {
        id: 17,
        level: 2,
        topic: "JavaScript Functions",
        question: "What is a function mainly used for?",
        options: [
            "Storing data permanently",
            "Grouping reusable code into a block",
            "Styling web pages",
            "Creating HTML files automatically"
        ],
        correctIndex: 1,
        explanation: "Functions organize reusable code that can be called when needed."
    },
    {
        id: 18,
        level: 2,
        topic: "JavaScript Conditionals",
        question: "Which statement allows code to run only when a condition is true?",
        options: ["if", "import", "interface", "package"],
        correctIndex: 0,
        explanation: "An if statement executes its block when the specified condition evaluates to true."
    },
    {
        id: 19,
        level: 2,
        topic: "JavaScript Events",
        question: "Which event commonly occurs when a user presses a button?",
        options: ["submit only", "click", "load only", "change only"],
        correctIndex: 1,
        explanation: "A button's click event occurs when the user activates it."
    },
    {
        id: 20,
        level: 2,
        topic: "JavaScript DOM",
        question: "What is the purpose of document.getElementById()?",
        options: [
            "To find an element by its ID",
            "To create a new database",
            "To declare a TypeScript interface",
            "To install a package"
        ],
        correctIndex: 0,
        explanation: "getElementById() returns the element matching the supplied ID, or null if no matching element exists."
    },
    // ==========================================
    // LEVEL 3: HTML, CSS, DOM & FORMS
    // ==========================================
    {
        id: 21,
        level: 3,
        topic: "HTML Forms",
        question: "Which HTML element groups controls for submitting user input?",
        options: ["<section>", "<form>", "<article>", "<footer>"],
        correctIndex: 1,
        explanation: "The form element groups controls used to collect and submit information."
    },
    {
        id: 22,
        level: 3,
        topic: "HTML Inputs",
        question: "Which input type is suitable for a user's email address?",
        options: ['type="text"', 'type="email"', 'type="colour"', 'type="range"'],
        correctIndex: 1,
        explanation: 'type="email" provides an input intended for email addresses and basic browser validation.'
    },
    {
        id: 23,
        level: 3,
        topic: "CSS",
        question: "What is CSS mainly responsible for?",
        options: [
            "Styling and layout",
            "Storing database records",
            "Managing Git branches",
            "Executing Python code"
        ],
        correctIndex: 0,
        explanation: "CSS controls the appearance and layout of web pages."
    },
    {
        id: 24,
        level: 3,
        topic: "CSS Selectors",
        question: "Which CSS selector targets an element with id='message'?",
        options: [".message", "#message", "message()", "*message"],
        correctIndex: 1,
        explanation: "The # selector targets an element by its ID."
    },
    {
        id: 25,
        level: 3,
        topic: "DOM",
        question: "What does DOM stand for?",
        options: [
            "Document Object Model",
            "Data Output Method",
            "Development Order Manager",
            "Digital Object Memory"
        ],
        correctIndex: 0,
        explanation: "The Document Object Model represents a web page as objects that JavaScript can access and modify."
    },
    {
        id: 26,
        level: 3,
        topic: "JavaScript Events",
        question: "What does addEventListener() do?",
        options: [
            "Registers a function to respond to an event",
            "Creates a database table",
            "Deletes an HTML element automatically",
            "Changes a variable into CSS"
        ],
        correctIndex: 0,
        explanation: "addEventListener() registers an event handler, such as one that responds to a click."
    },
    {
        id: 27,
        level: 3,
        topic: "HTML Forms",
        question: "Why might JavaScript call event.preventDefault() during form submission?",
        options: [
            "To stop the browser's default submission so custom handling can run",
            "To remove every input",
            "To install a package",
            "To make every field optional"
        ],
        correctIndex: 0,
        explanation: "preventDefault() prevents the default browser action, allowing JavaScript to validate or handle the form."
    },
    {
        id: 28,
        level: 3,
        topic: "HTML Attributes",
        question: "What does the required attribute do on an HTML input?",
        options: [
            "Requires a value before normal form submission",
            "Makes the field invisible",
            "Automatically saves data to a database",
            "Changes the input into a button"
        ],
        correctIndex: 0,
        explanation: "The required attribute tells the browser that the field must be completed before normal form submission."
    },
    {
        id: 29,
        level: 3,
        topic: "DOM Updates",
        question: "Which property is commonly used to change an element's text content?",
        options: ["textContent", "database", "srcFile", "gitBranch"],
        correctIndex: 0,
        explanation: "textContent reads or changes the text contained in an element."
    },
    {
        id: 30,
        level: 3,
        topic: "Responsive Design",
        question: "What is the main goal of responsive web design?",
        options: [
            "Make a layout adapt to different screen sizes",
            "Force every user to use a desktop",
            "Prevent CSS from loading",
            "Replace HTML with JavaScript"
        ],
        correctIndex: 0,
        explanation: "Responsive design adapts layouts and content to phones, tablets and larger screens."
    },
    // ==========================================
    // LEVEL 4: PYTHON, GIT & DJANGO
    // ==========================================
    {
        id: 31,
        level: 4,
        topic: "Python Data Structures",
        question: "Which Python data structure stores key-value pairs?",
        options: ["Tuple", "Dictionary", "String", "Range"],
        correctIndex: 1,
        explanation: "A dictionary stores mappings between keys and values."
    },
    {
        id: 32,
        level: 4,
        topic: "Python Functions",
        question: "What does return do inside a Python function?",
        options: [
            "Sends a result back to the caller",
            "Repeats the function forever",
            "Prints every variable automatically",
            "Creates a new class"
        ],
        correctIndex: 0,
        explanation: "return ends the function call and provides a result to the calling code."
    },
    {
        id: 33,
        level: 4,
        topic: "Python Data Types",
        question: "Which Python type represents a True or False value?",
        options: ["str", "bool", "list", "dict"],
        correctIndex: 1,
        explanation: "The bool type represents the Boolean values True and False."
    },
    {
        id: 34,
        level: 4,
        topic: "Python Loops",
        question: "What is a for loop commonly used for?",
        options: [
            "Iterating over items in a sequence or other iterable",
            "Defining a CSS class",
            "Creating a Git repository only",
            "Declaring an HTML form"
        ],
        correctIndex: 0,
        explanation: "A for loop runs a block of code for each item in an iterable."
    },
    {
        id: 35,
        level: 4,
        topic: "Git",
        question: "What does a Git commit do?",
        options: [
            "Records staged changes in repository history",
            "Automatically deletes the project",
            "Styles the website",
            "Installs Python"
        ],
        correctIndex: 0,
        explanation: "A commit records a snapshot of staged changes in the repository's history."
    },
    {
        id: 36,
        level: 4,
        topic: "Git Branches",
        question: "Why would a developer create a new Git branch?",
        options: [
            "To work on a feature separately from another line of development",
            "To change the computer's operating system",
            "To remove the need for commits",
            "To write HTML without a browser"
        ],
        correctIndex: 0,
        explanation: "Branches allow separate work on features and fixes before integrating changes."
    },
    {
        id: 37,
        level: 4,
        topic: "GitHub",
        question: "What is a pull request commonly used for?",
        options: [
            "Proposing and reviewing changes before merging them",
            "Changing a laptop battery",
            "Styling a webpage",
            "Creating a Python variable"
        ],
        correctIndex: 0,
        explanation: "A pull request lets collaborators review and discuss proposed changes before merging."
    },
    {
        id: 38,
        level: 4,
        topic: "Django",
        question: "What is a Django view generally responsible for?",
        options: [
            "Handling a request and returning a response",
            "Choosing the user's screen brightness",
            "Replacing all HTML and CSS",
            "Creating Git commits"
        ],
        correctIndex: 0,
        explanation: "A Django view processes a request and returns a response."
    },
    {
        id: 39,
        level: 4,
        topic: "Django URLs",
        question: "What is the purpose of URL patterns in Django?",
        options: [
            "Route incoming URLs to the appropriate views",
            "Style buttons and headings",
            "Store Python packages",
            "Track Git commits"
        ],
        correctIndex: 0,
        explanation: "URL patterns connect requested paths with the views that handle them."
    },
    {
        id: 40,
        level: 4,
        topic: "Django Templates",
        question: "What is a Django template mainly used for?",
        options: [
            "Rendering dynamic content into an HTML page",
            "Managing Git branches",
            "Installing Node.js",
            "Creating Python dictionaries only"
        ],
        correctIndex: 0,
        explanation: "Templates define how data is presented as HTML, often using values supplied by a view."
    },
    // ==========================================
    // LEVEL 5: TYPESCRIPT, AGILE, SCRUM & IDLEBID
    // ==========================================
    {
        id: 41,
        level: 5,
        topic: "TypeScript Interfaces",
        question: "What is the purpose of an interface in TypeScript?",
        options: [
            "Describe the expected structure of an object",
            "Style a web page",
            "Install packages automatically",
            "Replace every function"
        ],
        correctIndex: 0,
        explanation: "An interface describes the properties and types expected on an object."
    },
    {
        id: 42,
        level: 5,
        topic: "TypeScript Optional Properties",
        question: "In TypeScript, what does email?: string mean in an interface?",
        options: [
            "The email property is optional and, when present, should be a string",
            "Email must always be a number",
            "The property cannot be used",
            "The entire object is optional"
        ],
        correctIndex: 0,
        explanation: "The question mark makes the property optional."
    },
    {
        id: 43,
        level: 5,
        topic: "TypeScript Types",
        question: "What does a union type such as string | number allow?",
        options: [
            "A value can be a string or a number",
            "A value must always be both types simultaneously",
            "Only Boolean values are allowed",
            "The variable cannot be assigned a value"
        ],
        correctIndex: 0,
        explanation: "A union type allows a value to match any one of the listed types."
    },
    {
        id: 44,
        level: 5,
        topic: "TypeScript Functions",
        question: "What does void commonly indicate as a function return type?",
        options: [
            "The function does not provide a usable return value",
            "The function must return a string",
            "The function never finishes",
            "The function can only accept numbers"
        ],
        correctIndex: 0,
        explanation: "void indicates that callers should not expect a meaningful returned value."
    },
    {
        id: 45,
        level: 5,
        topic: "Agile",
        question: "Which idea is central to Agile software development?",
        options: [
            "Deliver work in increments and adapt using feedback",
            "Never change requirements",
            "Avoid collaboration",
            "Test only after all development is complete"
        ],
        correctIndex: 0,
        explanation: "Agile promotes iterative delivery, collaboration and responding to feedback."
    },
    {
        id: 46,
        level: 5,
        topic: "Scrum",
        question: "Who is accountable for maximizing product value and managing the Product Backlog in Scrum?",
        options: [
            "Product Owner",
            "Every customer individually",
            "Graphic designer only",
            "Database administrator"
        ],
        correctIndex: 0,
        explanation: "The Product Owner is accountable for maximizing product value and effective Product Backlog management."
    },
    {
        id: 47,
        level: 5,
        topic: "Scrum",
        question: "What is the purpose of a Sprint in Scrum?",
        options: [
            "A fixed-length period for creating a usable product increment",
            "A meeting that replaces all development",
            "A method for deleting the backlog",
            "A way to avoid testing"
        ],
        correctIndex: 0,
        explanation: "A Sprint is a fixed-length event during which the Scrum Team works toward a Sprint Goal and produces an increment."
    },
    {
        id: 48,
        level: 5,
        topic: "IdleBid Requirements",
        question: "In IdleBid, what is the purpose of a starting bid?",
        options: [
            "It sets the opening minimum amount for bidding",
            "It guarantees the final selling price",
            "It replaces the item description",
            "It prevents buyers from placing bids"
        ],
        correctIndex: 0,
        explanation: "The starting bid establishes the opening minimum, but the final price may be higher."
    },
    {
        id: 49,
        level: 5,
        topic: "IdleBid User Roles",
        question: "What is a main difference between a seller and a buyer in IdleBid?",
        options: [
            "A seller lists an item; a buyer searches for items and places bids",
            "A seller only views items; a buyer manages the website's code",
            "Both roles can only edit CSS",
            "A buyer must create every listing"
        ],
        correctIndex: 0,
        explanation: "Sellers offer items for auction, while buyers discover listings and place bids."
    },
    {
        id: 50,
        level: 5,
        topic: "Software Projects",
        question: "Why is user feedback valuable when developing an app such as IdleBid?",
        options: [
            "It helps identify user needs and improve the product",
            "It guarantees that no bugs will exist",
            "It removes the need for testing",
            "It prevents future updates"
        ],
        correctIndex: 0,
        explanation: "Feedback helps the team understand user needs and make informed improvements."
    }
];
// Make the question bank available to script.ts.
window.quizQuestions = questions;
//# sourceMappingURL=questions.js.map