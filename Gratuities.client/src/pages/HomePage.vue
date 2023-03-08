<template>
  <div class="container-fluid">
    <div class="row pb-1 mt-3 d-flex flex-column align-items-center justify-content-center">
      <div v-if="account?.id">
        <div class="col-12 text-center">
          <img class="profile-picture border border-dark border-2 elevation-1" :src="account.picture"
            :alt="account.picture">
        </div>
        <div class="col-12 text-center">
          <h2 class="my-3 text-dark rounded text-center user-name">
            {{ account.name }}
          </h2>
        </div>
        <div class="col-12 text-center">
          <h6 class="biggest-tip">Your Biggest Tip: <span class="biggest-tip-amount">$0.89</span> to AppleBees server
            @Bill
          </h6>
        </div>
      </div>
      <div v-else>
        <div class="col-12 text-center my-5">
          <h2>Log-In or Sign-Up now to get started!</h2>
        </div>
      </div>
      <div class="col-12 col-md-6 mt-4">
        <h6>Search for an employee or business:</h6>
      </div>
      <div class="col-12 col-md-6">
        <div class="d-flex justify-content-center mb-3">
          <div class="btn-group" role="group" aria-label="Basic outlined example">
            <button @click="searchTypeProfiles()" type="button" class="btn btn-outline-primary">Profiles</button>
            <button @click="searchTypeBusinesses()" type="button" class="btn btn-outline-primary">Businesses</button>
          </div>
        </div>
        <form @submit.prevent="search()">
          <div class="input-group">
            <input v-model="editable.query" required class="form-control" placeholder="Search..."
              aria-describedby="button-addon2" aria-label="Search" type="text">
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
          <h6>Top businesses:</h6>
        </div>
        <div v-for="b in businesses" class="col-12 employee-card rounded elevation-5 p-2 mb-4 col-md-8 offset-md-2">
          <div class="row">
            <div class="col-4 d-flex align-items-center">
              <img class="profile-picture-small" :src="b.logo" :alt="b.logo">
            </div>
            <div class="col-8">
              <p>{{ b.name }}<br>*****<br>{{ b.location }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="col-12 col-md-8 offset-md-2">
          <h6>Top profiles:</h6>
        </div>
        <div v-for="p in profiles" class="col-12 employee-card rounded elevation-5 p-2 mb-4 col-md-8 offset-md-2">
          <div class="row">
            <div class="col-4 d-flex align-items-center">
              <img class="profile-picture-small" :src="p.picture" :alt="p.picture">
            </div>
            <div class="col-8">
              <p>{{ p.name }}<br>*****<br>{{ p.bio }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { businessesService } from '../services/BusinessesService.js'
import { profilesService } from "../services/ProfilesService.js";

export default {
  setup() {
    const editable = ref({})

    async function getHighestRatedBusinesses() {
      try {
        await businessesService.getHighestRatedBusinesses()
      } catch (error) {
        Pop.error('[GETTING HIGHEST RATED BUSINESSES]', error)
      }
    }

    async function getHighestRatedProfiles() {
      try {
        await profilesService.getHighestRatedProfiles()
      } catch (error) {
        Pop.error('[GETTING HIGHEST RATED PROFILES]', error)
      }
    }

    onMounted(() => {
      getHighestRatedBusinesses()
      getHighestRatedProfiles()
    })

    return {
      editable,
      account: computed(() => AppState.account),
      businesses: computed(() => AppState.businesses),
      profiles: computed(() => AppState.profiles),
      searchType: computed(() => AppState.searchType),

      async search() {
        try {
          let query = editable.value
          await businessesService.getBusinessesByQuery(query)
          await profilesService.getProfilesByQuery(query)
        } catch (error) {
          Pop.error('SEARCHING FOR BUSINESSES', error)
        }
      },

      searchTypeProfiles() {
        AppState.searchType = 'profiles'
      },

      searchTypeBusinesses() {
        AppState.searchType = 'businesses'
      }
    }
  }
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

.biggest-tip-amount {
  color: #06D6A0;
}

.biggest-tip {
  text-shadow: 2px 4px 4px #00000040;
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
}

.profile-picture-small {
  height: 10vh;
  width: 10vh;
  border-radius: 50%;
  border: 2px solid black;
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
