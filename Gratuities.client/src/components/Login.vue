<template>
  <span class="navbar-text">
    <button class="btn selectable text-dark text-uppercase my-2 my-lg-0" @click="login" v-if="!user.isAuthenticated">
      Login
    </button>
    <div v-else>
      <div class="dropdown dropstart my-2 my-lg-0">
        <div type="button" class="border-0 selectable no-select d-flex justify-content-start logout-button"
          data-bs-toggle="dropdown" aria-expanded="false">
          <div v-if="account.picture || user.picture">
            <button @click="logout" class="btn btn-dark"><i class="mdi mdi-logout"></i> Logout</button>
          </div>
        </div>
      </div>
    </div>
  </span>
</template>

<script>
import { computed } from 'vue'
import { AppState } from '../AppState'
import { AuthService } from '../services/AuthService'
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      async login() {
        AuthService.loginWithPopup()
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.logout-button {
  margin-left: 1.4vh;
}
</style>
