<template>
    <div class="ProfilePage">
        <div class="container-fluid">
            <div class="row mt-1">
                <div class="col-12">
                    <div class="row align-items-center">
                        <div class="col-6">
                            <!-- TODO needs to reflect user's actual rating -->
                            <div class="h1"><i class="mdi mdi-star star-yellow star-shadow"></i><i
                                    class="mdi mdi-star star-yellow star-shadow"></i>
                                <i class="mdi mdi-star star-yellow star-shadow"></i><i class="mdi mdi-star-outline"></i><i
                                    class="mdi mdi-star-outline"></i>
                            </div>
                        </div>
                        <div class="col-6 text-end">
                            <div class="btn dropstart">
                                <button class="btn btn-secondary-outline btn-sm dropdown-toggle fs-4" type="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    ...
                                </button>
                                <ul class="dropdown-menu text-center">
                                    <li><a class="dropdown-item selectable">Add to business</a></li>
                                    <li><a class="dropdown-item selectable">Send feedback</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-11">
                            <div id="profileCarousel" class="carousel slide">
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img :src="profile?.picture" class="d-block rounded profile-picture"
                                            :alt="profile?.picture">
                                    </div>
                                    <div class="carousel-item">
                                        <img :src="QRCode" class="d-block rounded profile-picture" :alt="QRCode">
                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#profileCarousel"
                                    data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon visually-hidden" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#profileCarousel"
                                    data-bs-slide="next">
                                    <span class="carousel-control-next-icon visually-hidden" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                        <div class="col-12 mt-2 text-center">
                            <h1>{{ profile?.name }}</h1>
                        </div>
                        <div class="col-6 d-flex justify-content-center">
                            <button class="btn tip-button elevation-2 rounded-pill px-4">Tip</button>
                        </div>
                        <div class="col-6 d-flex justify-content-center">
                            <button class="btn review-button elevation-2 rounded-pill" data-bs-toggle="offcanvas"
                                data-bs-target="#reviewOffcanvas" aria-controls="reviewOffcanvas">Review</button>
                        </div>
                    </div>
                    <!-- FIXME currently displays ALL profiles, needs to display only those that have reviewed this profile -->
                    <div class="row justify-content-center mt-3">
                        <div v-for="r in reviews" class="col-11 employee-card rounded elevation-5 p-2 mb-4 col-md-8">
                            <router-link :to="{ name: 'Profile', params: { profileId: r.creatorId } }" class="text-light">
                                <div class="row">
                                    <div class="col-4 d-flex align-items-center">
                                        <img class="profile-picture-small selectable" :src="r.creator.picture"
                                            :alt="r.creator.picture">
                                    </div>
                                    <div class="col-8">
                                        <p>{{ r.creator.name }}<br>{{ r.rating }}<br>{{ r.review }}</p>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- SECTION offcanvas with review form -->
    <div class="offcanvas offcanvas-top review-offcanvas" tabindex="-1" id="reviewOffcanvas"
        aria-labelledby="offcanvasRightLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasRightLabel">New Review</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <form @submit.prevent="leaveReview()">
                <div class="mb-3">
                    <label for="rating" class="form-label">Rate {{ profile?.name }}'s Service</label>
                    <div class="d-flex justify-content-between">
                        <i class="mdi mdi-numeric-0-circle-outline"></i><i class="mdi mdi-numeric-5-circle-outline"></i>
                    </div>
                    <input type="range" class="form-range" min="0" max="5" step="0.5" id="rating" v-model="editable.rating"
                        required>
                </div>
                <div class="mb-3">
                    <label for="review-body" class="form-label">Leave {{ profile?.name }} a comment</label>
                    <textarea class="form-control" id="body" maxlength="500" rows="3" v-model="editable.body"></textarea>
                </div>
                <div class="text-end">
                    <button class="btn review-button" data-bs-dismiss="offcanvas" type="submit">Submit</button>
                </div>
            </form>
        </div>
    </div>
    <!-- SECTION review offcanvas end -->
</template>


<script>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import ProfileCard from '../components/ProfileCard.vue';
import { profilesService } from '../services/ProfilesService.js';
import Pop from '../utils/Pop.js';

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

        async function getReviewsByProfileId() {
            try {
                const profileId = route.params.profileId
                await profilesService.getReviewsByProfileId(profileId)
            } catch (error) {
                Pop.error('[GETTING REVIEWS BY PROFILEID]', error)
            }
        }

        onMounted(() => {
            getProfileById();
            generateQRCode();
            getReviewsByProfileId();
        });
        return {
            editable,
            QRCode: computed(() => AppState.QRCode),
            profile: computed(() => AppState.profile),
            reviews: computed(() => AppState.reviews),

            async leaveReview() {
                try {
                    const profileId = route.params.profileId
                    const reviewData = editable.value
                    await profilesService.leaveReview(reviewData, profileId)
                } catch (error) {
                    Pop.error('[LEAVING REVIEW]', error)
                }
            }
        };
    },
    components: { ProfileCard }
}
</script>


<style lang="scss" scoped>
.profile-picture {
    height: 20em;
    width: 100%;
    object-fit: cover;
    object-position: center;
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

.review-offcanvas {
    height: 50vh;
}
</style>