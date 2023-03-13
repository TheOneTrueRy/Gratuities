<template>
    <div class="ReviewCard">
        <div class="row align-items-center">
            <div class="col-3">
                <router-link :to="{ name: 'Profile', params: { profileId: review.creatorId } }" class="text-light">
                    <img class="profile-picture-small selectable" :src="review.creator.picture"
                        :alt="review.creator.picture">
                </router-link>
            </div>
            <div class="col-8">
                <h6 class="text-start">{{ review.creator.name }} | {{ review.rating }} Stars
                </h6>
                <div class="scroller">
                    <span>"{{ review.body }}"</span>
                </div>
            </div>
            <div class="col-1 d-flex justify-content-end align-self-start">
                <span v-if="review.creator.id == account.id" class="text-end">
                    <button @click="deleteReview(review.id)" class="btn btn-close btn-sm text-danger delete-button"
                        title="Delete"></button>
                </span>
            </div>
        </div>
    </div>
</template>


<script>
import { computed, onMounted, watchEffect, ref } from 'vue';
import { AppState } from "../AppState";
import { Review } from "../models/Review.js";
import { ratingsService } from '../services/RatingsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

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
            async deleteReview(reviewId) {
                try {
                    if (await Pop.confirm("Are you sure you'd like to delete this review?")) {
                        await ratingsService.deleteReview(reviewId)
                    }
                } catch (error) {
                    Pop.error(error.message)
                    logger.error(error)
                }
            }
        }
    }
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
}
</style>