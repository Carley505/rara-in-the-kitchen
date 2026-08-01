/**
 * RaRa In The Kitchen — Menu Data Model
 * Single Source of Truth for Menu Items, Images & Prices
 */

const MENU_CATEGORIES = [
  { id: 'specials', name: 'Specials', label: 'Couture & Custom Cakes' },
  { id: 'cakes-1kg', name: '1kg Cakes', label: 'Artisanal Layer Cakes' },
  { id: 'cupcakes', name: 'Cupcakes', label: '12 pcs per box' },
  { id: 'cookies-treats', name: 'Treats', label: 'Brownies, Shots & Cheesecakes' }
];

const MENU_ITEMS = [
  // --- SPECIALS ---
  {
    id: 'special-executive-chocolate',
    category: 'specials',
    name: 'Executive Chocolate Cake',
    price: 5500,
    unit: 'Custom Size',
    desc: 'Luxurious multi-layer dark chocolate cake decorated with hand-crafted chocolate shards and metallic accents.',
    badge: 'Popular',
    image: 'assets/images/menu/chocolate-fudge-cake.jpg'
  },
  {
    id: 'special-executive-vanilla',
    category: 'specials',
    name: 'Executive Vanilla Cake',
    price: 5200,
    unit: 'Custom Size',
    desc: 'Refined vanilla bean sponge enveloped in silky white buttercream and gold leaf detailing.',
    image: 'assets/images/menu/executive-vanilla-cake.jpg'
  },
  {
    id: 'special-edible-picture-chocolate',
    category: 'specials',
    name: 'Edible Picture Chocolate Cake',
    price: 4800,
    unit: 'Custom Size',
    desc: 'Customized high-definition edible photo print on rich chocolate sponge layered with ganache.',
    image: 'assets/images/menu/edible-picture-chocolate-cake.jpg'
  },
  {
    id: 'special-edible-picture-vanilla',
    category: 'specials',
    name: 'Edible Picture Vanilla Cake',
    price: 4500,
    unit: 'Custom Size',
    desc: 'Personalized edible print on light vanilla sponge with fluffy whipped buttercream.',
    image: 'assets/images/menu/edible -picture-vanilla-cake.jpg'
  },
  {
    id: 'special-floral-couture-chocolate',
    category: 'specials',
    name: 'Floral Couture Chocolate',
    price: 6200,
    unit: 'Custom Size',
    desc: 'Decadent chocolate cake topped with handcrafted buttercream flowers and fresh edible blossoms.',
    badge: 'Couture',
    image: 'assets/images/menu/floral-couture-chocolate.jpg'
  },
  {
    id: 'special-floral-couture-vanilla',
    category: 'specials',
    name: 'Floral Couture Vanilla',
    price: 5800,
    unit: 'Custom Size',
    desc: 'Elegant vanilla cake adorned with custom floral piping work in blush and cream tones.',
    badge: 'Couture',
    image: 'assets/images/menu/floral-couture-vanilla.jpg'
  },
  {
    id: 'special-ferrero',
    category: 'specials',
    name: 'Ferrero Rocher Deluxe Cake',
    price: 6800,
    unit: 'Custom Size',
    desc: 'Hazelnut chocolate cake loaded with crushed Ferrero Rocher, Nutella cream, and roasted hazelnut crunch.',
    badge: 'Bestseller',
    image: 'assets/images/menu/ferrero-rocher-deluxe-cake.jpeg'
  },
  {
    id: 'special-nutella',
    category: 'specials',
    name: 'Nutella Supreme Cake',
    price: 6500,
    unit: 'Custom Size',
    desc: 'Rich cocoa layers filled with smooth Italian Nutella and velvety chocolate buttercream.',
    image: 'assets/images/menu/nutella-supreme-cake.jpeg'
  },
  {
    id: 'special-half-half',
    category: 'specials',
    name: 'Half & Half Signature',
    price: 5900,
    unit: 'Custom Size',
    desc: 'Can’t decide? Get half Signature Chocolate and half Signature Vanilla in one stunning showpiece.',
    image: 'assets/images/menu/half_&_half_signature.jpeg'
  },
  {
    id: 'special-chocolate-attack',
    category: 'specials',
    name: 'Chocolate Attack Cake',
    price: 6400,
    unit: 'Custom Size',
    desc: 'An explosion of cocoa nibs, dark chocolate drips, truffles, and chocolate curls.',
    image: 'assets/images/menu/chocolate-attack-cake.jpeg'
  },
  {
    id: 'special-nutella-overload',
    category: 'specials',
    name: 'Nutella Overload Cake',
    price: 6700,
    unit: 'Custom Size',
    desc: 'Gooey Nutella core, Nutella buttercream, and cascading chocolate drips.',
    image: 'assets/images/menu/nutella-overload-cake.jpeg'
  },
  {
    id: 'special-kitkat-galore',
    category: 'specials',
    name: 'KitKat Galore Cake',
    price: 6200,
    unit: 'Custom Size',
    desc: 'Encased in crisp KitKat fingers and topped with chocolate candies and ganache.',
    image: 'assets/images/menu/kitKat_galore_cake.jpeg'
  },
  {
    id: 'special-mega-chocolate-attack',
    category: 'specials',
    name: 'Mega Chocolate Attack',
    price: 7800,
    unit: 'Custom Size',
    desc: 'Ultimate showstopper stacked with truffles, brownies, KitKats, and dark ganache drips.',
    badge: 'Showstopper',
    image: 'assets/images/menu/mega-chocolate-attack.jpg'
  },
  {
    id: 'special-choice-overload-beast',
    category: 'specials',
    name: 'Choice Overload Beast',
    price: 8500,
    unit: 'Custom Size',
    desc: 'Custom multi-topping extravaganza featuring chocolates, berries, cookies, and custom piping.',
    image: 'assets/images/menu/choice_overload_beast.jpg'
  },

  // --- 1KG CAKES ---
  {
    id: 'cake-signature-chocolate',
    category: 'cakes-1kg',
    name: 'Signature Chocolate Cake',
    price: 2500,
    unit: '1 kg',
    desc: "RITK's classic — rich, moist chocolate layers with silky chocolate buttercream.",
    badge: 'Bestseller',
    image: 'assets/images/menu/signature-chocolate-cake.jpg'
  },
  {
    id: 'cake-signature-vanilla',
    category: 'cakes-1kg',
    name: 'Signature Vanilla Cake',
    price: 2900,
    unit: '1 kg',
    desc: 'Light and airy vanilla bean sponge with smooth Madagascar vanilla buttercream.',
    badge: 'Favorite',
    image: 'assets/images/menu/signature-vanilla-cake.jpeg'
  },
  {
    id: 'cake-red-velvet-cream-cheese',
    category: 'cakes-1kg',
    name: 'Red Velvet & Cream Cheese',
    price: 3700,
    unit: '1 kg',
    desc: 'Deep crimson cocoa sponge layered with authentic, tangy cream cheese frosting.',
    badge: 'Must Try',
    image: 'assets/images/menu/red-velvet-&-ream-cheese.jpg'
  },
  {
    id: 'cake-fresh-fruit',
    category: 'cakes-1kg',
    name: 'Fresh Fruit Cake',
    price: 4600,
    unit: '1 kg',
    desc: 'Delicate sponge frosted in light whipped cream, topped lavishly with fresh strawberries & mixed fruits.',
    badge: 'Fresh Daily',
    image: 'assets/images/menu/very-berry-cake.jpg'
  },
  {
    id: 'cake-mango-cream',
    category: 'cakes-1kg',
    name: 'Mango & Cream Cake',
    price: 3500,
    unit: '1 kg',
    desc: 'Fluffy sponge layered with fresh Mombasa sweet mango slices and silky vanilla cream.',
    badge: 'Seasonal',
    image: 'assets/images/menu/mango-and-cream-cake.jpg'
  },
  {
    id: 'cake-oreo-white',
    category: 'cakes-1kg',
    name: 'Oreo Cake (White Base)',
    price: 3200,
    unit: '1 kg',
    desc: 'Vanilla buttercream dotted with crushed Oreo cookies and whole biscuit toppers.',
    image: 'assets/images/menu/oreo-cake-(White Base).jpg'
  },
  {
    id: 'cake-oreo-black',
    category: 'cakes-1kg',
    name: 'Oreo Cake (Black Base)',
    price: 3400,
    unit: '1 kg',
    desc: 'Rich chocolate sponge layered with Oreo cookies and cream frosting.',
    image: 'assets/images/menu/oreo-cake-(Black Base).jpg'
  },
  {
    id: 'cake-very-berry',
    category: 'cakes-1kg',
    name: 'Very Berry Cake',
    price: 3800,
    unit: '1 kg',
    desc: 'Infused with berry compote, berry cream, and fresh blueberry & raspberry accents.',
    image: 'assets/images/menu/very-berry-cake.jpg'
  },
  {
    id: 'cake-strawberry-cream-sponge',
    category: 'cakes-1kg',
    name: 'Strawberry & Cream Sponge',
    price: 3600,
    unit: '1 kg',
    desc: 'Classic British-style Victoria sponge layered with fresh strawberries and whipped cream.',
    image: 'assets/images/menu/strawberry-&-cream-sponge.jpg'
  },
  {
    id: 'cake-lemon-meringue',
    category: 'cakes-1kg',
    name: 'Lemon Meringue Cake',
    price: 3300,
    unit: '1 kg',
    desc: 'Zesty lemon curd filling topped with toasted swiss meringue peaks.',
    image: 'assets/images/menu/lemon-meringue-cake.jpg'
  },
  {
    id: 'cake-black-forest',
    category: 'cakes-1kg',
    name: 'Black Forest Cake',
    price: 3200,
    unit: '1 kg',
    desc: 'Traditional chocolate sponge with sour cherries, kirsch essence, and whipped cream.',
    image: 'assets/images/menu/black-forest-cake.jpg'
  },
  {
    id: 'cake-white-forest',
    category: 'cakes-1kg',
    name: 'White Forest Cake',
    price: 3200,
    unit: '1 kg',
    desc: 'Vanilla sponge layered with white chocolate shavings, cherries, and fluffy cream.',
    image: 'assets/images/menu/white-forest-cake.jpg'
  },
  {
    id: 'cake-lotus',
    category: 'cakes-1kg',
    name: 'Lotus Biscoff Cake',
    price: 4200,
    unit: '1 kg',
    desc: 'Caramelized speculoos cookie butter frosting, lotus cookie crumble, and biscoff drip.',
    image: 'assets/images/menu/lotus-biscoff-cake.jpg'
  },
  {
    id: 'cake-chocolate-fudge',
    category: 'cakes-1kg',
    name: 'Chocolate Fudge Cake',
    price: 3500,
    unit: '1 kg',
    desc: 'Ultra dense, fudgy chocolate cake covered in warm fudge frosting.',
    image: 'assets/images/menu/chocolate-fudge-cake.jpg'
  },
  {
    id: 'cake-vanilla-dream',
    category: 'cakes-1kg',
    name: 'Vanilla Dream Cake',
    price: 3100,
    unit: '1 kg',
    desc: 'Dreamy vanilla sponge with white chocolate mousse filling and pastel frosting.',
    image: 'assets/images/menu/vanilla-ream-cake.jpg'
  },
  {
    id: 'cake-chocolate-dream',
    category: 'cakes-1kg',
    name: 'Chocolate Dream Cake',
    price: 3600,
    unit: '1 kg',
    desc: 'Silky dark chocolate mousse layers encased in chocolate mirror glaze.',
    image: 'assets/images/menu/chocolate-dream-cake.jpg'
  },
  {
    id: 'cake-coffee',
    category: 'cakes-1kg',
    name: 'Coffee Espresso Cake',
    price: 3400,
    unit: '1 kg',
    desc: 'Espresso-infused sponge with velvety coffee buttercream and chocolate cocoa dusting.',
    image: 'assets/images/menu/coffee-espresso-cake.jpg'
  },
  {
    id: 'cake-salted-caramel',
    category: 'cakes-1kg',
    name: 'Salted Caramel Cake',
    price: 3500,
    unit: '1 kg',
    desc: 'Butterscotch sponge drizzled with house-made salted caramel and sea salt flakes.',
    image: 'assets/images/menu/salted-caramel-cake.jpg'
  },
  {
    id: 'cake-banana-bread',
    category: 'cakes-1kg',
    name: 'Artisanal Banana Bread Cake',
    price: 2800,
    unit: '1 kg',
    desc: 'Moist spiced banana loaf with roasted walnuts and dark chocolate chips.',
    image: 'assets/images/menu/artisanal-banana-bread-cake.jpg'
  },
  {
    id: 'cake-tea-time',
    category: 'cakes-1kg',
    name: 'Classic Tea-Time Cake',
    price: 2400,
    unit: '1 kg',
    desc: 'Simple, delicate butter sponge baked to perfection for high tea pairing.',
    image: 'assets/images/menu/classic-tea-time-cake.jpg'
  },

  // --- CUPCAKES ---
  {
    id: 'cupcake-signature-vanilla',
    category: 'cupcakes',
    name: 'Signature Vanilla Cupcakes',
    price: 1900,
    unit: '12 pcs/box',
    desc: 'Soft, fluffy vanilla cupcakes topped with silky piped vanilla buttercream.',
    badge: 'Bestseller',
    image: 'assets/images/menu/signature-vanilla-cupcakes.jpg'
  },
  {
    id: 'cupcake-signature-chocolate',
    category: 'cupcakes',
    name: 'Signature Chocolate Cupcakes',
    price: 2100,
    unit: '12 pcs/box',
    desc: 'Moist cocoa cupcakes topped with rich chocolate swirl frosting.',
    image: 'assets/images/menu/signature-chocolate-cupcakes.jpg'
  },
  {
    id: 'cupcake-lotus',
    category: 'cupcakes',
    name: 'Lotus Biscoff Cupcakes',
    price: 2800,
    unit: '12 pcs/box',
    desc: 'Biscoff-infused cupcakes topped with lotus cookie butter swirl and biscoff biscuit.',
    image: 'assets/images/menu/lotus-biscoff-cupcakes.jpg'
  },
  {
    id: 'cupcake-marble',
    category: 'cupcakes',
    name: 'Marble Twist Cupcakes',
    price: 2200,
    unit: '12 pcs/box',
    desc: 'Swirled chocolate & vanilla batter with dual-tone piped buttercream.',
    image: 'assets/images/menu/marble-twist-cupcakes.jpg'
  },
  {
    id: 'cupcake-oreo-white',
    category: 'cupcakes',
    name: 'Oreo Cupcakes (White Base)',
    price: 2400,
    unit: '12 pcs/box',
    desc: 'Vanilla cupcake baked with cookie pieces and cookies-and-cream icing.',
    image: 'assets/images/menu/oreo-cupcakes-(White Base).jpg'
  },
  {
    id: 'cupcake-oreo-black',
    category: 'cupcakes',
    name: 'Oreo Cupcakes (Black Base)',
    price: 2400,
    unit: '12 pcs/box',
    desc: 'Chocolate base with Oreo cream frosting and mini Oreo cookie toppers.',
    image: 'assets/images/menu/oreo-cupcakes-(Black Base).jpg'
  },
  {
    id: 'cupcake-berry-goodness',
    category: 'cupcakes',
    name: 'Berry Goodness Cupcakes',
    price: 2500,
    unit: '12 pcs/box',
    desc: 'Vanilla sponge stuffed with berry compote and topped with strawberry frosting.',
    image: 'assets/images/menu/berry-goodness-cupcakes.jpg'
  },
  {
    id: 'cupcake-couture-vanilla',
    category: 'cupcakes',
    name: 'Couture Vanilla Cupcakes',
    price: 3200,
    unit: '12 pcs/box',
    desc: 'Intricately piped floral buttercream cupcakes with gold leaf accents.',
    badge: 'Couture',
    image: 'assets/images/menu/couture-vanilla-cupcakes.jpg'
  },
  {
    id: 'cupcake-couture-chocolate',
    category: 'cupcakes',
    name: 'Couture Chocolate Cupcakes',
    price: 3200,
    unit: '12 pcs/box',
    desc: 'Artisanal piped floral chocolate buttercream decorated with chocolate pearls.',
    badge: 'Couture',
    image: 'assets/images/menu/couture-chocolate-cupcakes.jpg'
  },
  {
    id: 'cupcake-lemon-meringue',
    category: 'cupcakes',
    name: 'Lemon Meringue Cupcakes',
    price: 2600,
    unit: '12 pcs/box',
    desc: 'Lemon sponge filled with tangy lemon curd, finished with toasted meringue.',
    image: 'assets/images/menu/lemon-meringue-cupcakes.jpg'
  },
  {
    id: 'cupcake-red-velvet',
    category: 'cupcakes',
    name: 'Red Velvet Cupcakes',
    price: 2700,
    unit: '12 pcs/box',
    desc: 'Crimson cocoa cupcakes piped with signature tangy cream cheese frosting.',
    image: 'assets/images/menu/red-velvet-cupcakes.jpg'
  },
  {
    id: 'cupcake-celebration',
    category: 'cupcakes',
    name: 'Celebration Sprinkles Cupcakes',
    price: 2400,
    unit: '12 pcs/box',
    desc: 'Funfetti vanilla cupcakes topped with festive rainbow sprinkles and pink buttercream.',
    image: 'assets/images/menu/celebration-sprinkles-cupcakes.jpg'
  },
  {
    id: 'cupcake-customized',
    category: 'cupcakes',
    name: 'Customized Fondant Cupcakes',
    price: 3500,
    unit: '12 pcs/box',
    desc: 'Handcrafted custom fondant toppers personalized for birthdays, showers, and events.',
    image: 'assets/images/menu/customized-fondant-cupcakes.jpg'
  },

  // --- COOKIES, TREATS & SHOTS ---
  {
    id: 'treat-chocolate-dipped-cookies',
    category: 'cookies-treats',
    name: 'Chocolate-Dipped Cookies',
    price: 1200,
    unit: 'Per Box',
    desc: 'Crisp butter cookies half-dipped in premium Belgian dark chocolate.',
    image: 'assets/images/menu/chocolate-dipped-cookies.jpg'
  },
  {
    id: 'treat-chocolate-chip-cookies',
    category: 'cookies-treats',
    name: 'Chocolate Chip Cookies',
    price: 1000,
    unit: 'Per Box',
    desc: 'Chewy bakery-style cookies loaded with semi-sweet chocolate chips.',
    image: 'assets/images/menu/chocolate-chip-cookies.jpg'
  },
  {
    id: 'treat-white-chocolate-chip',
    category: 'cookies-treats',
    name: 'White Chocolate Chip Cookies',
    price: 1100,
    unit: 'Per Box',
    desc: 'Golden cookies baked with creamy white chocolate chunks.',
    image: 'assets/images/menu/white-chocolate-chip-cookies.jpg'
  },
  {
    id: 'treat-red-velvet-cookies',
    category: 'cookies-treats',
    name: 'Red Velvet Cookies',
    price: 1300,
    unit: 'Per Box',
    desc: 'Soft crimson cookies filled with white chocolate chips.',
    image: 'assets/images/menu/red-velvet-cookies.jpg'
  },
  {
    id: 'treat-lotus-cookies',
    category: 'cookies-treats',
    name: 'Lotus Biscoff Cookies',
    price: 1500,
    unit: 'Per Box',
    desc: 'Speculoos spiced cookies stuffed with gooey biscoff spread.',
    image: 'assets/images/menu/lotus-biscoff-cookies.jpg'
  },
  {
    id: 'treat-customized-cookies',
    category: 'cookies-treats',
    name: 'Customized Fondant Cookies',
    price: 2200,
    unit: 'Per Box',
    desc: 'Decorated sugar cookies custom-printed or hand-piped for special events.',
    image: 'assets/images/menu/customized-fondant-cookies.jpg'
  },
  {
    id: 'treat-ooey-gooey-brownies',
    category: 'cookies-treats',
    name: 'Ooey Gooey Brownies',
    price: 1800,
    unit: 'Per Box',
    desc: 'Fudgy dark chocolate brownies with crinkly tops and molten centers.',
    badge: 'Popular',
    image: 'assets/images/menu/ooey-gooey-brownies.jpg'
  },
  {
    id: 'treat-cocoa-bombs',
    category: 'cookies-treats',
    name: 'Artisanal Cocoa Bombs',
    price: 1600,
    unit: '4 pcs/box',
    desc: 'Chocolate spheres filled with hot cocoa mix and mini marshmallows.',
    image: 'assets/images/menu/artisanal-cocoa-bombs.jpg'
  },
  {
    id: 'treat-eclairs',
    category: 'cookies-treats',
    name: 'French Choux Éclairs',
    price: 2000,
    unit: 'Per Box',
    desc: 'Choux pastry filled with vanilla bean pastry cream and glossy chocolate glaze.',
    badge: 'French Patisserie',
    image: 'assets/images/menu/french-choux-eclairs.jpg'
  },
  {
    id: 'treat-choco-loco',
    category: 'cookies-treats',
    name: 'Choco Loco Bars',
    price: 1700,
    unit: 'Per Box',
    desc: 'Decadent multi-layered chocolate confection with biscuit crunch and ganache.',
    image: 'assets/images/menu/choco-loco-bars.jpg'
  },
  {
    id: 'treat-customized-cake-pops',
    category: 'cookies-treats',
    name: 'Customized Cake Pops',
    price: 2400,
    unit: '12 pcs/box',
    desc: 'Truffle-like cake pops dipped in chocolate and custom decorated on sticks.',
    image: 'assets/images/menu/customized-cake-pops.jpg'
  },
  {
    id: 'treat-dessert-shots',
    category: 'cookies-treats',
    name: 'Gourmet Dessert Shots',
    price: 3200,
    unit: '18 pcs/box',
    desc: 'Miniature shot glasses layering mousse, cheesecake, berry compote, and crumbles.',
    badge: 'Event Favorite',
    image: 'assets/images/menu/gourmet-dessert-shots.jpg'
  },
  {
    id: 'treat-lotus-cheesecake',
    category: 'cookies-treats',
    name: 'Lotus Biscoff Cheesecake',
    price: 4500,
    unit: 'Whole Cake / Slice',
    desc: 'Creamy unbaked cheesecake on a biscoff crust topped with melted lotus spread.',
    image: 'assets/images/menu/lotus-biscoff-cheesecake.jpg'
  },
  {
    id: 'treat-berry-cheesecake',
    category: 'cookies-treats',
    name: 'Berry Swirl Cheesecake',
    price: 4200,
    unit: 'Whole Cake / Slice',
    desc: 'Rich baked cheesecake swirled with natural blueberry and raspberry reduction.',
    image: 'assets/images/menu/berry-swirl-cheesecake.jpg'
  },
  {
    id: 'treat-ferrero-nutella-cheesecake',
    category: 'cookies-treats',
    name: 'Ferrero / Nutella Cheesecake',
    price: 4800,
    unit: 'Whole Cake / Slice',
    desc: 'Decadent hazelnut cheesecake with Nutella swirl and crushed Ferrero topping.',
    image: 'assets/images/menu/ferrero-nutella-cheesecake.jpg'
  }
];
