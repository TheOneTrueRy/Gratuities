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
        <img class="elevation-3 rounded user-picture" :src="account?.picture" alt="">
      </div>
      <div class="col-7 col-md-5 ps-3">
        <h1>

        </h1>
        <div class="justify-content-center row">
          <div class="col-10">
            <h6>Available to Payout: <div class="d-flex justify-content-around align-items-center mt-1">
                <i class="cash fs-5">₲{{ availableToPayout
                }} </i>
                <button @click="cashOut(availableToPayout)" class="btn btn-outline-success btn-sm"
                  style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;"
                  :disabled="!availableToPayout">cash
                  out</button>
              </div>
            </h6>
            <h6>Biggest Tip:</h6>
            <ul>
              <li>This Month: <i class="cash fs-5">₲{{ highestTipMonth }}</i>
              </li>
              <li>Ever: <i class="cash fs-5">₲{{ highestTipEver?.tip }}</i>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 offset-md-3 d-flex justify-content-around pe-4">
        <button data-bs-toggle="offcanvas" data-bs-target="#addBusiness" aria-controls="offcanvasExample"
          class="btn figma-buttons text-light elevation-3 rounded-pill">New
          Business</button>
        <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"
          class="btn figma-buttons text-light elevation-3 rounded-pill">Edit Account</button>
      </div>

      <!-- SECTION Offcanvas for edit account vvvv -->
      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasExampleLabel">Edit Account</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <form @submit.prevent="editAccount()">
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input required v-model="editable.name" type="text" class="form-control" id="name" name="name">
            </div>
            <div>
              <label for="picture" class="form-label">Picture</label>
              <input required v-model="editable.picture" class="form-control" id="picture" type="text">
            </div>
            <div>
              <label for="bio" class="form-label">Bio</label>
              <input v-model="editable.bio" class="form-control" id="bio" type="text">
            </div>
            <!-- FIXME the checkbox isn't actually displaying the value of openToFeedback -->
            <!-- ANCHOR nvm fixed it -->
            <div>
              <label for="openToFeedback" class="form-label">Would you like to receive feedback?&nbsp;&nbsp;&nbsp;</label>
              <input v-model="editable.openToFeedback" class="my-3" id="openToFeedback" type="checkbox">
            </div>
            <button data-bs-dismiss="offcanvas" class="btn btn-success" type="submit">Save Changes</button>
          </form>
        </div>
      </div>
      <!-- SECTION End of offcanvas for edit account ^^^^ -->



      <!-- SECTION Offcanvas for add business vvvv -->
      <div class="offcanvas offcanvas-start" tabindex="-1" id="addBusiness" aria-labelledby="addBusinessLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="addBusinessLabel">New Business</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <div>
            <form @submit.prevent="newBusiness()">
              <div class="mb-2">
                <label class="form-label">Name</label>
                <input required v-model="editable2.name" placeholder="What's it called?" type="text" class="form-control">
              </div>
              <div class="mb-2">
                <label class="form-label">Location</label>
                <input required v-model="editable2.location" placeholder="Where is it?" type="text" class="form-control">
              </div>
              <div class="mb-2">
                <label class="form-label">Logo</label>
                <input required v-model="editable2.logo" placeholder="What's it's logo?" type="text" class="form-control">
              </div>
              <div class="mb-2">
                <label class="form-label">Cover Image</label>
                <input required v-model="editable2.coverImg" placeholder="What's it's cover image?" type="text"
                  class="form-control">
              </div>
              <button data-bs-dismiss="offcanvas" class="btn btn-success" type="submit">Create Business</button>
            </form>
          </div>
        </div>
      </div>
      <!-- SECTION End of offcanvas for add business ^^^ -->


      <div class="col-12 col-md-6 offset-md-3 mt-4">
        <h1>Recent Tips:</h1>
      </div>
      <!-- SECTION buttons to switch between tip types -->
      <div class="col-12 col-md-6 offset-md-3 mt-3 d-flex justify-content-center mb-3">
        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
          <input @click="showReceivedTips()" type="radio" class="btn-check" name="btnradio" id="btnradio1"
            autocomplete="off" checked>
          <label class="btn btn-outline-dark" for="btnradio1">Received</label>

          <input @click="showGivenTips()" type="radio" class="btn-check" name="btnradio" id="btnradio2"
            autocomplete="off">
          <label class="btn btn-outline-dark" for="btnradio2">&nbsp;&nbsp;Given&nbsp;&nbsp;</label>
        </div>
      </div>
      <!-- SECTION tips list -->
      <div v-if="tipType == 'received'" class="col-12 col-md-6 offset-md-3">
        <div v-for="t in receivedTips">
          <Tip :tip="t" />
        </div>
      </div>
      <div v-else class="col-12 col-md-6 offset-md-3">
        <div v-for="t in givenTips">
          <TipGiven :tip="t" />
        </div>
      </div>
      <div v-if="businesses.length == 1" class="col-12 col-md-6 offset-md-3 mt-4">
        <h1>My Business:</h1>
        <div class="col-12 col-md-6 offset-md-3 my-4" v-for="business in businesses">
          <Business :business="business" />
        </div>
      </div>
      <div v-else-if="businesses.length > 1" class="col-12 col-md-6 offset-md-3 mt-4">
        <h1>My Businesses:</h1>
        <div class="col-12 col-md-6 offset-md-3 my-4" v-for="business in businesses">
          <Business :business="business" />
        </div>
      </div>
      <div v-else>

      </div>
    </div>
  </div>
</template>

<script>
import { Offcanvas } from 'bootstrap';
import { computed, ref, watchEffect, onMounted, onUnmounted } from 'vue'
import { tipsService } from '../services/TipsService'
import { accountService } from '../services/AccountService';
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
export default {
  setup() {
    const editable = ref({});
    const editable2 = ref({});
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

    watchEffect(() => {
      if (AppState.account.id) {
        editable.value = { ...AppState.account };
        editable.bio = { ...AppState.account.bio };
      }
    });
    return {
      editable,
      editable2,
      businesses: computed(() => AppState.businesses),
      account: computed(() => AppState.account),
      tipType: computed(() => AppState.tipType),
      receivedTips: computed(() => AppState.receivedTips),
      givenTips: computed(() => AppState.givenTips),
      highestTipMonth: computed(() => AppState.highestTipMonth),
      highestTipEver: computed(() => AppState.highestTipEver),
      availableToPayout: computed(() => AppState.availableToPayout),
      async cashOut(availableToPayout) {
        try {
          await tipsService.cashOut(availableToPayout)
        } catch (error) {
          Pop.error(error.message)
          logger.error(error)
        }
      },
      async editAccount() {
        try {
          const formData = editable.value;
          await accountService.editAccount(formData);
        }
        catch (error) {
          Pop.error(error.message);
          logger.error(error);
        }
      },
      async newBusiness() {
        try {
          const formData = editable2.value;
          await businessesService.newBusiness(formData);
        }
        catch (error) {
          Pop.error(error.message);
          logger.error(error);
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
  components: { Business, Tip, TipGiven, ProfileStarRating }
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

.user-picture {
  width: 150px;
  height: 150px;
  object-fit: cover;
  background-position: center;
}

.w-90 {
  width: 90%;
}

.w-10 {
  width: 10%;
}
</style>
