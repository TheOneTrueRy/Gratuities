<template>
  <header class="sticky-top">
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer>
  </footer>
</template>

<script>
import { computed, watchEffect, onMounted } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import NotificationOffcanvas from './components/NotificationOffcanvas.vue'
import { accountService } from './services/AccountService'
import { notificationsService } from './services/NotificationsService'
import { tipsService } from './services/TipsService'
import Pop from './utils/Pop'

export default {
  setup() {

    async function getMyReviews() {
      try {
        const accountId = AppState.account.id
        await accountService.getMyReviews(accountId)
      } catch (error) {
        Pop.error('GETTING MY REVIEWS', error)
      }
    }

    watchEffect(async () => {
      if (AppState.account.id && !AppState.hasNotifications) {
        await accountService.getMyReviews()
        await tipsService.getTipsReceived()
        await notificationsService.findNotifications()
      }

    })
    return {
      appState: computed(() => AppState),
      notifications: computed(() => AppState.notifications)
    }
  },
  components: { Navbar, NotificationOffcanvas }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.employee-card {
  background-color: #06D6A0;
  color: white;
  text-shadow: 1px 1px 1px black;
  transition: 0.5s;
  cursor: pointer;
}

.employee-card-dark {
  background-color: #005f45 !important;
  text-shadow: 1px 1px 2px black;
  transition: 0.5s;
  cursor: pointer;
}

.star {
  color: #FFEE33;
  text-shadow: 1px 1px 1px black;
}


.cash {
  color: #28922d;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.459);
}

.cash-light {
  color: #34ba3b;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.459);
}

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
  align-items: center;
  color: white !important;
  background: linear-gradient(270deg, #46F4DF 11.46%, #06D6A0 74.48%);
}
</style>
