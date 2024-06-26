// Éléments du DOM
const modalbg = document.querySelector(".bground"); // Sélectionne l'élément de fond de la modale
const modalBtn = document.querySelectorAll(".modal-btn"); // Sélectionne tous les boutons qui ouvrent la modale
const closeBtn = document.querySelector(".close-btn"); // Sélectionne le bouton pour fermer la modale
const form = document.forms['reserve']; // Sélectionne le formulaire avec le nom 'reserve'
const modalMessage = document.getElementById('modalMessage'); // Sélectionne l'élément pour afficher le message de la modale
const successModal = document.getElementById('successModal'); // Sélectionne l'élément de la modale de succès
const closeModalBtn = document.getElementsByClassName('close-modal')[0]; // Sélectionne le bouton pour fermer la modale de succès
const modalForm = document.querySelector(".modal-form"); // Sélectionne la modale de formulaire
const closeSuccessBtn = successModal.querySelector(".close-button"); // Sélectionne le bouton pour fermer la modale de succès

// Fonction pour afficher la navigation responsive
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Fonction pour afficher la modale
function launchModal() {
  modalbg.style.display = "block"; // Définit le style d'affichage du fond de la modale sur 'block' pour l'afficher
  document.body.classList.add('no-scroll'); // Ajoute la classe no-scroll à l'élément body pour désactiver le défilement
}

// Fonction pour fermer la modale de formulaire
function closeFormModal() {
  modalbg.style.display = "none"; // Définit le style d'affichage du fond de la modale sur 'none' pour le cacher
  document.body.classList.remove('no-scroll'); // Retire la classe no-scroll de l'élément body pour réactiver le défilement
}

// Fonction pour fermer la modale de succès et réactiver la page principale
function closeSuccessModal() {
  successModal.style.display = 'none'; // Masque la modale de succès
  modalbg.style.display = "none"; // Masque également l'élément de fond de la modale
  document.body.classList.remove('no-scroll'); // Réactive le défilement de la page
}

// Fonction pour valider le prénom
function validateFirstName() {
  const firstName = form['first'].value.trim(); // Récupère et nettoie la valeur du prénom
  if (firstName.length < 2) { // Vérifie si la longueur du prénom est inférieure à 2 caractères
    displayError('first', 'Le prénom doit contenir au moins 2 caractères.'); // Affiche un message d'erreur pour le prénom
  } else {
    clearError('first'); // Efface l'erreur pour le prénom
    displayValid('first-valid'); // Affiche l'indicateur de validation pour le prénom
  }
}

// Fonction pour valider le nom
function validateLastName() {
  const lastName = form['last'].value.trim(); // Récupère et nettoie la valeur du nom
  if (lastName.length < 2) { // Vérifie si la longueur du nom est inférieure à 2 caractères
    displayError('last', 'Le nom doit contenir au moins 2 caractères.'); // Affiche un message d'erreur pour le nom
  } else {
    clearError('last'); // Efface l'erreur pour le nom
    displayValid('last-valid'); // Affiche l'indicateur de validation pour le nom
  }
}

// Fonction pour valider l'email
function validateEmailField() {
  const email = form['email'].value.trim(); // Récupère et nettoie la valeur de l'email
  if (!validateEmail(email)) { // Vérifie si l'email est valide
    displayError('email', 'Veuillez entrer une adresse email valide.'); // Affiche un message d'erreur pour l'email
  } else {
    clearError('email'); // Efface l'erreur pour l'email
    displayValid('email-valid'); // Affiche l'indicateur de validation pour l'email
  }
}

