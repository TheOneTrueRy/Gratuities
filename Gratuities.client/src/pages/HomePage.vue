<template>
  <div class="container-fluid">
    <div class="row pb-1 mt-3 d-flex flex-column align-items-center justify-content-center">
      <!-- SECTION display of user's picture and info -->
      <div v-if="account?.id">
        <div class="col-12 text-center">
          <router-link :to="{
            name: 'Account'
          }">
            <img class="profile-picture border border-dark border-2 elevation-1" :src="account?.picture"
              :alt="account?.picture" title="Go to your account page!" onerror="this.src='broken-image.png'">
          </router-link>
        </div>

        <div class="col-12 text-center">
          <h2 class="mt-2 mb-3 rounded text-center user-name">
            {{ account?.name }}
          </h2>
        </div>

        <div v-if="highestTipEverGiven" class="col-12 text-center">
          <h6 class="biggest-tip">Your Biggest Tip Sent: <span :class="theme ? 'cash' : 'cash-light'">₲{{
            ((highestTipEverGiven.tip)).toLocaleString('en-US')
          }}</span><br> to
            <router-link :class="theme ? 'text-dark' : 'text-success'"
              :to="{ name: 'Profile', params: { profileId: highestTipEverGiven.receiver?.id } }" class="underline">
              {{ highestTipEverGiven.receiver?.name }}
            </router-link>
          </h6>
        </div>

        <div v-else class="col-12 text-center">
          <h6 class="biggest-tip"><span>No Tips Given Yet</span></h6>
        </div>

        <div v-if="highestTipEver" class="col-12 text-center mb-4">
          <h6 class="biggest-tip">Your Biggest Tip received: <span :class="theme ? 'cash' : 'cash-light'">₲{{
            ((highestTipEver.tip).toLocaleString('en-US'))
          }}</span><br> from
            <router-link :class="theme ? 'text-dark' : 'text-success'"
              :to="{ name: 'Profile', params: { profileId: highestTipEver.giver?.id } }" class="underline">
              {{ highestTipEver.giver?.name }}
            </router-link>
          </h6>
        </div>

        <div v-else class="col-12 text-center">
          <h6 class="biggest-tip">No Tips Received Yet</h6>
        </div>
      </div>

      <!-- SECTION shows if user isn't logged in -->
      <div v-else>
        <div class="col-12 text-center my-5">
          <h2>Log-In or Sign-Up now to get started!</h2>
        </div>
      </div>

      <!-- SECTION sort/search -->
      <div class="col-12 col-md-6">
        <!-- SECTION buttons to show profiles OR businesses -->
        <div class="d-flex justify-content-center mb-4">
          <div class="btn-group" role="group" aria-label="Basic outlined example">
            <button @click="searchTypeProfiles()" type="button" class="btn"
              :class="[theme ? 'btn-outline-dark' : 'btn-outline-light']">Profiles</button>
            <button @click="searchTypeBusinesses()" type="button" class="btn"
              :class="[theme ? 'btn-outline-dark' : 'btn-outline-light']">Businesses</button>
          </div>
        </div>

        <!-- SECTION search bar for profiles/businesses -->
        <div>
          <form @submit.prevent="search()">
            <div class="input-group">
              <input v-if="searchType == 'businesses'" v-model="editable.query" class="form-control"
                placeholder="Search businesses..." aria-describedby="button-addon2" aria-label="Search" type="text">
              <input v-if="searchType == 'profiles'" v-model="editable.query" class="form-control"
                placeholder="Search profiles..." aria-describedby="button-addon2" aria-label="Search" type="text">
              <button class="btn btn-outline-secondary" type="submit" id="button-addon2">
                <i class="mdi mdi-magnify"></i>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- SECTION displays businesses -->
      <div v-if="searchType == 'businesses'">
        <div class="col-12 col-md-8 offset-md-2 my-3">
          <h6>Top Businesses:</h6>
        </div>
        <div v-for="b in businesses" class="col-12 employee-card rounded col-md-8 offset-md-2">
          <BusinessCard :business="b" :title="`Visit ${b?.name}'s business page!'`" />
        </div>
      </div>

      <!-- SECTION displays profiles -->
      <div v-else>
        <div class="col-12 col-md-8 offset-md-2 my-3">
          <h6>Top Profiles:</h6>
        </div>
        <div v-for="p in profiles" class="col-12 employee-card rounded col-md-8 offset-md-2" id="employee-card">
          <router-link :to="{
            name: 'Profile', params: { profileId: p?.id }
          }">
            <ProfileCard :profile="p" :title="`Visit ${p?.name}'s profile page!`" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '../utils/Pop.js';
import { businessesService } from '../services/BusinessesService.js'
import { profilesService } from "../services/ProfilesService.js";
import ProfileCard from '../components/ProfileCard.vue';
import BusinessCard from '../components/BusinessCard.vue';
import { tipsService } from "../services/TipsService.js";

export default {
  setup() {
    const editable = ref({});

    async function getHighestRatedBusinesses() {
      try {
        await businessesService.getHighestRatedBusinesses();
      }
      catch (error) {
        Pop.error(error.message, '[GETTING HIGHEST RATED BUSINESSES]');
      }
    }

    async function getHighestRatedProfiles() {
      try {
        await profilesService.getHighestRatedProfiles();
      }
      catch (error) {
        Pop.error(error.message, '[GETTING HIGHEST RATED PROFILES]');
      }
    }

    function clearBusinesses() {
      try {
        AppState.businesses = []
      } catch (error) {
        Pop.error(error.message, 'Clearing Businesses')
      }
    }

    onMounted(() => {
      getHighestRatedBusinesses();
      getHighestRatedProfiles();
    });

    onUnmounted(() => {
      clearBusinesses()
    })

    watchEffect(async () => {
      if (AppState.account.id) {
        tipsService.getTipsGiven()
      }

    })
    return {
      editable,

      account: computed(() => AppState.account),
      businesses: computed(() => AppState.businesses),
      profiles: computed(() => AppState.profiles),
      searchType: computed(() => AppState.searchType),
      highestTipEver: computed(() => AppState.highestTipEver),
      highestTipEverGiven: computed(() => AppState.highestTipEverGiven),
      theme: computed(() => AppState.account.theme),

      async search() {
        try {
          let query = editable.value;
          await businessesService.getBusinessesByQuery(query);
          await profilesService.getProfilesByQuery(query);
        }
        catch (error) {
          Pop.error(error.message, '[SEARCHING]');
        }
      },

      searchTypeProfiles() {
        AppState.searchType = "profiles";
      },

      searchTypeBusinesses() {
        AppState.searchType = "businesses";
      },

    };
  },

  components: { ProfileCard, BusinessCard }
}
</script>

<style scoped lang="scss">
.employee-card {
  background-color: #06D6A0;
  color: white;
  text-shadow: 1px 1px 1px black;
  transition: 0.5s;
  cursor: pointer;
}

.employee-card:hover {
  transform: scale(1.02);
}

.employee-card:active {
  transform: scale(0.95);
}

.biggest-tip {
  text-shadow: 1px 1px 2px #00000040;
  font-weight: 400;
}

.user-name {
  font-size: 5vh;
  font-weight: 400;
}

.profile-picture {
  height: 25vh;
  width: 25vh;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  cursor: pointer;
  transition: 0.5s;
}

.profile-picture:hover {
  transform: scale(1.1);
}

.profile-picture:active {
  transform: scale(0.8);
}

.underline {
  text-decoration: underline;
}
</style>
