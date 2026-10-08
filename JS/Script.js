
"use strict";

/* ==========================================
   1. CONTACT FORM VALIDATION AND PREVIEW
   ========================================== */

const contactForm = document.getElementById("contact-form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");

const formFeedback = document.getElementById("form-feedback");
const messagePreview = document.getElementById("message-preview");

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function clearFormErrors() {
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
}

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    clearFormErrors();

    formFeedback.textContent = "";
    messagePreview.hidden = true;

    let isValid = true;
    let firstInvalidField = null;

    if (name === "") {
        nameError.textContent = "Please enter your name.";
        firstInvalidField = firstInvalidField || nameInput;
        isValid = false;
    }

    if (email === "") {
        emailError.textContent = "Please enter your email address.";
        firstInvalidField = firstInvalidField || emailInput;
        isValid = false;
    } else if (!isValidEmail(email)) {
        emailError.textContent = "Please enter a valid email address.";
        firstInvalidField = firstInvalidField || emailInput;
        isValid = false;
    }

    if (message === "") {
        messageError.textContent = "Please enter a message.";
        firstInvalidField = firstInvalidField || messageInput;
        isValid = false;
    }

    if (!isValid) {
        formFeedback.textContent =
            "Please correct the highlighted errors and try again.";

        firstInvalidField.focus();
        return;
    }

    // textContent prevents user input from being interpreted as HTML.
    document.getElementById("preview-name").textContent = name;
    document.getElementById("preview-email").textContent = email;
    document.getElementById("preview-message").textContent = message;

    messagePreview.hidden = false;

    formFeedback.textContent =
        "✓ All fields are valid. This message has NOT been sent.";

    messagePreview.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        block: "nearest"
    });
});

// Remove an old field error when the user edits that field.
nameInput.addEventListener("input", function () {
    nameError.textContent = "";
});

emailInput.addEventListener("input", function () {
    emailError.textContent = "";
});

messageInput.addEventListener("input", function () {
    messageError.textContent = "";
});


/* ==========================================
   2. EXPANDABLE PROJECT DETAILS
   ========================================== */

const projectButtons = document.querySelectorAll(".project-button");

projectButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const detailsId = button.getAttribute("aria-controls");
        const details = document.getElementById(detailsId);

        if (!details) {
            return;
        }

        const opening = details.hidden;

        details.hidden = !opening;
        button.textContent = opening ? "Hide Details" : "Show Details";
        button.setAttribute("aria-expanded", String(opening));
    });
});


/* ==========================================
   3. PHOTO GALLERY
   ========================================== */

const photos = [
    {
        src: "images/photo1.jpg",
        alt: "First gallery photograph",
        caption: "My first photograph"
    },
    {
        src: "images/photo2.jpg",
        alt: "Second gallery photograph",
        caption: "My second photograph"
    },
    {
        src: "images/photo3.jpg",
        alt: "Third gallery photograph",
        caption: "My third photograph"
    }
];

let currentPhoto = 0;

const galleryImage = document.getElementById("gallery-image");
const galleryCaption = document.getElementById("gallery-caption");
const galleryCounter = document.getElementById("gallery-counter");

const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");

function showPhoto(index) {
    // Do not allow navigation beyond the first or last photo.
    if (index < 0 || index >= photos.length) {
        return;
    }

    currentPhoto = index;

    const photo = photos[currentPhoto];

    galleryImage.src = photo.src;
    galleryImage.alt = photo.alt;
    galleryCaption.textContent = photo.caption;

    galleryCounter.textContent =
        "Photo " + (currentPhoto + 1) + " of " + photos.length;

    previousButton.disabled = currentPhoto === 0;
    nextButton.disabled = currentPhoto === photos.length - 1;
}

previousButton.addEventListener("click", function () {
    showPhoto(currentPhoto - 1);
});

nextButton.addEventListener("click", function () {
    showPhoto(currentPhoto + 1);
});

// Display the first photo on page load.
showPhoto(0);


/* ==========================================
   4. LIGHT AND DARK THEME SWITCH
   ========================================== */

const themeButton = document.getElementById("theme-button");

function updateThemeButton(isDark) {
    themeButton.textContent = isDark ? "☀ Light Mode" : "☾ Dark Mode";
    themeButton.setAttribute("aria-pressed", String(isDark));
}

themeButton.addEventListener("click", function () {
    const isDark = document.body.classList.toggle("dark-theme");
    updateThemeButton(isDark);
});

// Set the correct label when the page first loads.
updateThemeButton(document.body.classList.contains("dark-theme"));
