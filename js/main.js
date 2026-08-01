/**
 * RaRa In The Kitchen — Main Application Logic
 * Shared across index.html (Bakery) and school.html (Academy)
 * Order Tray Cart, WhatsApp Generator, Accordions, Bolt Food Preview & UI Wiring
 */

// ── Global Constants ──
const PHONE_NUMBER = "254753111111";
const BOLT_FOOD_URL = null; // TODO: Replace with live URL when RaRa Bolt Food listing is published

// ── Cart State (In-Memory Only — resets on reload) ──
let cart = {};

// ── Boot ──
document.addEventListener('DOMContentLoaded', () => {
  // Shared across both pages
  initAccordions();
  initFaqAccordions();
  initBoltFoodButtons();
  initSchoolBookingButtons();
  initMobileNav();

  // Menu page only (index.html)
  if (document.getElementById('menu-grid')) {
    initMenuTabs();
    renderMenu('specials');
    initCartEvents();
  }
});

/* ==========================================================================
   1. Menu Rendering & Category Filtering  (index.html only)
   ========================================================================== */
let categoryExpandedState = {};

function initMenuTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      tabs.forEach(t => t.classList.remove('active'));
      e.target.classList.add('active');
      const cat = e.target.getAttribute('data-category');
      renderMenu(cat);
    });
  });

  window.addEventListener('resize', () => {
    const activeTab = document.querySelector('.tab-btn.active');
    if (activeTab) {
      renderMenu(activeTab.getAttribute('data-category'));
    }
  });
}

function renderMenu(categoryId, forceExpand = null) {
  const grid = document.getElementById('menu-grid');
  if (!grid) return;

  const items = categoryId === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter(item => item.category === categoryId);

  if (items.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;color:var(--whisper);padding:4rem;">No items found in this category.</div>';
    return;
  }

  if (forceExpand !== null) {
    categoryExpandedState[categoryId] = forceExpand;
  }
  const isMobile = window.innerWidth <= 768;
  const isExpanded = categoryExpandedState[categoryId] || false;
  const shouldLimit = isMobile && !isExpanded && items.length > 4;
  const visibleItems = shouldLimit ? items.slice(0, 4) : items;

  const cardsHtml = visibleItems.map(item => {
    const priceDisplay = item.price
      ? `KES ${item.price.toLocaleString()}`
      : 'Price on Order';

    const badgeHtml = item.badge
      ? `<span class="menu-card-badge">${item.badge}</span>`
      : '';

    const imageHtml = item.image
      ? `<div class="menu-card-img-wrapper"><img src="${item.image}" alt="${item.name}" loading="lazy" class="menu-card-img"></div>`
      : `<div class="menu-card-img-wrapper">
          <div class="menu-card-art">
            <span class="menu-card-art-seal">RaRa</span>
            <span class="menu-card-art-sub">${item.unit || 'Patisserie Special'}</span>
          </div>
         </div>`;

    return `
      <div class="menu-card" data-id="${item.id}">
        <div style="position:relative;">
          ${imageHtml}
          ${badgeHtml}
        </div>
        <div class="menu-card-body">
          <div class="menu-card-header">
            <h4 class="menu-card-title">${item.name}</h4>
            <span class="menu-card-price">${priceDisplay}</span>
          </div>
          <p class="menu-card-desc">${item.desc}</p>
          <div class="menu-card-footer">
            <span class="menu-unit-label">${item.unit || 'Per Unit'}</span>
            ${cart[item.id] ? `
              <div class="menu-card-stepper">
                <button class="qty-btn" onclick="updateItemQty('${item.id}', -1)" aria-label="Decrease quantity">−</button>
                <span class="qty-num">${cart[item.id].qty}</span>
                <button class="qty-btn" onclick="updateItemQty('${item.id}', 1)" aria-label="Increase quantity">+</button>
              </div>
            ` : `
              <button class="add-to-order-btn" onclick="addToCart('${item.id}')">
                <span>🛒 Add to Cart</span>
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  }).join('');

  let showMoreBtnHtml = '';
  if (isMobile && items.length > 4) {
    const remainingCount = items.length - 4;
    if (shouldLimit) {
      showMoreBtnHtml = `
        <div style="grid-column: 1 / -1; text-align: center; margin-top: 1rem; width: 100%;">
          <button class="btn btn-gilt show-more-menu-btn" style="width:100%; min-height:48px;" onclick="toggleCategoryExpand('${categoryId}', true)">
            <span>✨ Show More (${remainingCount} more items)</span>
          </button>
        </div>
      `;
    } else {
      showMoreBtnHtml = `
        <div style="grid-column: 1 / -1; text-align: center; margin-top: 1rem; width: 100%;">
          <button class="btn btn-gilt show-more-menu-btn" style="width:100%; min-height:48px;" onclick="toggleCategoryExpand('${categoryId}', false)">
            <span>⬆️ Show Less</span>
          </button>
        </div>
      `;
    }
  }

  grid.innerHTML = cardsHtml + showMoreBtnHtml;
}

