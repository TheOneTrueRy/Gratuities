<template>
    <div v-if="notification?.tip" class="mb-2">
        <router-link :to="{ name: 'Profile', params: { profileId: notification?.giverId } }" :class="theme ? 'text-dark' : 'text-light'">
            <div class="row align-items-center selectable p-2 rounded">
                <div class="col-3 g-0 text-center">
                    <img class="profile-picture-small" :src="notification.giver?.picture" :alt="notification.giver?.name">
                </div>
                <div class="col-9 pt-2">
                    <div class="d-flex align-items-center">
                        <p class="m-0">
                            {{ notification.giver?.name }} tipped you <span class="tip-text">₲{{ notification?.tip
                            }}.</span>
                        </p>
                    </div>
                    <div class="timestamp pt-1">
                        <p>{{ notification?.createdAt }}</p>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
    <div v-else class="ReviewCard">
        <div class="mb-2">
            <router-link :to="{ name: 'Profile', params: { profileId: notification?.creatorId } }" class="text-dark">
                <div class="row align-items-center selectable p-2 rounded">
                    <div class="col-3 g-0 text-center">
                        <img class="profile-picture-small selectable" :src="notification.creator?.picture"
                            :alt="notification.creator?.picture">
                    </div>
                    <div class="col-9 pt-2">
                        <div class="d-flex align-items-center">
                            <span class="text-start">{{ notification.creator?.name }} |&nbsp;
                            </span>
                            <span>
                                <ProfileStarRating :rating="notification?.rating"></ProfileStarRating>
                            </span>
                        </div>
                        <div class="scroller">
                            <span>{{ notification?.body }}</span>
                            <div class="timestamp pt-1">
                                <p>{{ notification?.createdAt }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState';


export default {
    props: {
        notification: { type: Object, required: true }
    },
    setup() {
        return {
            theme: computed(() => AppState.account.theme)
        };
    },
}
</script>


<style lang="scss" scoped>
.profile-picture {
    height: 8vh;
    width: 8vh;
    border-radius: 50%;
    object-fit: cover;
    background-position: center;
}

.tip-text {
    color: #018835;
    text-shadow: 1px 1px 1px black;
}

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

.timestamp {
    font-size: small;
}
</style>