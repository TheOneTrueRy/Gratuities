<template>
    <div class="ReviewCard">
        <router-link :to="{ name: 'Profile', params: { profileId: review.creatorId } }" class="text-light">
            <div class="row align-items-center py-2">
                <div class="col-3">
                    <img class="profile-picture-small selectable" :src="review.creator.picture"
                        :alt="review.creator.picture">
                </div>
                <div class="col-9">
                    <h6 class="text-center">{{ review.creator.name }} | {{ review.rating }} Stars</h6>
                    <div class="scroller">
                        <p>"{{ review.body }}"</p>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>


<script>
import { Review } from "../models/Review.js";

export default {
    props: {
        review: {
            type: Review,
            required: true
        }
    },
    setup() {
        return {}
    }
}
</script>


<style lang="scss" scoped>
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
</style>