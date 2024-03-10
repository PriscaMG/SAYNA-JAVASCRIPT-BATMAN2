document.addEventListener('DOMContentLoaded', function() {
  const burger = document.querySelector('.burger-menu');
  const overlay = document.querySelector('.overlay1');
  const navLinks = document.querySelector('.overlay-nav-links');

  burger.addEventListener('click', function() {
    if (overlay.style.width === '100%') {
      overlay.style.width = '0';
    } else {
      overlay.style.width = '100%';
    }
  });

  overlay.addEventListener('click', function() {
    overlay.style.width = '0';
  });

  navLinks.addEventListener('click', function(event) {
    event.stopPropagation();
  });
});

// Informations sur les acteurs derrière les personnages 
const informations = document.getElementsByClassName("information");
const items = document.getElementsByClassName("item");

for (let i = 0; i < items.length; i++) {
  items[i].addEventListener("mouseover", () => {
    informations[i].style.display = "block";
  });
  items[i].addEventListener("mouseout", () => {
    informations[i].style.display = "none";
  });
}

//SECTION FORMULAIRE
//Fréquence de recevoir le Newsletter
const buttonArrow = document.querySelector('.button-arrow');
const hiddenBox = document.getElementById('hidden-box');
const frequenceSelect = document.getElementById('frequence');

buttonArrow.addEventListener('click', () => {
    buttonArrow.style.display = 'none';
    hiddenBox.classList.remove('hidden');
});

//Choix sur les types de Newsletter 
const btnFilm = document.getElementById("label-film");
const btnComics = document.getElementById("label-comics");
const btnTout = document.getElementById("label-tout");
const gradient = "linear-gradient(130deg,#ffffff60,#8900098e)";

btnFilm.addEventListener("click", (evt) => {
  evt.target.style.background = gradient;

  btnComics.style.background = "transparent";
  btnTout.style.background = "transparent";
});
btnComics.addEventListener("click", (evt) => {
  evt.target.style.background = gradient;

  btnFilm.style.background = "transparent";
  btnTout.style.background = "transparent";
});
btnTout.addEventListener("click", (evt) => {
  evt.target.style.background = gradient;

  btnFilm.style.background = "transparent";
  btnComics.style.background = "transparent";
});

//Evènement après cliquer bouton confirmer
const confirmButton = document.querySelector(".button-confirm");
const closeButton = document.getElementById("button-close");
const overlay = document.getElementById("overlay");
const mail = document.getElementById("mail");
const message = document.getElementById("message");
const invalid = document.getElementsByClassName("invalid");

//Evenement ouverture de overlay, le popup
confirmButton.addEventListener("click", (evt) => {
  evt.preventDefault();
  if (mail.value === "" || message.value === "") {
    invalid[0].textContent = "Ce champ e-mail est obligatoire.";
    invalid[1].textContent = "Ce champ est obligatoire.";
  } else { 
    openPopup();
  }
});

function openPopup() {
  overlay.style.display = "flex";
}

closeButton.addEventListener("click", closePopup);

function closePopup() {
  overlay.style.display = "none";
}

closeButton.addEventListener("click", noValue); 

function noValue() {
    mail.value = "";  
    message.value = "";
  }

  document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger-menu');
    const overlay = document.querySelector('.overlay');
    const navLinks = document.querySelector('.overlay-nav-links');
  
    burger.addEventListener('click', function() {
      if (overlay.style.width === '100%') {
        overlay.style.width = '0';
      } else {
        overlay.style.width = '100%';
      }
    });
  
    overlay.addEventListener('click', function() {
      overlay.style.width = '0';
    });
  
    navLinks.addEventListener('click', function(event) {
      event.stopPropagation();
    });
  });