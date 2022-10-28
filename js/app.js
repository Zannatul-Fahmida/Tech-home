const homeContainer = document.getElementById("home-container");
const questionContainer = document.getElementById("question-container");
const resultContainer = document.getElementById("result-container");
const timeoutContainer = document.getElementById("timeout-container");
var count = 0;

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
      ${allQues[i].options
        .map(
          (opt) => `
      <input class="options" data-Index="${i}" type="radio" name='option${i}' value="${opt}" id="${allQues[i].answer}">
      <label for=${opt}>${opt}</label><br/>
      `
        )
        .join("\n")}
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

//show Result
const showResult = () => {
  const resultEl = document.getElementById("result");
  const inputList = document.getElementsByTagName("input");

  for (let i = 0; i < inputList.length; i++) {
    if (inputList[i].type == "radio" && inputList[i].checked) {
      if (inputList[i].id === inputList[i].value) {
        count += 1;
      }
    }
  }
  resultEl.innerText = "You Got " + count + " Score";
};

const timeUp = () => {
  homeContainer.style.display = "none";
  questionContainer.style.display = "none";
  resultContainer.style.display = "none";
  timeoutContainer.style.display = "block";
};

const getResult = () => {
  homeContainer.style.display = "none";
  questionContainer.style.display = "none";
  resultContainer.style.display = "block";
  showResult();
};
const startAgain = () => {
  homeContainer.style.display = "flex";
  questionContainer.style.display = "none";
  resultContainer.style.display = "none";
  location.reload();
};
