const orders = JSON.parse(localStorage.getItem("orders")) || [];
const gcashContainer = document.getElementById("gcash-container");

let totalAmount = 0;

orders.forEach(item => {
    totalAmount += Number(item.price) * item.qty;
});

function displayGCashPayment() {

    const referenceNumber = "MT" + Math.floor(Math.random() * 1000000000);

    gcashContainer.innerHTML = `

        <section class="payment-wrapper">

            <div class="payment-card">

                <div class="payment-top">

                    <div class="gcash-icon">
                        <i class="fa-brands fa-google-pay"></i>
                    </div>

                    <h1>GCash Payment</h1>

                    <p>
                        Scan the QR Code using your GCash App
                    </p>

                </div>

                <div class="qr-wrapper">

                    <img src="../images/qr.jpeg" alt="">

                    <p class="scan-text">
                        Use GCash Scan QR feature to continue payment.
                    </p>

                </div>

                <div class="payment-details">

                    <div class="payment-box">
                        <p>Amount to Pay</p>
                        <h2>₱${totalAmount}</h2>
                    </div>

                    <div class="payment-box">
                        <p>Reference No.</p>
                        <h2>${referenceNumber}</h2>
                    </div>

                </div>

                <div class="payment-note">
                    <p>
                        Please complete your payment within 10 minutes.
                    </p>
                </div>

                <button class="payment-btn" onclick="paymentComplete()">

                    I Have Paid

                    <i class="fa-solid fa-check"></i>

                </button>

            </div>

        </section>

    `;
}

function paymentComplete() {

    window.location = "../pages/payment_success.html";

}

displayGCashPayment();