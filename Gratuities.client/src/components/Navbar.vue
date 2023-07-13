<template>
  <nav class="navbar navbar-expand-lg px-2" :class="theme ? 'tip-header' : 'tip-header-dark'">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <router-link class="text-light" :to="{ name: 'Home' }">
      <div class="logo d-flex flex-column align-items-center">
        <h1 class="nomb" title="Return to the Home Page.">Gratuities</h1>
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
    <div class="text-start collapse navbar-collapse ms-md-4" id="navbarText">
      <ul class="navbar-nav me-auto pt-2">
        <li>
          <router-link :to="{ name: 'Home' }" class="btn lighten-30 selectable text-uppercase text-light my-shadow hover"
            title="Return to the Home Page.">
            <div data-bs-toggle="collapse" data-bs-target="#navbarText" class="d-md-none">
              <span>
                Home
                <i class="mdi mdi-home"></i>
              </span>
            </div>
            <div class="d-none d-md-flex">
              <span>
                Home
                <i class="mdi mdi-home"></i>
              </span>
            </div>
          </router-link>
        </li>
        <li>
          <router-link v-if="account.id" :to="{ name: 'Account' }"
            class="btn lighten-30 selectable text-uppercase text-light my-shadow hover" title="Visit your Account Page.">
            <div data-bs-toggle="collapse" data-bs-target="#navbarText" class="d-md-none">
              <span>
                Account
                <i class="mdi mdi-cog"></i>
              </span>
            </div>
            <div class="d-none d-md-flex">
              <span>
                Account
                <i class="mdi mdi-cog"></i>
              </span>
            </div>
          </router-link>
        </li>
        <li>
          <router-link v-if="account.id" :to="{ name: 'Profile', params: { profileId: account?.id } }"
            class="btn lighten-30 selectable text-uppercase text-light my-shadow hover" title="Visit your Profile Page.">
            <div data-bs-toggle="collapse" data-bs-target="#navbarText" class="d-md-none">
              <span>
                Profile
                <i class="mdi mdi-account"></i>
              </span>
            </div>
            <div class="d-none d-md-flex">
              <span>
                Profile
                <i class="mdi mdi-account"></i>
              </span>
            </div>
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'About' }" class="btn lighten-30 selectable text-uppercase text-light my-shadow hover"
            title="Visit the About Gratuities Page.">
            <div data-bs-toggle="collapse" data-bs-target="#navbarText" class="d-md-none">
              <span>
                About
                <i class="mdi mdi-note-text"></i>
              </span>
            </div>
            <div class="d-none d-md-flex">
              <span>
                About
                <i class="mdi mdi-note-text"></i>
              </span>
            </div>
          </router-link>
        </li>
      </ul>
      <div class="d-md-flex">
        <div v-if="account.id" class="my-shadow btn-p text-start text-uppercase">
          <span>
            G-Bucks:
            <span class="ms-1">
              ₲{{ (((account.currency).toLocaleString('en-US'))) }}
            </span>
          </span>
        </div>
        <router-link v-if="account.id" :to="{ name: 'Game' }"
          class="btn lighten-30 selectable text-uppercase text-light my-shadow hover" title="Visit the Game Page.">
          <div data-bs-toggle="collapse" data-bs-target="#navbarText" class="d-md-none">
            <span>
              Earn G-Bucks
              <i class="mdi mdi-pickaxe"></i>
            </span>
          </div>
          <div class="d-none d-md-flex">
            <span>
              Earn G-Bucks
              <i class="mdi mdi-pickaxe"></i>
            </span>
          </div>
        </router-link>
      </div>
      <!-- LOGIN COMPONENT HERE -->
      <div class="d-flex justify-space-between align-items-center">
        <Login />
        <button v-if="account.id" class="btn" @click="toggleTheme()">
          <span><i class="mdi mdi-theme-light-dark fs-1"></i></span>
        </button>
      </div>
    </div>
  </nav>
  <NotificationOffcanvas />
</template>

<script>
import { computed } from "vue";
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
  min-height: 7vh;
}

.tip-header-dark {
  display: flex;
  align-items: center;
  color: white !important;
  background: linear-gradient(270deg, #50cbbd 11.46%, #05926c 74.48%);
  min-height: 7vh;
}

.logo {
  font-family: 'Rowdies', cursive;
  text-shadow: 0px 2px 3px #00000040;
  color: white;
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
