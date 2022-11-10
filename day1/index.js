const home = document.querySelector(".home")
const news = document.querySelector(".news")
const contact = document.querySelector(".contact")
const about = document.querySelector(".about")

home.addEventListener("click", () => {
    home.classList.add("active")
    news.classList.remove("active")
    contact.classList.remove("active")
    about.classList.remove("active")
})

news.addEventListener("click", () => {
    news.classList.add("active")
    home.classList.remove("active")
    contact.classList.remove("active")
    about.classList.remove("active")
})

function myFunction() {
    const home = document.querySelector(".home")
    home.classList.add("active");
}