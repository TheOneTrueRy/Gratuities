<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 d-flex justify-content-center align-items-center mt-2 mb-0">
        <h1 class="text-center">{{ account?.name }}
          <div>
            <ProfileStarRating :rating="account?.rating" />
          </div>
        </h1>

      </div>
      <div class="col-5 col-md-3 offset-md-2 ps-3 text-center d-flex align-items-center">
        <router-link v-if="account.id" :to="{ name: 'Profile', params: { profileId: account?.id } }">
          <img class="elevation-3 rounded user-picture" :src="account?.picture" :alt="account?.name"
            title="Go to your profile page">
        </router-link>
      </div>
      <div class="col-7 col-md-5 ps-3">
        <h1>

        </h1>
        <div class="justify-content-start row">
          <div class="col-11 col-md-8">
            <h6>Available to Payout: <div class="d-flex justify-content-between align-items-center mt-1 w-100">
                <i class="fs-5" :class="theme ? 'cash' : 'cash-light'">₲{{ ((availableToPayout))?.toLocaleString('en-US')
                }} </i>
                <button @click="cashOut(availableToPayout)" class="btn btn-outline-success btn-sm fw-bold"
                  style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;"
                  :disabled="!availableToPayout">cash
                  out</button>
              </div>
            </h6>
            <h6>Biggest Tip:</h6>
            <ul>
              <li>This Month: <i class="fs-5" :class="theme ? 'cash' : 'cash-light'">₲{{
                ((highestTipMonth)?.toLocaleString('en-US')) }}</i>
              </li>
              <li>Ever: <i class="fs-5" :class="theme ? 'cash' : 'cash-light'">₲{{
                ((highestTipEver?.tip)?.toLocaleString('en-US')) }}</i>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 offset-md-3 d-flex justify-content-around pe-4">
        <button data-bs-toggle="offcanvas" data-bs-target="#addBusiness" aria-controls="offcanvasExample"
          class="btn figma-buttons text-light elevation-3 rounded-pill hover-text">New
          Business</button>
        <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"
          class="btn figma-buttons text-light elevation-3 rounded-pill hover-text">Edit Account</button>
      </div>
      
      <div class="col-12 col-md-6 offset-md-3 mt-4">
        <h1>Recent Tips:</h1>
      </div>
      <!-- SECTION buttons to switch between tip types -->
      <div class="col-12 col-md-6 offset-md-3 mt-3 d-flex justify-content-center mb-3">
        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
          <input @click="showReceivedTips()" type="radio" class="btn-check" name="btnradio" id="btnradio1"
            autocomplete="off" checked>
          <label class="btn" :class="theme ? 'btn-outline-dark' : 'btn-outline-light'" for="btnradio1">Received</label>

          <input @click="showGivenTips()" type="radio" class="btn-check" name="btnradio" id="btnradio2"
            autocomplete="off">
          <label class="btn" :class="theme ? 'btn-outline-dark' : 'btn-outline-light'"
            for="btnradio2">&nbsp;&nbsp;Given&nbsp;&nbsp;</label>
        </div>
      </div>
      <!-- SECTION tips list -->
      <div v-if="tipType == 'received'" class="col-12 col-md-6 offset-md-3 tips-section">
        <div v-for="t in receivedTips">
          <Tip :tip="t" />
        </div>
      </div>
      <div v-else class="col-12 col-md-6 offset-md-3 tips-section">
        <div v-for="t in givenTips">
          <TipGiven :tip="t" />
        </div>
      </div>
      <div v-if="businesses.length == 1" class="col-12 col-md-6 offset-md-3 mt-3">
        <h1>My Business:</h1>
        <div class="col-12 col-md-6 offset-md-3 my-4" v-for="business in businesses">
          <Business :business="business" />
        </div>
      </div>
      <div v-else-if="businesses.length > 1" class="col-12 col-md-6 offset-md-3 mt-3">
        <h1>My Businesses:</h1>
        <div class="col-12 col-md-6 offset-md-3 my-4" v-for="business in businesses">
          <Business :business="business" />
        </div>
      </div>
      <div v-else>

      </div>
    </div>
  </div>

  <!-- SECTION Offcanvas for add business vvvv -->
  <AddBusinessOffCanvas />

  <!-- SECTION Offcanvas for edit account vvvv -->
  <EditAccountOffcanvas />
