<template>
    <div class="RateProfileOffcanvas">
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
                        <div class="d-flex justify-content-center">
                            <span class="fs-5">{{ editable.rating }}</span>
                        </div>
                        <input type="range" class="form-range" min="0.5" max="5" step="0.5" id="rating"
                            v-model="editable.rating" required>
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

export default {
    setup() {
        const editable = ref({
            rating: 2.5
        })
        const route = useRoute()

        return {
            editable,
            profile: computed(() => AppState.profile),

            async leaveReview() {
                try {
                    const profileId = route.params.profileId
                    const reviewData = editable.value
                    await profilesService.leaveReview(reviewData, profileId)
                } catch (error) {
                    Pop.error('[LEAVING REVIEW]', error)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.review-offcanvas {
    height: 55vh;
}

.review-button {
    background-color: #EF476F;
    color: white;
    text-shadow: 1px 1px 2px black;
}
</style>