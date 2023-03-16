<template>
    <div class="BusinessCard p-2 rounded" :class="theme ? 'employee-card' : 'employee-card-dark'">
        <router-link :to="{ name: 'Business', params: { businessId: business.id } }" class="text-light">
            <div class="row align-items-center">
                <div class="col-3">
                    <img class="profile-picture-small" :src="business.logo" :alt="business.logo">
                </div>
                <div class="d-flex align-items-center hide-overflow">
                    <span class="hide-overflow">
                        <h6>{{ business?.name }} | <ProfileStarRating :rating="business.rating">
                            </ProfileStarRating>
                        </h6>
                    </span>
                </div>
                <div class="col-9">
                    {{ business?.location }}
                </div>
            </div>
        </router-link>
    </div>
</template>


<script>
import { AppState } from '../AppState.js';
import { computed } from 'vue';
import { Business } from '../models/Business.js';
import ProfileStarRating from './ProfileStarRating.vue';

export default {
    props: {
        business: {
            type: Business,
            required: true
        }
    },
    setup() {
        return {
            businessRating: computed(() => AppState.businessRating),
            theme: computed(() => AppState.theme),
        };
    },
    components: { ProfileStarRating, ProfileStarRating }
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