// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Hide/Show on scroll
    // if (window.scrollY > lastScrollY) {
    //     navbar.style.transform = 'translateY(-100%)';
    // } else {
    //     navbar.style.transform = 'translateY(0)';
    // }
    // lastScrollY = window.scrollY;
});

// Smooth Scroll for local links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.section, .hero-content > *').forEach(el => {
    el.classList.add('hidden-fade'); // Add base class via JS or CSS
    observer.observe(el);
});

// Experience Tabs
document.addEventListener('DOMContentLoaded', () => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    console.log("Found tabs:", tabBtns.length);

    function openTab(targetId) {
        console.log("Opening tab:", targetId);
        // Hide all
        tabContents.forEach(c => {
            c.style.display = 'none';
            c.classList.remove('active');
        });
        tabBtns.forEach(b => b.classList.remove('active'));

        // Show target
        const targetContent = document.getElementById(targetId);
        if (targetContent) {
            targetContent.style.display = 'block';
            setTimeout(() => targetContent.classList.add('active'), 10); // Trigger fade in
        } else {
            console.error("Tab content not found:", targetId);
        }

        // Find button with data-target and activate it
        const activeBtn = Array.from(tabBtns).find(b => b.getAttribute('data-target') === targetId);
        if (activeBtn) activeBtn.classList.add('active');
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-target');
            console.log("Tab clicked:", target);
            openTab(target);
        });
    });

    // Initialize first tab if exists
    if (tabBtns.length > 0) {
        openTab(tabBtns[0].getAttribute('data-target'));
    }
});

// Typewriter Effect for Hero
const typeText = "Engineering the Backend of Tomorrow.";
const typeElement = document.querySelector('.hero-section .muted');
if (typeElement) {
    typeElement.textContent = ""; // Clear initial text
    let i = 0;
    function typeWriter() {
        if (i < typeText.length) {
            typeElement.textContent += typeText.charAt(i);
            i++;
            setTimeout(typeWriter, 50); // Speed
        } else {
            // Optional: Blinking cursor effect could be added via CSS on a class
            typeElement.style.borderRight = "none";
        }
    }

