<template>
    <div class="ProfilePage">
        <div class="container-fluid">
            <div class="row mt-1">
                <div class="col-12">
                    <div class="row align-items-center">
                        <div class="col-6 d-md-none">
                            <!-- TODO needs to reflect user's actual rating -->
                            <div class="fs-2">
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
                                    <li><a class="dropdown-item selectable" data-bs-toggle="offcanvas"
                                            data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">Add to business</a>
                                    </li>
                                    <li><a class="dropdown-item selectable">Send feedback</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-11">
                            <ProfileCarousel />
                        </div>
                        <div class="col-12 mt-2 text-center">
                            <h1>{{ profile?.name }}</h1>
                        </div>
                        <div class="col-12 mt-2 d-md-flex justify-content-center d-none fs-2">
                            <ProfileStarRating :rating="profile?.rating" />
                        </div>
                        <div v-if="profile?.id != account.id" class="col-6 d-flex justify-content-center">
                            <button class="btn tip-button elevation-2 rounded-pill px-4" data-bs-toggle="modal"
                                data-bs-target="#tipUserModal">Tip</button>
                        </div>
                        <div v-if="profile?.id != account.id" class="col-6 d-flex justify-content-center">
                            <button class="btn review-button elevation-2 rounded-pill" data-bs-toggle="offcanvas"
                                data-bs-target="#reviewOffcanvas" aria-controls="reviewOffcanvas">Review</button>
                        </div>
                        <div class="col-12 mt-2">
                            <div class="d-flex flex-column align-items-center">
                                <div class="mb-2">
                                    <span>
                                        Sort reviews by:
                                    </span>
                                </div>
                                <div class="btn-group" role="group" aria-label="Basic outlined example">
                                    <button @click="searchTypeDate()" type="button" class="btn btn-outline-dark btn-sm"
                                        style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">Date</button>
                                    <button @click="searchTypeRating()" type="button" class="btn btn-outline-dark btn-sm"
                                        style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">Rating</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- SECTION displays all profiles that have reviewed this profile -->
                    <div class="row justify-content-center mt-3">
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
    <!-- SECTION offcanvas of my bussinesses to add profile to -->
    <AddEmployee />
</template>


<script>
import { computed, onMounted, ref, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import ProfileCard from '../components/ProfileCard.vue';
import ProfileCarousel from '../components/ProfileCarousel.vue';
import RateProfileOffcanvas from '../components/RateProfileOffcanvas.vue';
import ReviewCard from '../components/ReviewCard.vue';
import ProfileStarRating from '../components/ProfileStarRating.vue';
import TipUserModal from '../components/TipUserModal.vue';
import { profilesService } from '../services/ProfilesService.js';
import { ratingsService } from "../services/RatingsService.js";
import Pop from '../utils/Pop.js';
import AddEmployee from '../components/AddEmployee.vue';
import { logger } from '../utils/Logger';
import { tipsService } from '../services/TipsService';
import { accountService } from '../services/AccountService';
import { notificationsService } from '../services/NotificationsService';

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
                Pop.error("[GENERATING QR CODE]", error);
            }
        }
        async function getProfileById() {
            try {
                const profileId = route.params.profileId;
                await profilesService.getProfileById(profileId);
            }
            catch (error) {
                Pop.error("[GETTING PROFILE BY ID]", error);
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
                Pop.error('[GETTING REVIEWS BY PROFILEID]', error.message)
            }
        }

        watchEffect(async () => {
            if (route.params.profileId) {
                getProfileById();
                logger.log('alo');
                generateQRCode();
                getReviewsByProfileId();
                calculateProfileRating();
                // tipsService.getTipsReceived()
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

            searchTypeDate() {
                AppState.reviewSearchType = 'date'
                AppState.reviews.sort(function (a, b) { return new Date(a.createdAt) - new Date(b.createdAt) }).reverse()
            },

            searchTypeRating() {
                AppState.reviewSearchType = 'rating'
                AppState.reviews.sort(function (a, b) { return a.rating - b.rating }).reverse()
            }
        };
    },
    components: { ProfileCard, ReviewCard, ProfileCarousel, RateProfileOffcanvas, TipUserModal, ProfileStarRating, AddEmployee }
}
</script>


<style lang="scss" scoped>
.profile-picture {
    height: 20em;
    width: 100%;
    object-fit: cover;
    object-position: center;
}

.scroller {
    height: 40px;
    overflow-y: scroll;
    scrollbar-color: #EF476F;
    scrollbar-width: thin;
}

.profile-picture-small {
    height: 10vh;
    width: 10vh;
    border-radius: 50%;
    border: 2px solid black;
}

.star-yellow {
    color: #FFD166;
}

.star-shadow {
    text-shadow: 1px 1px 2px black;
}

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

// .review-card {
//     background-color: #06D6A0;
//     color: white;
//     text-shadow: 1px 1px 2px black;
//     transition: 0.5s;
//     cursor: pointer;
// }

.employee-card:active {
    transform: scale(0.9);
}
</style>