function toggleCategoryExpand(categoryId, expand) {
  categoryExpandedState[categoryId] = expand;
  renderMenu(categoryId);
  if (!expand) {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  }
}

/* ==========================================================================
   2. Order Tray & Cart Management  (index.html only)
   ========================================================================== */
function addToCart(itemId) {
  const item = MENU_ITEMS.find(i => i.id === itemId);
  if (!item) return;

  if (cart[itemId]) {
    cart[itemId].qty += 1;
  } else {
    cart[itemId] = { item, qty: 1 };
  }
  updateCartUI();
  showToast(`Added <strong>${item.name}</strong> to your order tray.`);
}

function removeFromCart(itemId) {
  if (cart[itemId]) {
    delete cart[itemId];
    updateCartUI();
  }
}

function updateItemQty(itemId, delta) {
  if (cart[itemId]) {
    cart[itemId].qty += delta;
    if (cart[itemId].qty <= 0) delete cart[itemId];
    updateCartUI();
  }
}

function updateCartUI() {
  const trayBar      = document.getElementById('order-tray-bar');
  const countBadge   = document.getElementById('order-count-badge');
  const trayPrice    = document.getElementById('tray-total-price');
  const trayCount    = document.getElementById('tray-item-count');
  const cartList     = document.getElementById('cart-items-list');
  const drawerSub    = document.getElementById('drawer-subtotal-val');

  const entries    = Object.values(cart);
  const totalCount = entries.reduce((s, e) => s + e.qty, 0);

  if (trayBar) trayBar.classList.toggle('visible', totalCount > 0);
  if (totalCount === 0) closeOrderDrawer();
  if (countBadge) countBadge.textContent = totalCount;

  let totalPrice = 0, hasUnpriced = false;
  entries.forEach(e => {
    if (e.item.price) totalPrice += e.item.price * e.qty;
    else hasUnpriced = true;
  });

  if (trayPrice) {
    trayPrice.textContent = totalPrice > 0 ? `KES ${totalPrice.toLocaleString()}` : 'Custom Order';
  }
  if (trayCount) {
    trayCount.textContent = `${totalCount} ${totalCount === 1 ? 'item' : 'items'} in order`;
  }
  if (drawerSub) {
    drawerSub.textContent = totalPrice > 0 ? `KES ${totalPrice.toLocaleString()}` : 'To confirm';
  }

  // Drawer itemized list (Chef Royale style cards)
  if (cartList) {
    if (entries.length === 0) {
      cartList.innerHTML = '<li style="text-align:center;color:var(--whisper);padding:2.5rem 1rem;">Your order tray is empty.</li>';
    } else {
      cartList.innerHTML = entries.map(e => {
        const unitPrice = e.item.price ? `KES ${e.item.price.toLocaleString()} each` : 'Custom priced';
        const subtotal  = e.item.price ? `KES ${(e.item.price * e.qty).toLocaleString()}` : 'To confirm';
        const imgSrc    = e.item.image || 'assets/images/logo/logo.jpg';

        return `
          <li class="cart-item-card">
            <div class="cart-item-top">
              <img src="${imgSrc}" alt="${e.item.name}" class="cart-item-thumb">
              <div class="cart-item-details">
                <h6 class="cart-item-title">${e.item.name}</h6>
                <p class="cart-item-unit-price">${unitPrice}</p>
              </div>
              <button class="cart-item-remove-btn" onclick="removeFromCart('${e.item.id}')" title="Remove item" aria-label="Remove item">
                🗑️
              </button>
            </div>
            <div class="cart-item-bottom">
              <div class="menu-card-stepper cart-stepper">
                <button class="qty-btn" onclick="updateItemQty('${e.item.id}', -1)" aria-label="Decrease quantity">−</button>
                <span class="qty-num">${e.qty}</span>
                <button class="qty-btn" onclick="updateItemQty('${e.item.id}', 1)" aria-label="Increase quantity">+</button>
              </div>
              <div class="cart-item-subtotal">
                <span class="subtotal-label">Subtotal:</span>
                <strong class="subtotal-val">${subtotal}</strong>
              </div>
            </div>
          </li>`;
      }).join('');
    }
  }

  // Re-render menu card steppers synchronously
  if (typeof activeCategory !== 'undefined' && activeCategory) {
    const grid = document.getElementById('menu-grid');
    if (grid) renderMenu(activeCategory);
  }
}

function initCartEvents() {
  const sendBtn    = document.getElementById('send-order-wa-btn');
  const openBtn    = document.getElementById('view-tray-items-btn');
  const closeBtn   = document.getElementById('drawer-close-btn');
  const backdrop   = document.getElementById('order-modal-backdrop');

  if (sendBtn)  sendBtn.addEventListener('click', sendOrderToWhatsApp);
  if (openBtn)  openBtn.addEventListener('click', openOrderDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeOrderDrawer);
  if (backdrop) backdrop.addEventListener('click', closeOrderDrawer);
}

function openOrderDrawer() {
  document.getElementById('order-modal-backdrop')?.classList.add('open');
  document.getElementById('order-drawer')?.classList.add('open');
  lockMobileBodyScroll();
}

