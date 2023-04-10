<template>
  <div v-if="profile" class="ProfilePage">
    <div class="container-fluid">
      <div class="row mt-1">
        <div class="col-12">
          <!-- SECTION user rating/dropdown for adding to business/sending feedback -->
          <div class="row align-items-center">
            <div class="col-6 d-md-none">
              <div class="fs-1 mb-1">
                <ProfileStarRating :rating="profile?.rating" />
              </div>
            </div>
            <div class="col-6 offset-md-6 text-end" v-if="account?.id != profile?.id">
              <div class="btn dropstart">
                <button class="btn btn-secondary-outline btn-sm dropdown-toggle fs-4" type="button"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  ...
                </button>
                <ul class="dropdown-menu text-center">
                  <li><a class="dropdown-item selectable" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop"
                      aria-controls="offcanvasTop">Add to business</a>
                  </li>
                  <li v-if="profile?.openToFeedback && !chat" @click="createChat()"><a class="dropdown-item selectable"
                      data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">Send
                      feedback</a>
                  </li>
                  <li v-if="profile?.openToFeedback && chat" @click="openChat()"><a class="dropdown-item selectable"
                      data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">Open
                      Chat</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="row justify-content-center">
            <!-- SECTION user picture/QR code, name, bio, and rating -->
            <div class="col-12">
              <ProfileCarousel />
            </div>
            <div class="col-12 mt-2 d-flex flex-column justify-content-center align-items-center">
              <h1>{{ profile?.name }}</h1>
              <p v-if="profile?.bio" class="pt-2">"{{ profile?.bio }}"</p>
            </div>
            <div class="col-12 d-md-flex justify-content-center d-none fs-2">
              <ProfileStarRating :rating="profile?.rating" />
            </div>

            <!-- SECTION tip and review buttons -->
            <div v-if="account.id" class="d-flex justify-content-around my-2">
              <div v-if="profile?.id != account.id" class="col-6 d-flex justify-content-center">
                <button class="btn tip-button elevation-2 rounded-pill px-4" data-bs-toggle="modal"
                  data-bs-target="#tipUserModal">Tip</button>
              </div>
              <div v-if="profile?.id != account.id" class="col-6 d-flex justify-content-center">
                <button class="btn review-button elevation-2 rounded-pill" data-bs-toggle="offcanvas"
                  data-bs-target="#reviewOffcanvas" aria-controls="reviewOffcanvas">Review</button>
              </div>
            </div>

            <!-- SECTION sort reviews button group -->
            <div class="col-12 mt-1">
              <div class="d-flex flex-column align-items-center">
                <div class="mb-2">
                  <span>
                    Sort reviews by:
                  </span>
                </div>
                <div class="btn-group" role="group" aria-label="Basic outlined example">
                  <button @click="searchTypeDate()" type="button" class="btn btn-sm"
                    :class="theme ? 'btn-outline-dark' : 'btn-outline-light'"
                    style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">Date</button>
                  <button @click="searchTypeRating()" type="button" class="btn btn-sm"
                    :class="theme ? 'btn-outline-dark' : 'btn-outline-light'"
                    style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">Rating</button>
                </div>
              </div>
            </div>
          </div>

          <!-- SECTION displays all profiles that have reviewed this profile -->
          <div class="row justify-content-center my-3">
            <div v-for="r in reviews" class="col-11 rounded p-2 col-md-8">
              <ReviewCard :review="r" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- SECTION offcanvas with review form -->
  <RateProfileOffcanvas />
  <!-- SECTION modal to tip user -->
  <TipUserModal />
  <!-- SECTION offcanvas of my businesses to add profile to -->
  <AddEmployee />

  <!-- SECTION feedback offcanvas -->
  <FeedbackOffcanvas />
</template>


