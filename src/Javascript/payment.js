const orders = JSON.parse(localStorage.getItem("orders")) || [];
const userInfo = JSON.parse(localStorage.getItem("userInfo")) || [];

const container = document.getElementById('confirm-content');
const userOrderContainer = document.getElementById('user-order-content');

// localStorage.removeItem("userInfo");
// localStorage.removeItem("orders");

function userInfoPayment() {

    if (!container) {
        console.log("Container not found");
        return;
    }

    if (orders.length === 0) {
        container.innerHTML = `<p>No orders found.</p>`;
        return;
    }

    let confirm_card = "";
    let user_order = "";

    userInfo.forEach(item => {

        confirm_card += `
            <div class="user_info_wrapper">

                <div class="user_card">
                    <p>Customer</p>
                    <h2>${item.fullName}</h2>
                </div>

                <div class="user_card">
                    <p>Phone Number</p>
                    <h2>${item.phoneNum}</h2>
                </div>

                <div class="user_card">
                    <p>Order Type</p>
                    <h2>${item.orderType}</h2>
                </div>

                <div class="user_card">
                    <p>Payment Method</p>
                    <h2>${item.paymentMethod}</h2>
                </div>

            </div>
        `;
    });

    let orders_total_amount = 0;

    user_order += `
        <div class="order_header">
            <h3>Item</h3>
            <h3>Qty</h3>
            <h3>Subtotal</h3>
        </div>
    `;

    orders.forEach(item => {

        let subtotal = Number(item.price) * item.qty;

        orders_total_amount += subtotal;

        user_order += `
            <div class="order_list">
                <h3>${item.name}</h3>
                <h3>${item.qty}</h3>
                <h3>₱${subtotal}</h3>
            </div>
        `;
    });

    user_order += `
        <div class="total_amount">
            <h2>Total Amount</h2>
            <h2>₱${orders_total_amount}</h2>
        </div>
    `;

    userInfo.forEach(info => {

        if (info.paymentMethod === "Gcash") {

            user_order += `
                <div class="payment_method_container">

                    <h2>GCash Payment</h2>

                    <p>
                        Continue to GCash payment and scan the QR code.
                    </p>

                    <button class="confirm_btn" onclick="goToPayment('Gcash')">
                        Continue to GCash
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>

                </div>
            `;
        }

        else if (info.paymentMethod === "Maya") {

            user_order += `
                <div class="payment_method_container">

                    <h2>Maya Payment</h2>

                    <p>
                        Continue to Maya payment and scan the QR code.
                    </p>

                    <button class="confirm_btn" onclick="goToPayment('Maya')">
                        Continue to Maya
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>

                </div>
            `;
        }

        else if (info.paymentMethod === "Cash") {

            user_order += `
                <div class="payment_method_container">

                    <h2>Cash Payment</h2>

                    <i class="fa-solid fa-money-bill-wave cash_icon"></i>

                    <p>
                        Please proceed to the cashier and prepare the exact amount.
                    </p>

                    <button class="confirm_btn" onclick="goToPayment('Cash')">
                        Confirm Order
                        <i class="fa-solid fa-arrow-right"></i>
                    </button>

                </div>
            `;
        }

        else {

            user_order += `
                <p>Invalid Payment Method.</p>
            `;
        }

    });

    container.innerHTML = confirm_card;
    userOrderContainer.innerHTML = user_order;
}

function goToPayment(method) {

    if(method === "Gcash") {

        window.location = "../pages/gcash_payment.html";

    }
    else if(method === "Maya") {

        window.location = "../pages/maya_payment.html";

    }
    else if(method === "Cash") {

        window.location = "../pages/cash_payment.html";

    }
}

userInfoPayment();