// Fonction pour valider la date de naissance et vérifier que l'utilisateur a plus de 18 ans
function validateBirthdate() {
  const birthdate = form['birthdate'].value.trim(); // Récupère et nettoie la valeur de la date de naissance
  const regex = /^\d{4}-\d{2}-\d{2}$/; // Expression régulière pour vérifier le format YYYY-MM-DD
  if (!regex.test(birthdate)) { // Vérifie si la date de naissance respecte le format
    displayError('birthdate', 'Veuillez entrer votre date de naissance au format AAAA-MM-JJ.'); // Affiche un message d'erreur pour le format de la date de naissance
  } else if (!isAdult(birthdate)) { // Vérifie si l'utilisateur a plus de 18 ans
    displayError('birthdate', 'Vous devez avoir plus de 18 ans pour vous inscrire.'); // Affiche un message d'erreur si l'utilisateur a moins de 18 ans
  } else {
    clearError('birthdate'); // Efface l'erreur pour la date de naissance
    displayValid('birthdate-valid'); // Affiche l'indicateur de validation pour la date de naissance
  }
}

// Fonction pour valider le nombre de tournois
function validateQuantity() {
  const quantity = form['quantity'].value.trim(); // Récupère et nettoie la valeur du nombre de tournois
  if (isNaN(quantity) || quantity === '') { // Vérifie si le nombre de tournois n'est pas un nombre ou est vide
    displayError('quantity', 'Veuillez entrer un nombre valide.'); // Affiche un message d'erreur pour le nombre de tournois
  } else {
    clearError('quantity'); // Efface l'erreur pour le nombre de tournois
    displayValid('quantity-valid'); // Affiche l'indicateur de validation pour le nombre de tournois
  }
}

// Fonction pour valider tous les champs du formulaire
function validateForm() {
  let isValid = true; // Initialise la variable de validation à true

  // Prénom
  if (form['first'].value.trim().length < 2) { // Vérifie si la longueur du prénom est inférieure à 2 caractères
    displayError('first', 'Le prénom doit contenir au moins 2 caractères.'); // Affiche un message d'erreur pour le prénom
    isValid = false; // Définit la validation à false
  } else {
    clearError('first'); // Efface l'erreur pour le prénom
    displayValid('first-valid'); // Affiche l'indicateur de validation pour le prénom
  }

  // Nom
  if (form['last'].value.trim().length < 2) { // Vérifie si la longueur du nom est inférieure à 2 caractères
    displayError('last', 'Le nom doit contenir au moins 2 caractères.'); // Affiche un message d'erreur pour le nom
    isValid = false; // Définit la validation à false
  } else {
    clearError('last'); // Efface l'erreur pour le nom
    displayValid('last-valid'); // Affiche l'indicateur de validation pour le nom
  }

  // Email
  if (!validateEmail(form['email'].value.trim())) { // Vérifie si l'email est valide
    displayError('email', 'Veuillez entrer une adresse email valide.'); // Affiche un message d'erreur pour l'email
    isValid = false; // Définit la validation à false
  } else {
    clearError('email'); // Efface l'erreur pour l'email
    displayValid('email-valid'); // Affiche l'indicateur de validation pour l'email
  }

  // Date de naissance
  if (form['birthdate'].value.trim() === '') { // Vérifie si la date de naissance est vide
    displayError('birthdate', 'Veuillez entrer votre date de naissance.'); // Affiche un message d'erreur pour la date de naissance
    isValid = false; // Définit la validation à false
  } else if (!isAdult(form['birthdate'].value.trim())) { // Vérifie si l'utilisateur a plus de 18 ans
    displayError('birthdate', 'Vous devez avoir plus de 18 ans pour vous inscrire.'); // Affiche un message d'erreur si l'utilisateur a moins de 18 ans
    isValid = false; // Définit la validation à false
  } else {
    clearError('birthdate'); // Efface l'erreur pour la date de naissance
    displayValid('birthdate-valid'); // Affiche l'indicateur de validation pour la date de naissance
  }

  // Nombre de tournois
  const quantity = form['quantity'].value.trim(); // Récupère et nettoie la valeur du nombre de tournois
  if (isNaN(quantity) || quantity === '') { // Vérifie si le nombre de tournois n'est pas un nombre ou est vide
    displayError('quantity', 'Veuillez entrer un nombre valide.'); // Affiche un message d'erreur pour le nombre de tournois
    isValid = false; // Définit la validation à false
  } else {
    clearError('quantity'); // Efface l'erreur pour le nombre de tournois
    displayValid('quantity-valid'); // Affiche l'indicateur de validation pour le nombre de tournois
  }

  // Bouton radio sélectionné
  let locationSelected = false; // Initialise la variable de sélection de lieu à false
  const locationInputs = form['location']; // Récupère tous les boutons radio de sélection de lieu
  for (let i = 0; i < locationInputs.length; i++) { // Boucle à travers les boutons radio
    if (locationInputs[i].checked) { // Vérifie si un bouton radio est sélectionné
      locationSelected = true; // Définit la sélection de lieu à true
      break; // Sort de la boucle
    }
  }
  if (!locationSelected) { // Vérifie si aucun bouton radio n'est sélectionné
    displayError('location1', 'Veuillez sélectionner un tournoi.'); // Affiche un message d'erreur pour la sélection de lieu
    isValid = false; // Définit la validation à false
  } else {
    clearError('location1'); // Efface l'erreur pour la sélection de lieu
    displayValid('location1-valid'); // Affiche l'indicateur de validation pour la sélection de lieu
  }

  // Conditions générales
  const termsAccepted = form['checkbox1'].checked; // Vérifie si la case des conditions générales est cochée
  if (!termsAccepted) { // Vérifie si la case des conditions générales n'est pas cochée
    displayError('checkbox1', 'Vous devez accepter les conditions d\'utilisation.'); // Affiche un message d'erreur pour les conditions générales
    isValid = false; // Définit la validation à false
  } else {
    clearError('checkbox1'); // Efface l'erreur pour les conditions générales
    displayValid('checkbox1-valid'); // Affiche l'indicateur de validation pour les conditions générales
  }

  return isValid; // Retourne la validité du formulaire
}

