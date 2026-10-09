const questions = [
  { question: "Which keyword creates a variable that can be reassigned?", options: ["const", "let", "fixed", "varname"], answer: 1 },
  { question: "Which method adds an item to the end of an array?", options: ["push()", "pop()", "shift()", "join()"], answer: 0 },
  { question: "Which symbol means strict equality?", options: ["=", "==", "===", "!="], answer: 2 },
  { question: "Which object stores data in the browser between sessions?", options: ["console", "localStorage", "windowName", "documentData"], answer: 1 }
];

let current = 0;
let score = 0;
const quiz = document.querySelector("#quiz");

function render() {
  if (current >= questions.length) {
    quiz.innerHTML = `<h2>Quiz complete!</h2><p>Your score: ${score}/${questions.length}</p><button id="restart">Try Again</button>`;
    document.querySelector("#restart").onclick = () => {
      current = 0; score = 0; render();
    };
    return;
  }

  const q = questions[current];
  quiz.innerHTML = `
    <p>Question ${current + 1} of ${questions.length}</p>
    <h2>${q.question}</h2>
    <div id="options">${q.options.map((option, i) =>
      `<button data-answer="${i}">${option}</button>`).join("")}</div>
  `;

  document.querySelector("#options").onclick = event => {
    if (!event.target.matches("button")) return;
    if (Number(event.target.dataset.answer) === q.answer) score++;
    current++;
    render();
  };
}

render();
