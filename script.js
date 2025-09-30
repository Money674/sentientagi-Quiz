const quizData = [
  { question: "What is Sentient’s ultimate vision?", options:["Closed-source AI","Open-source AGI for all","Simple chatbot","Hardware-only AI"], answer:"Open-source AGI for all" },
  { question: "Sentient is often called the ___ of AGI?", options:["Windows","Linux","Apple","Tesla"], answer:"Linux" },
  { question: "How many partners does Sentient already have?", options:["10+","25+","50+","100+"], answer:"100+" },
  { question: "Which labs does Sentient aim to outperform?", options:["ODS, ROMA, Dobby","Apple, Google, Microsoft","Meta, Tesla, SpaceX","Only OpenAI"], answer:"ODS, ROMA, Dobby" },
  { question: "What makes Sentient unique?", options:["Closed-source approach","Open-source scaling with community","Only crypto focused","Hardware experiments"], answer:"Open-source scaling with community" },
  { question: "Which statement is true?", options:["Open-source always wins","Closed labs always win","Neither wins","Depends only on funding"], answer:"Open-source always wins" },
  { question: "What does AGI stand for?", options:["Artificial General Intelligence","Advanced Graphical Interface","Automatic Global Index","Applied Genetic Innovation"], answer:"Artificial General Intelligence" },
  { question: "Which companies are the big AI labs Sentient challenges?", options:["OpenAI, Anthropic, xAI, Perplexity","Amazon, Walmart, Shopify","Only Nvidia","Just startups"], answer:"OpenAI, Anthropic, xAI, Perplexity" },
  { question: "How does Sentient scale?", options:["With community + partners","Only VC funding","By selling hardware","By limiting access"], answer:"With community + partners" },
  { question: "What is Sentient’s growth style?", options:["Exponential","Linear","Slow","No scaling"], answer:"Exponential" },
  { question: "Which type of ecosystem does Sentient want?", options:["Centralized","Open and decentralized","Government only","Corporate only"], answer:"Open and decentralized" },
  { question: "Why will Sentient win?", options:["Because open-source always wins","Because it hides everything","Hardware monopoly","Because of luck"], answer:"Because open-source always wins" },
  { question: "Sentient research already outperforms which labs?", options:["ODS, ROMA, Dobby","Apple, Google, Microsoft","Meta, Tesla, SpaceX","Only OpenAI"], answer:"ODS, ROMA, Dobby" },
  { question: "What is Sentient's strategy for scaling AGI?", options:["Exponential with partners","Slow and steady","Closed labs only","By selling hardware"], answer:"Exponential with partners" },
  { question: "What makes Sentient the Linux of AGI?", options:["Open-source + community driven","Closed-source secret","Hardware only","VC funded only"], answer:"Open-source + community driven" }
];

let current = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const shareBtn = document.getElementById("share-btn");
const progressEl = document.getElementById("progress");

function loadQuestion() {
  const data = quizData[current];
  questionEl.textContent = data.question;
  optionsEl.innerHTML = "";
  resultEl.textContent = "";
  nextBtn.style.display = "none";

  data.options.forEach(opt => {
    const div = document.createElement("div");
    div.classList.add("option");
    div.textContent = opt;
    div.onclick = () => selectOption(div, data.answer);
    optionsEl.appendChild(div);
  });
  progressEl.textContent = `Question ${current+1} of ${quizData.length}`;
}

function selectOption(el, answer) {
  if (el.textContent === answer) {
    score++;
    el.classList.add("correct");
  } else {
    el.classList.add("wrong");
    Array.from(optionsEl.children).forEach(opt=>{
      if(opt.textContent === answer) opt.classList.add("correct");
    });
  }
  Array.from(optionsEl.children).forEach(opt => (opt.onclick=null));
  nextBtn.style.display="inline-block";
}

nextBtn.onclick = ()=>{
  current++;
  if(current<quizData.length) loadQuestion();
  else showResult();
};

// Confetti function
function launchConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const pieces = [];
  const colors = ["#00f5a0","#ffdd00","#ff4f81","#1DA1F2"];
  for(let i=0;i<150;i++){
    pieces.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*6+4,dx:(Math.random()*2-1),dy:Math.random()*3+2,color:colors[Math.floor(Math.random()*colors.length)]});
  }
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pieces.forEach(p=>{
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=p.color;
      ctx.fill();
      p.x += p.dx;
      p.y += p.dy;
      if(p.y>canvas.height){p.y=0;p.x=Math.random()*canvas.width;}
    });
    requestAnimationFrame(draw);
  }
  draw();
  setTimeout(()=>{ctx.clearRect(0,0,canvas.width,canvas.height)},4000);
}

function showResult() {
  questionEl.textContent = "";
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";
  resultEl.textContent = "🎉 You scored ";
  shareBtn.style.display = "inline-block";
  launchConfetti();

  // Animate score
  let displayScore = 0;
  const finalScore = score;
  const total = quizData.length;
  const interval = setInterval(()=>{
    resultEl.textContent = `🎉 You scored ${displayScore}/${total}`;
    if(displayScore>=finalScore) clearInterval(interval);
    else displayScore++;
  },100);

  const tweetText = encodeURIComponent(`I scored ${score}/${quizData.length} on the Sentient Quiz! 🚀`);
  const url = encodeURIComponent("https://yourquizurl.com");
  shareBtn.href = `https://twitter.com/intent/tweet?text=${tweetText}&url=${url}&hashtags=Sentient,Quiz`;
}

loadQuestion();
