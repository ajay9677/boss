/* =========================
   MOBILE NAVIGATION
========================= */

function toggleMenu() {
    const navbar = document.querySelector(".navbar");

    if (navbar) {
        navbar.classList.toggle("show");
    }
}


/* =========================
   PRODUCT SEARCH & FILTER
========================= */

let currentCategory = "All";

function filterProducts(category, button) {

    currentCategory = category;

    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(function (btn) {
        btn.classList.remove("active-filter");
    });

    if (button) {
        button.classList.add("active-filter");
    }

    applyProductFilter();
}


function searchProducts() {
    applyProductFilter();
}


function applyProductFilter() {

    const searchInput = document.getElementById("searchInput");
    const productGrid = document.getElementById("productGrid");
    const noProducts = document.getElementById("noProducts");

    if (!productGrid || !searchInput) {
        return;
    }

    const searchText = searchInput.value.toLowerCase().trim();

    const products = document.querySelectorAll(".product-card");

    let visibleProducts = 0;

    products.forEach(function (product) {

        const productName =
            product.getAttribute("data-name").toLowerCase();

        const productCategory =
            product.getAttribute("data-category");

        const matchesSearch =
            productName.includes(searchText);

        const matchesCategory =
            currentCategory === "All" ||
            productCategory === currentCategory;

        if (matchesSearch && matchesCategory) {

            product.style.display = "";

            visibleProducts++;

        } else {

            product.style.display = "none";

        }
    });

    if (visibleProducts === 0) {
        noProducts.style.display = "block";
    } else {
        noProducts.style.display = "none";
    }
}


/* =========================
   CATEGORY FROM HOME PAGE
========================= */

function loadCategoryFromURL() {

    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");

    if (!category) {
        return;
    }

    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(function (button) {

        if (button.textContent.trim() === category) {

            filterProducts(category, button);

        }

    });
}


/* =========================
   SHOPPING CART
========================= */

let cartCount = Number(localStorage.getItem("nostraCartCount")) || 0;

function updateCartCount() {

    const cartElement = document.getElementById("cartCount");

    if (cartElement) {
        cartElement.textContent = cartCount;
    }
}


function addToCart(productName) {

    cartCount++;

    localStorage.setItem("nostraCartCount", cartCount);

    updateCartCount();

    alert(productName + " added to cart!");
}


/* =========================
   NEWSLETTER
========================= */

function subscribeNewsletter(event) {

    event.preventDefault();

    const email = document.getElementById("newsletterEmail");
    const message = document.getElementById("subscribeMessage");

    if (email.value.trim() === "") {
        message.textContent = "Please enter your email.";
        message.style.color = "red";
        return;
    }

    message.textContent =
        "Thank you! You have successfully subscribed.";

    message.style.color = "green";

    email.value = "";
}


/* =========================
   CONTACT FORM VALIDATION
========================= */

function submitContact(event) {

    event.preventDefault();

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const message = document.getElementById("message");

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("phoneError");
    const messageError = document.getElementById("messageError");

    const success = document.getElementById("contactSuccess");

    nameError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";
    messageError.textContent = "";
    success.textContent = "";

    let valid = true;

    if (name.value.trim() === "") {

        nameError.textContent = "Name is required.";

        valid = false;
    }

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value.trim())) {

        emailError.textContent =
            "Please enter a valid email address.";

        valid = false;
    }

    const phonePattern = /^[0-9]{10}$/;

    if (!phonePattern.test(phone.value.trim())) {

        phoneError.textContent =
            "Please enter a valid 10-digit phone number.";

        valid = false;
    }

    if (message.value.trim().length < 10) {

        messageError.textContent =
            "Message must contain at least 10 characters.";

        valid = false;
    }

    if (valid) {

        success.textContent =
            "Your message has been sent successfully!";

        document.getElementById("contactForm").reset();
    }
}


/* =========================
   PAGE LOAD
========================= */

document.addEventListener("DOMContentLoaded", function () {

    updateCartCount();

    loadCategoryFromURL();

});