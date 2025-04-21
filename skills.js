// show/hide skills items
const skillItems = document.querySelectorAll("section.skills .skill")

skillItems.forEach((skill) => {
  skill.querySelector(".head").addEventListener("click", () => {
    skill.querySelector(".items").classList.toggle("show-items")
  })
})
