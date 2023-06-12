const apiUrl = 'https://batman-api.sayna.space/questions'; // Replace with your API endpoint

let currentQuestionIndex = 0;
let score = 0;

const questionContainer = document.getElementById('question');
const choicesContainer = document.getElementById('choices');
const nextButton = document.getElementById('next-button');
const notification = document.getElementById('notification');

nextButton.addEventListener('click', nextQuestion);

function startQuiz() {
  fetchQuestions()
    .then(questions => {
      displayQuestion(questions[currentQuestionIndex]);
      nextButton.style.display = 'block';
    })
    .catch(error => {
      console.error(error);
      notification.textContent = 'Failed to fetch questions. Please try again later.';
      notification.style.display = 'block';
    });
}

function fetchQuestions() {
  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => data.questions);
}

function displayQuestion(question) {
  questionContainer.textContent = question.question;
  choicesContainer.innerHTML = '';

  question.choices.forEach(choice => {
    const choiceElement = document.createElement('button');
    choiceElement.classList.add('choice');
    choiceElement.textContent = choice;
    choiceElement.addEventListener('click', () => checkAnswer(choice, question.answer));
    choicesContainer.appendChild(choiceElement);
  });
}

function checkAnswer(choice, answer) {
  if (choice === answer) {
    notification.textContent = 'Correct answer!';
    score++;
  } else {
    notification.textContent = 'Wrong answer!';
  }

  notification.style.display = 'block';
  document.querySelectorAll('.choice').forEach(choice => {
    choice.disabled = true;
  });
  nextButton.disabled = false;
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex >= questions.length) {
    finishQuiz();
  } else {
    displayQuestion(questions[currentQuestionIndex]);
    notification.style.display = 'none';
    document.querySelectorAll('.choice').forEach(choice => {
      choice.disabled = false;
    });
    nextButton.disabled = true;
  }
}

function finishQuiz() {
  questionContainer.textContent = 'Quiz finished!';
  choicesContainer.style.display = 'none';
  nextButton.style.display = 'none';
  notification.textContent = `Your score: ${score}/${questions.length}`;
  notification.style.display = 'block';
}

startQuiz();