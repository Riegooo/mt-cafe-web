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

function setupMenuToggle(item) {
    const menu_card = document.getElementById(encodeURIComponent(item));

    const btn = menu_card.querySelector('.menu-item-title')
    const content = menu_card.querySelector('.click_image_info');
    const xbutton = menu_card.querySelector('.fa-solid.fa-xmark.close-info');

    btn.addEventListener("click", (e) => {
        e.preventDefault();
        content.classList.toggle("active");
    });

    xbutton.addEventListener("click", () => {
        content.classList.remove("active");
    });
}



const menu = document.getElementById("menu");
let previousSelected = "";

fetch('./menu_data.json')
    .then(res => res.json())
    .then(data => {

        function createMenuCards(type) {
            if (previousSelected === type) {
                return;
            } 

            deleteMenuCards();
            const selected = document.getElementById(type)

            selected.classList.add('selected');
            
            if (previousSelected !== "") {
                const previous = document.getElementById(previousSelected);
                previous.classList.remove('selected');
            } 

            previousSelected = type;

            if (!(type in data)) return;

            for(const [item, properties] of Object.entries(data[type])){

                let ingredient_format = ""
                for (const ingredient of properties.Ingredients) {
                    ingredient_format += `<p>${ingredient}</p>`
                }
                
                const newContent = 
                    `
                    <div class="menu-cards" id=${encodeURIComponent(item)}>
                        <img src=${properties.img_path} alt="">
                        <div class="menu-item-info">
                            <div class="menu-item-title">
                                <h2>${item}</h2>
                                <i class="fa-solid fa-circle-info menu-item"></i>
                            </div>
                            <p>
                                ${properties.description}
                            </p>
                            
                            <div class="menu-item-buy">
                                <p>${properties.price}</p>
                                <button>
                                    <span>BUY NOW</span>
                                    <i class="fa-solid fa-arrow-right"></i>
                                </button>
                                
                            </div>
                        </div>

                        
                        <div class="click_image_info">
                            <div class="info-container">
                                <div class="info-contents-c">
                                    <i class="fa-solid fa-xmark close-info"></i>
                                    <img src=${properties.img_path} alt="">
                                    <div class="info-header">
                                        <h3>${item}</h3>
                                    </div>
                                    <div class="info-texts">
                                        <p>
                                            ${properties.Extended_Description}
                                        </p>
                                    </div>

                                    <div class="info-specs">
                                        <div class="item-ingredients">
                                            <div class="ingredients-header">
                                                <h3>Ingredients</h3>
                                            </div>
                                                ${ingredient_format}
                                        </div>

                                        <div class="item-kcal">
                                            <div class="kcal-header">
                                                <h3>KCAL</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                menu.insertAdjacentHTML('beforeend', newContent);
                setupMenuToggle(item);
            }
        }

        function deleteMenuCards() {
            menu.innerHTML = ``;
        }

        createMenuCards('hot_beverage');

        const parent = document.querySelector('.sidebar-nav-links');
        for(const button of parent.children)  {
            button.addEventListener("click", () => {
                createMenuCards(button.id);
            })
        }

    });


