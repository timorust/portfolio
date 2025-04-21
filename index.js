// Initialize Swiper
const swiper = new Swiper(".swiper", {
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },
})

// Toggle mobile menu
const menuBtn = document.getElementById("menu-btn")
const closeBtn = document.getElementById("close-btn")
const menu = document.querySelector("nav .container ul")

menuBtn?.addEventListener("click", () => {
  menu.style.display = "block"
  menuBtn.style.display = "none"
  closeBtn.style.display = "inline-block"
})

closeBtn?.addEventListener("click", () => {
  menu.style.display = "none"
  menuBtn.style.display = "inline-block"
  closeBtn.style.display = "none"
})

// Navigation item highlight
const navItems = menu?.querySelectorAll("li")

const changeActiveItem = () => {
  navItems?.forEach((item) => {
    const link = item.querySelector("a")
    link.classList.remove("active")
  })
}

navItems?.forEach((item) => {
  const link = item.querySelector("a")
  link.addEventListener("click", () => {
    changeActiveItem()
    link.classList.add("active")
  })
})

// Read More toggle
const readMoreBtn = document.querySelector(".read-more")
const readMoreContent = document.querySelector(".read-more-content")

readMoreBtn?.addEventListener("click", () => {
  readMoreContent.classList.toggle("show-content")
  readMoreBtn.textContent = readMoreContent.classList.contains("show-content")
    ? "Show Less"
    : "Show more"
})

// Toggle skill sections
function initSkillsToggle() {
  const skillItems = document.querySelectorAll("section.skills .skill")
  skillItems.forEach((skill) => {
    const head = skill.querySelector(".head")
    const items = skill.querySelector(".items")
    head?.addEventListener("click", () => {
      items?.classList.toggle("show-items")
    })
  })
}

// Nav shadow on scroll
window.addEventListener("scroll", () => {
  document
    .querySelector("nav")
    ?.classList.toggle("show-box-shadow", window.scrollY > 0)
})

// Load external HTML into section
async function loadHTML(id, file, callback) {
  const element = document.getElementById(id)
  if (!element) {
    console.warn(`Element with id "${id}" not found.`)
    return
  }

  try {
    const response = await fetch(file)
    if (!response.ok) throw new Error(`Failed to load ${file}`)
    const html = await response.text()
    element.innerHTML = html
    if (callback) callback()
  } catch (err) {
    console.error(`Error loading ${file}:`, err)
  }
}

// Load external sections and rebind events if needed
loadHTML('footer', 'footer.html')
loadHTML('testimonials', 'testimonials.html')
loadHTML('skills', 'skills.html', initSkillsToggle)
