<template>
    <div class="BusinessCard">
        <router-link :to="{ name: 'Business', params: { businessId: business.id } }" class="text-light">
            <div class="row align-items-center">
                <div class="col-3">
                    <img class="profile-picture-small img-fluid" :src="business.logo" :alt="business.logo">
                </div>
                <div class="col-9">
                    <h6>{{ business.name }}<span v-if="businessRating"> {{ businessRating }}Stars</span></h6>
                    {{ business.location }}
                </div>
                <div class="col-12">
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
            businessRating: computed(() => AppState.businessRating)
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