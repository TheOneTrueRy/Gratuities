<template>
  <header>
    <Navbar />
  </header>
  <main class="white-background">
    <router-view />
  </main>
</template>

<script>
import { computed } from 'vue'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'

export default {
  setup() {
    return {
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

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
</style>
