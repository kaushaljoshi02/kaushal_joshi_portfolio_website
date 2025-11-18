/* ==================
    MOBILE NAV TOGGLE
================== */
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

// Toggle menu on hamburger click
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Close menu when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});


/* ==================
    CONTACT FORM
================== */
const form = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    try {
        const response = await fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            formStatus.textContent = "Thanks for your message! I'll get back to you soon.";
            formStatus.className = "form-status success";
            form.reset();
        } else {
            const responseData = await response.json();
            if (Object.hasOwn(responseData, 'errors')) {
                formStatus.textContent = responseData["errors"].map(error => error["message"]).join(", ");
            } else {
                formStatus.textContent = "Oops! There was a problem submitting your form.";
            }
            formStatus.className = "form-status error";
        }
    } catch (error) {
        formStatus.textContent = "Oops! There was a network error.";
        formStatus.className = "form-status error";
    }
}

form.addEventListener("submit", handleSubmit);


/* ==================
    DARK MODE TOGGLE (NEW)
================== */
const themeToggle = document.getElementById("theme-checkbox");
const body = document.body;

// Function to set the theme
function setTheme(isDark) {
    if (isDark) {
        body.classList.add("dark-mode");
        themeToggle.checked = true;
    } else {
        body.classList.remove("dark-mode");
        themeToggle.checked = false;
    }
}

// Check for saved preference in localStorage
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    setTheme(savedTheme === "dark");
} else {
    // Or check for user's OS preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(prefersDark);
}

// Add event listener for the toggle
themeToggle.addEventListener("change", () => {
    if (themeToggle.checked) {
        setTheme(true);
        localStorage.setItem("theme", "dark");
    } else {
        setTheme(false);
        localStorage.setItem("theme", "light");
    }
});


/* ==================
   SCROLL ANIMATIONS (NEW)
================== */
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } 
        // Optional: remove 'else' block if you want animations to only happen once
        // else {
        //     entry.target.classList.remove("show");
        // }
    });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));


/* ==================
   ACTIVE NAV LINK ON SCROLL
================== */
const sections = document.querySelectorAll("main section[id]");
const navMenuLinks = document.querySelectorAll(".nav-menu a.nav-link");

// Function to remove active class from all nav links
const removeActiveLinks = () => {
    navMenuLinks.forEach(link => link.classList.remove("active-link"));
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            removeActiveLinks(); // Remove from all
            
            // Add to the specific one
            const id = entry.target.getAttribute("id");
            const activeLink = document.querySelector(`.nav-menu a[href="#${id}"]`);
            if (activeLink) {
                activeLink.classList.add("active-link");
            }
        }
    });
}, { 
    threshold: 0.5, // Triggers when 50% of the section is visible
    rootMargin: "-60px 0px 0px 0px" // Adjusts for the 60px tall fixed navbar
});

// Observe each section
sections.forEach(section => sectionObserver.observe(section));

/* ==================
   BACK TO TOP BUTTON
================== */
const backToTopButton = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
    // Show button after scrolling 300px
    if (window.scrollY > 300) { 
        backToTopButton.classList.add("visible");
    } else {
        backToTopButton.classList.remove("visible");
    }
});

/* ==================
      PRELOADER FUNCTIONALITY
================== */
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Wait a brief moment to ensure all rendering is complete before fading
        setTimeout(() => {
            preloader.classList.add('loaded');
        }, 500); 
    }
});