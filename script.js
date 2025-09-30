// Sample quiz questions (you can replace or expand)
const quizData = [
  {
    question: "What does Zurel represent in the Sentient network?",
    options: ["A core token", "A social agent", "A protocol layer", "An AI module"],
    answer: 1
  },
  {
    question: "Which platform does Sentient AGI host many of its models on?",
    options: ["GitHub", "Hugging Face", "TensorFlow Hub", "PyPI"],
    answer: 1
  },
  {
    question: "What is the philosophy behind community-aligned AI?",
    options: ["Profit-first", "Company-controlled", "Community-controlled", "Closed-source"],
    answer: 2
  },
  {
    question: "What term describes AI loyal to humanity rather than corporations?",
    options: ["Corporate AI", "Loyal AI", "Servile AI", "Neutral AI"],
    answer: 1
  },
  {
    question: "Which lightweight social agent project is linked to SentientAGI?",
    options: ["ZurelBot", "Sentient-Social-Agent", "AGI-Mini", "Zune-Agent"],
    answer: 1
  }
];

let currentQuestion = 0;
let score = 0;

const startBtn = document.getElementById("start-btn");
const quizSection = document.getElementById("quiz-section");
const nextBtn = document.getElementById("next-btn");
const quizContainer = document.getElementById("quiz-container");
const progressDiv = document.getElementById("progress");
const resultDiv = document.getElementById("result");
const shareBtn = document.getElementById("share-btn");

startBtn.onclick = () => {
  document.querySelector("header.hero").style.display = "none";
  quizSection.style.display = "block";
  loadQuestion();
};

function loadQuestion() {
  const q = quizData[currentQuestion];
  progressDiv.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
  quizContainer.innerHTML = `
    <h3>${q.question}</h3>
    ${q.options.map((opt, idx) => `
      <div class="form-check">
        <input class="form-check-input" type="radio" name="option" id="opt${idx}" value="${idx}">
        <label class="form-check-label" for="opt${idx}">${opt}</label>
      </div>
    `).join("")}
  `;
}

nextBtn.onclick = () => {
  const sel = document.querySelector('input[name="option"]:checked');
  if (!sel) {
    alert("Please select an answer!");
    return;
  }
  if (parseInt(sel.value) === quizData[currentQuestion].answer) {
    score++;
  }
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
};

function showResult() {
  quizContainer.innerHTML = "";
  nextBtn.style.display = "none";
  progressDiv.style.display = "none";
  // Show score
  resultDiv.textContent = `You scored ${score} out of ${quizData.length}!`;

  // Show share button
  const tweetText = encodeURIComponent(`I scored ${score}/${quizData.length} on the Zurel Quiz! 🚀`);
  const quizUrl = encodeURIComponent(window.location.href);
  const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}&url=${quizUrl}&hashtags=Zurel,Quiz,SentientAGI`;
  shareBtn.href = tweetUrl;
  shareBtn.style.display = "inline-block`;
}
