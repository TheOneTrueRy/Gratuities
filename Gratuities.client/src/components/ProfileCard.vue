<template>
    <div class="ProfileCard">
        <router-link :to="{ name: 'Profile', params: { profileId: profile?.id } }" class="text-light">
            <div class="row">
                <div class="col-3 d-flex align-items-center">
                    <img class="profile-picture-small" :src="profile?.picture" :alt="profile?.picture">
                </div>
                <div class="col-9">
                    <h6 class="text-start">{{ profile?.name }} | {{ profile?.rating ? profile?.rating : 'No Ratings Yet' }}
                    </h6>
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

export default {
    props: {
        profile: {
            type: Profile,
            required: true
        }
    },
    setup() {
        return {}
    }
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