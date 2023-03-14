<template>
  <div class="container-fluid">
    <div class="row pb-1 mt-3 d-flex flex-column align-items-center justify-content-center">
      <div v-if="account?.id">
        <div class="col-12 text-center">
          <router-link :to="{
            name: 'Account'
          }">
            <img class="profile-picture border border-dark border-2 elevation-1" :src="account?.picture"
              :alt="account?.picture" title="Go to your account page!">
          </router-link>
        </div>
        <div class="col-12 text-center">
          <h2 class="my-3 rounded text-center user-name">
            {{ account?.name }}
          </h2>
        </div>
        <div v-if="highestTipEverGiven" class="col-12 text-center">
          <h6 class="biggest-tip">Your Biggest Tip Sent: <span class="biggest-tip-amount">₲{{ highestTipEverGiven.tip
          }}</span> to
            {{ highestTipEverGiven.receiver?.name }}
          </h6>
        </div>
        <div v-else class="col-12 text-center">
          <h6 class="biggest-tip"><span>No Tips Given Yet</span></h6>
        </div>
        <div v-if="highestTipEver" class="col-12 text-center">
          <h6 class="biggest-tip">Your Biggest Tip received: <span class="biggest-tip-amount">₲{{ highestTipEver.tip
          }}</span> from
            {{ highestTipEver.giver?.name }}
          </h6>
        </div>
        <div v-else class="col-12 text-center">
          <h6 class="biggest-tip">No Tips Received Yet</h6>
        </div>
      </div>
      <div v-else>
        <div class="col-12 text-center my-5">
          <h2>Log-In or Sign-Up now to get started!</h2>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="d-flex justify-content-center mb-3">
          <div class="btn-group" role="group" aria-label="Basic outlined example">
            <button @click="searchTypeProfiles()" type="button" class="btn btn-outline-dark">Profiles</button>
            <button @click="searchTypeBusinesses()" type="button" class="btn btn-outline-dark">Businesses</button>
          </div>
        </div>
        <form @submit.prevent="search()">
          <div class="input-group">
            <input v-if="searchType == 'businesses'" v-model="editable.query" required class="form-control"
              placeholder="Search businesses..." aria-describedby="button-addon2" aria-label="Search" type="text">
            <input v-if="searchType == 'profiles'" v-model="editable.query" required class="form-control"
              placeholder="Search profiles..." aria-describedby="button-addon2" aria-label="Search" type="text">
            <button class="btn btn-outline-secondary" type="submit" id="button-addon2">
              <i class="mdi mdi-magnify"></i>
            </button>
          </div>
        </form>
      </div>
      <div class="col-12 col-md-8 mt-5">
      </div>
      <div v-if="searchType == 'businesses'">
        <div class="col-12 col-md-8 offset-md-2">
          <h6>Top Businesses:</h6>
        </div>
        <div v-for="b in businesses" class="col-12 employee-card rounded elevation-5 p-2 mb-4 col-md-8 offset-md-2">
          <BusinessCard :business="b" />
        </div>
      </div>
      <div v-else>
        <div class="col-12 col-md-8 offset-md-2">
          <h6>Top Profiles:</h6>
        </div>
        <div v-for="p in profiles" class="col-12 employee-card rounded col-md-8 offset-md-2">
          <ProfileCard :profile="p" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onUnmounted, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
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
        Pop.error("[GETTING HIGHEST RATED BUSINESSES]", error);
      }
    }
    async function getHighestRatedProfiles() {
      try {
        await profilesService.getHighestRatedProfiles();
      }
      catch (error) {
        Pop.error("[GETTING HIGHEST RATED PROFILES]", error);
      }
    }
    async function getReviewsByProfileId() {
      try {
        const profileId = AppState.account.id
        await profilesService.getReviewsByProfileId(profileId)
      } catch (error) {
        Pop.error('[GETTING REVIEWS BY PROFILEID]', error.message)
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
    watchEffect(() => {
      if (AppState.account.id) {
        tipsService.getTipsReceived()
        tipsService.getTipsGiven()
        getReviewsByProfileId()
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
      async search() {
        try {
          let query = editable.value;
          await businessesService.getBusinessesByQuery(query);
          await profilesService.getProfilesByQuery(query);
        }
        catch (error) {
          Pop.error("SEARCHING FOR BUSINESSES", error);
        }
      },
      searchTypeProfiles() {
        AppState.searchType = "profiles";
      },
      searchTypeBusinesses() {
        AppState.searchType = "businesses";
      }
    };
  },
  components: { ProfileCard, BusinessCard }
}
</script>

<style scoped lang="scss">
.employee-card {
  background-color: #06D6A0;
  color: white;
  text-shadow: 1px 1px 2px black;
  transition: 0.5s;
  cursor: pointer;
}

.employee-card:active {
  transform: scale(0.9);
}

.profile-picture-small {
  height: 10vh;
  width: 10vh;
  border-radius: 50%;
  border: 2px solid black;
}

.biggest-tip-amount {
  color: #1c6820;
  font-weight: 1000;
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
  height: 20vh;
  width: 20vh;
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

.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
