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

  reviews: [],

  QRCode: null,

  notifications: [],

  // Maybe just... don't worry about all this down here...
  blocks: [
    {
      id: 'diamond',
      name: 'Diamond Ore',
      health: 30,
      value: 100,
      healthyPic: 'https://gamepedia.cursecdn.com/minecraft_gamepedia/archive/b/b5/20180407134246!Diamond_Ore_JE3_BE3.png?version=402dac165ea4a57e35da165fc11a94d2',
      destroyedPic: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/a/ab/Diamond_JE3_BE3.png/revision/latest?cb=20200325185152',
      backdrop: '',
      description: "Whoa! Diamonds! Lucky you."
    },
    {
      id: 'emerald',
      name: 'Emerald Ore',
      health: 20,
      value: 60,
      healthyPic: 'https://gamepedia.cursecdn.com/minecraft_gamepedia/5/59/Emerald_Ore_JE2_BE2.png',
      destroyedPic: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/2/26/Emerald_JE3_BE3.png/revision/latest?cb=20191229174220',
      backdrop: '',
      description: "Those villagers will LOVE this."
    },
    {
      id: 'coal',
      name: 'Coal Ore',
      health: 5,
      value: 5,
      healthyPic: 'https://gamepedia.cursecdn.com/minecraft_gamepedia/d/d6/Coal_Ore_JE2_BE2.png',
      destroyedPic: 'https://ftbwiki.org/images/6/6f/Item_Coal.png',
      backdrop: '',
      description: "Well, ya gotta start somewhere."
    },
    {
      id: 'gold',
      name: 'Gold Ore',
      health: 15,
      value: 50,
      healthyPic: 'https://gamepedia.cursecdn.com/minecraft_gamepedia/b/b9/Gold_Ore_JE3_BE2.png',
      destroyedPic: 'https://static.wikia.nocookie.net/minecraft_gamepedia/images/8/8a/Gold_Ingot_JE4_BE2.png/revision/latest?cb=20200224211607',
      backdrop: '',
      description: "This would go great on top of a block of Obsidian..."
    },
    {
      id: 'iron',
      name: 'Iron Ore',
      health: 15,
      value: 30,
      healthyPic: 'https://gamepedia.cursecdn.com/minecraft_gamepedia/archive/0/0c/20180407134122!Iron_Ore_JE3.png?version=89871d88c66f7cec136d4db4a7306972',
      destroyedPic: 'https://gamepedia.cursecdn.com/minecraft_gamepedia/thumb/0/06/Iron_Ingot_JE2_BE2.png/150px-Iron_Ingot_JE2_BE2.png?version=7bb8ec30baf4eecb85665215913d62d6',
      backdrop: '',
      description: "Good ol' iron. Maybe you could build a friend?"
    },
    {
      id: 'redstone',
      name: 'Redstone Ore',
      health: 10,
      value: 20,
      healthyPic: 'https://gamepedia.cursecdn.com/minecraft_gamepedia/3/3e/Redstone_Ore_JE2_BE2.png',
      destroyedPic: 'https://vignette2.wikia.nocookie.net/magicobjectcruiser/images/e/e8/Redstone_asset._Png/revision/latest?cb=20140329181832',
      backdrop: '',
      description: "I guess it's worth something... to an engineer."
    },
    {
      id: 'quartz',
      name: 'Quartz Ore',
      health: 0,
      value: 0,
      healthyPic: 'https://vignette.wikia.nocookie.net/minecraft/images/3/39/Nether_Quartz_Ore.png/revision/latest?cb=20130118110604',
      destroyedPic: 'https://gamepedia.cursecdn.com/minecraft_gamepedia/6/64/Nether_Quartz_JE2_BE2.png',
      backdrop: '',
      description: 'A builder should pay big for this!'
    },
    {
      id: 'chest',
      name: 'Chest',
      health: 1,
      value: 50,
      healthyPic: 'https://gamepedia.cursecdn.com/minecraft_gamepedia/b/b3/Chest.png?version=227b3f51ef706a4ce4cf5e91f0e4face',
      destroyedPic: 'https://lh3.googleusercontent.com/eokhKRG0fFZE647P2OT44QMtzRz54cG3lxEAWz28HdLPGXLFirMZSHEbEoBPfOJK3fG6Rc8ktCWB9rznfo9KNQ=s400',
      backdrop: '',
      description: 'A chest!',
    },
    {
      id: 'mimic',
      name: 'Chest',
      health: 1,
      value: -100,
      healthyPic: 'https://gamepedia.cursecdn.com/minecraft_gamepedia/b/b3/Chest.png?version=227b3f51ef706a4ce4cf5e91f0e4face',
      destroyedPic: 'https://lh3.googleusercontent.com/jNmS7Gq2zRG3zJkpJtKa_fwl-IhvB0nzfyimSOTpjxh-lDzFRhO2bJltdp4SEPfagNM0hOTdQgkGtGofbpLXAg=s400',
      backdrops: '',
      description: 'Is that... a chest?'
    },
  ],
  block: null,
})
