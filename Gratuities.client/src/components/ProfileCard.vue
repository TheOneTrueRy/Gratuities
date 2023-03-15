<template>
    <div class="ProfileCard rounded elevation-5 mb-4 py-2 px-2">
        <div class="row">
            <div class="col-3 d-flex align-items-center">
                <router-link :to="{ name: 'Profile', params: { profileId: profile?.id } }" class="text-light">
                    <img class="profile-picture-small" :src="profile?.picture" :alt="profile?.picture"
                        :title="`Visit ${profile?.name}'s profile page!`">
                </router-link>
            </div>
            <div class="col-8">
                <div class="d-flex align-items-center hide-overflow">
                    <span class="hide-overflow">{{ profile?.name }} | <ProfileStarRating :rating="profile.rating">
                        </ProfileStarRating>
                    </span>
                </div>
                <div class="scroller" v-if="profile.bio">
                    <span>"{{ profile?.bio }}"</span>
                </div>
            </div>
            <div v-if="business" class="col-1 d-flex justify-content-end align-self-start">
                <span v-if="business.ownerId == account.id" class="text-end">
                    <button @click="removeEmployee(profile?.employeeId)"
                        class="btn btn-close btn-sm text-danger delete-button" title="Delete"></button>
                </span>
            </div>
        </div>
    </div>
</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
import { Profile } from '../models/Profile.js';
import { employeesService } from '../services/EmployeesService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import ProfileStarRating from "./ProfileStarRating.vue";

export default {
    props: {
        profile: {
            type: Profile,
            required: true
        }
    },
    setup() {
        return {
            business: computed(() => AppState.business),
            account: computed(() => AppState.account),
            async removeEmployee(employeeId) {
                try {
                    logger.log('employeeId:', employeeId)
                    if (await Pop.confirm('Are you sure you want to remove this employee?')) {
                        await employeesService.removeEmployee(employeeId)
                    }
                } catch (error) {
                    Pop.error(error.message)
                    logger.log(error)
                }
            }
        };
    },
    components: { ProfileStarRating }
}
</script>


<style lang="scss" scoped>
.ProfileCard {
    background-color: #06D6A0;
    color: white;
    text-shadow: 1px 1px 2px black;
    transition: 0.5s;
    cursor: pointer;
}

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

.hide-overflow {
    overflow-x: hidden;
}
</style>