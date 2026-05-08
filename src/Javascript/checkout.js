const orders = JSON.parse(localStorage.getItem("orders")) || [];
const container = document.getElementById('cart_list');
const total_display = document.getElementById('total_price');
let price_compute = 0;

function displayUserCart() {

    if (!container) {
        console.log("Container not Found")
        return;
    } 

    if (orders.length === 0) {
        container.innerHTML = `<p>You don't have any items in the cart.</p>`;
        return;
    }

    let cart_container = ``;

    orders.forEach((item, index) => {
        cart_container += `
            <div class="item-info">
                <div class="img">
                    <img src=${item.item_img}>
                    <p>${item.name}</p>
                </div>
                <p>${item.qty}</p>
                <p>₱${item.price * item.qty}</p>    
            </div>
        `
        price_compute += Number(item.price) * item.qty
    });

    container.innerHTML = cart_container;


    total_display.innerHTML = `
        <h3>Total: </h3>
        <h3>₱${price_compute}</h3>
    `

}

displayUserCart();
