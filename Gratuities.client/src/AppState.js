import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},

  businesses: [],
  business: null,

  profiles: [],
  profile: null,
  searchType: 'profiles',

  tipType: 'received',
  receivedTips: [],
  givenTips: [],

  reviews: [],

  QRCode: null
})
