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


function submitForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name) {
        alert("Please enter your name");
        return;
    } 
    if (!email) {
        alert("Please enter your email");
        return;
    } 
    if (!message) {
        alert("Please enter your Message");
        return;
    }

    alert("Message sent successfully!");

    document.getElementById('name').value  = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';

}