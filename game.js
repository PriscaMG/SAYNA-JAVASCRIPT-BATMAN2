//const urlQuestion = "https://batman-api.sayna.space/questions";
const urlQuestion = "../assets/json/urlquestion.js";

// Recolte data API des questions et réponses
fetch(urlQuestion)
  .then((result) => result.json())
  .then((data) => populate(data))
  .catch((error) => {
    console.error(`erreur de chargemenr de data ${error}`);
  });

// Recolte data API des illustrations
async function getDataImage() {
  try {
    const urlImage = "../assets/json/urlimage.json";
    const reponse = await fetch(urlImage);
    const imageFile = await reponse.json();
    return imageFile;
  } catch (error) {
    console.error(`erreur de chargement de img ${error}`);
  }
}
// score
let score = 0;

// Ordre de question
let n = 1;

// Déclaration des variable des parties du quizz
const boxQuizz = document.querySelector(".boxQuizz");
const startButton = document.querySelector(".button-start");
const img = document.querySelector(".illustration img");
const orderQuestion = document.querySelector(".order-question");
const totalQuestion = document.querySelector(".total-question");
const question = document.querySelector(".quizz-question p");
const reponses = document.getElementsByClassName("choice-label");
const radioChoice = document.getElementsByClassName("choice-radio");
const nextButton = document.querySelector(".next-button");
const divButton = document.querySelector(".button");

// Déclaration des variables pour l'ajout de illustrations supplémentaires
const illustrationLeft = document.querySelector(".illustration-left");
const illustrationRight = document.querySelector(".illustration-right");
const imgLeft = document.createElement("img");
const imgRight = document.createElement("img");
illustrationLeft.appendChild(imgLeft);
illustrationRight.appendChild(imgRight);

// Déclaration de variable pour checker la réponse
const control = document.querySelector(".controlResponses");

// Déclaration des variables pour le choix des réponses
const choice1 = document.getElementById("choice1");
const choice2 = document.getElementById("choice2");
const choice3 = document.getElementById("choice3");

// Déclaration des variables de la partie popup
const overlayGame = document.querySelector(".overlay-game");
const popupNote = document.querySelector(".popup-note");
const popupText = document.querySelector(".popup-text");
const restartButton = document.querySelector(".restart");

// Fonctionnalité après avoir checker un radio 
function checkListRadio() {
  for (let i = 0; i < radioChoice.length; i++) {
    radioChoice[i].checked = false;
    radioChoice[i].addEventListener("click", () => {
      checkListRadio();
      radioChoice[i].checked = true;
    });
  }
}

checkListRadio();

// Fonctionnalité pour le score
function isScore(data) {
  if (
    (choice1.checked && data[n - 1].response[0].isGood === true) ||
    (choice2.checked && data[n - 1].response[1].isGood === true) ||
    (choice3.checked && data[n - 1].response[2].isGood === true)
  ) {
    score += 1;
    return score;
  } else {
    score += 0;
    return score;
  }
}

// Fonctionnalité pour le changement de box après chaque quizz
function changeBox(data) {
  orderQuestion.innerHTML = `${n + 1}`;
  totalQuestion.innerHTML = `${data.length}`;
  //  Json adéquat pour chaque question
  const promiseImageFile = getDataImage();
  promiseImageFile.then((dataImage) => {
    img.src = dataImage[n - 1].src;
  });
  question.textContent = data[n].question;

  for (let i = 0; i < reponses.length; i++) {
    reponses[i].textContent = data[n].response[i].text;
  }
}

// Fonctionnalité pour le commencement de quizz
function initialiseBox(data) {
  n = 1;
  score = 0;
  imgLeft.src = "";
  imgRight.src = "";
  orderQuestion.textContent = "1";
  totalQuestion.innerHTML = `${data.length}`;
  img.src = "../assets/Illustrations-game/Batgame_3.png";
  question.textContent = data[0].question;
  for (let i = 0; i < reponses.length; i++) {
    reponses[i].textContent = data[0].response[i].text;
  }
  boxQuizz.style.display = "flex";
}

function populate(data) {
  // Initialisation du quiz
  startButton.addEventListener("click", () => {
    initialiseBox(data);
  });

  // Fonctionnalité pour l'affichage de popupbox de résultat
  nextButton.addEventListener("click", () => {
    if (
      choice1.checked === false &&
      choice2.checked === false &&
      choice3.checked === false
    ) {
      control.textContent = "Veuillez choisir une reponse";
    } else {
      control.textContent = "";
      while (n <= data.length) {
        if (n === data.length) {
          isScore(data);
          if (score <= 4) {
            popupNote.textContent = `${score}/${data.length} C'EST PAS TOUT A FAIT ÇA...`;
            popupText.textContent = `Oula! Heureusement que le Riddler est sous les verrous...Il faut que vous vous repassiez les film,cette fois en enlevant peut-être le masque qui vous a bloqué la vue! Aller, rien n'est perdu!`;
          } else if (score <= 8) {
            popupNote.textContent = `${score}/${data.length} PAS MAL !`;
            popupText.textContent = `Encore un peu d'entraînement avec le Chevalier Noir vous serait bénéfique, mais vous pouvez marcher la tête haute vos connaissances sont là. A vous de les consolider, foncez Gotham est votre terrain de chasse !`;
          } else {
            popupNote.textContent = `${score}/${data.length} BRAVO !`;
            popupText.textContent = `Vous êtes veritablement un super fan de l'univers de Batman! Comics,films, rien ne vous échappe. Bruce Waynea de quoi être fier,Gotham est en paix et Batman peut prendre sa retraite, vous veillez aux grains !`;
          }
          overlayGame.style.display = "block";
          n++;
        } else if (n === 6) {
          imgLeft.src = "../assets/illustrations-game/Batgame_13-1.png";
          imgRight.src = "../assets/illustrations-game/Batgame_13.png";
          divButton.style.marginTop = "0px";
          isScore(data);
          changeBox(data);
          n++;
          break;
        } else {
          imgLeft.src = "";
          imgRight.src = "";
          divButton.style.marginTop = "70px";
          isScore(data);
          changeBox(data);
          n++;
          break;
        }
      }
    }
  });
  // Fonctionnalité pour réinitialiser le jeu
  restartButton.addEventListener("click", () => {
    overlayGame.style.display = "none";
    initialiseCarte(data);
  });
}

