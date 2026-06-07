const products = [
  {
    id: 1,
    name: "Basmati Rice",
    origin: "Dehradun, Uttarakhand",
    image: "images/basmati.jpg",
    category: "grain",
    price: 95,
    organic: true,
    bulk: true
  },
  {
    id: 2,
    name: "Brown Rice",
    origin: "West Bengal",
    image: "images/brown-rice.jpeg",
    category: "grain",
    price: 72,
    organic: false,
    bulk: false
  },
  {
    id: 3,
    name: "Toor Dal",
    origin: "Maharashtra",
    image: "images/toor-dal.jpg",
    category: "pulse",
    price: 130,
    organic: true,
    bulk: true
  },
  {
    id: 4,
    name: "Masoor Dal",
    origin: "Madhya Pradesh",
    image: "images/masoor-dal.jpg",
    category: "pulse",
    price: 110,
    organic: false,
    bulk: false
  },
  {
    id: 5,
    name: "Chana Dal",
    origin: "Rajasthan",
    image: "images/chana-dal.jpg",
    category: "pulse",
    price: 95,
    organic: true,
    bulk: false
  },
  {
    id: 6,
    name: "Moong Dal",
    origin: "Gujarat",
    image: "images/moong-dal.jpg",
    category: "pulse",
    price: 120,
    organic: true,
    bulk: true
  },
  {
    id: 7,
    name: "Sharbati Wheat",
    origin: "Madhya Pradesh",
    image: "images/wheat.jpg",
    category: "grain",
    price: 38,
    organic: false,
    bulk: true
  },
  {
    id: 8,
    name: "Jowar",
    origin: "Karnataka",
    image: "images/jowar.jpg",
    category: "grain",
    price: 45,
    organic: true,
    bulk: false
  },
  {
    id: 9,
    name: "Bajra",
    origin: "Rajasthan",
    image: "images/bajra.jpg",
    category: "grain",
    price: 42,
    organic: false,
    bulk: false
  },
  {
    id: 10,
    name: "Whole Wheat Atta",
    origin: "Punjab",
    image: "images/atta.jpg",
    category: "flour",
    price: 55,
    organic: true,
    bulk: true
  },
  {
    id: 11,
    name: "Besan",
    origin: "Rajasthan",
    image: "images/besan.jpg",
    category: "flour",
    price: 85,
    organic: false,
    bulk: false
  },
  {
    id: 12,
    name: "Rice Flour",
    origin: "Tamil Nadu",
    image: "images/rice-flour.jpg",
    category: "flour",
    price: 60,
    organic: false,
    bulk: false
  },
  {
    id: 13,
    name: "Mustard Seeds",
    origin: "Haryana",
    image: "images/mustard-seeds.jpeg",
    category: "seed",
    price: 90,
    organic: true,
    bulk: false
  },
  {
    id: 14,
    name: "Methi Seeds",
    origin: "Gujarat",
    image: "images/methi-seeds.jpg",
    category: "seed",
    price: 75,
    organic: true,
    bulk: false
  },
  {
    id: 15,
    name: "Flax Seeds",
    origin: "Madhya Pradesh",
    image: "images/flax-seeds.jpg",
    category: "seed",
    price: 150,
    organic: true,
    bulk: false
  },
  {
    id: 16,
    name: "Urad Dal",
    origin: "Andhra Pradesh",
    image: "images/urad-dal.jpg",
    category: "pulse",
    price: 140,
    organic: false,
    bulk: true
  }
];

// ─── State ───────────────────────────────────────────────
let cart = {};
let currentTab = "all";
let maxPrice = 300;
let sortBy = "default";

// ─── Init ────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  renderProducts(products);
  bindEvents();
});

function bindEvents() {
  document.getElementById("searchInput").addEventListener("input", filterProducts);
  document.getElementById("priceFilter").addEventListener("input", (e) => {
    maxPrice = parseInt(e.target.value);
    document.getElementById("priceVal").textContent = "Up to ₹" + maxPrice;
    filterProducts();
  });
  document.getElementById("sortSelect").addEventListener("change", (e) => {
    sortBy = e.target.value;
    filterProducts();
  });
  document.querySelectorAll(".check-item input").forEach((cb) =>
    cb.addEventListener("change", filterProducts)
  );
}

