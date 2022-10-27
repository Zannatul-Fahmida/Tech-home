const loadQuestions= () => {
    const homeContainer = document.getElementById('home-container');
    const questionContainer = document.getElementById('question-container');
    homeContainer.style.display = 'none';
    questionContainer.style.display = 'block';
}
const getResult = () => {
    const homeContainer = document.getElementById('home-container');
    const questionContainer = document.getElementById('question-container');
    const resultContainer = document.getElementById('result-container');
    homeContainer.style.display = 'none';
    questionContainer.style.display = 'none';
    resultContainer.style.display = 'block';
}