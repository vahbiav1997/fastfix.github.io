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
  function submitForm() {
    const fname  = document.getElementById('fname').value.trim();
    const phone  = document.getElementById('phone').value.trim();
    const device = document.getElementById('device').value;
    const issue  = document.getElementById('issue').value.trim();
    const msg    = document.getElementById('formMsg');

    msg.className = 'form-msg';
    msg.textContent = '';

    if (!fname || !phone || !device || !issue) {
      msg.textContent = 'Please fill in all required fields (*).';
      msg.classList.add('error');
      return;
    }
    if (!/^[+\d\s\-]{8,15}$/.test(phone)) {
      msg.textContent = 'Please enter a valid phone number.';
      msg.classList.add('error');
      return;
    }

    // Success (static site — no backend)
    msg.textContent = '✓ Request received! We\'ll call you within a few hours to confirm.';
    msg.classList.add('success');
    ['fname','lname','phone','issue'].forEach(id => document.getElementById(id).value = '');
    document.getElementById('device').value = '';
  }

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
