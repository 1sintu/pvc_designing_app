// DOM elements
const contactForm = document.getElementById("contact-form");
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");
const sidebar = document.getElementById("sidebar");
const authBtnDesktop = document.getElementById("auth-btn-desktop");
const authBtnMobile = document.getElementById("auth-btn-mobile");
const authModal = document.getElementById("auth-modal");
const closeModal = document.getElementById("close-modal");
const loginTab = document.getElementById("login-tab");
const registerTab = document.getElementById("register-tab");
const resetTab = document.getElementById("reset-tab");
const loginContent = document.getElementById("login-content");
const registerContent = document.getElementById("register-content");
const resetContent = document.getElementById("reset-content");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const resetForm = document.getElementById("reset-form");
const newsletterForm = document.getElementById("newsletter-form");

// Custom smooth scroll function with easing
function smoothScroll(target, duration) {
    const start = window.pageYOffset;
    const distance = target - start;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, start, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Easing function (easeInOutQuad)
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Handle navbar link clicks
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        const targetElement = document.querySelector(href);

        if (targetElement) {
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }

            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

            smoothScroll(targetPosition, 1000);
        }
    });
});

// Section animation on scroll
const sections = document.querySelectorAll('.section');
const observerOptions = {
    root: null,
    threshold: 0.2,
    rootMargin: '0px'
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Handle contact form submission
contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("contact-name").value;
    const email = document.getElementById("contact-email").value;
    const message = document.getElementById("message").value;

    alert(`Thank you, ${name}! Your message has been sent.\nEmail: ${email}\nMessage: ${message}`);
    contactForm.reset();
});

// Handle newsletter form submission
newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("newsletter-email").value;

    alert(`Thank you for subscribing!\nEmail: ${email}`);
    newsletterForm.reset();
});

// Toggle sidebar on mobile
menuBtn.addEventListener("click", () => {
    sidebar.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("active");
});

// Toggle auth modal
authBtnDesktop.addEventListener("click", () => {
    authModal.classList.add("active");
});

authBtnMobile.addEventListener("click", () => {
    authModal.classList.add("active");
    sidebar.classList.remove("active");
});

closeModal.addEventListener("click", () => {
    authModal.classList.remove("active");
});

// Tab switching
function showTab(tab) {
    [loginTab, registerTab, resetTab].forEach(btn => btn.classList.remove("active"));
    [loginContent, registerContent, resetContent].forEach(content => content.classList.remove("active"));

    if (tab === "login") {
        loginTab.classList.add("active");
        loginContent.classList.add("active");
    } else if (tab === "register") {
        registerTab.classList.add("active");
        registerContent.classList.add("active");
    } else if (tab === "reset") {
        resetTab.classList.add("active");
        resetContent.classList.add("active");
    }
}

loginTab.addEventListener("click", () => showTab("login"));
registerTab.addEventListener("click", () => showTab("register"));
resetTab.addEventListener("click", () => showTab("reset"));

// Handle form submissions (simulations)
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    alert(`Logged in successfully!\nUsername: ${username}`);
    authModal.classList.remove("active");
    loginForm.reset();
});

registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("register-username").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    alert(`Registered successfully!\nUsername: ${username}\nEmail: ${email}`);
    authModal.classList.remove("active");
    registerForm.reset();
});

resetForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("reset-email").value;

    alert(`Password reset link sent to: ${email}`);
    authModal.classList.remove("active");
    resetForm.reset();
});

