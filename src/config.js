// src/config.js

export const products = [
  {
    id: 1,
    name: "Monster Original",
    price: 99,
    flavor: "Original",
    type: "Classic",
    packSize: "Single can",
    description:
      "The classic, unmistakable flavor that started it all. A powerful punch of energy to fuel your hustle.",
    modelPath: `${process.env.PUBLIC_URL}/Products/monster_energy_drink.glb`,
    modelGlowColor: "#90EE90",
    scale: [0.3, 0.3, 0.3],
    position: [0.01, -0.6, 0.2],
    camera: [0, 0, 3],
  },
  {
    id: 2,
    name: "Cosmic Pink",
    price: 200,
    flavor: "Cosmic Pink",
    type: "Juice",
    packSize: "Single can",
    description:
      "A vibrant blend of exotic juices with a cosmic twist. Out of this world flavor and energy.",
    modelPath: `${process.env.PUBLIC_URL}/Products/pink.glb`,
    modelGlowColor: "#ff69b4",
    scale: 0.04,
    position: [0, -0.5, 0],
    camera: [0, 0, 3],
  },
  // ... copy all other products from your existing file

  {
    id: 1, name: 'Monster Original', price: 99, flavor: 'Original', type: 'Classic', packSize: 'Single can',
    description: 'The classic, unmistakable flavor that started it all. A powerful punch of energy to fuel your hustle.',
    modelPath: `${process.env.PUBLIC_URL}/Products/monster_energy_drink.glb`, modelGlowColor: '#90EE90', scale: [0.3, 0.3, 0.3], position: [0.01, -0.6, 0.2], camera: [0, 0, 3],
  },
  {
    id: 2, name: 'Cosmic Pink', price: 200, flavor: 'Cosmic Pink', type: 'Juice', packSize: 'Single can',
    description: 'A vibrant blend of exotic juices with a cosmic twist. Out of this world flavor and energy.',
    modelPath: `${process.env.PUBLIC_URL}/Products/pink.glb`, modelGlowColor: '#ff69b4', scale: 0.04, position: [0, -0.5, 0], camera: [0, 0, 3],
  },
  {
    id: 3, name: 'Ultra Sunrise', price: 299, flavor: 'Citrus', type: 'Ultra', packSize: 'Pack of 4',
    description: 'A refreshing citrus blend with zero sugar. The perfect way to start your day with a boost of energy.',
    modelPath: `${process.env.PUBLIC_URL}/Products/orange.glb`, modelGlowColor: '#ff8c00', scale: 8, position: [0, -0.6, 0], camera: [0, 0, 3],
  },
  {
    id: 4, name: 'Zero Ultra', price: 90, flavor: 'Zero Sugar', type: 'Ultra', packSize: 'Single can',
    description: 'Crisp, clean, and refreshing with zero sugar. All the energy without the calories.',
    modelPath: `${process.env.PUBLIC_URL}/Products/monster_zero_ultra.glb`, modelGlowColor: '#B0B0B0', scale: 0.34, position: [0, -0.5, 0], camera: [0, 0, 3],
  },
  {
    id: 5, name: 'Pallidum', price: 250, flavor: 'Cherry Web', type: 'Limited Edition', packSize: 'Single can',
    description: 'A limited edition flavor with a bold cherry taste. Unleash your inner hero.',
    modelPath: `${process.env.PUBLIC_URL}/Products/palladium_energy_drink.glb`, modelGlowColor: '#ff0000', scale: 0.1, position: [0, -0.6, 0], camera: [0, 0, 3],
  },
  {
    id: 6, name: 'Red Bull Classic', price: 110, flavor: 'Original', type: 'Classic', packSize: 'Single can',
    description: 'The iconic formula that gives you wings. The original and still the best.',
    modelPath: `${process.env.PUBLIC_URL}/Products/red_bull_energy_drink_can.glb`, modelGlowColor: '#ff1493', scale: 15.4, position: [0.08, -0.2, 0], camera: [0, 0, 4.5],
  },
  {
    id: 7, name: 'LIT Energy', price: 300, flavor: 'Classic Surge', type: 'Performance', packSize: 'Pack of 12',
    description: 'Engineered for peak performance. A smooth, sustained energy boost with zero crash.',
    modelPath: `${process.env.PUBLIC_URL}/Products/lit.glb`, modelGlowColor: '#00d8ff', scale: 0.8, position: [0, -0.7, 0], camera: [0, 0, 3],
  },
  {
    id: 8, name: 'Black Monster', price: 220, flavor: 'Original', type: 'Classic', packSize: 'Single can',
    description: 'The same great Monster taste in a sleek, black can. Unleash the beast.',
    modelPath: `${process.env.PUBLIC_URL}/Products/black_monster_energy_drink.glb`, modelGlowColor: '#50C878', scale: 6.35, position: [0, 0.01, 0], camera: [0, 0, 3],
  },
  {
    id: 9, name: 'Guoba Chili', price: 180, flavor: 'Spicy Chili', type: 'Exotic', packSize: 'Single can',
    description: 'A fiery blend of chili and spices for a unique energy experience. Feel the heat.',
    modelPath: `${process.env.PUBLIC_URL}/Products/guoba_chili_energy_drink.glb`, modelGlowColor: '#D22B2B', scale: 0.35, position: [0, -0.7, 0], camera: [0, 0, 3],
  },
  {
    id: 10, name: 'Kendu Energy', price: 160, flavor: 'Tropical Punch', type: 'Classic', packSize: 'Single can',
    description: 'A refreshing tropical punch flavor that transports you to paradise with every sip.',
    modelPath: `${process.env.PUBLIC_URL}/Products/kendu_energy_drink_can.glb`, modelGlowColor: '#32CD32', scale: 1.6, position: [0, -0.7, 0], camera: [0, 0, 3],
  },
  {
    id: 11, name: 'Palladium Energy', price: 270, flavor: 'Silver Rush', type: 'Premium', packSize: 'Single can',
    description: 'A premium energy drink with a smooth, silver rush flavor for the discerning palate.',
    modelPath: `${process.env.PUBLIC_URL}/Products/palladium_energy_drink.glb`, modelGlowColor: '#C0C0C0', scale: 0.08, position: [0, -0.6, 0], camera: [0, 0, 3],
  },
  {
    id: 12, name: 'Energy 500ml', price: 130, flavor: 'Classic Boost', type: 'Classic', packSize: '500ml can',
    description: 'More of the classic boost you love. The perfect size for when you need extra energy.',
    modelPath: `${process.env.PUBLIC_URL}/Products/energy_drink_500ml.glb`, modelGlowColor: '#FFD700', scale: 8.2, position: [0, -0.7, 0], camera: [0, 0, 3],
  },
  {
    id: 13, name: 'Game Ready', price: 199, flavor: 'Gaming Fuel', type: 'Performance', packSize: 'Single can',
    description: 'Formulated for gamers. Enhance your focus and reaction time for peak gaming performance.',
    modelPath: `${process.env.PUBLIC_URL}/Products/energy_drink_game_ready_model.glb`, modelGlowColor: '#00FF7F', scale: 0.06, position: [0, -0.8, 0], camera: [0, 0, 3],
  },
  {
    id: 14, name: 'Gla Energy', price: 175, flavor: 'Berry Frost', type: 'Cool Series', packSize: 'Single can',
    description: 'A cool and refreshing berry frost flavor that provides a smooth, icy energy boost.',
    modelPath: `${process.env.PUBLIC_URL}/Products/gla.glb`, modelGlowColor: '#1E90FF', scale: 7.25, position: [0, -0.6, 0], camera: [0, 0, 3],
  },
  {
    id: 15, name: 'Energy Classic', price: 100, flavor: 'Classic', type: 'Standard', packSize: 'Single can',
    description: 'The standard for energy. A simple, no-frills energy drink for everyday use.',
    modelPath: `${process.env.PUBLIC_URL}/Products/energy_drink.glb`, modelGlowColor: '#FFFF00', scale: 0.15, position: [0, -0.6, 0], camera: [0, 0, 3],
  },
];

export const flavors = [
  "Original",
  "Cosmic Pink",
  "Citrus",
  "Zero Sugar",
  "Cherry Web",
  "Classic Surge",
  "Spicy Chili",
  "Tropical Punch",
  "Silver Rush",
  "Classic Boost",
  "Gaming Fuel",
  "Berry Frost",
  "Classic",
];

export const types = [
  "Classic",
  "Juice",
  "Ultra",
  "Limited Edition",
  "Performance",
  "Exotic",
  "Premium",
  "Cool Series",
  "Standard",
];

export const packSizes = [
  "Single can",
  "Pack of 4",
  "Pack of 12",
  "500ml can",
];

export const priceRanges = [
  { label: "₹50-₹99", min: 50, max: 99 },
  { label: "₹100-₹199", min: 100, max: 199 },
  { label: "₹200-₹299", min: 200, max: 299 },
  { label: "₹300+", min: 300, max: Infinity },
];

export const PRODUCTS_PER_PAGE = 8;
