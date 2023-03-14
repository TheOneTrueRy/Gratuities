import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  businesses: [],
  business: null,
  businessRating: null,

  profiles: [],
  profile: null,
  searchType: 'profiles',

  tipType: 'received',
  receivedTips: [],
  givenTips: [],
  highestTipEver: null,
  highestTipMonth: null,
  availableToPayout: null,
  highestTipEverGiven: null,
  employees: [],

  reviews: [],
  myReviews: [],
  reviewSearchType: 'date',

  QRCode: null,

  notifications: [],

  // Maybe just... don't worry about all this down here...
  blocks: [
    {
      id: 'diamond',
      name: 'Diamond Ore',
      health: 30,
      maxHealth: 30,
      value: 100,
      healthyPic: 'diamond-ore.webp',
      destroyedPic: 'diamond.webp',
      backdrop: 'diamond-bg.png',
      description: "Whoa! Diamonds! Lucky you."
    },
    {
      id: 'emerald',
      name: 'Emerald Ore',
      health: 20,
      maxHealth: 20,
      value: 60,
      healthyPic: 'emerald-ore.webp',
      destroyedPic: 'emerald.webp',
      backdrop: 'emerald-bg.png',
      description: "Those villagers will LOVE this."
    },
    {
      id: 'coal',
      name: 'Coal Ore',
      health: 5,
      maxHealth: 5,
      value: 5,
      healthyPic: 'coal-ore.webp',
      destroyedPic: 'coal.webp',
      backdrop: 'coal-bg.png',
      description: "Well, ya gotta start somewhere."
    },
    {
      id: 'gold',
      name: 'Gold Ore',
      health: 15,
      maxHealth: 15,
      value: 50,
      healthyPic: 'gold-ore.webp',
      destroyedPic: 'gold-ingot.webp',
      backdrop: 'gold-bg.png',
      description: "This would go great on top of a block of Obsidian..."
    },
    {
      id: 'iron',
      name: 'Iron Ore',
      health: 15,
      maxHealth: 15,
      value: 30,
      healthyPic: 'iron-ore.webp',
      destroyedPic: 'iron-ingot.webp',
      backdrop: 'iron-bg.png',
      description: "Good ol' iron. Maybe you could build a friend?"
    },
    {
      id: 'redstone',
      name: 'Redstone Ore',
      health: 10,
      maxHealth: 10,
      value: 20,
      healthyPic: 'redstone-ore.webp',
      destroyedPic: 'redstone-dust.webp',
      backdrop: 'redstone-bg.png',
      description: "I guess it's worth something... to an engineer."
    },
    {
      id: 'quartz',
      name: 'Nether Quartz Ore',
      health: 25,
      maxHealth: 25,
      value: 60,
      healthyPic: 'quartz-ore.webp',
      destroyedPic: 'nether-quartz.webp',
      backdrop: 'quartz-bg.png',
      description: 'A builder should pay big for this!'
    },
    {
      id: 'chest',
      name: 'Chest',
      health: 1,
      maxHealth: 1,
      value: 50,
      healthyPic: 'chest.png',
      destroyedPic: 'chest-opened.png',
      backdrop: 'chest-bg.png',
      description: 'A chest!',
    },
    {
      id: 'mimic',
      name: 'Chest',
      health: 1,
      maxHealth: 1,
      value: 100,
      healthyPic: 'chest.png',
      destroyedPic: 'mimic.png',
      backdrop: 'chest-bg.png',
      description: 'Is that... a chest?'
    },
  ],
  block: null,
})