function closeOrderDrawer() {
  document.getElementById('order-modal-backdrop')?.classList.remove('open');
  document.getElementById('order-drawer')?.classList.remove('open');
  unlockMobileBodyScroll();
}

/* ==========================================================================
   3. WhatsApp Link Generators  (shared)
   ========================================================================== */
function waLink(message) {
  return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

function sendOrderToWhatsApp() {
  const entries = Object.values(cart);
  if (entries.length === 0) {
    showToast('Please add items to your order first.');
    return;
  }

  const lines = entries.map(e => {
    const p = e.item.price
      ? `(KES ${(e.item.price * e.qty).toLocaleString()})`
      : '(price to confirm)';
    return `• ${e.qty} x ${e.item.name} ${p}`;
  });

  let total = 0, hasUnpriced = false;
  entries.forEach(e => {
    if (e.item.price) total += e.item.price * e.qty;
    else hasUnpriced = true;
  });

  const totalStr = total > 0
    ? `Estimated Total: KES ${total.toLocaleString()}${hasUnpriced ? ' (plus custom priced items)' : ''}`
    : 'Total to be confirmed';

  const message = [
    'Hi RaRa In The Kitchen! 🍰',
    'I would like to place an order from your website:',
    '',
    ...lines,
    '',
    totalStr,
    '',
    'Please let me know availability and delivery/collection details. Thank you!'
  ].join('\n');

  window.open(waLink(message), '_blank', 'noopener');
}

function initSchoolBookingButtons() {
  document.querySelectorAll('.reserve-seat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const course = btn.getAttribute('data-course');
      const msg = `Hi RaRa! I'd like to reserve a seat for the bakery school class: ${course}. Please share available dates and registration details.`;
      window.open(waLink(msg), '_blank', 'noopener');
    });
  });
}

/* ==========================================================================
   4. Bolt Food Delivery Preview  (shared)
   ========================================================================== */
function initBoltFoodButtons() {
  document.querySelectorAll('.bolt-food-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      if (BOLT_FOOD_URL) {
        window.open(BOLT_FOOD_URL, '_blank', 'noopener');
      } else {
        showToast('⚡ Bolt Food ordering is coming soon — order via WhatsApp for now!');
      }
    });
  });
}

/* ==========================================================================
   5. Accordion Components  (shared)
   ========================================================================== */

/** Course curriculum accordions (school.html & legacy on index.html) */
function initAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const isOpen  = header.classList.contains('active');

      // Close siblings in the same card
      const card = header.closest('.course-card');
      if (card) {
        card.querySelectorAll('.accordion-header').forEach(h => {
          h.classList.remove('active');
          if (h.nextElementSibling) h.nextElementSibling.style.maxHeight = null;
        });
      }

      if (!isOpen) {
        header.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

/** FAQ accordions (school.html) */
function initFaqAccordions() {
  document.querySelectorAll('.faq-header').forEach(header => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;
      const isOpen  = header.classList.contains('active');

      // Close all other FAQs
      document.querySelectorAll('.faq-header').forEach(h => {
        h.classList.remove('active');
        if (h.nextElementSibling) h.nextElementSibling.style.maxHeight = null;
      });

      if (!isOpen) {
        header.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================================================
   6. UI Helpers  (shared)
   ========================================================================== */
function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>✨</span> <div>${message}</div>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

let globalSavedScrollY = 0;

function lockMobileBodyScroll() {
  globalSavedScrollY = window.scrollY || window.pageYOffset;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${globalSavedScrollY}px`;
  document.body.style.left = '0';
  document.body.style.right = '0';
  document.body.style.width = '100%';
  document.body.style.overflow = 'hidden';
}

function unlockMobileBodyScroll() {
  if (document.body.style.position === 'fixed') {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    document.body.style.overflow = '';
    window.scrollTo(0, globalSavedScrollY);
  }
}

function initMobileNav() {
  const toggle = document.getElementById('mobile-nav-toggle');
  const nav    = document.getElementById('nav-links');
  if (!toggle || !nav) return;

  // Create or get mobile nav backdrop
  let backdrop = document.getElementById('mobile-nav-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'mobile-nav-backdrop';
    backdrop.className = 'mobile-nav-backdrop';
    document.body.appendChild(backdrop);
  }

  function toggleMenu() {
    const isOpen = nav.classList.toggle('open');
    toggle.classList.toggle('active', isOpen);
    backdrop.classList.toggle('open', isOpen);
    if (isOpen) {
      lockMobileBodyScroll();
    } else {
      unlockMobileBodyScroll();
    }
  }

  function closeMenu() {
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
      toggle.classList.remove('active');
      backdrop.classList.remove('open');
      unlockMobileBodyScroll();
    }
  }

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  backdrop.addEventListener('click', closeMenu);
  backdrop.addEventListener('touchmove', (e) => {
    if (backdrop.classList.contains('open')) {
      e.preventDefault();
    }
  }, { passive: false });

  // Auto-close menu when any nav link is tapped
  nav.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  // Close when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      closeMenu();
    }
  });
}
