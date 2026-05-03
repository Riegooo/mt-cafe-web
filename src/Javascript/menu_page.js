


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

const container = document.getElementById('cartuser_display');
const total_display = document.getElementById("total");

if (total_display) {
    total_display.innerHTML = `${total}`;
}

const total_cart_container = document.getElementById('total_price_cart');
let price_total_compute = 0;





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
    
            total += parseInt(properties.price);
            localStorage.setItem("total", total);
    
            if (total_display) {
                total_display.innerHTML = `BUY : ${total}`;
            }
    
            console.log("UPDATED:", total);
        });
    }


    if (cart_btn) {
        cart_btn.addEventListener("click", (e) => {
            e.stopPropagation();
    
            let existing = orders.find(i => i.name === item);
    
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
    
            localStorage.setItem("orders", JSON.stringify(orders));
    
            alert("Item added successfully");
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






function addToCartPage() {
    if (!container) {
        console.log("Container not found");
        return;
    }

    price_total_compute = 0;

    if (orders.length === 0) {
        container.innerHTML = `<p>You don't have any items in the cart.</p>`;
        return;
    }

    let cart_card = "";

    orders.forEach((item, index) => {
        cart_card += `
            <div class="cart-item" data-index="${index}">
                <img src=${item.item_img} alt="">

                <div class="cart-item-info">
                    <h2> ${item.name}</h2>
                    <p>₱${item.price}</p>
                </div>

                <div class="cart-item-prices">
                    <div class="quantity"> 
                        <h2>Quantity: </h2>
                        <p>${item.qty}</p>
                    </div>

                    <p>Total Price: <span>₱${item.price * item.qty}</span></p>
                </div>

                <button class="delete_cart">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `;
        price_total_compute += Number(item.price) * item.qty;
    });


    container.innerHTML = cart_card;

    const deleteButtons = container.querySelectorAll(".delete_cart");

    deleteButtons.forEach((btn, index) => {
        btn.addEventListener("click", () => {

            orders.splice(index, 1);
            localStorage.setItem("orders", JSON.stringify(orders));
            
            addToCartPage();
        });
    });


    console.log("total price current: " + price_total_compute);

    let cart_order_summary = ""

    const cart_order = document.getElementById('cart_card');
    cart_order_summary = `
            <h2>ORDER SUMMARY</h2>

            <div class="order_header">
                <h3>Item Name</h3>
                <h3>Quantity</h3>
                <h3>Sub total</h3>
            </div>

            <div class="orders_list">
                ${orders.map(item => `
                    <p>${item.name}</p>
                    <P>${item.qty}</p>
                    <P>₱${item.price * item.qty}</p>
                `).join("")}
            </div>

            <div class="total_price">
                <h3>Total: </h3>
                <h3>₱${price_total_compute}</h3>
            </div>

            <div class="checkout_button">
                <button class="c_btn_one">
                    <span>Proceed to Checkout</span>
                    <i class="fa-solid fa-arrow-right"></i>
                </button>
                <button class="c_btn_two">Checkout with Gcash</button>
            </div>
        `;

    cart_order.innerHTML = cart_order_summary;
}





getMenuList();
addToCartPage();

console.log(total);