// Fonction pour afficher une erreur
function displayError(elementId, message) {
  const element = document.getElementById(elementId); // Sélectionne l'élément par son ID
  if (element) { // Vérifie si l'élément existe
    element.closest('.formData').setAttribute('data-error', message); // Définit l'attribut d'erreur avec le message
    element.closest('.formData').setAttribute('data-error-visible', 'true'); // Définit l'attribut de visibilité de l'erreur à 'true'
    hideValid(elementId + '-valid'); // Masque l'indicateur de validation
  }
}

// Fonction pour effacer une erreur
function clearError(elementId) {
  const element = document.getElementById(elementId); // Sélectionne l'élément par son ID
  if (element) { // Vérifie si l'élément existe
    element.closest('.formData').removeAttribute('data-error'); // Supprime l'attribut d'erreur
    element.closest('.formData').removeAttribute('data-error-visible'); // Supprime l'attribut de visibilité de l'erreur
  }
}

// Fonction pour afficher un indicateur de validation
function displayValid(elementId) {
  const validIndicator = document.getElementById(elementId); // Sélectionne l'indicateur de validation par son ID
  if (validIndicator) { // Vérifie si l'indicateur de validation existe
    validIndicator.classList.add('valid'); // Ajoute la classe 'valid' à l'indicateur
  }
}

// Fonction pour masquer un indicateur de validation
function hideValid(elementId) {
  const validIndicator = document.getElementById(elementId); // Sélectionne l'indicateur de validation par son ID
  if (validIndicator) { // Vérifie si l'indicateur de validation existe
    validIndicator.classList.remove('valid'); // Supprime la classe 'valid' de l'indicateur
  }
}

// Fonction pour valider une adresse email avec une expression régulière
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expression régulière pour valider l'email
  return re.test(email); // Retourne true si l'email est valide, sinon false
}

