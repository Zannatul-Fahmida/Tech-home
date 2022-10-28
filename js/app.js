const loadQuestions = () => {
  const homeContainer = document.getElementById("home-container");
  const questionContainer = document.getElementById("question-container");
  homeContainer.style.display = "none";
  questionContainer.style.display = "block";
  const url = "../questions.json";
  fetch(url)
    .then((res) => res.json())
    .then((data) => showQuestions(data));
  showTimer();
};
const showQuestions = (ques) => {
  const allQues = ques.map((qs) => qs);
  let count = 1;
  for (const question of allQues) {
    const div = document.createElement("div");
    div.classList.add("ques-container");
    div.innerHTML = `<div class="ques">
      <h3>${count++}. ${question.title}</h3>
      ${question.options.map(
        (opt) => `
      <input id=${opt} type="radio" name="option" value=${opt}>
      <label for=${opt}>${opt}</label> <br>`
      )}
      </div>
      `;
    document.getElementById("all-ques").appendChild(div);
  }
};
const showTimer = () => {
  var time_in_minutes = 10;
  var current_time = Date.parse(new Date());
  var deadline = new Date(current_time + time_in_minutes * 60 * 1000);

  function time_remaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }
  function run_clock(id, endtime) {
    var clock = document.getElementById(id);
    function update_clock() {
      var t = time_remaining(endtime);
      clock.innerHTML = "00: " + t.minutes + ": " + t.seconds;
      if (t.total <= 0) {
        clearInterval(timeinterval);
        timeUp();
      }
    }
    update_clock(); // run function once at first to avoid delay
    var timeinterval = setInterval(update_clock, 1000);
  }
  run_clock("timer-container", deadline);
};
const timeUp = () => {
  const homeContainer = document.getElementById("home-container");
  const questionContainer = document.getElementById("question-container");
  const resultContainer = document.getElementById("result-container");
  const timeoutContainer = document.getElementById("timeout-container");
  homeContainer.style.display = "none";
  questionContainer.style.display = "none";
  resultContainer.style.display = "none";
  timeoutContainer.style.display = "block";
};
const getResult = () => {
  const homeContainer = document.getElementById("home-container");
  const questionContainer = document.getElementById("question-container");
  const resultContainer = document.getElementById("result-container");
  homeContainer.style.display = "none";
  questionContainer.style.display = "none";
  resultContainer.style.display = "block";
};
const startAgain = () => {
  const homeContainer = document.getElementById("home-container");
  const questionContainer = document.getElementById("question-container");
  const resultContainer = document.getElementById("result-container");
  homeContainer.style.display = "flex";
  questionContainer.style.display = "none";
  resultContainer.style.display = "none";
};