// ─── Tab switching ───────────────────────────────────────
function setTab(el, cat) {
  document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
  el.classList.add("active");
  currentTab = cat;
  filterProducts();
}

// ─── Filtering & Sorting ─────────────────────────────────
function filterProducts() {
  const q = document.getElementById("searchInput").value.toLowerCase().trim();
  const checkboxes = document.querySelectorAll(".check-item input");
  const showOrganic = checkboxes[0].checked;
  const showConventional = checkboxes[1].checked;
  const showBulk = checkboxes[2].checked;

  let filtered = products.filter((p) => {
    if (currentTab !== "all" && p.category !== currentTab) return false;
    if (p.price > maxPrice) return false;
    if (q && !p.name.toLowerCase().includes(q) && !p.origin.toLowerCase().includes(q))
      return false;
    if (p.organic && !showOrganic) return false;
    if (!p.organic && !showConventional) return false;
    if (p.bulk && !showBulk && !(!p.bulk)) return false;
    return true;
  });

  // Sorting
  if (sortBy === "price-asc") filtered.sort((a, b) => a.price - b.price);
  else if (sortBy === "price-desc") filtered.sort((a, b) => b.price - a.price);
  else if (sortBy === "name") filtered.sort((a, b) => a.name.localeCompare(b.name));

  document.getElementById("productsCount").textContent =
    filtered.length + " product" + (filtered.length !== 1 ? "s" : "");

  renderProducts(filtered);
}

// ─── Render ──────────────────────────────────────────────
function renderProducts(list) {
  const grid = document.getElementById("productsGrid");

  if (!list.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          <line x1="8" y1="11" x2="14" y2="11"/>
        </svg>
        <p>No products match your filters.</p>
      </div>`;
    return;
  }

  grid.innerHTML = list
    .map(
      (p) => `
    <div class="product-card" id="card-${p.id}">
      <div class="product-img-wrap">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        ${p.organic ? '<span class="organic-tag">Organic</span>' : ""}
        ${p.bulk ? '<span class="bulk-tag">Bulk</span>' : ""}
      </div>
      <div class="product-info">
        <h4 title="${p.name}">${p.name}</h4>
        <div class="product-origin">${p.origin}</div>
        <div class="product-footer">
          <div>
            <span class="price">₹${p.price}</span>
            <span class="price-unit">/kg</span>
          </div>
         ${
  cart[p.id]
    ? `
      <div class="qty-control">
        <button onclick="decreaseFromCart(${p.id})">−</button>
        <span>${cart[p.id]}</span>
        <button onclick="addToCart(${p.id})">+</button>
      </div>
    `
    : `
      <button
        class="add-btn"
        onclick="addToCart(${p.id})">
        +
      </button>
    `
}
        </div>
      </div>
    </div>`
    )
    .join("");
}

// ─── Cart ────────────────────────────────────────────────
function addToCart(id) {
  cart[id] = (cart[id] || 0) + 1;

  filterProducts(); // refresh card UI
  updateCartBar();
}

function decreaseFromCart(id) {
  if (!cart[id]) return;

  cart[id]--;

  if (cart[id] <= 0) {
    delete cart[id];
  }

  filterProducts(); // re-render cards
  updateCartBar();
}

function updateCartBar() {
  const ids = Object.keys(cart);
  const total = ids.reduce(
    (sum, id) => sum + cart[id] * products.find((p) => p.id == id).price,
    0
  );
  const count = ids.reduce((sum, id) => sum + cart[id], 0);

  const bar = document.getElementById("cartBar");
  bar.classList.toggle("visible", count > 0);
  document.getElementById("cartCount").textContent = count;
  document.getElementById("cartTotal").textContent =
    "₹" + total.toLocaleString("en-IN");
}

function openCart() {
  const lines = Object.keys(cart)
    .map((id) => {
      const p = products.find((x) => x.id == id);
      return `${p.name} ×${cart[id]} = ₹${(p.price * cart[id]).toLocaleString("en-IN")}`;
    })
    .join("\n");
  const total = Object.keys(cart).reduce(
    (s, id) => s + cart[id] * products.find((p) => p.id == id).price,
    0
  );
  alert(
    `🛒 Your Cart\n\n${lines}\n\n─────────────\nTotal: ₹${total.toLocaleString("en-IN")}\n\nThank you for shopping at Anaj & Dal Bhandar!`
  );
}
