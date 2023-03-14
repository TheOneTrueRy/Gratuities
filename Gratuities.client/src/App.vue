<template>
  <header class="sticky-top">
    <Navbar />
  </header>
  <main class="white-background">
    <router-view />
  </main>
</template>

<script>
import { computed, watchEffect } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import { notificationsService } from './services/NotificationsService'

export default {
  setup() {
    watchEffect(() => {
      if (AppState.reviews[0] && AppState.notifications) {
        notificationsService.findNotifications(AppState.account.id)
      }

    })
    return {
      appState: computed(() => AppState)
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

.white-background {
  background-color: white;
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