</template>

<script>
import { Offcanvas } from 'bootstrap';
import { computed, ref, watchEffect, onMounted, onUnmounted } from 'vue'
import { tipsService } from '../services/TipsService'
import { businessesService } from '../services/BusinessesService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
import Business from '../components/Business.vue';
import { useRoute } from 'vue-router';
import Tip from '../components/Tip.vue';
import TipGiven from '../components/TipGiven.vue';
import { ratingsService } from '../services/RatingsService';
import ProfileStarRating from "../components/ProfileStarRating.vue";
import EditAccountOffcanvas from '../components/EditAccountOffcanvas.vue';
import AddBusinessOffCanvas from '../components/AddBusinessOffCanvas.vue';
export default {
  setup() {
    const route = useRoute();

    async function calculateRating() {
      try {
        await ratingsService.calculateAccountRating()
      } catch (error) {
        Pop.error(error.message)
        logger.error(error)
      }
    }

    async function getTipsReceived() {
      try {
        await tipsService.getTipsReceived()
      } catch (error) {
        Pop.error(error.message)
        logger.error(error)
      }
    }
    async function getTipsGiven() {
      try {
        await tipsService.getTipsGiven()
      } catch (error) {
        Pop.error(error.message)
        logger.error(error)
      }
    }

    async function getMyBusinesses() {
      try {
        const userId = AppState.account.id;
        await businessesService.getMyBusiness(userId);
      }
      catch (error) {
        Pop.error(error.message);
        logger.error(error);
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
      setTimeout(getMyBusinesses, 1000);
      getTipsReceived()
      getTipsGiven()
      calculateRating()
    });
    onUnmounted(() => {
      clearBusinesses()
    });

    return {
      businesses: computed(() => AppState.businesses),
      account: computed(() => AppState.account),
      tipType: computed(() => AppState.tipType),
      receivedTips: computed(() => AppState.receivedTips),
      givenTips: computed(() => AppState.givenTips),
      highestTipMonth: computed(() => AppState.highestTipMonth),
      highestTipEver: computed(() => AppState.highestTipEver),
      availableToPayout: computed(() => AppState.availableToPayout),
      theme: computed(() => AppState.account.theme),

      async cashOut(availableToPayout) {
        try {
          await tipsService.cashOut(availableToPayout)
        } catch (error) {
          Pop.error(error.message)
          logger.error(error)
        }
      },

      showReceivedTips() {
        AppState.tipType = 'received'
      },
      showGivenTips() {
        AppState.tipType = 'given'
      }
    };
  },
  components: { Business, Tip, TipGiven, ProfileStarRating, EditAccountOffcanvas, AddBusinessOffCanvas }
}
</script>

<style scoped>
.p-tag-be-annoying {
  margin: 0;
}

.star {
  color: #FFEE33;
  text-shadow: 1px 1px 1px black;
}

.business-logo {
  border: 2px solid black;
  width: 16vh;
  height: 16vh;
  border-radius: 50%;
  object-fit: cover;
  background-position: center;
}

.profile-picture {
  height: 8vh;
  width: 8vh;
  border-radius: 50%;
  object-fit: cover;
  background-position: center;
}

.tips {
  padding: 1vh;
  background-color: #06D6A0;
  color: white;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.518);
}

.figma-buttons {
  background-color: #EF476F;
}

.figma-buttons:hover {
  color: black !important;
  ;
}

.user-picture {
  width: 150px;
  height: 150px;
  object-fit: cover;
  background-position: center;
  transition: 0.4s;
  cursor: pointer;
}

.user-picture:hover {
  transform: scale(1.05);
}

.w-90 {
  width: 90%;
}

.w-10 {
  width: 10%;
}

.tips-section{
  padding: 1vh;
  height: 60vh;
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>