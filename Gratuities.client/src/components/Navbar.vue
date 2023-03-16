<template>
  <nav class="navbar navbar-expand-lg px-2" :class="theme ? 'tip-header' : 'tip-header-dark'">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <router-link class="text-light" :to="{ name: 'Home' }">
      <div class="logo d-flex flex-column align-items-center">
        <h1 class="nomb">Gratuities</h1>
      </div>
    </router-link>
    <button v-if="notifications?.length > 0 && account.id" data-bs-toggle="offcanvas"
      data-bs-target="#notificationOffcanvas" aria-controls="notificationOffcanvas"
      class="btn btn-dark d-flex justify-content-center align-items-center px-1 ms-3">
      <i id="notifications-bell" class="mdi mdi-bell text-light fs-5 notifications-bell"></i>
      <div class="notif-icon-bg">
        <div class="notif-icon-num">{{ notifications?.length }}</div>
      </div>
    </button>
    <button v-else-if="account.id" data-bs-toggle="offcanvas" data-bs-target="#notificationOffcanvas"
      aria-controls="notificationOffcanvas"
      class="btn btn-dark d-flex justify-content-center align-items-center no-notifications-bell ms-3">
      <i id="notifications-bell" class="mdi mdi-bell text-light fs-5"></i>
    </button>
    <div class="text-start collapse navbar-collapse ms-4" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <router-link :to="{ name: 'About' }"
            class="btn lighten-30 selectable text-uppercase text-light my-shadow hover">
            <div data-bs-toggle="collapse" data-bs-target="#navbarText">
              About
            </div>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Account' }"
            class="btn lighten-30 selectable text-uppercase text-light my-shadow hover">
            <div data-bs-toggle="collapse" data-bs-target="#navbarText">
              Account
            </div>
          </router-link>
        </li>
        <li v-if="account.id">
          <div class="my-shadow btn-p text-start text-uppercase">
            <span>G-Bucks: <span class="ms-1">{{ (((account.currency).toLocaleString('en-US')))
            }}</span></span>
          </div>
        </li>
        <li v-if="account.id">
          <router-link :to="{ name: 'Game' }" class="btn lighten-30 selectable text-uppercase text-light my-shadow hover">
            <div data-bs-toggle="collapse" data-bs-target="#navbarText">
              Earn G-Bucks
            </div>
          </router-link>
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <div class="d-flex justify-space-between align-items-center">
        <Login />
        <button v-if="account.id" class="btn" @click="toggleTheme()">
          <h1><i class="mdi mdi-theme-light-dark"></i></h1>
        </button>
      </div>
    </div>
  </nav>
  <NotificationOffcanvas />
</template>

<script>
import { computed, watchEffect } from "vue";
import { AppState } from "../AppState.js";
import { themeService } from "../services/ThemeService";
import Login from './Login.vue'
import NotificationOffcanvas from "./NotificationOffcanvas.vue";

export default {

  setup() {


    return {
      account: computed(() => AppState.account),
      notifications: computed(() => AppState.notifications),
      theme: computed(() => AppState.account.theme),

      async toggleTheme() {
        await themeService.toggleTheme()
      }
    }
  },
  components: { Login, NotificationOffcanvas }
}
</script>

<style scoped>
.theme-button {
  min-height: 2vh;
}

.notif-icon-bg {
  font-size: xx-small;
  width: 15px;
  height: 15px;
  background-color: rgb(255, 0, 0);
  border: 1px solid #ffffff;
  border-radius: 80%;
  transform: translate(10px, -18px);
  /* transform: translateY(-10px); */
}

.notif-icon-num {
  transform: translate(-0.05px, -0.2px);
}

.tip-header {
  display: flex;
  align-items: center;
  color: white !important;
  background: linear-gradient(270deg, #46F4DF 11.46%, #06D6A0 74.48%);
}

.tip-header-dark {
  display: flex;
  align-items: center;
  color: white !important;
  background: linear-gradient(270deg, #50cbbd 11.46%, #05926c 74.48%);
}

.logo {
  font-family: 'Rowdies', cursive;
  text-shadow: 0px 4px 4px #00000040;
  letter-spacing: 4px;
}

a:hover {
  text-decoration: none;
}

.nav-link {
  text-transform: uppercase;
}

.navbar-nav .router-link-exact-active {
  border-bottom: 2px solid var(--bs-success);
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

@media screen and (min-width: 768px) {
  nav {
    height: 64px;
  }
}

.notifications-bell {
  transform: translate(7.5px, 0.1px);
}

.no-notifications-bell {
  padding: 1;
}

#notifications-bell {
  transition: 0.5s;
}

/* #notifications-bell:hover {
  transform: scale(1.2);
} */

#notifications-bell:active {
  transform: scale(0.8);
}

.my-shadow {
  text-shadow: 1px 1px 2px black;
}

.btn-p {
  margin-top: 1px;
  padding-left: 12px;
  padding-top: 6px;
  padding-right: 12px;
  padding-bottom: 6px;
}

.hover {
  transition: 0.5s;
}

.hover:hover {
  transform: scale(1.1);
}

.hover:active {
  transform: scale(0.8);
}
</style>
