const menuTog = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");
const icon = document.querySelector(".menu-icon");

menuTog.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }
});


