const homeContainer = document.getElementById("home-container");
const questionContainer = document.getElementById("question-container");
const resultContainer = document.getElementById("result-container");
const timeoutContainer = document.getElementById("timeout-container");
const loadQuestions = () => {
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
  for (let i = 0; i < allQues.length; i++) {
    const div = document.createElement("div");
    div.classList.add("ques-container");
    div.innerHTML = `<div class="ques">
      <h3>${i + 1}. ${allQues[i].title}</h3>
      ${allQues[i].options.map(
        (opt) => `
      <input class="options" data-Index="${i}" id=${opt} type="radio" name='option${i}' value=${opt}>
      <label for=${opt}>${opt}</label> <br>
      `
      )}
      </div>
      `;
    document.getElementById("all-ques").appendChild(div);
  }
};
const showTimer = () => {
  let timeInMinutes = 10;
  let currentTime = Date.parse(new Date());
  let deadline = new Date(currentTime + timeInMinutes * 60 * 1000);

  function timeRemaining(endtime) {
    let t = Date.parse(endtime) - Date.parse(new Date());
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    return {
      total: t,
      minutes: minutes,
      seconds: seconds,
    };
  }
  function runClock(id, endtime) {
    let clock = document.getElementById(id);
    function updateClock() {
      let t = timeRemaining(endtime);
      clock.innerHTML = "00: " + t.minutes + ": " + t.seconds;
      if (t.total <= 0) {
        clearInterval(timeinterval);
        timeUp();
      }
    }
    updateClock(); 
    let timeinterval = setInterval(updateClock, 1000);
  }
  runClock("timer-container", deadline);
};
const timeUp = () => {
  homeContainer.style.display = "none";
  questionContainer.style.display = "none";
  resultContainer.style.display = "none";
  timeoutContainer.style.display = "block";
};
const getResult = (selectedAns) => {
  homeContainer.style.display = "none";
  questionContainer.style.display = "none";
  resultContainer.style.display = "block";
  let userSolution = selectedAns.value;
};
const startAgain = () => {
  homeContainer.style.display = "flex";
  questionContainer.style.display = "none";
  resultContainer.style.display = "none";
  location.reload();
};
