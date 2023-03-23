<template>
    <div class="ReviewCard rounded p-2" :class="theme ? 'employee-card' : 'employee-card-dark'">
        <div class="row align-items-center">
            <div class="col-3">
                <router-link :to="{ name: 'Profile', params: { profileId: review?.creatorId } }" class="text-light">
                    <img class="profile-picture-small selectable" :src="review.creator?.picture"
                        :alt="review.creator?.picture" onerror="this.src='broken-image.png'">
                </router-link>
            </div>

            <div class="col-8 pt-3">
                <div class="d-flex align-items-center">
                    <span class="text-start">{{ review.creator?.name }} | <ProfileStarRating :rating="review?.rating">
                        </ProfileStarRating>
                    </span>
                </div>
                <div class="scroller">
                    <span v-if="review?.body">"{{ review?.body }}"</span>
                    <div class="timestamp pt-1">
                        <p>{{ review?.createdAt }}</p>
                    </div>
                </div>
            </div>

            <div class="col-1 d-flex justify-content-end align-self-start">
                <span v-if="review.creator?.id == account.id" class="text-end">
                    <button @click="deleteReview(review.id)" class="btn btn-close btn-sm text-danger delete-button"
                        title="Delete"></button>
                </span>
            </div>
        </div>
    </div>
</template>


<script>
import { computed } from 'vue';
import { AppState } from "../AppState";
import { Review } from "../models/Review.js";
import { ratingsService } from '../services/RatingsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import ProfileStarRating from "./ProfileStarRating.vue";

export default {
    props: {
        review: {
            type: Review,
            required: true
        }
    },
    setup() {
        return {
            account: computed(() => AppState.account),
            theme: computed(() => AppState.account.theme),

            async deleteReview(reviewId) {
                try {
                    if (await Pop.confirm("Are you sure you'd like to delete this review?")) {
                        await ratingsService.deleteReview(reviewId);
                    }
                }
                catch (error) {
                    Pop.error(error.message);
                    logger.error(error);
                }
            }
        };
    },

    components: { ProfileStarRating }
}
</script>


<style lang="scss" scoped>
.delete-button {
    height: 3vh;
}

.scroller {
    height: 75%;
    overflow-y: scroll;
}

.scroller::-webkit-scrollbar {
    display: none;
}

.profile-picture-small {
    height: 10vh;
    width: 10vh;
    border-radius: 50%;
    border: 2px solid black;
    user-select: none;
    cursor: pointer;
    transition: 0.5s;
}

.profile-picture-small:hover {
    transform: scale(1.1);
}

.profile-picture-small:active {
    transform: scale(0.8);
}

.timestamp {
    font-size: small;
}
</style>