<script>
import { computed, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import ProfileCard from '../components/ProfileCard.vue';
import ProfileCarousel from '../components/ProfileCarousel.vue';
import RateProfileOffcanvas from '../components/RateProfileOffcanvas.vue';
import FeedbackOffcanvas from '../components/FeedbackOffcanvas.vue';
import ReviewCard from '../components/ReviewCard.vue';
import ProfileStarRating from '../components/ProfileStarRating.vue';
import TipUserModal from '../components/TipUserModal.vue';
import { profilesService } from '../services/ProfilesService.js';
import { ratingsService } from "../services/RatingsService.js";
import Pop from '../utils/Pop.js';
import AddEmployee from '../components/AddEmployee.vue';
import { feedbackService } from '../services/FeedbackService';

export default {
  setup() {
    const route = useRoute();
    const editable = ref({})
    async function generateQRCode() {
      try {
        const profileId = route.params.profileId;
        await profilesService.generateQRCode(profileId);
      }
      catch (error) {
        Pop.error(error.message, '[GENERATING QR CODE]');
      }
    }
    async function getProfileById() {
      try {
        const profileId = route.params.profileId;
        await profilesService.getProfileById(profileId);
      }
      catch (error) {
        Pop.error(error.message, '[GETTING PROFILE BY ID]');
      }
    }

    async function calculateProfileRating() {
      try {
        const profileId = route.params.profileId
        await ratingsService.calculateProfileRating(profileId)
      } catch (error) {
        Pop.error(error.message, '[CALCULATING PROFILE RATING]')
      }
    }

    async function getReviewsByProfileId() {
      try {
        const profileId = route.params.profileId
        await profilesService.getReviewsByProfileId(profileId)
      } catch (error) {
        Pop.error(error.message, '[GETTING REVIEWS BY PROFILE ID]')
      }
    }

    async function getChat() {
      try {
        const profileId = route.params.profileId
        await feedbackService.getChat(profileId)
      } catch (error) {
        Pop.error(error, '[getting chat]')
      }
    }

    async function getFeedbackInChat() {
      try {
        await feedbackService.getFeedbackInChat()
      } catch (error) {
        Pop.error(error, '[getting feedback]')
      }
    }

    watchEffect(async () => {
      if (route.params.profileId) {
        getProfileById();
        generateQRCode();
        getReviewsByProfileId();
        calculateProfileRating();
        getChat();
      }
    })
    return {
      editable,
      route,
      QRCode: computed(() => AppState.QRCode),
      profile: computed(() => AppState.profile),
      profiles: computed(() => AppState.profiles),
      reviews: computed(() => AppState.reviews),
      businesses: computed(() => AppState.businesses),
      account: computed(() => AppState.account),
      theme: computed(() => AppState.account.theme),
      chat: computed(() => AppState.chat),

      searchTypeDate() {
        AppState.reviewSearchType = 'date'
        AppState.reviews.sort(function (a, b) { return new Date(a.createdAt) - new Date(b.createdAt) }).reverse()
      },

      searchTypeRating() {
        AppState.reviewSearchType = 'rating'
        AppState.reviews.sort(function (a, b) { return a.rating - b.rating }).reverse()
      },

      // async startChat() {
      //     try {
      //         const profileId = route.params.profileId
      //         await profilesService.startChat(profileId)
      //     } catch (error) {
      //         Pop.error('[STARTING CHAT]', error)
      //     }
      // }
      async openChat() {
        try {
          await getFeedbackInChat()
        } catch (error) {
          Pop.error(error, '[open chat]')
        }
      },
      async createChat() {
        try {
          const profileId = route.params.profileId
          await feedbackService.createChat(profileId)
          await getFeedbackInChat()
        } catch (error) {
          Pop.error(error, '[creating chat]')
        }
      }
    };
  },
  components: { ProfileCard, ReviewCard, ProfileCarousel, RateProfileOffcanvas, FeedbackOffcanvas, TipUserModal, ProfileStarRating, AddEmployee }
}
</script>


<style lang="scss" scoped>
.tip-button {
  background-color: #06D6A0;
  color: white;
  text-shadow: 1px 1px 2px black;
}

.review-button {
  background-color: #EF476F;
  color: white;
  text-shadow: 1px 1px 2px black;
}
</style>