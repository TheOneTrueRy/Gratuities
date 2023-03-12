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

  blocks: [
    {
      id: 'diamond',
      name: 'Diamond Ore',
      health: 0,
      value: 0,
      healthyPic: '',
      destroyedPic: '',
      backdrop: '',
      description: ''
    },
    {
      id: 'emerald',
      name: 'Emerald Ore',
      health: 0,
      value: 0,
      healthyPic: '',
      destroyedPic: '',
      backdrop: '',
      description: ''
    },
    {
      id: 'coal',
      name: 'Coal Ore',
      health: 0,
      value: 0,
      healthyPic: '',
      destroyedPic: '',
      backdrop: '',
      description: ''
    },
    {
      id: 'gold',
      name: 'Gold Ore',
      health: 0,
      value: 0,
      healthyPic: '',
      destroyedPic: '',
      backdrop: '',
      description: ''
    },
    {
      id: 'iron',
      name: 'Iron Ore',
      health: 0,
      value: 0,
      healthyPic: '',
      destroyedPic: '',
      backdrop: '',
      description: ''
    },
    {
      id: 'redstone',
      name: 'Redstone Ore',
      health: 0,
      value: 0,
      healthyPic: '',
      destroyedPic: '',
      backdrop: '',
      description: ''
    },
    {
      id: 'quartz',
      name: 'Quartz Ore',
      health: 0,
      value: 0,
      healthyPic: '',
      destroyedPic: '',
      backdrop: '',
      description: ''
    },
    {
      id: 'chest',
      name: 'Chest',
      health: 0,
      value: 0,
      healthyPic: '',
      destroyedPic: '',
      backdrop: '',
      description: '',
    },
    {
      id: 'mimic',
      name: 'Chest',
      health: 0,
      value: 0,
      healthyPic: '',
      destroyedPic: '',
      backdrops: '',
      description: ''
    },
  ],
  block: null,
})
