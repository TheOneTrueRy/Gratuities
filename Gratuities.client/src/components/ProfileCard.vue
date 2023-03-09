<template>
    <div class="ProfileCard">
        <router-link :to="{ name: 'Profile', params: { profileId: profile.id } }" class="text-light">
            <div class="row">
                <div class="col-4 d-flex align-items-center">
                    <img class="profile-picture-small selectable" :src="profile.picture" :alt="profile.picture">
                </div>
                <div class="col-8">
                    <p>{{ profile.name }}<br>*****<br>{{ profile.bio }}</p>
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
</style>