// Fonction pour vérifier si la date de naissance correspond à un âge de 18 ans ou plus
function isAdult(birthdate) {
  const birthDate = new Date(birthdate); // Convertit la chaîne de date en objet Date
  const today = new Date(); // Récupère la date actuelle
  const age = today.getFullYear() - birthDate.getFullYear(); // Calcule l'âge en années
  const monthDiff = today.getMonth() - birthDate.getMonth(); // Calcule la différence de mois
  const dayDiff = today.getDate() - birthDate.getDate(); // Calcule la différence de jours

  // Vérifie si l'utilisateur a déjà eu son anniversaire cette année
  if (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)) {
    return age >= 18; // Retourne true si l'utilisateur a 18 ans ou plus
  } else {
    return age > 18; // Retourne true si l'utilisateur a plus de 18 ans
  }
}

// Ajout des écouteurs d'événements
document.addEventListener('DOMContentLoaded', function() {
  // Événement pour lancer la modale
  modalBtn.forEach((btn) => btn.addEventListener("click", launchModal)); // Ajoute des écouteurs d'événements de clic à tous les boutons de la modale pour lancer la modale

  // Événement pour fermer la modale
  closeBtn.addEventListener("click", closeFormModal); // Ajoute un écouteur d'événement de clic au bouton de fermeture pour fermer la modale

  // Ferme la modale de succès lorsque l'utilisateur clique sur <span> (x)
  closeModalBtn.onclick = closeSuccessModal; // Utilise une fonction partagée pour fermer la modale de succès

  // Ferme la modale de succès lorsque l'utilisateur clique n'importe où en dehors de la modale
  window.onclick = function(event) {
    if (event.target == successModal) { // Vérifie si l'utilisateur a cliqué en dehors de la modale de succès
      closeSuccessModal(); // Utilise une fonction partagée pour fermer la modale de succès
    }
  };

  // Ferme la modale de succès lorsque l'utilisateur clique sur le bouton de fermeture
  closeSuccessBtn.addEventListener("click", closeSuccessModal); // Ajoute un écouteur d'événement de clic au bouton de fermeture pour fermer la modale de succès

  // Valider les champs du formulaire lors des événements input et blur
  form['first'].addEventListener('input', validateFirstName); // Ajoute un écouteur d'événement d'entrée pour valider le prénom
  form['first'].addEventListener('blur', validateFirstName); // Ajoute un écouteur d'événement de perte de focus pour valider le prénom
  form['last'].addEventListener('input', validateLastName); // Ajoute un écouteur d'événement d'entrée pour valider le nom
  form['last'].addEventListener('blur', validateLastName); // Ajoute un écouteur d'événement de perte de focus pour valider le nom
  form['email'].addEventListener('input', validateEmailField); // Ajoute un écouteur d'événement d'entrée pour valider l'email
  form['email'].addEventListener('blur', validateEmailField); // Ajoute un écouteur d'événement de perte de focus pour valider l'email
  form['birthdate'].addEventListener('input', validateBirthdate); // Ajoute un écouteur d'événement d'entrée pour valider la date de naissance
  form['birthdate'].addEventListener('blur', validateBirthdate); // Ajoute un écouteur d'événement de perte de focus pour valider la date de naissance
  form['quantity'].addEventListener('input', validateQuantity); // Ajoute un écouteur d'événement d'entrée pour valider la quantité
  form['quantity'].addEventListener('blur', validateQuantity); // Ajoute un écouteur d'événement de perte de focus pour valider la quantité

  // Valider le formulaire lors de la soumission
  form.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le comportement par défaut de soumission du formulaire
    if (validateForm()) { // Si la validation du formulaire est réussie
      console.log('Formulaire valide, prêt à soumettre.'); // Affiche un message dans la console
      const firstName = form['first'].value.trim().toUpperCase(); // Récupère et nettoie la valeur du prénom en majuscule
      modalMessage.innerHTML = `Merci <strong>${firstName}</strong>, votre formulaire a été soumis avec succès !`; // Affiche un message de succès avec le prénom
      modalForm.style.display = 'none'; // Masque la modale de formulaire
      successModal.style.display = 'block'; // Affiche la modale avec le message de succès
    }
  });
});
