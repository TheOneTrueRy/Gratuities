<template>
    <div v-if="notification.tip" class="rounded col-12 tips my-1">
        <div class="row align-items-center">
            <div class="col-3">
                <img class="profile-picture" :src="notification?.giver.picture" :alt="notification?.giver.name">
            </div>
            <div class="col-9">
                <p>
                    {{ notification?.giver.name }} - ₲{{ notification?.tip }}
                </p>
            </div>
        </div>
    </div>
    <div v-else class="ReviewCard">
        <div class="row align-items-center">
            <div class="col-3">
                <router-link :to="{ name: 'Profile', params: { profileId: review.creatorId } }" class="text-light">
                    <img class="profile-picture-small selectable" :src="review.creator.picture"
                        :alt="review.creator.picture">
                </router-link>
            </div>
            <div class="col-8">
                <div class="d-flex align-items-center">
                    <span class="text-start">{{ review.creator.name }} |&nbsp;
                    </span>
                    <span>
                        <ProfileStarRating :rating="review.rating"></ProfileStarRating>
                    </span>
                </div>
                <div class="scroller">
                    <span>{{ review.body }}</span>
                    <div class="timestamp pt-1">
                        <p>{{ review.createdAt }}</p>
                    </div>
                </div>
            </div>
            <div class="col-1 d-flex justify-content-end align-self-start">

            </div>
        </div>
    </div>
</template>


<script>
export default {
    props: {
        notification: { type: Object, required: true }
    },
    setup() {
        return {}
    }
}
</script>


<style lang="scss" scoped></style>