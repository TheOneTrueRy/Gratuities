<template>
    <div class="BusinessCard elevation-5 mb-4 p-2 rounded" :class="theme ? 'employee-card' : 'employee-card-dark'">
        <router-link :to="{ name: 'Business', params: { businessId: business.id } }" class="text-light">
            <div class="row align-items-center">
                <div class="col-3">
                    <img class="profile-picture-small" :src="business.logo" :alt="business.logo"
                        onerror="this.src='broken-image.png'">
                </div>
                <div class="col-9">
                    <div>
                        <span class="d-flex align-items-center hide-overflow">
                            <h6>{{ business?.name }} | <ProfileStarRating :rating="business.rating">
                                </ProfileStarRating>
                            </h6>
                        </span>
                    </div>
                    <div>
                        {{ business?.location }}
                    </div>
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
            theme: computed(() => AppState.account.theme),
        };
    },
    components: { ProfileStarRating, ProfileStarRating }
}
</script>


<style lang="scss" scoped>
.profile-picture-small {
    height: 12vh;
    width: 12vh;
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
</style>