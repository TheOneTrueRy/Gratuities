<template>
  <nav class="navbar navbar-expand-lg tip-header px-3">
    <router-link class="d-flex text-light" :to="{ name: 'Home' }">
      <div class="logo d-flex flex-column align-items-center">
        <h1 class="nomb">Gratuities</h1>
      </div>
    </router-link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
      aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="bg-dark rounded d-flex justify-content-center align-items-center px-1 ms-4">
      <i id="notifications-bell" class="mdi mdi-bell text-light fs-5 selectable"></i>
    </div>
    <div class="text-start collapse navbar-collapse ms-4" id="navbarText">
      <ul class="navbar-nav me-auto">
        <li>
          <router-link :to="{ name: 'About' }"
            class="btn lighten-30 selectable text-uppercase text-light my-shadow hover">
            About
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Account' }"
            class="btn lighten-30 selectable text-uppercase text-light my-shadow hover">
            Account
          </router-link>
        </li>
        <li>
          <div class="my-shadow btn-p text-start text-uppercase">
            <span>G-Bucks: <span class="ms-1">{{ account.currency }}</span></span>
          </div>
        </li>
        <li>
          <router-link :to="{ name: 'Game' }" class="btn lighten-30 selectable text-uppercase text-light my-shadow hover">
            Earn G-Bucks
          </router-link>
        </li>
      </ul>
      <!-- LOGIN COMPONENT HERE -->
      <!-- FIXME get rid of the drop down when clicking the logout button -->
      <Login />
    </div>
  </nav>
</template>

<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";
import Login from './Login.vue'
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
    }
  },
  components: { Login }
}
</script>

<style scoped>
.tip-header {
  display: flex;
  align-items: center;
  color: white !important;
  background: linear-gradient(270deg, #46F4DF 11.46%, #06D6A0 74.48%);

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

#notifications-bell {
  transition: 0.5s;
}

#notifications-bell:hover {
  transform: scale(1.2);
}

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
