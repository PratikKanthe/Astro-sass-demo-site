console.log("hi");
alert('turn off your device')

const hamburger = document.getElementById("hamburger");

const navMenu = document.getElementById("nav-items");

const dropdown = document.getElementById("dropdown");

hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

navMenu.querySelectorAll("nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}));

//dropdown
dropdown.addEventListener("click", () => {
    dropdown.classList.toggle("active");
});

navMenu.querySelectorAll("dropdown").forEach(n => n.addEventListener("click", () => {
    dropdown.classList.remove("active");
}));
