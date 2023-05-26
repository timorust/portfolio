const swiper = new Swiper(".swiper", {
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },
});

const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");
const menu = document.querySelector("nav .container ul");

// show menu
menuBtn.addEventListener("click", () => {
  menu.style.display = "block";
  menuBtn.style.display = "none";
  closeBtn.style.display = "inline-block";
});

// hide menu
closeBtn.addEventListener("click", () => {
  menu.style.display = "none";
  menuBtn.style.display = "inline-block";
  closeBtn.style.display = "none";
});

const navItems = menu.querySelectorAll("li");

const changeActiveItem = () => {
  navItems.forEach((item) => {
    const link = item.querySelector("a");
    link.classList.remove("active");
  });
};

navItems.forEach((item) => {
  const link = item.querySelector("a");
  link.addEventListener("click", () => {
    changeActiveItem();
    link.classList.add("active");
  });
});

const readMoreBtn = document.querySelector(".read-more");
const readMoreContent = document.querySelector(".read-more-content");

readMoreBtn.addEventListener("click", () => {
  readMoreContent.classList.toggle("show-content");
  if (readMoreContent.classList.contains("show-content")) {
    readMoreBtn.textContent = "Show Less";
  } else {
    readMoreBtn.textContent = "Show more";
  }
});

//show/hide skills items
const skillItems = document.querySelectorAll("section.skills .skill");

skillItems.forEach((skill) => {
  skill.querySelector(".head").addEventListener("click", () => {
    skill.querySelector(".items").classList.toggle("show-items");
  });
});

// function move() {
//   const elem = document.querySelectorAll(".progress");
//   const width = 0;
//   function frame() {
//     if (width === 100) {
//       clearInterval(id);
//     } else {
//       width++;
//       elem.style.width = width + "%";
//     }
//     const id = setInterval(frame, 10);
//   }
// }

// add box shadow on scroll
window.addEventListener("scroll", () => {
  document
    .querySelector("nav")
    .classList.toggle("show-box-shadow", window.scrollY > 0);
});
