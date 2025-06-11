// Optimized Navigation scroll effect with better performance
let lastScrollY = window.scrollY;
let scrollTimer = null;
let ticking = false;

function updateNavbar() {
  const navbar = document.getElementById("navbar");
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
  lastScrollY = window.scrollY;
  ticking = false;
}

window.addEventListener("scroll", function () {
  if (!ticking) {
    requestAnimationFrame(updateNavbar);
    ticking = true;
  }
});

// Smooth scrolling function
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    // Get the height of the navbar for offset
    const navbar = document.getElementById("navbar");
    const navbarHeight = navbar ? navbar.offsetHeight : 0;

    // Calculate the element position with offset
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

    // Scroll with offset
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }

  // Update active nav link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => link.classList.remove("active"));

  const activeLink = document.querySelector(`[href="#${sectionId}"]`);
  if (activeLink) {
    activeLink.classList.add("active");
  }
}

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated");
    }
  });
}, observerOptions);

// Observe all elements with animate-on-scroll class
document.querySelectorAll(".animate-on-scroll").forEach((el) => {
  observer.observe(el);
});

// Update active nav link on scroll
window.addEventListener("scroll", function () {
  const sections = [
    "hero",
    "about",
    "experience",
    "projects",
    "blog",
    "publications",
    "cv",
    "vision",
  ];
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";
  sections.forEach((section) => {
    const element = document.getElementById(section);
    if (element) {
      const rect = element.getBoundingClientRect();
      if (rect.top <= 100 && rect.bottom >= 100) {
        current = section;
      }
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Mobile menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenu = document.querySelector(".mobile-menu");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenu && navLinks) {
    mobileMenu.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      mobileMenu.classList.toggle("active");
    });

    // Close mobile menu when clicking on a nav link
    const navLinkElements = document.querySelectorAll(".nav-link");
    navLinkElements.forEach((link) => {
      link.addEventListener("click", function () {
        navLinks.classList.remove("active");
        mobileMenu.classList.remove("active");
      });
    });
  }
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// Initialize typing effect on load
document.addEventListener("DOMContentLoaded", function () {
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    // Only run typing effect on larger screens for better UX
    if (window.innerWidth > 768) {
      typeWriter(heroTitle, originalText, 100);
    }
  }
});

// Parallax effect for hero section (optimized)
let parallaxTicking = false;

function updateParallax() {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  if (hero && window.innerWidth > 768) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
  parallaxTicking = false;
}

window.addEventListener("scroll", function () {
  if (!parallaxTicking) {
    requestAnimationFrame(updateParallax);
    parallaxTicking = true;
  }
});

// Add download CV functionality
function downloadCV() {
  // Replace with actual CV file path
  const link = document.createElement("a");
  link.href = "Parth_cv.pdf"; // Update this path
  link.download = "Parth_Bramhecha_CV.pdf";
  link.click();
}

// Add smooth reveal animation for timeline items
const timelineItems = document.querySelectorAll(".timeline-item");
timelineItems.forEach((item, index) => {
  item.style.animationDelay = `${index * 0.1}s`;
});

// Add hover effects for skill tags
document.querySelectorAll(".skill-tag").forEach((tag) => {
  tag.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-2px) scale(1.05)";
  });

  tag.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Preloader (optional)
window.addEventListener("load", function () {
  document.body.classList.add("loaded");
});

// Add error handling for missing profile image
document.addEventListener("DOMContentLoaded", function () {
  const profileImage = document.querySelector(".profile-container img");
  if (profileImage) {
    profileImage.addEventListener("error", function () {
      this.src =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjEwMCIgY3k9IjgwIiByPSIzMCIgZmlsbD0iIzk0QTNCOCIvPgo8cGF0aCBkPSJNNTAgMTUwQzUwIDEyNS4xNDcgNzEuMTk0IDEwNSA5NyAxMDVIMTAzQzEyOC44MDYgMTA1IDE1MCAxMjUuMTQ3IDE1MCAxNTBWMjAwSDUwVjE1MFoiIGZpbGw9IiM5NEEzQjgiLz4KPC9zdmc+";
      this.alt = "Profile image not available";
    });
  }
});

// Add smooth scrolling fallback for older browsers
if (!CSS.supports("scroll-behavior", "smooth")) {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
}

// Add reduced motion support
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.documentElement.style.setProperty("--animation-duration", "0s");
  document.documentElement.style.setProperty("--transition-duration", "0s");
}

// Theme Toggle
document.addEventListener("DOMContentLoaded", () => {
  const themeSwitch = document.getElementById("theme-switch");
  const currentTheme = localStorage.getItem("theme");

  if (currentTheme === "dark") {
    document.body.classList.add("dark-theme");
    themeSwitch.checked = true;
  }

  themeSwitch.addEventListener("change", () => {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark-theme") ? "dark" : "light"
    );
  });
});
