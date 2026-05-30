/* ================================================
   SHOPWAVE – script.js
   One file that powers all pages.

   HOW IT WORKS:
   • We have a PRODUCTS array (our "database")
   • Cart is saved in localStorage (browser storage)
   • On each page load we detect which page we're on
     and run the right setup function
   • Everything is plain JS — no frameworks needed!
================================================ */


/* =============================================
   SECTION 1: PRODUCT DATA
   This is our "fake database" of 20 products.
   In a real site this would come from a server/API.
============================================= */

const PRODUCTS = [
  {
    id: 1,
    name: "Premium Smart Watch",
    category: "electronics",
    price: 12999,
    originalPrice: 17999,
    rating: 4.5,
    reviews: 328,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    badge: "hot",
    description: "Stay connected with this premium smartwatch featuring heart rate monitoring, GPS, sleep tracking, and 7-day battery life. Compatible with iOS and Android.",
    stock: 15
  },
  {
    id: 2,
    name: "Wireless Noise-Cancelling Headphones",
    category: "electronics",
    price: 8499,
    originalPrice: 12000,
    rating: 4.7,
    reviews: 512,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    badge: "sale",
    description: "Industry-leading noise cancellation with 30-hour battery life and premium sound quality.",
    stock: 8
  },
  {
    id: 3,
    name: "Men's Classic Polo Shirt",
    category: "fashion",
    price: 999,
    originalPrice: 1499,
    rating: 4.2,
    reviews: 187,
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop",
    badge: "new",
    description: "100% cotton premium polo shirt. Comfortable fit for everyday wear. Available in 8 colours.",
    stock: 50
  },
  {
    id: 4,
    name: "Running Shoes Pro",
    category: "sports",
    price: 4299,
    originalPrice: 6000,
    rating: 4.6,
    reviews: 264,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    badge: "hot",
    description: "Lightweight running shoes with responsive cushioning for maximum performance on any terrain.",
    stock: 20
  },
  {
    id: 5,
    name: "Ceramic Coffee Mug Set",
    category: "home",
    price: 799,
    originalPrice: 1200,
    rating: 4.4,
    reviews: 95,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop",
    badge: "new",
    description: "Set of 4 hand-crafted ceramic mugs. Microwave and dishwasher safe. Perfect for gifting.",
    stock: 30
  },
  {
    id: 6,
    name: "JavaScript: The Good Parts",
    category: "books",
    price: 599,
    originalPrice: 799,
    rating: 4.8,
    reviews: 1024,
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=400&fit=crop",
    badge: null,
    description: "A must-read for every web developer. Learn the best parts of JavaScript with real examples.",
    stock: 100
  },
  {
    id: 7,
    name: "Women's Floral Kurta",
    category: "fashion",
    price: 1299,
    originalPrice: 1899,
    rating: 4.3,
    reviews: 342,
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop",
    badge: "sale",
    description: "Elegant floral print kurta in breathable cotton fabric. Ideal for casual and festive occasions.",
    stock: 40
  },
  {
    id: 8,
    name: "Moisturising Face Serum",
    category: "beauty",
    price: 1899,
    originalPrice: 2500,
    rating: 4.6,
    reviews: 456,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
    badge: "new",
    description: "Hyaluronic acid face serum for deep hydration. Suitable for all skin types. Paraben-free.",
    stock: 25
  },
  {
    id: 9,
    name: "Yoga Mat with Carry Strap",
    category: "sports",
    price: 1499,
    originalPrice: 2000,
    rating: 4.5,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1601925228008-f1d3450f28cf?w=400&h=400&fit=crop",
    badge: null,
    description: "Eco-friendly non-slip yoga mat, 6mm thick. Comes with a carry strap and cleaning guide.",
    stock: 18
  },
  {
    id: 10,
    name: "Wooden Bookshelf 3-Tier",
    category: "home",
    price: 5999,
    originalPrice: 8000,
    rating: 4.2,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    badge: "sale",
    description: "Solid engineered wood bookshelf. Easy assembly, holds up to 30kg per shelf. Walnut finish.",
    stock: 5
  },
  {
    id: 11,
    name: "Bluetooth Speaker Portable",
    category: "electronics",
    price: 3299,
    originalPrice: 4500,
    rating: 4.4,
    reviews: 389,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    badge: "hot",
    description: "360° surround sound, IPX7 waterproof, 20-hour playtime. Perfect for outdoor use.",
    stock: 12
  },
  {
    id: 12,
    name: "Vitamin C Sunscreen SPF 50",
    category: "beauty",
    price: 699,
    originalPrice: 999,
    rating: 4.7,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
    badge: "hot",
    description: "Lightweight, non-greasy SPF 50 sunscreen with vitamin C brightening effect. No white cast.",
    stock: 200
  },
  {
    id: 13,
    name: "Stainless Steel Water Bottle",
    category: "sports",
    price: 899,
    originalPrice: 1200,
    rating: 4.5,
    reviews: 643,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    badge: "new",
    description: "Double-walled insulated bottle. Keeps drinks cold 24h, hot 12h. BPA-free, 750ml.",
    stock: 60
  },
  {
    id: 14,
    name: "Atomic Habits (Book)",
    category: "books",
    price: 449,
    originalPrice: 599,
    rating: 4.9,
    reviews: 2048,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
    badge: null,
    description: "James Clear's bestseller on building good habits and breaking bad ones. Life-changing read.",
    stock: 150
  },
  {
    id: 15,
    name: "Scented Soy Candle Set",
    category: "home",
    price: 1199,
    originalPrice: 1600,
    rating: 4.6,
    reviews: 134,
    image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=400&h=400&fit=crop",
    badge: "new",
    description: "Set of 3 handmade soy wax candles in calming scents: lavender, sandalwood, and jasmine.",
    stock: 35
  },
  {
    id: 16,
    name: "Women's Leather Handbag",
    category: "fashion",
    price: 3499,
    originalPrice: 5000,
    rating: 4.4,
    reviews: 215,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
    badge: "sale",
    description: "Premium vegan leather handbag with multiple compartments. Stylish and spacious.",
    stock: 10
  },
  {
    id: 17,
    name: "4K Action Camera",
    category: "electronics",
    price: 18999,
    originalPrice: 24000,
    rating: 4.5,
    reviews: 298,
    image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?w=400&h=400&fit=crop",
    badge: "hot",
    description: "Shoot stunning 4K video at 60fps. Waterproof up to 40m, image stabilisation, wide-angle lens.",
    stock: 7
  },
  {
    id: 18,
    name: "Face Wash Charcoal Gel",
    category: "beauty",
    price: 349,
    originalPrice: 499,
    rating: 4.3,
    reviews: 567,
    image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=400&h=400&fit=crop",
    badge: null,
    description: "Deep cleansing charcoal face wash. Removes excess oil, unclogs pores, leaves skin fresh.",
    stock: 300
  },
  {
    id: 19,
    name: "Cricket Bat English Willow",
    category: "sports",
    price: 7499,
    originalPrice: 10000,
    rating: 4.6,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=400&fit=crop",
    badge: "hot",
    description: "Grade 1 English willow cricket bat. Full grains, premium grip, ideal for hard courts.",
    stock: 4
  },
  {
    id: 20,
    name: "Cushion Cover Set (5 pcs)",
    category: "home",
    price: 899,
    originalPrice: 1200,
    rating: 4.3,
    reviews: 201,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    badge: "new",
    description: "Set of 5 decorative cushion covers in vibrant block prints. Machine washable. 45×45cm.",
    stock: 80
  }
];


