<template>
    <div class="ProfilePage">
        <div class="container-fluid">
            <div class="row mt-1">
                <div class="col-12">
                    <div class="row align-items-center">
                        <div class="col-6 d-md-none">
                            <!-- TODO needs to reflect user's actual rating -->
                            <div>
                                <ProfileStarRating />
                            </div>
                        </div>
                        <div class="col-6 offset-md-6 text-end">
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
                        <div class="col-12 mt-2 d-md-flex justify-content-center d-none">
                            <ProfileStarRating />
                        </div>
                        <div class="col-6 d-flex justify-content-center">
                            <button class="btn tip-button elevation-2 rounded-pill px-4" data-bs-toggle="modal"
                                data-bs-target="#tipUserModal">Tip</button>
                        </div>
                        <div class="col-6 d-flex justify-content-center">
                            <button class="btn review-button elevation-2 rounded-pill" data-bs-toggle="offcanvas"
                                data-bs-target="#reviewOffcanvas" aria-controls="reviewOffcanvas">Review</button>
                        </div>
                    </div>
                    <!-- SECTION displays all profiles that have reviewed this profile -->
                    <div class="row justify-content-center mt-3">
                        <div v-for="r in reviews" class="col-11 review-card rounded elevation-5 p-2 mb-4 col-md-8">
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

        watchEffect(() => {
            if (route.params.profileId) {
                getProfileById();
                generateQRCode();
                getReviewsByProfileId();
                calculateProfileRating();
            }
        })
        return {
            editable,
            QRCode: computed(() => AppState.QRCode),
            profile: computed(() => AppState.profile),
            profiles: computed(() => AppState.profiles),
            reviews: computed(() => AppState.reviews),
            businesses: computed(() => AppState.businesses),
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

.review-card {
    background-color: #06D6A0;
    color: white;
    text-shadow: 1px 1px 2px black;
    transition: 0.5s;
    cursor: pointer;
}

.employee-card:active {
    transform: scale(0.9);
}
</style>