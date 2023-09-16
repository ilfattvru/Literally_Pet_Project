// Получаем элемент с классом .first-display
const firstDisplayElement = document.querySelector(".first-display");
const displayCatElement = document.querySelector(".display__cat");
const displayDogElement = document.querySelector(".display__dog");
const resultCatElement = document.querySelector(".result_cat");
const resultDogElement = document.querySelector(".result_dog");
const resultCatdogElement = document.querySelector(".result_catdog");
const displayElement = document.querySelectorAll(".display");
const startDogBtn = document.querySelector(".dog-start-btn");
const startCatBtn = document.querySelector(".cat-start-btn");

let currentCatVotes = 0;
let currentDogVotes = 0;

//Выбор кошки/собаки
startDogBtn.addEventListener("click", function () {
  firstDisplayElement.classList.add("hidden");
  displayDogElement.classList.remove("hidden");
});

startCatBtn.addEventListener("click", function () {
  firstDisplayElement.classList.add("hidden");
  displayCatElement.classList.remove("hidden");
});


const pageBtnsCats = document.querySelectorAll(".page-btn-cat");
const catImage = document.querySelector(".cat-api");
const catUrl = "https://api.thecatapi.com/v1/images/search";

async function fetchHandlerCat() {
  try {
    const response = await fetch(catUrl);
    const data = await response.json();
    if (data && Array.isArray(data) && data.length > 0) {
      const catImageUrl = data[0].url;
      catImage.src = catImageUrl;
    } else {
      console.log("Данные изображения не получены.");
    }
  } catch (error) {
    console.log(error);
  }
}


pageBtnsCats.forEach(function (btn) {
  btn.addEventListener("click", () => {
    let isLoaded = catImage.complete;
    if (isLoaded) {
      fetchHandlerCat();
    }
  });
});


const pageBtnsDogs = document.querySelectorAll(".page-btn-dog");
const dogImage = document.querySelector(".dog-api");
const dogUrl = "https://dog.ceo/api/breeds/image/random";

async function fetchHandlerDog() {
  try {
    const response = await fetch(dogUrl);
    const data = await response.json();
    console.log(data)
    if (data)  {
      const dogImageUrl = data.message;
      console.log(dogImageUrl);
      dogImage.src = dogImageUrl;
    } else {
      console.log("Данные изображения не получены.");
    }
  } catch (error) {
    console.log(error);
  }
}

pageBtnsDogs.forEach(function (btn) {
  btn.addEventListener("click", () => {
    fetchHandlerDog();
  });
});


// const pageBtnsDogs = document.querySelectorAll(".page-btn-dog");
// const dogImage = document.querySelector(".dog-api");
// const dogUrl = "https://random.dog/woof.json";

// async function fetchHandlerDog() {
//   try {
//     const response = await fetch(dogUrl);
//     const data = await response.json();
//     if (data && data.url) {
//       const dogImageUrl = data.url;
//       dogImage.src = dogImageUrl;
//     } else {
//       console.log("Данные изображения собаки не получены.");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// pageBtnsDogs.forEach(function (btn) {
//   btn.addEventListener("click", () => {
//     fetchHandlerDog();
//   });
// });


// Обработчик клика на кнопке .btn__like cat
document.getElementById("like-cat").addEventListener("click", function () {
  // Получаем текущее количество голосов за котов из localStorage (если не существует, присваиваем 0)
  currentCatVotes = parseInt(localStorage.getItem("catVotes")) || 0;

  // Увеличиваем количество голосов за котов на 1
  currentCatVotes += 1;
  console.log("Записалось коту +1");
  // Сохраняем обновленное значение в localStorage
  localStorage.setItem("catVotes", currentCatVotes);
  console.log(currentCatVotes);
});

// Обработчик клика на кнопке .btn__like dog
document.getElementById("like-dog").addEventListener("click", function () {
  // Получаем текущее количество голосов за собак из localStorage (если не существует, присваиваем 0)
  currentDogVotes = parseInt(localStorage.getItem("dogVotes")) || 0;

  // Увеличиваем количество голосов за собак на 1
  currentDogVotes += 1;
  console.log("Записалось собаке +1");
  // Сохраняем обновленное значение в localStorage
  localStorage.setItem("dogVotes", currentDogVotes);
  console.log(currentDogVotes);
});

document.querySelector("page");

var btnResults = document.querySelectorAll(".btn__result");

// Добавляем обработчик события для каждого элемента в коллекции
btnResults.forEach(function (btnResult) {
  btnResult.addEventListener("click", function () {
    // условие на лайки
    if (currentCatVotes > currentDogVotes) {
      console.log("Должно появиться окно с кошками");
      resultCatElement.classList.remove("hidden");
      displayCatElement.classList.add("hidden");
      displayDogElement.classList.add("hidden");
    }
    if (currentCatVotes === currentDogVotes) {
      console.log("должно появиться котопес");
      resultCatdogElement.classList.remove("hidden");
      displayCatElement.classList.add("hidden");
      displayDogElement.classList.add("hidden");
    }
    if (currentCatVotes < currentDogVotes) {
      console.log("Должно появиться окно с собаками");
      displayCatElement.classList.add("hidden");
      displayDogElement.classList.add("hidden");
      resultDogElement.classList.remove("hidden");
    }
  });
});

// Получаем коллекцию всех элементов с классом .btn__back
var btnBackElements = document.querySelectorAll(".btn__back");
let btnMainMenuElement = document.querySelectorAll(".btn__main");

// Добавляем обработчик события для каждой кнопки в коллекции
btnBackElements.forEach(function (btnBack) {
  btnBack.addEventListener("click", function () {
    // Очищаем localStorage
    localStorage.clear();
    // Перезагружаем страницу
    window.location.reload();
  });
});

btnMainMenuElement.forEach(function (btnMenu) {
  btnMenu.addEventListener("click", function () {
    firstDisplayElement.classList.remove("hidden");
    displayCatElement.classList.add("hidden");
    displayDogElement.classList.add("hidden");
  });
});
