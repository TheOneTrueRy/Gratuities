<template>
    <div class="ProfileCard">
        <router-link :to="{ name: 'Profile', params: { profileId: profile?.id } }" class="text-light">
            <div class="row">
                <div class="col-3 d-flex align-items-center">
                    <img class="profile-picture-small" :src="profile?.picture" :alt="profile?.picture">
                </div>
                <div class="col-9">
                    <div class="d-flex align-items-center">
                        <span>{{ profile?.name }} |&nbsp;</span>
                        <span>
                            <ProfileStarRating :rating="profile.rating"></ProfileStarRating>
                        </span>
                        <span></span>
                    </div>
                    <div class="scroller">
                        <span>"{{ profile?.bio }}"</span>
                    </div>
                </div>
            </div>
        </router-link>
    </div>
</template>


<script>
import { Profile } from '../models/Profile.js';
import ProfileStarRating from "./ProfileStarRating.vue";

export default {
    props: {
        profile: {
            type: Profile,
            required: true
        }
    },
    setup() {
        return {};
    },
    components: { ProfileStarRating }
}
</script>


<style lang="scss" scoped>
.profile-picture-small {
    height: 10vh;
    width: 10vh;
    border-radius: 50%;
    border: 2px solid black;
}

.scroller {
    height: 75%;
    overflow-y: scroll;
}

.scroller::-webkit-scrollbar {
    display: none;
}
</style>