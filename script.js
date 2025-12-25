const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".navbar")) {
      navMenu.classList.remove("active");
      menuToggle.classList.remove("active");
    }
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      menuToggle.classList.remove("active");
    });
  });
}

const filterButtons = document.querySelectorAll(".filter-btn");
const recipeCards = document.querySelectorAll(".recipe-card");
const searchInput = document.getElementById("searchInput");

if (filterButtons.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");

      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      recipeCards.forEach((card, index) => {
        const category = card.getAttribute("data-category");

        setTimeout(() => {
          if (filter === "all" || category === filter) {
            card.style.display = "block";
            card.style.animation = "scaleIn 0.5s ease forwards";
          } else {
            card.style.opacity = "0";
            card.style.transform = "scale(0.8)";
            setTimeout(() => {
              card.style.display = "none";
            }, 300);
          }
        }, index * 50);
      });
    });
  });
}

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();

    recipeCards.forEach((card) => {
      const title = card
        .querySelector(".recipe-title")
        .textContent.toLowerCase();
      const description = card
        .querySelector(".recipe-description")
        .textContent.toLowerCase();

      if (title.includes(searchTerm) || description.includes(searchTerm)) {
        card.style.display = "block";
        card.style.animation = "scaleIn 0.5s ease forwards";
      } else {
        card.style.opacity = "0";
        card.style.transform = "scale(0.8)";
        setTimeout(() => {
          card.style.display = "none";
        }, 300);
      }
    });
  });
}

const categoryCards = document.querySelectorAll(".category-card");

categoryCards.forEach((card) => {
  card.addEventListener("click", () => {
    const category = card.getAttribute("data-category");

    sessionStorage.setItem("selectedCategory", category);

    window.location.href = "tarifler.html";
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const selectedCategory = sessionStorage.getItem("selectedCategory");

  if (selectedCategory && window.location.pathname.includes("tarifler.html")) {
    const targetButton = document.querySelector(
      `[data-filter="${selectedCategory}"]`
    );
    if (targetButton) {
      targetButton.click();
    }

    sessionStorage.removeItem("selectedCategory");
  }
});

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const faqItem = question.parentElement;
    const isActive = faqItem.classList.contains("active");

    document.querySelectorAll(".faq-item").forEach((item) => {
      item.classList.remove("active");
    });

    if (!isActive) {
      faqItem.classList.add("active");
    }
  });
});

const newsletterForm = document.getElementById("newsletterForm");

if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = newsletterForm.querySelector('input[type="email"]').value;

    showNotification(
      "Başarılı!",
      "Bültenimize abone oldunuz. Teşekkür ederiz! 🎉"
    );

    newsletterForm.reset();
  });
}

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      showNotification("Hata!", "Lütfen tüm alanları doldurun.", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showNotification("Hata!", "Geçerli bir e-posta adresi girin.", "error");
      return;
    }

    showNotification(
      "Başarılı!",
      "Mesajınız gönderildi. En kısa sürede size dönüş yapacağız! 📧"
    );

    contactForm.reset();
  });
}

function showNotification(title, message, type = "success") {
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <strong>${title}</strong>
            <p>${message}</p>
        </div>
        <button class="notification-close">×</button>
    `;

  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === "success" ? "#E8B4B8" : "#CD8987"};
        color: white;
        padding: 1.5rem;
        border-radius: 16px;
        box-shadow: 0 8px 32px rgba(232, 180, 184, 0.3);
        z-index: 10000;
        max-width: 400px;
        display: flex;
        gap: 1rem;
        align-items: flex-start;
        animation: slideInRight 0.5s ease;
    `;

  document.body.appendChild(notification);

  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;

  closeBtn.addEventListener("click", () => {
    notification.style.animation = "slideOutRight 0.5s ease";
    setTimeout(() => notification.remove(), 500);
  });

  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = "slideOutRight 0.5s ease";
      setTimeout(() => notification.remove(), 500);
    }
  }, 5000);
}

const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .notification-content {
        flex: 1;
    }
    
    .notification-content strong {
        display: block;
        margin-bottom: 0.5rem;
        font-size: 1.1rem;
    }
    
    .notification-content p {
        margin: 0;
        opacity: 0.9;
    }
`;
document.head.appendChild(style);

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    if (href === "#" || href === "") return;

    e.preventDefault();

    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  });
});

let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    navbar.style.boxShadow = "0 4px 16px rgba(232, 180, 184, 0.2)";
  } else {
    navbar.style.boxShadow = "0 2px 8px rgba(232, 180, 184, 0.1)";
  }

  lastScroll = currentScroll;
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document
  .querySelectorAll(".recipe-card, .category-card, .contact-card")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

window.addEventListener("load", () => {
  document.body.style.opacity = "0";

  setTimeout(() => {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "1";
  }, 100);
});

document.querySelectorAll(".recipe-card").forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transition = "all 0.3s ease";
  });
});

console.log(
  "%c Lezzet Durağı 🧁",
  "color: #E8B4B8; font-size: 24px; font-weight: bold; font-family: Playfair Display, serif;"
);
console.log(
  "%c Mutfağınızı lezzet cennetine dönüştürün! ",
  "color: #6B5B5B; font-size: 14px; font-family: Quicksand, sans-serif;"
);
console.log(
  "%c Web Teknolojileri Projesi - 2024 ",
  "color: #D89BA0; font-size: 12px; font-style: italic;"
);
