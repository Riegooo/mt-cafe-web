
const orders = JSON.parse(localStorage.getItem("orders")) || [];
const container = document.getElementById('cartuser_display');
const total_cart_container = document.getElementById('total_price_cart');
let price_total_compute = 0;

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
                    <div class="qty-btns">
                        <button class="addQty">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                        <p>${item.qty}</p>
                        <button class="decreaseQty">
                            <i class="fa-solid fa-minus"></i>
                        </button>
                    </div>
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
            let delete_item = confirm("Delete this item?");
            if (delete_item) {
                orders.splice(index, 1);
                localStorage.setItem("orders", JSON.stringify(orders));
                
                updateCart();
            } else {
                return;
            }
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
                    <P class="subtotal">₱${item.price * item.qty}</p>
                `).join("")}
            </div>

            <div class="total_price">
                <h3>Total: </h3>
                <h3>₱${price_total_compute}</h3>
            </div>

            <div class="checkout_button">
                <button class="c_btn_one" onclick="checkout()">
                    <span>Proceed to Checkout</span>
                    <i class="fa-solid fa-arrow-right"></i>
                </button>
                <span>Or</span>
                <button class="c_btn_two" onclick="ordermore()">
                    <span>Order More</span>
                    <i class="fa-solid fa-cart-plus"></i>
                </button>
            </div>
        `;

        const cart_display = document.getElementById('cart_quantity_display')

        cart_display.innerHTML = `${orders.length}`

    cart_order.innerHTML = cart_order_summary;
}

function updateCart() {
    localStorage.setItem("orders", JSON.stringify(orders));
    addToCartPage();
}

document.addEventListener("click", (e) => {
    const cartItem = e.target.closest(".cart-item");
    if (!cartItem) return;

    const index = Number(cartItem.dataset.index);

    if (e.target.closest(".addQty")) {
        if (orders[index].qty < 5) {
            orders[index].qty += 1;
        } else {
            alert("You can only add up to 5 of this item.\nQuantity of Item: 5/5.");
        }
        updateCart();

    } else if (e.target.closest(".decreaseQty")) {
        if (orders[index].qty > 1) {
            orders[index].qty -= 1;
        } else if (orders[index].qty === 1) {
            alert("This is the last quantity.\nCannot decrease quantity. Please remove the item instead.");
        } 
        updateCart();
    }
});


function checkout() {
    window.location = '../pages/checkout_page.html'
}

function ordermore() {
    window.location = '../pages/menu_page.html'
}


addToCartPage();