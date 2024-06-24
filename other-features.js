// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeBtn = document.querySelector(".close-btn");
const form = document.forms['reserve'];
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
closeBtn.addEventListener("click", closeModal);

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// Validate form on submit
form.addEventListener('submit', function (event) {
  event.preventDefault();
  if (validateForm()) {
    console.log('Formulaire valide, prêt à soumettre.');
    // Vous pouvez ajouter le code pour soumettre le formulaire ici
  }
});

// Validate input fields on input and blur events
form['first'].addEventListener('input', validateFirstName);
form['first'].addEventListener('blur', validateFirstName);
form['last'].addEventListener('input', validateLastName);
form['last'].addEventListener('blur', validateLastName);
form['email'].addEventListener('input', validateEmailField);
form['email'].addEventListener('blur', validateEmailField);
form['birthdate'].addEventListener('input', validateBirthdate);
form['birthdate'].addEventListener('blur', validateBirthdate);
form['quantity'].addEventListener('input', validateQuantity);
form['quantity'].addEventListener('blur', validateQuantity);

// Validate first name
function validateFirstName() {
  const firstName = form['first'].value.trim();
  if (firstName.length < 2) {
    displayError('first', 'Le prénom doit contenir au moins 2 caractères.');
  } else {
    clearError('first');
    displayValid('first-valid');
  }
}

// Validate last name
function validateLastName() {
  const lastName = form['last'].value.trim();
  if (lastName.length < 2) {
    displayError('last', 'Le nom doit contenir au moins 2 caractères.');
  } else {
    clearError('last');
    displayValid('last-valid');
  }
}

// Validate email
function validateEmailField() {
  const email = form['email'].value.trim();
  if (!validateEmail(email)) {
    displayError('email', 'Veuillez entrer une adresse email valide.');
  } else {
    clearError('email');
    displayValid('email-valid');
  }
}

// Validate birthdate
function validateBirthdate() {
  const birthdate = form['birthdate'].value.trim();
  if (birthdate === '') {
    displayError('birthdate', 'Veuillez entrer votre date de naissance.');
  } else {
    clearError('birthdate');
    displayValid('birthdate-valid');
  }
}

// Validate quantity
function validateQuantity() {
  const quantity = form['quantity'].value.trim();
  if (isNaN(quantity) || quantity === '') {
    displayError('quantity', 'Veuillez entrer un nombre valide.');
  } else {
    clearError('quantity');
    displayValid('quantity-valid');
  }
}

// Validate form function
function validateForm() {
  let isValid = true;

  // Prénom
  if (form['first'].value.trim().length < 2) {
    displayError('first', 'Le prénom doit contenir au moins 2 caractères.');
    isValid = false;
  } else {
    clearError('first');
    displayValid('first-valid');
  }

  // Nom
  if (form['last'].value.trim().length < 2) {
    displayError('last', 'Le nom doit contenir au moins 2 caractères.');
    isValid = false;
  } else {
    clearError('last');
    displayValid('last-valid');
  }

  // Email
  if (!validateEmail(form['email'].value.trim())) {
    displayError('email', 'Veuillez entrer une adresse email valide.');
    isValid = false;
  } else {
    clearError('email');
    displayValid('email-valid');
  }

  // Date de naissance
  if (form['birthdate'].value.trim() === '') {
    displayError('birthdate', 'Veuillez entrer votre date de naissance.');
    isValid = false;
  } else {
    clearError('birthdate');
    displayValid('birthdate-valid');
  }

  // Nombre de tournois
  const quantity = form['quantity'].value.trim();
  if (isNaN(quantity) || quantity === '') {
    displayError('quantity', 'Veuillez entrer un nombre valide.');
    isValid = false;
  } else {
    clearError('quantity');
    displayValid('quantity-valid');
  }

  // Bouton radio sélectionné
  let locationSelected = false;
  const locationInputs = form['location'];
  for (let i = 0; i < locationInputs.length; i++) {
    if (locationInputs[i].checked) {
      locationSelected = true;
      break;
    }
  }
  if (!locationSelected) {
    displayError('location1', 'Veuillez sélectionner un tournoi.');
    isValid = false;
  } else {
    clearError('location1');
    displayValid('location1-valid');
  }

  // Conditions générales
  const termsAccepted = form['checkbox1'].checked;
  if (!termsAccepted) {
    displayError('checkbox1', 'Vous devez accepter les conditions d\'utilisation.');
    isValid = false;
  } else {
    clearError('checkbox1');
    displayValid('checkbox1-valid');
  }

  return isValid;
}

function displayError(elementId, message) {
  const element = document.getElementById(elementId);
  if (element) {
    element.closest('.formData').setAttribute('data-error', message);
    element.closest('.formData').setAttribute('data-error-visible', 'true');
    hideValid(elementId + '-valid');
  }
}

function clearError(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.closest('.formData').removeAttribute('data-error');
    element.closest('.formData').removeAttribute('data-error-visible');
  }
}

function displayValid(elementId) {
  const validIndicator = document.getElementById(elementId);
  if (validIndicator) {
    validIndicator.classList.add('valid');
  }
}

function hideValid(elementId) {
  const validIndicator = document.getElementById(elementId);
  if (validIndicator) {
    validIndicator.classList.remove('valid');
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
