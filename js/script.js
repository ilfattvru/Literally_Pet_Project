// Utility function to get element(s) by selector
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// DOM Elements
const firstDisplayElement = $(".first-display");
const displayCatElement = $(".display__cat");
const displayDogElement = $(".display__dog");
const resultCatElement = $(".result_cat");
const resultDogElement = $(".result_dog");
const resultCatdogElement = $(".result_catdog");
const startDogBtn = $(".dog-start-btn");
const startCatBtn = $(".cat-start-btn");
const pageBtnsCats = $$(".page-btn-cat");
const catImage = $(".cat-api");
const pageBtnsDogs = $$(".page-btn-dog");
const dogImage = $(".dog-api");

// API URLs
const catUrl = "https://api.thecatapi.com/v1/images/search";
const dogUrl = "https://dog.ceo/api/breeds/image/random";

// Votes
let currentCatVotes = 0;
let currentDogVotes = 0;

// Show/hide helpers
function showElement(el) {
  el.classList.remove("hidden");
}
function hideElement(el) {
  el.classList.add("hidden");
}

// Start screen handlers
startDogBtn.addEventListener("click", () => {
  hideElement(firstDisplayElement);
  showElement(displayDogElement);
});

startCatBtn.addEventListener("click", () => {
  hideElement(firstDisplayElement);
  showElement(displayCatElement);
});

// Fetch cat image
async function fetchCatImage() {
  try {
    const response = await fetch(catUrl);
    const data = await response.json();
    if (Array.isArray(data) && data.length > 0 && data[0].url) {
      catImage.src = data[0].url;
    } else {
      console.error("Данные изображения не получены.");
    }
  } catch (error) {
    console.error(error);
  }
}

// Fetch dog image
async function fetchDogImage() {
  try {
    const response = await fetch(dogUrl);
    const data = await response.json();
    if (data && data.message) {
      dogImage.src = data.message;
    } else {
      console.error("Данные изображения не получены.");
    }
  } catch (error) {
    console.error(error);
  }
}

// Cat page navigation
pageBtnsCats.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (catImage.complete) {
      fetchCatImage();
    }
  });
});

// Dog page navigation
pageBtnsDogs.forEach((btn) => {
  btn.addEventListener("click", fetchDogImage);
});

// Like handlers
$("#like-cat").addEventListener("click", () => {
  currentCatVotes = parseInt(sessionStorage.getItem("catVotes")) || 0;
  currentCatVotes += 1;
  sessionStorage.setItem("catVotes", currentCatVotes);
});

$("#like-dog").addEventListener("click", () => {
  currentDogVotes = parseInt(sessionStorage.getItem("dogVotes")) || 0;
  currentDogVotes += 1;
  sessionStorage.setItem("dogVotes", currentDogVotes);
});

// Results handler
const btnResults = $$(".btn__result");
btnResults.forEach((btnResult) => {
  btnResult.addEventListener("click", () => {
    // Get latest votes from sessionStorage
    currentCatVotes = parseInt(sessionStorage.getItem("catVotes")) || 0;
    currentDogVotes = parseInt(sessionStorage.getItem("dogVotes")) || 0;

    hideElement(displayCatElement);
    hideElement(displayDogElement);

    if (currentCatVotes > currentDogVotes) {
      showElement(resultCatElement);
      hideElement(resultDogElement);
      hideElement(resultCatdogElement);
    } else if (currentCatVotes === currentDogVotes) {
      showElement(resultCatdogElement);
      hideElement(resultCatElement);
      hideElement(resultDogElement);
    } else {
      showElement(resultDogElement);
      hideElement(resultCatElement);
      hideElement(resultCatdogElement);
    }
  });
});

// Back and main menu handlers
const btnBackElements = $$(".btn__back");
const btnMainMenuElements = $$(".btn__main");

btnBackElements.forEach((btnBack) => {
  btnBack.addEventListener("click", () => {
    sessionStorage.clear();
    window.location.reload();
  });
});

btnMainMenuElements.forEach((btnMenu) => {
  btnMenu.addEventListener("click", () => {
    showElement(firstDisplayElement);
    hideElement(displayCatElement);
    hideElement(displayDogElement);
    hideElement(resultCatElement);
    hideElement(resultDogElement);
    hideElement(resultCatdogElement);
  });
});
