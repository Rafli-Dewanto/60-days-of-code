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

// news.addEventListener("click", () => {
//     news.classList.add("active")
//     home.classList.remove("active")
//     contact.classList.remove("active")
//     about.classList.remove("active")
// })

const myFunction = () => {
    const home = document.querySelector(".home")
    home.classList.add("active");
}

// document.querySelector('.target').addEventListener('click', function (event) {
//     event.preventDefault();
//     var target = document.querySelector('.target');
//     if (target.classList.contains('active')) {
//         target.classList.remove('active');
//     } else {
//         target.classList.add('active');
//     }
// });