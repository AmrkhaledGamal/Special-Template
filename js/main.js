// bullets ----------------------------
// links ------------------------------
let allBullets = document.querySelectorAll(".bullets .bullet");
let allLinks = document.querySelectorAll(".links a");

function intoView(element) {
  element.forEach((el) => {
    el.addEventListener("click", (e) => {
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
intoView(allBullets);
intoView(allLinks);

// handle active class-----------------
function handleActive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((el) => {
    el.classList.remove("active");
  });
  ev.target.classList.add("active");
}

// setting ----------------------------------------------------------------------------------------------------------------------------

// gear-icon
let gearIcon = document.querySelector(".gear-icon");
let settings = document.querySelector(".settings");
let iGear = document.querySelector(".fa-gear");
gearIcon.addEventListener("click", () => {
  settings.classList.toggle("left-0");
  iGear.classList.toggle("fa-spin");
});

// colors
let colorsList = document.querySelectorAll(".colors-list li");
let color = localStorage.getItem("color_option");
if (color) {
  document.documentElement.style.setProperty("--main-color", color);
  document.querySelector(".colors-list li").classList.remove("active");
  document
    .querySelector(`.colors-list li[data-color="${color}"]`)
    .classList.add("active");
}
colorsList.forEach((li) => {
  li.addEventListener("click", (e) => {
    let color = e.target.dataset.color;
    document.documentElement.style.setProperty("--main-color", color);
    localStorage.setItem("color_option", color);
    handleActive(e);
  });
});

//setting random background
const randomBg = document.querySelectorAll(".random-bg span");
randomBg.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);

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

// random background
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
    span.classList.remove("active");
  });
  if (bgLocal === "true") {
    document
      .querySelector(".random-bg span[data-background='yes']")
      .classList.add("active");
  } else {
    document
      .querySelector(".random-bg span[data-background='no']")
      .classList.add("active");
  }
}

function randomBackground() {
  if (backgroundRandom === true) {
    bgInterval = setInterval(() => {
      let landing = document.querySelector(".landing");
      let imagesArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
      let randomImage = Math.floor(Math.random() * imagesArray.length);
      landing.style.backgroundImage = `url(./image/${imagesArray[randomImage]})`;
    }, 4000);
  }
}
randomBackground();

// bullets
let bulletsSpan = document.querySelectorAll(".bullets-option span");
bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.display === "show") {
      document.querySelector(".bullets").style.display = "flex";
      localStorage.setItem("bullets_option", "show");
    } else {
      document.querySelector(".bullets").style.display = "none";
      localStorage.setItem("bullets_option", "hidden");
    }
  });
});

let bulletsLocal = localStorage.getItem("bullets_option");
if (bulletsLocal) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletsLocal === "show") {
    document.querySelector(".bullets").style.display = "flex";
    document
      .querySelector(".bullets-option span[data-display='show']")
      .classList.add("active");
  } else {
    document.querySelector(".bullets").style.display = "none";
    document
      .querySelector(".bullets-option span[data-display='hidden']")
      .classList.add("active");
  }
}

// Reset option
document.querySelector(".reset-option").addEventListener("click", () => {
  // localStorage.clear();
  localStorage.removeItem("color_option");
  localStorage.removeItem("background_option");
  localStorage.removeItem("bullets_option");
  window.location.reload();
});

// toggle menu -------------------------------------------------------------------------------------------------------------------------
let toggleMenu = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");
toggleMenu.addEventListener("click", (e) => {
  e.stopPropagation();
  tLinks.classList.toggle("open");
  toggleMenu.classList.toggle("menu-active");
});
document.addEventListener("click", (e) => {
  if (e.target !== toggleMenu && e.target !== tLinks) {
    if (tLinks.classList.contains("open")) {
      toggleMenu.classList.toggle("menu-active");
      tLinks.classList.toggle("open");
    }
  }
});

// our skills -------------------------------------------------------------------------------------------------------------------------
let skills = document.querySelector(".skills");
let spans = document.querySelectorAll(".skills .skill span");
window.onscroll = function () {
  if (
    window.scrollY >=
    skills.offsetTop + skills.offsetHeight - window.innerHeight
  ) {
    spans.forEach((span) => {
      span.style.width = span.dataset.progress;
    });
  }
};

// gallery ----------------------------------------------------------------------------------------------------------------------------
let gallery = document.querySelectorAll(".gallery .images-container img");
gallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    document.body.appendChild(popupBox);

    if (img.alt !== null) {
      let imgHeading = document.createElement("h3");
      imgHeading.className = "popup-heading";
      let imgText = document.createTextNode(img.alt);
      imgHeading.appendChild(imgText);
      popupBox.appendChild(imgHeading);
    }

    let popupImage = document.createElement("img");
    popupImage.src = img.src;
    popupBox.appendChild(popupImage);

    let closeButton = document.createElement("span");
    closeButton.className = "close-button";
    let closeButtonText = document.createTextNode("X");
    closeButton.appendChild(closeButtonText);
    popupBox.appendChild(closeButton);
  });
});
document.addEventListener("click", (e) => {
  if (e.target.className === "close-button") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});
