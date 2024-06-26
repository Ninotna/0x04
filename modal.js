function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Éléments du DOM
const modalbg = document.querySelector(".bground"); // Sélectionne l'élément de fond de la modale
const modalBtn = document.querySelectorAll(".modal-btn"); // Sélectionne tous les boutons qui ouvrent la modale
const closeBtn = document.querySelector(".close-btn"); // Sélectionne le bouton pour fermer la modale
const form = document.forms['reserve']; // Sélectionne le formulaire avec le nom 'reserve'
const formData = document.querySelectorAll(".formData"); // Sélectionne tous les éléments avec la classe 'formData'


// Initialise les événements pour les boutons et le formulaire

function initEvents()
{
	modalBtn.forEach((btn) => btn.addEventListener("click", launchModal)); // Ajoute des écouteurs d'événements de clic à tous les boutons de la modale pour lancer la modale
	closeBtn.addEventListener("click", closeModal); // Ajoute un écouteur d'événement de clic au bouton de fermeture pour fermer la modale
	form.addEventListener('submit', handleFormSubmit); // Ajoute un écouteur d'événement de soumission de formulaire pour valider le formulaire
}

// Lancer le formulaire de la modale
function launchModal()
{
	modalbg.style.display = "block"; // Définit le style d'affichage du fond de la modale sur 'block' pour l'afficher
}

// Fermer le formulaire de la modale
function closeModal()
{
	modalbg.style.display = "none"; // Définit le style d'affichage du fond de la modale sur 'none' pour le cacher
}

// Gérer la soumission du formulaire et valider le formulaire
function handleFormSubmit(event)
{
	event.preventDefault(); // Empêche le comportement par défaut de soumission du formulaire
	if (validateForm()) // Si la validation du formulaire est réussie
	{
		console.log('Formulaire valide, prêt à soumettre.'); // Affiche un message dans la console
		const firstName = form['first'].value.trim(); // Récupère et nettoie la valeur du prénom
		modalMessage.textContent = `Merci ${firstName}, votre formulaire a été soumis avec succès !`; // Affiche un message de succès avec le prénom
		successModal.style.display = 'block'; // Affiche la modale de succès
		// Vous pouvez ajouter le code pour soumettre le formulaire ici
		// form.submit(); // Si vous voulez réellement soumettre le formulaire
	}
}

// Logique de validation du formulaire
function validateForm()
{
	let isValid = true; // Initialise la variable de validation à true

	if (!validateFirstName()) { isValid = false; }
	if (!validateLastName()) { isValid = false; }
	if (!validateEmailField()) { isValid = false; }
	if (!validateBirthdate()) { isValid = false; }
	if (!validateQuantity()) { isValid = false; }
	if (!validateLocation()) { isValid = false; }
	if (!validateTerms()) { isValid = false; }

	return isValid; // Retourne la validité du formulaire
}

// Validation du prénom
function validateFirstName()
{
	const firstName = form['first'].value.trim(); // Récupère et nettoie la valeur du prénom
	if (firstName.length < 2) // Vérifie si la longueur du prénom est inférieure à 2 caractères
	{
		displayError('first', 'Le prénom doit contenir au moins 2 caractères.'); // Affiche un message d'erreur pour le prénom
		return false; // Retourne false pour indiquer que la validation a échoué
	}
	else
	{
		clearError('first'); // Efface l'erreur pour le prénom
		displayValid('first-valid'); // Affiche l'indicateur de validation pour le prénom
		return true; // Retourne true pour indiquer que la validation a réussi
	}
}

// Validation du nom
function validateLastName()
{
	const lastName = form['last'].value.trim(); // Récupère et nettoie la valeur du nom
	if (lastName.length < 2) // Vérifie si la longueur du nom est inférieure à 2 caractères
	{
		displayError('last', 'Le nom doit contenir au moins 2 caractères.'); // Affiche un message d'erreur pour le nom
		return false; // Retourne false pour indiquer que la validation a échoué
	}
	else
	{
		clearError('last'); // Efface l'erreur pour le nom
		displayValid('last-valid'); // Affiche l'indicateur de validation pour le nom
		return true; // Retourne true pour indiquer que la validation a réussi
	}
}

// Validation de l'email
function validateEmailField()
{
	const email = form['email'].value.trim(); // Récupère et nettoie la valeur de l'email
	if (!validateEmail(email)) // Vérifie si l'email est valide
	{
		displayError('email', 'Veuillez entrer une adresse email valide.'); // Affiche un message d'erreur pour l'email
		return false; // Retourne false pour indiquer que la validation a échoué
	}
	else
	{
		clearError('email'); // Efface l'erreur pour l'email
		displayValid('email-valid'); // Affiche l'indicateur de validation pour l'email
		return true; // Retourne true pour indiquer que la validation a réussi
	}
}

