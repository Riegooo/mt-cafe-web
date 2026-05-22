function getCartTotal() {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];

    let total = 0;

    orders.forEach(item => {
        total += Number(item.price) * Number(item.qty);
    });

    return total;
}

function generateReference(prefix = "MY") {
    return prefix + Math.floor(Math.random() * 1000000000);
}

const mayaContainer = document.getElementById("maya-container");

function displayPayMayaPayment() {
    const totalAmount = getCartTotal();
    const referenceNumber = generateReference("MY");

    mayaContainer.innerHTML = `
        <section class="payment-wrapper">

            <div class="payment-card">

                <div class="payment-top">

                    <div class="gcash-icon">
                        <i class="fa-solid fa-wallet"></i>
                    </div>

                    <h1>PayMaya Payment</h1>
                    <p>Scan the QR Code using your Maya App</p>

                </div>

                <div class="qr-wrapper">
                    <img src="../images/qr.jpeg" alt="QR Code">
                    <p class="scan-text">Use Maya Scan QR feature to continue payment.</p>
                </div>

                <div class="payment-details">

                    <div class="payment-box">
                        <p>Amount to Pay</p>
                        <h2>₱${totalAmount.toFixed(2)}</h2>
                    </div>

                    <div class="payment-box">
                        <p>Reference No.</p>
                        <h2>${referenceNumber}</h2>
                    </div>

                </div>

                <div class="payment-note">
                    <p>Please complete your payment within 10 minutes.</p>
                </div>

                <button class="payment-btn" onclick="paymentComplete()">
                    I Have Paid <i class="fa-solid fa-check"></i>
                </button>

            </div>

        </section>
    `;
}

function paymentComplete() {
    window.location = "../pages/payment_success.html";
}

displayPayMayaPayment();