/* =============================================
   SECTION 2: CART UTILITY FUNCTIONS
   These read and write the cart to localStorage.
   localStorage is like a mini-database in the browser.
============================================= */

/**
 * getCart() – reads the cart array from localStorage.
 * If nothing is stored yet, returns an empty array [].
 */
function getCart() {
  const raw = localStorage.getItem('shopwave_cart');
  return raw ? JSON.parse(raw) : [];
}

/**
 * saveCart(cart) – saves the cart array to localStorage.
 * JSON.stringify converts array → text for storage.
 */
function saveCart(cart) {
  localStorage.setItem('shopwave_cart', JSON.stringify(cart));
}

/**
 * addToCart(productId, qty) – adds one product to cart.
 * If already in cart, increases quantity instead.
 */
function addToCart(productId, qty = 1) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  let cart = getCart();
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    // Already in cart — just increase qty
    existing.qty = Math.min(existing.qty + qty, product.stock);
  } else {
    // New item — push to cart array
    cart.push({ id: product.id, qty: qty });
  }

  saveCart(cart);
  updateCartBadge();
  showToast(`✅ "${product.name}" added to cart!`);
}

/**
 * removeFromCart(productId) – removes an item completely.
 * filter() returns a new array without the matching item.
 */
function removeFromCart(productId) {
  let cart = getCart().filter(item => item.id !== productId);
  saveCart(cart);
  updateCartBadge();
}

