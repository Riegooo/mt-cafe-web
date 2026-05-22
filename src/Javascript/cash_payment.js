function getCartTotal() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    let total = 0;

    orders.forEach(item => {
        total += Number(item.price) * Number(item.qty);
    });

    return total;
}

function generateReference(prefix = "CS") {
    return prefix + Math.floor(Math.random() * 1000000000);
}

const cashContainer = document.getElementById("cash-container");

function displayCashPayment() {
    const totalAmount = getCartTotal();
    const referenceNumber = generateReference("CS");

    cashContainer.innerHTML = `
        <section class="payment-wrapper">

            <div class="payment-card">

                <div class="payment-top">

                    <div class="gcash-icon">
                        <i class="fa-solid fa-money-bill-wave"></i>
                    </div>

                    <h1>Cash Payment</h1>
                    <p>Please prepare exact amount for payment</p>

                </div>

                <div class="payment-details">

                    <div class="payment-box">
                        <p>Total Amount</p>
                        <h2>₱${totalAmount.toFixed(2)}</h2>
                    </div>

                    <div class="payment-box">
                        <p>Reference No.</p>
                        <h2>${referenceNumber}</h2>
                    </div>

                </div>

                <div class="payment-note">
                    <p>
                        Please pay at the counter upon pickup or delivery.
                        Make sure to show your reference number.
                    </p>
                </div>

                <button class="payment-btn" onclick="paymentComplete()">
                    Confirm Cash Payment
                </button>

            </div>

        </section>
    `;
}

function paymentComplete() {
    window.location = "../pages/payment_success.html";
}

displayCashPayment();