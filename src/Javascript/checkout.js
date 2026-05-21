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

function popUpPaymentMethod() {

    const placeOrderBtn = document.getElementById('placeOrder');
    const paymentContainer = document.querySelector('.payment-container');
    const xbutton = document.querySelector('.fa-solid.fa-xmark');

    const continueBtn = document.getElementById('continueBtn');

    if (!placeOrderBtn) return;

    placeOrderBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const fullname = document.getElementById('fname').value.trim();
        const phonenum = document.getElementById('phonenum').value.trim();
        const orderType = document.querySelector('input[name="orderType"]:checked');

        if (!fullname) {
            alert("Enter your Full name");
            return;
        }

        if (!phonenum){
            alert("Enter your phone num");
            return;
        }

        if (!orderType) {
            alert("Choose Order Type");
            return;
        }

        paymentContainer.classList.add("active");
    });

    continueBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');

        if (!paymentMethod) {
            alert("Select payment method");
            return;
        }

        let userInfo = JSON.parse(localStorage.getItem("userInfo")) || [];

        userInfo.push({
            fullName: document.getElementById('fname').value.trim(),
            phoneNum: document.getElementById('phonenum').value.trim(),
            orderType: document.querySelector('input[name="orderType"]:checked').value,
            paymentMethod: paymentMethod.value
        });

        localStorage.setItem("userInfo", JSON.stringify(userInfo));

        window.location = '../pages/payment_page.html'

        alert("Proceeding to payment...");
    });

    xbutton.addEventListener("click", (e) => {
        e.preventDefault();
        paymentContainer.classList.remove("active");
    });

}


popUpPaymentMethod();

displayUserCart();
