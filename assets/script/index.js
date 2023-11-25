'use strict';

import { onEvent, select } from "./utils.js";
import { Contact } from "./class.js";

const input = select('.input');
const button = select('.button');
const errorContainer = select('.error-container');
const numberInput = select('.number');
const contactsContainer = select('.contacts');
const form = select('#contactForm');


const contacts = [];

// Function to add a new contact
function addContact(contactInfo) {
  const contactDiv = document.createElement('div');
  contactDiv.classList.add('contact');

  const [name, city, email] = contactInfo.split(',').map((info) => info.trim());

  const validationResult = validateInput(name, city, email);

  if (validationResult) {
    showErrorMessage(validationResult);
    return;
  }

  const capitalizedName = capitalizeFirstLetter(name);
  const capitalizedCity = capitalizeFirstLetter(city);

  const nameParagraph = document.createElement('p');
  nameParagraph.textContent = `Name: ${capitalizedName}`;

  const cityParagraph = document.createElement('p');
  cityParagraph.textContent = `City: ${capitalizedCity}`;

  const emailParagraph = document.createElement('p');
  emailParagraph.textContent = `Email: ${email}`;

  contactDiv.appendChild(nameParagraph);
  contactDiv.appendChild(cityParagraph);
  contactDiv.appendChild(emailParagraph);

  contactsContainer.insertBefore(contactDiv, contactsContainer.firstChild);

  contacts.unshift(new Contact(capitalizedName, capitalizedCity, email));

  onEvent('click', contactDiv, () => {
    deleteContact(contactDiv);
  });

  updateContactCount();
}

// deleting the contacts
function deleteContact() {
    contactsContainer.addEventListener("click", (e) => {
        const contactDiv = e.target.closest(".contact");
        if (contactDiv) {
            contactDiv.remove();
            contacts.length--;
            updateContactCount();
        }
    });
}


// capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// update the number of contacts
function updateContactCount() {
    numberInput.value = `Saved Contact: ${contacts.length}`;
}

function setInitialContactCount() {
    numberInput.value = `Saved Contact: 0`;
}

function showErrorMessage(message) {
    const errorMessage = document.createElement('p');
    errorMessage.textContent = message;
    errorMessage.classList.add('error-message');
  
    errorContainer.innerHTML = ''; 
    errorContainer.appendChild(errorMessage);
  
    setTimeout(() => {
      errorMessage.remove();
    }, 3000);
  }

  
// Event handler for the form submission
  function handleFormSubmit(event) {
    event.preventDefault();
    const input = select('.input');
    const contactInfo = input.value;
  
    if (contactInfo) {
      addContact(contactInfo);
      input.value = '';
    } else {
      showErrorMessage('Please enter contact information.');
    }
}

// Validation for name, city, and email
function validateInput(name, city, email) {
    const nameValidation = isValidName(name);
    const cityValidation = isValidCity(city);
    const emailValidation = isValidEmail(email);
  
    if (!nameValidation) {
      return 'Please enter a valid name.';
    }
  
    if (!cityValidation) {
      return 'Please enter a valid city.';
    }
  
    if (!emailValidation) {
      return 'Please enter a valid email address.';
    }
  
    return '';
}
  
function isValidName(name) {
    return /^[a-zA-Z]{2,}$/.test(name);
}
  
function isValidCity(city) {
    return /^[a-zA-Z]{2,}$/.test(city);
}
  
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}
  

// Set up event listeners
onEvent('click', select('.button'), handleFormSubmit);
setInitialContactCount();

onEvent('click', contactsContainer, (event) => {
    deleteContact();
});