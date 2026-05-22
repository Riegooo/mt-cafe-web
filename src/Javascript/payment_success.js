function goHome() {
    localStorage.removeItem("orders");
    localStorage.removeItem("userInfo")

    window.location = "../pages/menu_page.html";
}