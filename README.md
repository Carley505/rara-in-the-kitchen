# RaRa In The Kitchen — Website & Ordering Portal

A single-page marketing and ordering site for **RaRa In The Kitchen** (bakery & patisserie) and **RARA École de Pâtisserie** (in Nyali, Mombasa).

## Features

- **Cozy & Upscale Aesthetic**: Noir background sections alternating with warm Cream counter sections, Blush pink CTAs, Gilt gold headings, custom SVG icing-swirl dividers, and Swahili coastal arch image framing.
- **Data-Driven Menu**: All menu items, prices, and categories are defined in `js/menu-data.js`.
- **Interactive Order Tray**: Multi-item cart with live total estimation and a single **"Send Order via WhatsApp"** button that generates a formatted message to `+254 753 111 111`.
- **Bolt Food Integration**: Surfaced in a disabled "coming soon" state with interactive toast/tooltip notifications.
- **RARA École de Pâtisserie**: Saturday bake classes & 3 monthly 5-week certificate courses with expandable curriculum accordions and single-click WhatsApp seat reservation.
- **Automated PDF Generator**: `create_menu_pdf.py` uses ReportLab to generate a matching branded PDF menu at `assets/menu/menu.pdf`.

---

## Repository Structure

```
rara-in-the-kitchen/
├── index.html                  # Main HTML structure
├── css/
│   └── styles.css              # Design system, tokens, responsive layout
├── js/
│   ├── menu-data.js            # Single source of truth for menu items & prices
│   └── main.js                 # Cart state, WhatsApp builders, accordions & UI wiring
├── assets/
│   ├── images/
│   │   ├── logo/               # Logo SVG and image assets
│   │   ├── gallery/            # Gallery grid photos
│   │   └── menu/               # Per-item menu photos
│   └── menu/
│       └── menu.pdf            # Downloadable menu PDF
├── create_menu_pdf.py          # Python script to regenerate menu.pdf
└── README.md                   # Documentation
```

---

## Local Development & Testing

No build step is required for the website itself.

1. **Serve locally**:
   ```bash
   python -m http.server 8000
   ```
2. Open `http://localhost:8000` in your web browser.

---

## Updating Menu Items or Prices

1. Open `js/menu-data.js`.
2. Add or update items in the `MENU_ITEMS` array.
3. Open `create_menu_pdf.py`, update `MENU_DATA` accordingly, and run:
   ```bash
   python create_menu_pdf.py
   ```

---

## Activating Bolt Food Ordering

When RaRa's Bolt Food listing goes live:
1. Open `js/main.js`.
2. Change `const BOLT_FOOD_URL = null;` to `const BOLT_FOOD_URL = "https://food.bolt.eu/...";`.
3. Save the file. The "Order on Bolt Food" buttons will automatically become active links!

---

## Deployment

Deployable as static files directly to:
- **GitHub Pages**: Push repository to GitHub and enable Pages in repository settings.
- **Netlify**: Drag and drop the repository folder or link GitHub repository.
- **Vercel**: Run `vercel` or link GitHub repository.
