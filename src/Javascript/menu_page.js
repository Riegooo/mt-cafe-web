const menuTog = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.side-bar');
const iconMenu = document.querySelector('.menu-icon');

menuTog.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        iconMenu.classList.remove("fa-bars");
        iconMenu.classList.add("fa-xmark");
    } else {
        iconMenu.classList.remove("fa-xmark");
        iconMenu.classList.add("fa-bars");
    }
});

function setupMenuToggle(idName, className, closeClass) {
    const btn = document.getElementById(idName);
    const content = document.querySelector(className);
    const xbutton = document.querySelector(closeClass);

    btn.addEventListener("click", (e) => {
        e.preventDefault();
        content.classList.toggle("active");
    });

    xbutton.addEventListener("click", () => {
        content.classList.remove("active");
    });
}

setupMenuToggle('item-toggle-americano', '.click_image_info-americano',  '.close-info-americano');
setupMenuToggle('item-toggle-espresso', '.click_image_info-espresso', '.close-info-espresso');
setupMenuToggle('item-toggle-flat', '.click_image_info-flat', '.close-info-flat');
setupMenuToggle('item-toggle-macchiato', '.click_image_info-macchiato', '.close-info-macchiato');
setupMenuToggle('item-toggle-irish', '.click_image_info-irish', '.close-info-irish');
setupMenuToggle('item-toggle-matcha', '.click_image_info-matcha', '.close-info-matcha');
