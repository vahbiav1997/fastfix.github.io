// 1. Nav shadow on scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  // 2. Mobile menu toggle
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });
  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
  }

  // 3. Contact form validation
document.addEventListener("DOMContentLoaded", function () {
document.getElementById("repairForm").addEventListener("submit", async function(e) {
  e.preventDefault(); // stops redirect

  const formData = new FormData(this);

  const response = await fetch("https://formspree.io/f/mdaypkwy", {
    method: "POST",
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  });

  const msg = document.getElementById("formMsg");

  if (response.ok) {
    msg.innerHTML = "✅ Request sent successfully!";
    this.reset();
  } else {
    msg.innerHTML = "❌ Something went wrong. Try again.";
  }
});
});
