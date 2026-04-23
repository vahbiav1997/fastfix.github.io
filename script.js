// script.js runs deferred — DOM is guaranteed ready, no DOMContentLoaded needed

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

// Close mobile menu on any link click — no inline onclick needed
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// 3. Contact form — Formspree submission
document.getElementById('repairForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const msg = document.getElementById('formMsg');

  // Reset message state
  msg.className = 'form-msg';
  msg.innerHTML = '';

  try {
    const response = await fetch('https://formspree.io/f/mdaypkwy', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      msg.innerHTML = "✅ Request sent successfully! We'll call you to confirm.";
      msg.classList.add('success');
      this.reset();
    } else {
      msg.innerHTML = '❌ Something went wrong. Please try again or call us directly.';
      msg.classList.add('error');
    }
  } catch (err) {
    msg.innerHTML = '❌ Network error. Please check your connection and try again.';
    msg.classList.add('error');
  }
});
