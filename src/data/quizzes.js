const quizzes = {
  1: [ // React for Beginners
    {
      question: "What is JSX in React?",
      options: ["A JavaScript extension", "A CSS preprocessor", "A server", "None"],
      answer: "A JavaScript extension"
    },
    {
      question: "React is developed by?",
      options: ["Google", "Microsoft", "Facebook", "Amazon"],
      answer: "Facebook"
    },
    {
      question: "Which hook is used for state in React?",
      options: ["useEffect", "useReducer", "useState", "useContext"],
      answer: "useState"
    },
    {
      question: "What does the useEffect hook do?",
      options: ["Handles styling", "Performs side effects", "Connects to API", "Stores cookies"],
      answer: "Performs side effects"
    }
  ],

  2: [ // Tailwind CSS Masterclass
    {
      question: "Tailwind CSS is a ___ CSS framework.",
      options: ["Component-based", "Utility-first", "Object-oriented", "None"],
      answer: "Utility-first"
    },
    {
      question: "Which file typically holds Tailwind configuration?",
      options: ["tailwind.config.js", "config.css", "main.js", "tailwind.js"],
      answer: "tailwind.config.js"
    },
    {
      question: "What class makes text bold in Tailwind?",
      options: ["text-bold", "font-bold", "bold-text", "text-strong"],
      answer: "font-bold"
    },
    {
      question: "How do you apply padding in Tailwind?",
      options: ["padding-10", "pad-10", "p-10", "pd-10"],
      answer: "p-10"
    }
  ],

  3: [ // JavaScript Essentials
    {
      question: "JavaScript is ___?",
      options: ["Compiled", "Interpreted", "Both", "None"],
      answer: "Interpreted"
    },
    {
      question: "Which keyword declares a variable in JS?",
      options: ["def", "var", "int", "value"],
      answer: "var"
    },
    {
      question: "Which symbol is used for strict equality?",
      options: ["==", "===", "!=", "<>"],
      answer: "==="
    },
    {
      question: "What is the output of typeof null in JS?",
      options: ["'null'", "'object'", "'undefined'", "'boolean'"],
      answer: "'object'"
    }
  ],

  4: [ // Node.js Crash Course
    {
      question: "Node.js is built on which engine?",
      options: ["SpiderMonkey", "Chakra", "V8", "JavaScriptCore"],
      answer: "V8"
    },
    {
      question: "Which module is used to create a server in Node.js?",
      options: ["http", "fs", "url", "path"],
      answer: "http"
    }
  ],

  5: [ // UI/UX Design Principles
    {
      question: "What does UX stand for?",
      options: ["User Extension", "User Experience", "Ultimate Experience", "User Expression"],
      answer: "User Experience"
    },
    {
      question: "Which principle refers to the visual weight of elements?",
      options: ["Color theory", "Typography", "Hierarchy", "Contrast"],
      answer: "Hierarchy"
    }
  ],

  6: [ // Full Stack Developer Roadmap
    {
      question: "Which of the following is a backend language?",
      options: ["HTML", "CSS", "Python", "Figma"],
      answer: "Python"
    },
    {
      question: "What database is commonly used with MERN stack?",
      options: ["MySQL", "Oracle", "MongoDB", "Firebase"],
      answer: "MongoDB"
    }
  ],

  7: [ // Git & GitHub
    {
      question: "Which command initializes a Git repository?",
      options: ["git start", "git begin", "git init", "git create"],
      answer: "git init"
    },
    {
      question: "What does `git clone` do?",
      options: ["Deletes repo", "Copies repo", "Renames repo", "Publishes repo"],
      answer: "Copies repo"
    }
  ],

  8: [ // Python for Beginners
    {
      question: "What is the correct file extension for Python files?",
      options: [".py", ".js", ".java", ".pt"],
      answer: ".py"
    },
    {
      question: "Which keyword is used to define a function in Python?",
      options: ["function", "def", "func", "define"],
      answer: "def"
    }
  ],

  9: [ // Responsive Web Design
    {
      question: "What unit is commonly used for media queries?",
      options: ["px", "em", "rem", "vh"],
      answer: "px"
    },
    {
      question: "Which HTML tag helps with mobile responsiveness?",
      options: ["<script>", "<meta>", "<div>", "<section>"],
      answer: "<meta>"
    }
  ]
};

export default quizzes;