// Validation de la date de naissance
function validateBirthdate()
{
	const birthdate = form['birthdate'].value.trim(); // Récupère et nettoie la valeur de la date de naissance
	if (birthdate === '') // Vérifie si la date de naissance est vide
	{
		displayError('birthdate', 'Veuillez entrer votre date de naissance.'); // Affiche un message d'erreur pour la date de naissance
		return false; // Retourne false pour indiquer que la validation a échoué
	}
	else
	{
		clearError('birthdate'); // Efface l'erreur pour la date de naissance
		displayValid('birthdate-valid'); // Affiche l'indicateur de validation pour la date de naissance
		return true; // Retourne true pour indiquer que la validation a réussi
	}
}

// Validation du nombre de tournois
function validateQuantity()
{
	const quantity = form['quantity'].value.trim(); // Récupère et nettoie la valeur du nombre de tournois
	if (isNaN(quantity) || quantity === '') // Vérifie si le nombre de tournois n'est pas un nombre ou est vide
	{
		displayError('quantity', 'Veuillez entrer un nombre valide.'); // Affiche un message d'erreur pour le nombre de tournois
		return false; // Retourne false pour indiquer que la validation a échoué
	}
	else
	{
		clearError('quantity'); // Efface l'erreur pour le nombre de tournois
		displayValid('quantity-valid'); // Affiche l'indicateur de validation pour le nombre de tournois
		return true; // Retourne true pour indiquer que la validation a réussi
	}
}

// Validation de la sélection de lieu
function validateLocation()
{
	let locationSelected = false; // Initialise la variable de sélection de lieu à false
	const locationInputs = form['location']; // Récupère tous les boutons radio de sélection de lieu
	for (let i = 0; i < locationInputs.length; i++) // Boucle à travers les boutons radio
	{
		if (locationInputs[i].checked) // Vérifie si un bouton radio est sélectionné
		{
			locationSelected = true; // Définit la sélection de lieu à true
			break; // Sort de la boucle
		}
	}
	if (!locationSelected) // Vérifie si aucun bouton radio n'est sélectionné
	{
		displayError('location1', 'Veuillez sélectionner un tournoi.'); // Affiche un message d'erreur pour la sélection de lieu
		return false; // Retourne false pour indiquer que la validation a échoué
	}
	else
	{
		clearError('location1'); // Efface l'erreur pour la sélection de lieu
		displayValid('location1-valid'); // Affiche l'indicateur de validation pour la sélection de lieu
		return true; // Retourne true pour indiquer que la validation a réussi
	}
}

// Validation des conditions générales
function validateTerms()
{
	const termsAccepted = form['checkbox1'].checked; // Vérifie si la case des conditions générales est cochée
	if (!termsAccepted) // Vérifie si la case des conditions générales n'est pas cochée
	{
		displayError('checkbox1', 'Vous devez accepter les conditions d\'utilisation.'); // Affiche un message d'erreur pour les conditions générales
		return false; // Retourne false pour indiquer que la validation a échoué
	}
	else
	{
		clearError('checkbox1'); // Efface l'erreur pour les conditions générales
		displayValid('checkbox1-valid'); // Affiche l'indicateur de validation pour les conditions générales
		return true; // Retourne true pour indiquer que la validation a réussi
	}
}

// Affiche une erreur
function displayError(elementId, message)
{
	const element = document.getElementById(elementId); // Sélectionne l'élément par son ID
	if (element) // Vérifie si l'élément existe
	{
		element.closest('.formData').setAttribute('data-error', message); // Définit l'attribut d'erreur avec le message
		element.closest('.formData').setAttribute('data-error-visible', 'true'); // Définit l'attribut de visibilité de l'erreur à 'true'
		hideValid(elementId + '-valid'); // Masque l'indicateur de validation
	}
}

// Efface une erreur
function clearError(elementId)
{
	const element = document.getElementById(elementId); // Sélectionne l'élément par son ID
	if (element) // Vérifie si l'élément existe
	{
		element.closest('.formData').removeAttribute('data-error'); // Supprime l'attribut d'erreur
		element.closest('.formData').removeAttribute('data-error-visible'); // Supprime l'attribut de visibilité de l'erreur
	}
}

// Affiche un indicateur de validation
function displayValid(elementId)
{
	const validIndicator = document.getElementById(elementId); // Sélectionne l'indicateur de validation par son ID
	if (validIndicator) // Vérifie si l'indicateur de validation existe
	{
		validIndicator.classList.add('valid'); // Ajoute la classe 'valid' à l'indicateur
	}
}

// Masque un indicateur de validation
function hideValid(elementId)
{
	const validIndicator = document.getElementById(elementId); // Sélectionne l'indicateur de validation par son ID
	if (validIndicator) // Vérifie si l'indicateur de validation existe
	{
		validIndicator.classList.remove('valid'); // Supprime la classe 'valid' de l'indicateur
	}
}

// Valide l'email
function validateEmail(email)
{
	const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expression régulière pour valider l'email
	return re.test(email); // Retourne true si l'email est valide, sinon false
}

// Initialiser les événements
initEvents(); // Appelle la fonction d'initialisation des événements