// Function to open order page
// function openOrderPage(service) {
//     const orderWindow = window.open("", "_blank");
//     orderWindow.document.write(`
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//             <meta charset="UTF-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <title>Order - ${service}</title>
//             <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
//             <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
//             <style>
//                 body {
//                     background: linear-gradient(135deg, #1f2937, #111827);
//                     color: #d1d5db;
//                 }
//                 input, textarea {
//                     background-color: #4b5563;
//                     color: #d1d5db;
//                 }
//                 input:focus, textarea:focus {
//                     ring-color: #60a5fa;
//                 }
//                 @media (max-width: 640px) {
//                     .text-5xl { font-size: 2rem; }
//                     .text-3xl { font-size: 1.5rem; }
//                     .container { padding-left: 1rem; padding-right: 1rem; }
//                 }
//             </style>
//         </head>
//         <body>
//             <div class="container mx-auto mt-8 sm:mt-12 p-4 sm:p-8">
//                 <h1 class="text-3xl sm:text-5xl font-semibold text-center mb-8 sm:mb-10">Place Your Order</h1>
//                 <div class="bg-gray-800 p-6 sm:p-10 rounded-2xl max-w-2xl mx-auto">
//                     <h2 class="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Service: ${service}</h2>
//                     <form id="order-form">
//                         <div class="mb-4 sm:mb-6">
//                             <label for="name" class="block text-gray-400 font-medium mb-2 sm:mb-3">Full Name</label>
//                             <input type="text" id="name" class="w-full p-3 sm:p-4 border-none rounded-lg focus:ring-2 focus:ring-blue-500" required>
//                         </div>
//                         <div class="mb-4 sm:mb-6">
//                             <label for="email" class="block text-gray-400 font-medium mb-2 sm:mb-3">Email</label>
//                             <input type="email" id="email" class="w-full p-3 sm:p-4 border-none rounded-lg focus:ring-2 focus:ring-blue-500" required>
//                         </div>
//                         <div class="mb-4 sm:mb-6">
//                             <label for="quantity" class="block text-gray-400 font-medium mb-2 sm:mb-3">Quantity</label>
//                             <input type="number" id="quantity" class="w-full p-3 sm:p-4 border-none rounded-lg focus:ring-2 focus:ring-blue-500" min="1" value="1" required>
//                         </div>
//                         <div class="mb-4 sm:mb-6">
//                             <label for="photo" class="block text-gray-400 font-medium mb-2 sm:mb-3">Upload Photo</label>
//                             <input type="file" id="photo" class="w-full p-3 sm:p-4 border-none rounded-lg text-gray-400" accept="image/*">
//                         </div>
//                         <div class="mb-4 sm:mb-6">
//                             <label for="details" class="block text-gray-400 font-medium mb-2 sm:mb-3">Additional Details</label>
//                             <textarea id="details" class="w-full p-3 sm:p-4 border-none rounded-lg focus:ring-2 focus:ring-blue-500" rows="4" required></textarea>
//                         </div>
//                         <button type="submit" class="w-full bg-blue-600 text-white p-3 sm:p-4 rounded-full hover:bg-blue-700 transition duration-300 flex items-center justify-center text-sm sm:text-base">
//                             <i class="fas fa-check mr-2 sm:mr-3"></i> Submit Order
//                         </button>
//                     </form>
//                     <div id="photo-preview" class="mt-6 sm:mt-8 hidden">
//                         <h3 class="text-lg sm:text-xl font-medium text-gray-400 mb-3 sm:mb-4">Photo Preview:</h3>
//                         <img id="preview-img" class="max-w-full h-auto rounded-lg" alt="Uploaded Photo">
//                     </div>
//                 </div>
//             </div>
//             <script>
//                 const orderForm = document.getElementById("order-form");
//                 const photoInput = document.getElementById("photo");
//                 const photoPreview = document.getElementById("photo-preview");
//                 const previewImg = document.getElementById("preview-img");

//                 photoInput.addEventListener("change", (e) => {
//                     const file = e.target.files[0];
//                     if (file) {
//                         const reader = new FileReader();
//                         reader.onload = (event) => {
//                             previewImg.src = event.target.result;
//                             photoPreview.classList.remove("hidden");
//                         };
//                         reader.readAsDataURL(file);
//                     }
//                 });

//                 orderForm.addEventListener("submit", (e) => {
//                     e.preventDefault();
//                     const name = document.getElementById("name").value;
//                     const email = document.getElementById("email").value;
//                     const quantity = document.getElementById("quantity").value;
//                     const photo = photoInput.files[0] ? photoInput.files[0].name : "No photo uploaded";
//                     const details = document.getElementById("details").value;
//                     alert("Order submitted successfully!\\nService: ${service}\\nName: " + name + "\\nEmail: " + email + "\\nQuantity: " + quantity + "\\nPhoto: " + photo + "\\nDetails: " + (details || "N/A"));
//                     window.close();
//                 });
//             </script>
//         </body>
//         </html>
//     `);
//     orderWindow.document.close();
// }