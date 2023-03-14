<template>
  <header class="sticky-top">
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
</template>

<script>
import { computed, watchEffect, onMounted } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import { accountService } from './services/AccountService'
import { notificationsService } from './services/NotificationsService'
import Pop from './utils/Pop'

export default {
  setup() {

    async function getMyReviews() {
      try {
        await accountService.getMyReviews()
      } catch (error) {
        Pop.error('GETTING MY REVIEWS', error)
      }
    }

    onMounted(() => {
      getMyReviews()
    })

    watchEffect(() => {
      if (AppState.reviews && AppState.notifications) {
        notificationsService.findNotifications(AppState.account.id)
      }

    })
    return {
      appState: computed(() => AppState),
      notifications: computed(() => AppState.notifications)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

.star {
  color: #FFEE33;
  text-shadow: 1px 1px 1px black;
}


.cash {
  color: rgb(1, 136, 53);
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.459);
}

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}

main {
  height: 80vh;
}
</style>
