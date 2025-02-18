// gear-icon
let gearIcon = document.querySelector(".gear-icon");
let settings = document.querySelector(".settings");
let iGear = document.querySelector(".fa-gear");

gearIcon.addEventListener("click", () => {
  settings.classList.toggle("left-0");
  iGear.classList.toggle("fa-spin");
});

// colors ------------------------------------------------------------

let colorsList = document.querySelectorAll(".colors-list li");

let color = localStorage.getItem("color_option");
if (color) {
  document.documentElement.style.setProperty("--main-color", color);
  document.querySelector(".colors-list li").classList.remove("active-color");
  document
    .querySelector(`.colors-list li[data-color="${color}"]`)
    .classList.add("active-color");
}

colorsList.forEach((li) => {
  li.addEventListener("click", (e) => {
    let color = e.target.dataset.color;
    document.documentElement.style.setProperty("--main-color", color);
    localStorage.setItem("color_option", color);
    colorsList.forEach((li) => {
      li.classList.remove("active-color");
    });
    e.target.classList.add("active-color");
  });
});

// landing ------------------------------------------------------------

let backgroundRandom = true;
let bgInterval;

let bgLocal = localStorage.getItem("background_option");
if (bgLocal) {
  if (bgLocal === "true") {
    backgroundRandom = true;
  } else {
    backgroundRandom = false;
  }

  const randomBg = document.querySelectorAll(".random-bg span");
  randomBg.forEach((span) => {
    span.classList.remove("active-bg");
  });
  if (bgLocal === "true") {
    document
      .querySelector(".random-bg span[data-background='yes']")
      .classList.add("active-bg");
  } else {
    document
      .querySelector(".random-bg span[data-background='no']")
      .classList.add("active-bg");
  }
}

// random background

function randomBackground() {
  if (backgroundRandom === true) {
    bgInterval = setInterval(() => {
      let landing = document.querySelector(".landing");
      let imagesArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
      let randomImage = Math.floor(Math.random() * imagesArray.length);
      landing.style.backgroundImage = `url(./image/${imagesArray[randomImage]})`;
    }, 6000);
  }
}
randomBackground();

//setting random background

const randomBg = document.querySelectorAll(".random-bg span");
randomBg.forEach((span) => {
  span.addEventListener("click", (e) => {
    randomBg.forEach((span) => {
      span.classList.remove("active-bg");
    });
    e.target.classList.add("active-bg");

    if (e.target.dataset.background === "yes") {
      backgroundRandom = true;
      localStorage.setItem("background_option", "true");
      randomBackground();
    } else {
      backgroundRandom = false;
      localStorage.setItem("background_option", "false");
      clearInterval(bgInterval);
    }
  });
});
