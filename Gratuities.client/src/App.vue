<template>
  <header class="sticky-top">
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer :class="theme ? 'footer-light' : 'footer-dark'">
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
import { themeService } from './services/ThemeService'
import { feedbackService } from './services/FeedbackService'
export default {
  setup() {

    watchEffect(async () => {
      if (AppState.account.id && !AppState.hasNotifications) {
        await accountService.getMyReviews()
        await tipsService.getTipsReceived()
        await notificationsService.findNotifications()
        await feedbackService.getMyChats()
        if (AppState.account.theme == true && AppState.account.theme != null) {
          themeService.toggleThemeLight()
        }

        if (AppState.account.theme == false && AppState.account.theme != null) {
          themeService.toggleThemeDark()
        }
      }
      if (!AppState.account.id) {
        themeService.toggleThemeLight()
      }


    })

    return {
      appState: computed(() => AppState),
      notifications: computed(() => AppState.notifications),
      theme: computed(() => AppState.account.theme),

    }
  },
  components: { Navbar, NotificationOffcanvas }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

header {
  height: 7vh;
}

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


.footer-light {
  display: grid;
  place-content: center;
  align-items: center;
  height: 4vh;
  color: white !important;
  background: linear-gradient(270deg, #46F4DF 11.46%, #06D6A0 74.48%);
}

.footer-dark {
  display: grid;
  place-content: center;
  height: 4vh;
  align-items: center;
  color: white !important;
  background: linear-gradient(270deg, #50cbbd 11.46%, #05926c 74.48%);
}
</style>
