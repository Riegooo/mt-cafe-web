const menuTog = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.side-bar');
const iconMenu = document.querySelector('.menu-icon');

if (menuTog && navLinks && iconMenu) {
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
}

function setupMenuToggle(item) {
    const menu_card = document.getElementById(encodeURIComponent(item));
    if (!menu_card) return;

    const btn = menu_card.querySelector('.menu-item-price');
    const content = menu_card.querySelector('.click_image_info');
    const xbutton = menu_card.querySelector('.fa-solid.fa-xmark.close-info');

    if (btn && content) {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            content.classList.toggle("active");
        });
    }

    if (xbutton && content) {
        xbutton.addEventListener("click", () => {
            content.classList.remove("active");
        });
    }
}






let menu = document.getElementById("menu");
let previousSelected = "";

let orders = JSON.parse(localStorage.getItem("orders")) || [];
let total = parseInt(localStorage.getItem("total")) || 0;

const total_display = document.getElementById("total");

if (total_display) {
    total_display.innerHTML = `${total}`;
}



async function getMenuList() {

    if (!menu) return;

    const response = await fetch('./menu_data.json');
    const data = await response.json();

    function createMenuCards(type) {

        if (previousSelected === type) return;

        deleteMenuCards();

        const selected = document.getElementById(type);
        if (selected) selected.classList.add('selected');

        if (previousSelected !== "") {
            const previous = document.getElementById(previousSelected);
            if (previous) previous.classList.remove('selected');
        }

        previousSelected = type;

        if (!(type in data)) return;

        for (const [item, properties] of Object.entries(data[type])) {

            let ingredient_format = "";
            for (const ingredient of properties.Ingredients) {
                ingredient_format += `<p>${ingredient}</p>`;
            }

            const newContent = `
                <div class="menu-cards" id=${encodeURIComponent(item)}>
                    <img src=${properties.img_path} alt="">
                    <div class="menu-item-info">

                        <div class="menu-item-title">
                            <h2>${item}</h2>
                        </div>

                        <p>${properties.description}</p>

                        <div class="menu-item-price">
                            <p class="price">₱${properties.price}</p>
                            <i class="fa-solid fa-circle-info menu-item"></i>
                        </div>

                        <div class="menu-item-buy">
                            <button class="buy-now">
                                <span>BUY NOW</span>
                                <i class="fa-solid fa-arrow-right"></i>
                            </button>

                            <button class="cart_btn"> 
                                <span>ADD TO CART</span>
                                <i class="fa-solid fa-cart-arrow-down"></i>
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
                                    <p>${properties.Extended_Description}</p>
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
            `;

            menu.insertAdjacentHTML('beforeend', newContent);
            setupMenuToggle(item);

            menuCardButtons(item, properties);

        }
    }

    

    createMenuCards('hot_beverage');

    const parent = document.querySelector('.sidebar-nav-links');
    if (parent) {
        for (const button of parent.children) {
            button.addEventListener("click", () => {
                createMenuCards(button.id);
            });
        }
    }
}


function menuCardButtons(item, properties) {

    const card = document.getElementById(encodeURIComponent(item));
    if (!card) return;

    const buy_btn = card.querySelector('.buy-now');
    const cart_btn = card.querySelector('.cart_btn');

    if (buy_btn) {
        buy_btn.addEventListener("click", (e) => {
            e.stopPropagation();

            const buyConfirmation = confirm("Do you want to buy this item?");

            let ifBuyExists = orders.find(i => i.name === item);

            if (buyConfirmation) {
                if (ifBuyExists) {
                    ifBuyExists.qty += 1;
                } else {
                    orders.push({
                        name: item,
                        price: properties.price,
                        qty: 1,
                        item_img: `${properties.img_path}`
                    });

                    localStorage.setItem("orders", JSON.stringify(orders));

                    window.location = '../pages/checkout_page.html';

                    console.log("Buy button successfully, proceed to checkout");
                }
            } else {
                return;
            }

        });
    }


    if (cart_btn) {
        cart_btn.addEventListener("click", (e) => {
            e.stopPropagation();
    
            let existing = orders.find(i => i.name === item);

            let confim_cart = confirm("Do you want to add this item?") ;

            if (confim_cart) {
                if (existing) {
                    existing.qty += 1;
                } else {
                    orders.push({
                        name: item,
                        price: properties.price,
                        qty: 1,
                        item_img: `${properties.img_path}`
                    });
                }
            } else {
                return;
            }

            for(let i = 0; i < orders.length; i++) {
                if (orders[i].qty > 5) {
                    alert(`You can only add up to 5 of this item.\nQuantity of Item: 5/5`);
                    return;
                }
            }

            if (orders.length > 10) {
                alert("You’ve reached the maximum items.");
                return;
            }

            localStorage.setItem("orders", JSON.stringify(orders));
    
            for(let i = 1; i <= orders.length; i++) {
                if (orders.length !== 10 || orders[i].qty !== 5) {
                    alert(`Item added successfully!\nCart: ${orders.length}`);
                    break;
                }
            }
            console.log(orders.length);

            console.log("Added:", item);
        });

        
    }
}


function deleteMenuCards() {
    if (!menu) return;

    menu.remove();

    menu = document.createElement('div');
    menu.id = 'menu';
    menu.classList.add('menu-items');

    document.querySelector('.left-menu-contents')?.appendChild(menu);

    void menu.offsetWidth;
}



getMenuList();


console.log(total);