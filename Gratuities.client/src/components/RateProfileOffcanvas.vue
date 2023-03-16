<template>
    <div class="RateProfileOffcanvas">
        <div class="offcanvas offcanvas-top review-offcanvas" :class="theme ? '' : 'text-bg-dark'" tabindex="-1"
            id="reviewOffcanvas" aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasRightLabel">New Review</h5>
                <button type="button" class="btn-close" :class="theme ? '' : 'btn-close-white'" data-bs-dismiss="offcanvas"
                    aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <form @submit.prevent="leaveReview()">
                    <div class="mb-3">
                        <label for="rating" class="form-label">Rate {{ profile?.name }}'s Service</label>
                        <div class="d-flex justify-content-center canvas-settings">
                            <input type="range" class="star-bar" min="0.5" max="5" step="0.5" id="rating"
                                v-model="editable.rating" required>
                            <span class="fs-2 star-shift">

                                <span v-if="editable.rating == 0.5"><i class="mdi mdi-star-half-full star"></i><i
                                        class="mdi mdi-star-outline star"></i><i class="mdi mdi-star-outline star"></i><i
                                        class="mdi mdi-star-outline star"></i><i class="mdi mdi-star-outline star"></i>
                                </span>
                                <span v-else-if="editable.rating == 1"><i class="mdi mdi-star star"></i><i
                                        class="mdi mdi-star-outline star"></i><i class="mdi mdi-star-outline star"></i><i
                                        class="mdi mdi-star-outline star"></i><i class="mdi mdi-star-outline star"></i>
                                </span>
                                <span v-else-if="editable.rating == 1.5"><i class="mdi mdi-star star"></i><i
                                        class="mdi mdi-star-half-full star"></i><i class="mdi mdi-star-outline star"></i><i
                                        class="mdi mdi-star-outline star"></i><i class="mdi mdi-star-outline star"></i>
                                </span>
                                <span v-else-if="editable.rating == 2"><i class="mdi mdi-star star"></i><i
                                        class="mdi mdi-star star"></i><i class="mdi mdi-star-outline star"></i><i
                                        class="mdi mdi-star-outline star"></i><i class="mdi mdi-star-outline star"></i>
                                </span>
                                <span v-else-if="editable.rating == 2.5"><i class="mdi mdi-star star"></i><i
                                        class="mdi mdi-star star"></i><i class="mdi mdi-star-half-full star"></i><i
                                        class="mdi mdi-star-outline star"></i><i class="mdi mdi-star-outline star"></i>
                                </span>
                                <span v-else-if="editable.rating == 3"><i class="mdi mdi-star star"></i><i
                                        class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i
                                        class="mdi mdi-star-outline star"></i><i class="mdi mdi-star-outline star"></i>
                                </span>
                                <span v-else-if="editable.rating == 3.5"><i class="mdi mdi-star star"></i><i
                                        class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i
                                        class="mdi mdi-star-half-full  star"></i><i class="mdi mdi-star-outline star"></i>
                                </span>
                                <span v-else-if="editable.rating == 4"><i class="mdi mdi-star star"></i><i
                                        class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i
                                        class="mdi mdi-star star"></i><i class="mdi mdi-star-outline star"></i>
                                </span>
                                <span v-else-if="editable.rating == 4.5"><i class="mdi mdi-star star"></i><i
                                        class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i
                                        class="mdi mdi-star star"></i><i class="mdi mdi-star-half-full star"></i>
                                </span>
                                <span v-else-if="editable.rating == 5"><i class="mdi mdi-star star"></i><i
                                        class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i
                                        class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i></span>
                                <span v-else="rating">No Ratings Yet</span>

                            </span>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="review-body" class="form-label">Leave {{ profile?.name }} a comment</label>
                        <textarea class="form-control" id="body" maxlength="500" rows="3"
                            v-model="editable.body"></textarea>
                    </div>
                    <div class="text-end">
                        <button class="btn review-button" data-bs-dismiss="offcanvas" type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </div>

    </div>
</template>


<script>
import { AppState } from '../AppState.js'
import { ref, computed } from "vue";
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { profilesService } from '../services/ProfilesService.js';
import ProfileStarRating from './ProfileStarRating.vue';

export default {
    setup() {
        const editable = ref({
            rating: 2.5
        });
        const route = useRoute();
        return {
            editable,
            profile: computed(() => AppState.profile),
            async leaveReview() {
                try {
                    const profileId = route.params.profileId;
                    const reviewData = editable.value;
                    await profilesService.leaveReview(reviewData, profileId);
                    editable.value = { rating: 2.5 }
                    Pop.success('You successfully left a review')
                }
                catch (error) {
                    Pop.error("[LEAVING REVIEW]", error);
                }
            },
            theme: computed(() => AppState.account.theme)
        };
    },
    components: { ProfileStarRating }
}
</script>


<style lang="scss" scoped>
input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;

    height: 0%;
    width: 0px;
    border-radius: 0px;
    background: #ffffff00;
    cursor: pointer;
    margin-top: 1000px;
    /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic */
    box-shadow: 1px 1px 1px #00000000, 0px 0px 1px #0d0d0d;
    /* Add cool effects to your sliders! */
}

input[type=range] {
    -webkit-appearance: none;
    /* Hides the slider so that custom slider can be made */

    background-color: #0d0d0d00;
    border: none;
    /* Specific width is required for Firefox. */
    background: transparent;

    /* Otherwise white in Chrome */
}


.review-offcanvas {
    height: 55vh;
}

.canvas-settings {
    height: 30px;
    overflow-y: hidden;
}

.star-shift {
    position: absolute;
    // transform: translateX(25px);

    transform: translateZ(-8);
}

.star-bar {
    color: rgba(0, 0, 0, 0);
    background-color: #ef476e00;
    transform: translateZ(8);
    z-index: 1000;

}

.review-button {
    background-color: #EF476F;
    color: white;
    text-shadow: 1px 1px 2px black;
}
</style>