/**
 * updateCartQty(productId, newQty) – changes quantity.
 * If qty becomes 0, removes the item entirely.
 */
function updateCartQty(productId, newQty) {
  let cart = getCart();
  if (newQty <= 0) {
    removeFromCart(productId);
    return;
  }
  const item = cart.find(i => i.id === productId);
  if (item) item.qty = newQty;
  saveCart(cart);
  updateCartBadge();
}

/**
 * getCartTotal() – calculates total price.
 * Uses reduce() to add up (price × qty) for each item.
 */
function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => {
    const product = PRODUCTS.find(p => p.id === item.id);
    return product ? total + product.price * item.qty : total;
  }, 0);
}

/**
 * getCartCount() – total number of items (sum of all quantities).
 */
function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

/**
 * updateCartBadge() – updates the red bubble on the cart icon.
 * Called after every cart change.
 */
function updateCartBadge() {
  const count = getCartCount();
  document.querySelectorAll('#cartCount').forEach(el => {
    el.textContent = count;
    // Hide badge if cart is empty
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

/**
 * formatPrice(amount) – formats a number as ₹1,23,456
 * Uses Indian locale formatting.
 */
function formatPrice(amount) {
  return '₹' + amount.toLocaleString('en-IN');
}


/* =============================================
   SECTION 3: TOAST NOTIFICATION
   Shows a small pop-up message at bottom-right.
============================================= */

/**
 * showToast(message, type) – shows Bootstrap toast.
 * type: 'success' (default) or 'danger' for error
 */
function showToast(message, type = 'success') {
  const toastEl = document.getElementById('cartToast');
  const msgEl   = document.getElementById('toastMessage');
  if (!toastEl || !msgEl) return;

  msgEl.textContent = message;
  // Change background color based on type
  toastEl.style.background = type === 'danger' ? '#c62828' : '#1a1a2e';

  // Bootstrap Toast API
  const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
  toast.show();
}


/* =============================================
   SECTION 4: BUILD A PRODUCT CARD (HTML)
   Returns the HTML string for one product card.
   Used on both homepage and products page.
============================================= */

function buildProductCard(product) {
  // Calculate discount percentage
  const discountPct = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  // Build star icons based on rating (filled, half, empty)
  const starsHtml = buildStars(product.rating);

  // Badge HTML (only if product has a badge property)
  const badgeHtml = product.badge
    ? `<span class="product-badge badge-${product.badge}">
         ${product.badge === 'new' ? 'New' : product.badge === 'sale' ? 'Sale' : '🔥 Hot'}
       </span>`
    : '';

  return `
    <div class="col-sm-6 col-md-4 col-lg-3" data-product-id="${product.id}">
      <div class="product-card" onclick="viewProduct(${product.id})">

        <!-- Product image area -->
        <div class="product-img-wrapper">
          <img src="${product.image}" alt="${product.name}" loading="lazy"
               onerror="this.src='https://via.placeholder.com/400x400?text=No+Image'" />
          ${badgeHtml}
          <!-- Wishlist heart (decorative in this version) -->
          <button class="wishlist-btn" onclick="toggleWishlist(event, ${product.id})">
            <i class="bi bi-heart"></i>
          </button>
        </div>

        <!-- Product info -->
        <div class="product-info">
          <div class="product-category">${product.category}</div>
          <div class="product-name">${product.name}</div>

          <!-- Stars and review count -->
          <div class="product-rating">
            <span class="stars">${starsHtml}</span>
            <span class="rating-count">(${product.reviews})</span>
          </div>

          <!-- Price section -->
          <div class="product-price-row">
            <span class="price-current">${formatPrice(product.price)}</span>
            ${product.originalPrice
              ? `<span class="price-original">${formatPrice(product.originalPrice)}</span>
                 <span class="price-discount">${discountPct}% off</span>`
              : ''}
          </div>

          <!-- Add to Cart button - stopPropagation prevents card click from firing too -->
          <button class="btn-add-cart"
                  onclick="event.stopPropagation(); addToCart(${product.id})">
            <i class="bi bi-bag-plus me-2"></i>Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;
}


/* =============================================
   SECTION 5: STAR RATING BUILDER
   Converts a numeric rating (e.g. 4.5) into star icons.
============================================= */

function buildStars(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      html += '<i class="bi bi-star-fill"></i>';       // Full star
    } else if (i - 0.5 <= rating) {
      html += '<i class="bi bi-star-half"></i>';       // Half star
    } else {
      html += '<i class="bi bi-star"></i>';            // Empty star
    }
  }
  return html;
}


/* =============================================
   SECTION 6: NAVIGATE TO PRODUCT DETAIL
   Saves product ID in URL query string and redirects.
============================================= */

function viewProduct(id) {
  window.location.href = `product-detail.html?id=${id}`;
}

function toggleWishlist(event, id) {
  event.stopPropagation(); // Don't trigger card click
  const btn = event.currentTarget;
  const icon = btn.querySelector('i');
  icon.classList.toggle('bi-heart');
  icon.classList.toggle('bi-heart-fill');
  btn.classList.toggle('active');
}


/* =============================================
   SECTION 7: HOMEPAGE LOGIC
   Runs when we're on index.html
============================================= */

function initHomePage() {
  const container = document.getElementById('featuredProducts');
  if (!container) return;

  // Show 8 random-ish featured products (first 8 by default)
  const featured = [...PRODUCTS].sort(() => 0.5 - Math.random()).slice(0, 8);
  container.innerHTML = featured.map(buildProductCard).join('');

  // Newsletter form
  const nlForm = document.getElementById('newsletterForm');
  if (nlForm) {
    nlForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Stop page reload
      document.getElementById('newsletterMsg').classList.remove('d-none');
      nlForm.reset();
    });
  }
}


/* =============================================
   SECTION 8: PRODUCTS PAGE LOGIC
   Search + Filter + Sort + Render
============================================= */

// These variables hold the current filter state
let currentCategory = 'all';
let currentMaxPrice = 100000;
let currentMinRating = 0;
let currentSearch    = '';
let currentSort      = 'default';

function initProductsPage() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  // Check if a category was passed in the URL (e.g. products.html?category=electronics)
  const params = new URLSearchParams(window.location.search);
  const urlCat = params.get('category');
  const urlQ   = params.get('q');

  if (urlCat) currentCategory = urlCat;
  if (urlQ)   {
    currentSearch = urlQ;
    const searchInput = document.getElementById('productSearch');
    if (searchInput) searchInput.value = urlQ;
  }

  buildCategoryFilters();
  renderProducts();

  // Listen for search input (with a small delay so it doesn't fire on every keypress)
  const searchInput = document.getElementById('productSearch');
  if (searchInput) {
    let timeout;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        currentSearch = e.target.value.toLowerCase().trim();
        renderProducts();
      }, 300); // 300ms debounce
    });
  }

  // Listen for sort dropdown change
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderProducts();
    });
  }

  // Price range slider
  const priceRange = document.getElementById('priceRange');
  if (priceRange) {
    priceRange.addEventListener('input', (e) => {
      currentMaxPrice = parseInt(e.target.value);
      document.getElementById('priceRangeVal').textContent = formatPrice(currentMaxPrice);
      renderProducts();
    });
  }

  // Rating filter (radio buttons)
  document.querySelectorAll('[name="rating"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      currentMinRating = parseFloat(e.target.value);
      renderProducts();
    });
  });

  // Reset button
  const resetBtn = document.getElementById('resetFilters');
  if (resetBtn) {
    resetBtn.addEventListener('click', resetAllFilters);
  }

  // "Clear All" button in empty state
  const clearAllBtn = document.getElementById('clearAll');
  if (clearAllBtn) clearAllBtn.addEventListener('click', resetAllFilters);
}

/**
 * buildCategoryFilters() – creates checkboxes for each unique category.
 */
function buildCategoryFilters() {
  const container = document.getElementById('categoryFilters');
  if (!container) return;

  // Get unique categories
  const categories = ['all', ...new Set(PRODUCTS.map(p => p.category))];

  container.innerHTML = categories.map(cat => {
    const count = cat === 'all' ? PRODUCTS.length : PRODUCTS.filter(p => p.category === cat).length;
    const label = cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1);
    const checked = currentCategory === cat ? 'checked' : '';

    return `
      <label>
        <input type="checkbox" value="${cat}" ${checked}
               onchange="handleCategoryChange(this)" />
        ${label}
        <span class="filter-count">${count}</span>
      </label>
    `;
  }).join('');
}

/**
 * handleCategoryChange(checkbox) – called when a category checkbox is toggled.
 * We only allow one category at a time (like a radio).
 */
function handleCategoryChange(checkbox) {
  // Uncheck all others first
  document.querySelectorAll('#categoryFilters input').forEach(cb => {
    cb.checked = false;
  });
  checkbox.checked = true;
  currentCategory = checkbox.value;
  renderProducts();
}

/**
 * renderProducts() – applies all filters and re-renders the grid.
 * This is the main function that runs whenever anything changes.
 */
function renderProducts() {
  const grid      = document.getElementById('productGrid');
  const emptyEl   = document.getElementById('emptyState');
  const countEl   = document.getElementById('productsCount');
  if (!grid) return;

  // Step 1: Filter
  let filtered = PRODUCTS.filter(p => {
    const matchCat    = currentCategory === 'all' || p.category === currentCategory;
    const matchPrice  = p.price <= currentMaxPrice;
    const matchRating = p.rating >= currentMinRating;
    const matchSearch = !currentSearch ||
                        p.name.toLowerCase().includes(currentSearch) ||
                        p.category.toLowerCase().includes(currentSearch);
    return matchCat && matchPrice && matchRating && matchSearch;
  });

  // Step 2: Sort
  switch (currentSort) {
    case 'price-asc':    filtered.sort((a, b) => a.price - b.price);          break;
    case 'price-desc':   filtered.sort((a, b) => b.price - a.price);          break;
    case 'rating-desc':  filtered.sort((a, b) => b.rating - a.rating);        break;
    case 'name-asc':     filtered.sort((a, b) => a.name.localeCompare(b.name)); break;
  }

  // Step 3: Render
  if (filtered.length === 0) {
    grid.innerHTML = '';
    emptyEl && emptyEl.classList.remove('d-none');
  } else {
    emptyEl && emptyEl.classList.add('d-none');
    grid.innerHTML = filtered.map(buildProductCard).join('');
  }

  // Update count display
  if (countEl) countEl.textContent = `${filtered.length} product${filtered.length !== 1 ? 's' : ''}`;
}

function resetAllFilters() {
  currentCategory  = 'all';
  currentMaxPrice  = 100000;
  currentMinRating = 0;
  currentSearch    = '';
  currentSort      = 'default';

  // Reset UI controls
  const searchInput = document.getElementById('productSearch');
  if (searchInput) searchInput.value = '';

  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) sortSelect.value = 'default';

  const priceRange = document.getElementById('priceRange');
  if (priceRange) priceRange.value = 100000;

  const priceVal = document.getElementById('priceRangeVal');
  if (priceVal) priceVal.textContent = '₹1,00,000';

  document.querySelectorAll('[name="rating"]').forEach(r => r.checked = r.value === '0');

  buildCategoryFilters();
  renderProducts();
}


/* =============================================
   SECTION 9: PRODUCT DETAIL PAGE
============================================= */

function initProductDetailPage() {
  const container = document.getElementById('productDetailContent');
  if (!container) return;

  // Get the ?id=... from the URL
  const id      = parseInt(new URLSearchParams(window.location.search).get('id'));
  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    container.innerHTML = `
      <div class="text-center py-5">
        <h3>Product not found</h3>
        <a href="products.html" class="btn btn-primary-custom mt-3">Back to Products</a>
      </div>`;
    return;
  }

  // Update breadcrumb
  const bread = document.getElementById('detailBreadName');
  if (bread) bread.textContent = product.name;

  // Update page title
  document.title = `${product.name} – ShopWave`;

  const discountPct = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  container.innerHTML = `
    <div class="row g-5">
      <!-- Images -->
      <div class="col-lg-5">
        <img src="${product.image}" alt="${product.name}"
             class="product-detail-img" id="mainDetailImg" />
        <!-- Thumbnails (same image, would be different in real site) -->
        <div class="detail-thumbnails">
          <img src="${product.image}" class="detail-thumbnail active"
               onclick="changeDetailImg('${product.image}', this)" />
          <img src="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=100&h=100&fit=crop"
               class="detail-thumbnail"
               onclick="changeDetailImg('https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop', this)" />
        </div>
      </div>

      <!-- Info -->
      <div class="col-lg-7 product-detail-info">
        <span class="section-tag">${product.category}</span>
        <h1 class="section-title mt-1 mb-3">${product.name}</h1>

        <!-- Rating -->
        <div class="product-rating mb-3">
          <span class="stars fs-5">${buildStars(product.rating)}</span>
          <span class="ms-2 fw-600">${product.rating}</span>
          <span class="text-muted ms-1">(${product.reviews} reviews)</span>
        </div>

        <!-- Price -->
        <div class="d-flex align-items-center gap-3 mb-4 flex-wrap">
          <span class="big-price">${formatPrice(product.price)}</span>
          ${product.originalPrice
            ? `<span class="price-original fs-5">${formatPrice(product.originalPrice)}</span>
               <span class="price-discount fs-6">${discountPct}% off</span>`
            : ''}
        </div>

        <!-- Description -->
        <p class="text-muted mb-4" style="line-height:1.8;">${product.description}</p>

        <!-- Stock -->
        <p class="mb-3">
          <strong>Availability:</strong>
          ${product.stock > 0
            ? `<span class="text-success"><i class="bi bi-check-circle me-1"></i>In Stock (${product.stock} left)</span>`
            : `<span class="text-danger"><i class="bi bi-x-circle me-1"></i>Out of Stock</span>`}
        </p>

        <!-- Quantity picker + Add to cart -->
        <div class="qty-row mb-4">
          <div class="qty-control">
            <button class="qty-btn" onclick="changeDetailQty(-1)">−</button>
            <span class="qty-val" id="detailQty">1</span>
            <button class="qty-btn" onclick="changeDetailQty(1)">+</button>
          </div>
          <button class="btn btn-primary-custom btn-lg px-5"
                  onclick="addDetailToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>
            <i class="bi bi-bag-plus me-2"></i>Add to Cart
          </button>
        </div>

        <!-- Features list -->
        <div class="d-flex flex-wrap gap-3">
          <span class="feature-pill"><i class="bi bi-truck text-success me-1"></i>Free Delivery</span>
          <span class="feature-pill"><i class="bi bi-arrow-counterclockwise text-warning me-1"></i>Easy Returns</span>
          <span class="feature-pill"><i class="bi bi-shield-check text-primary me-1"></i>Genuine Product</span>
        </div>
      </div>
    </div>
  `;

  // Add a quick inline style for feature pills
  const style = document.createElement('style');
  style.textContent = '.feature-pill{background:var(--bg-light);padding:6px 14px;border-radius:50px;font-size:.82rem;font-weight:500;}';
  document.head.appendChild(style);

  // Show related products (same category, different id)
  const related = PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const relatedContainer = document.getElementById('relatedProducts');
  if (relatedContainer) {
    relatedContainer.innerHTML = related.length > 0
      ? related.map(buildProductCard).join('')
      : '<p class="text-muted">No related products found.</p>';
  }
}

// Change main detail image when thumbnail clicked
function changeDetailImg(src, thumb) {
  const mainImg = document.getElementById('mainDetailImg');
  if (mainImg) mainImg.src = src;
  document.querySelectorAll('.detail-thumbnail').forEach(t => t.classList.remove('active'));
  if (thumb) thumb.classList.add('active');
}

// Change quantity on detail page
function changeDetailQty(delta) {
  const qtyEl = document.getElementById('detailQty');
  if (!qtyEl) return;
  let qty = parseInt(qtyEl.textContent) + delta;
  if (qty < 1)  qty = 1;
  if (qty > 10) qty = 10;
  qtyEl.textContent = qty;
}

function addDetailToCart(productId) {
  const qty = parseInt(document.getElementById('detailQty')?.textContent || 1);
  addToCart(productId, qty);
}


/* =============================================
   SECTION 10: CART PAGE
============================================= */

function initCartPage() {
  const emptyDiv   = document.getElementById('emptyCart');
  const contentDiv = document.getElementById('cartContent');
  if (!emptyDiv || !contentDiv) return;

  renderCartPage();
}

function renderCartPage() {
  const cart       = getCart();
  const emptyDiv   = document.getElementById('emptyCart');
  const contentDiv = document.getElementById('cartContent');

  if (cart.length === 0) {
    emptyDiv.classList.remove('d-none');
    contentDiv.classList.add('d-none');
    return;
  }

  emptyDiv.classList.add('d-none');
  contentDiv.classList.remove('d-none');

  // Count
  const totalItems = getCartCount();
  document.getElementById('cartItemCount').textContent = totalItems;

  // Build cart rows
  const listEl = document.getElementById('cartItemsList');
  listEl.innerHTML = cart.map(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    if (!product) return '';
    const lineTotal = product.price * item.qty;

    return `
      <div class="cart-item-row" id="cart-row-${product.id}">
        <!-- Image -->
        <img src="${product.image}" alt="${product.name}" class="cart-item-img"
             onerror="this.src='https://via.placeholder.com/80'" />

        <!-- Name and category -->
        <div class="cart-item-info flex-grow-1">
          <div class="cart-item-cat">${product.category}</div>
          <div class="cart-item-name">${product.name}</div>
          <div class="cart-item-price">${formatPrice(product.price)} each</div>
        </div>

        <!-- Qty control -->
        <div class="qty-control">
          <button class="qty-btn" onclick="cartUpdateQty(${product.id}, ${item.qty - 1})">−</button>
          <span class="qty-val">${item.qty}</span>
          <button class="qty-btn" onclick="cartUpdateQty(${product.id}, ${item.qty + 1})">+</button>
        </div>

        <!-- Line total -->
        <div class="fw-700 text-primary ms-2" style="min-width:80px;text-align:right;">
          ${formatPrice(lineTotal)}
        </div>

        <!-- Remove button -->
        <button class="cart-remove-btn" onclick="cartRemoveItem(${product.id})"
                title="Remove">
          <i class="bi bi-trash3"></i>
        </button>
      </div>
    `;
  }).join('');

  // Update summary
  const subtotal  = getCartTotal();
  const delivery  = subtotal >= 999 ? 0 : 99;
  const discount  = 0; // will be updated by coupon logic
  const total     = subtotal + delivery - discount;

  document.getElementById('summarySubtotal').textContent = formatPrice(subtotal);
  document.getElementById('summaryDelivery').textContent = delivery === 0 ? 'Free' : formatPrice(delivery);
  document.getElementById('summaryDiscount').textContent = `-${formatPrice(discount)}`;
  document.getElementById('summaryTotal').textContent    = formatPrice(total);

  // Clear cart button
  const clearBtn = document.getElementById('clearCartBtn');
  if (clearBtn) {
    clearBtn.onclick = () => {
      if (confirm('Remove all items from cart?')) {
        saveCart([]);
        updateCartBadge();
        renderCartPage();
      }
    };
  }

  // Coupon code
  const applyCoupon = document.getElementById('applyCoupon');
  if (applyCoupon) {
    applyCoupon.onclick = () => {
      const code = document.getElementById('couponCode').value.trim().toUpperCase();
      const msg  = document.getElementById('couponMsg');
      // Simple demo coupons
      const coupons = { 'SAVE10': 0.10, 'WAVE20': 0.20, 'FIRST50': 0.05 };

      if (coupons[code]) {
        const saving = Math.round(subtotal * coupons[code]);
        msg.innerHTML = `<span class="text-success">✅ Coupon applied! You save ${formatPrice(saving)}</span>`;
        document.getElementById('summaryDiscount').textContent = `-${formatPrice(saving)}`;
        document.getElementById('summaryTotal').textContent = formatPrice(total - saving);
      } else {
        msg.innerHTML = `<span class="text-danger">❌ Invalid coupon code</span>`;
      }
    };
  }
}

// Called by qty buttons in cart
function cartUpdateQty(id, newQty) {
  updateCartQty(id, newQty);
  renderCartPage();
}

// Called by remove button in cart
function cartRemoveItem(id) {
  removeFromCart(id);
  renderCartPage();
  showToast('Item removed from cart.', 'danger');
}


/* =============================================
   SECTION 11: CHECKOUT PAGE
============================================= */

function initCheckoutPage() {
  const checkoutItems = document.getElementById('checkoutItems');
  if (!checkoutItems) return;

  const cart = getCart();

  // If cart is empty, redirect back
  if (cart.length === 0) {
    window.location.href = 'cart.html';
    return;
  }

  // Render mini order summary
  let subtotal = 0;
  checkoutItems.innerHTML = cart.map(item => {
    const p = PRODUCTS.find(prod => prod.id === item.id);
    if (!p) return '';
    const lineTotal = p.price * item.qty;
    subtotal += lineTotal;
    return `
      <div class="checkout-item">
        <img src="${p.image}" alt="${p.name}"
             onerror="this.src='https://via.placeholder.com/50'" />
        <div class="flex-grow-1">
          <div class="fw-600 small">${p.name}</div>
          <div class="text-muted small">Qty: ${item.qty}</div>
        </div>
        <div class="fw-700 text-primary">${formatPrice(lineTotal)}</div>
      </div>
    `;
  }).join('');

  document.getElementById('coSubtotal').textContent = formatPrice(subtotal);
  document.getElementById('coTotal').textContent    = formatPrice(subtotal);
  document.getElementById('codAmount').textContent  = subtotal.toLocaleString('en-IN');

  // Toggle payment fields when radio changes
  document.querySelectorAll('[name="payment"]').forEach(radio => {
    radio.addEventListener('change', () => {
      document.getElementById('upiFields').classList.add('d-none');
      document.getElementById('cardFields').classList.add('d-none');
      document.getElementById('codFields').classList.add('d-none');

      if (radio.value === 'upi')  document.getElementById('upiFields').classList.remove('d-none');
      if (radio.value === 'card') document.getElementById('cardFields').classList.remove('d-none');
      if (radio.value === 'cod')  document.getElementById('codFields').classList.remove('d-none');
    });
  });

  // Card number auto-format (adds spaces every 4 digits)
  const cardNumInput = document.getElementById('cardNumber');
  if (cardNumInput) {
    cardNumInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 16);
      e.target.value = val.replace(/(.{4})/g, '$1 ').trim();
    });
  }

  // Expiry auto-format (MM/YY)
  const expiryInput = document.getElementById('cardExpiry');
  if (expiryInput) {
    expiryInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 4);
      if (val.length > 2) val = val.substring(0,2) + '/' + val.substring(2);
      e.target.value = val;
    });
  }

  // Place Order button
  const placeBtn = document.getElementById('placeOrderBtn');
  if (placeBtn) {
    placeBtn.addEventListener('click', handlePlaceOrder);
  }
}

/**
 * handlePlaceOrder() – validates form and shows success screen.
 * In a real app, this would send data to a server.
 */
function handlePlaceOrder() {
  // Simple validation
  const required = ['firstName', 'lastName', 'emailAddr', 'phoneNum', 'address1', 'city', 'state', 'pinCode'];
  let valid = true;

  required.forEach(id => {
    const el = document.getElementById(id);
    if (el && !el.value.trim()) {
      el.classList.add('is-invalid');
      valid = false;
    } else if (el) {
      el.classList.remove('is-invalid');
    }
  });

  if (!valid) {
    showToast('⚠️ Please fill in all required fields.', 'danger');
    // Scroll to top so user sees the errors
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  // All good! Clear cart, show success
  saveCart([]);
  updateCartBadge();

  // Generate a random order number
  const orderNum = 'SW' + Date.now().toString().slice(-8).toUpperCase();
  document.getElementById('orderNumber').textContent = `#${orderNum}`;

  // Hide form, show success
  document.getElementById('checkoutForm').classList.add('d-none');
  document.getElementById('orderSuccess').classList.remove('d-none');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


/* =============================================
   SECTION 12: CONTACT PAGE
============================================= */

function initContactPage() {
  const sendBtn = document.getElementById('sendMessageBtn');
  if (!sendBtn) return;

  sendBtn.addEventListener('click', () => {
    const name    = document.getElementById('contactName')?.value.trim();
    const email   = document.getElementById('contactEmail')?.value.trim();
    const subject = document.getElementById('contactSubject')?.value;
    const message = document.getElementById('contactMessage')?.value.trim();

    if (!name || !email || !subject || !message) {
      showToast('⚠️ Please fill in all fields.', 'danger');
      return;
    }

    // Show success message
    document.getElementById('contactSuccess')?.classList.remove('d-none');
    // Clear form
    ['contactName','contactEmail','contactMessage'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    const subjectEl = document.getElementById('contactSubject');
    if (subjectEl) subjectEl.value = '';

    showToast('✅ Message sent successfully!');
  });
}


/* =============================================
   SECTION 13: NAVBAR SEARCH (all pages)
   When submitted, goes to products page with ?q=...
============================================= */

function initNavSearch() {
  const form = document.getElementById('navSearchForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = document.getElementById('navSearchInput')?.value.trim();
    if (q) window.location.href = `products.html?q=${encodeURIComponent(q)}`;
  });
}


/* =============================================
   SECTION 14: PAGE DETECTOR
   Figures out which page we're on and runs
   the right init function. This runs on every page.
============================================= */

document.addEventListener('DOMContentLoaded', () => {
  // Always run these on every page:
  updateCartBadge();
  initNavSearch();

  // Detect current page by checking for unique element IDs
  if (document.getElementById('featuredProducts'))   initHomePage();
  if (document.getElementById('productGrid'))        initProductsPage();
  if (document.getElementById('productDetailContent')) initProductDetailPage();
  if (document.getElementById('cartItemsList'))      initCartPage();
  if (document.getElementById('checkoutItems'))      initCheckoutPage();
  if (document.getElementById('sendMessageBtn'))     initContactPage();

  // Navbar scroll effect (adds shadow when page is scrolled)
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('mainNav');
    if (nav) {
      nav.style.boxShadow = window.scrollY > 10
        ? '0 2px 20px rgba(0,0,0,0.1)'
        : 'none';
    }
  });
});
