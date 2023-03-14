<template>
    <div>
        <div class="d-flex align-items-center flex-column">
            <div class="dropdown ps-2">
                <img class="business-logo elevation-1" :src="business?.logo" alt="" data-bs-toggle="dropdown">
                <ul class="dropdown-menu">
                    <li>
                        <router-link :to="{ name: 'Business', params: { businessId: business?.id } }">
                            <span class="dropdown-item">Go To Business</span>
                        </router-link>
                    </li>
                    <li><a @click="removeBusiness(business.id)" class="dropdown-item">Remove</a></li>
                </ul>
            </div>
            <div class="mt-1">
                <h3>{{ business.name }}</h3>
            </div>
        </div>
    </div>
</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
import { Business } from "../models/Business.js";
import { businessesService } from '../services/BusinessesService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {
    props: {
        business: { type: Business, required: true }
    },
    setup() {
        return {
            account: computed(() => AppState.account),
            async removeBusiness(businessId) {
                try {
                    if (await Pop.confirm('Are you sure you want to remove this business?')) {
                        await businessesService.removeBusiness(businessId)
                    }
                } catch (error) {
                    Pop.error(error.message)
                    logger.error(error)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.business-logo {
    border: 2px solid black;
    width: 16vh;
    height: 16vh;
    border-radius: 50%;
    object-fit: cover;
    background-position: center;
    cursor: pointer;
    transition: 0.5s;
}

.business-logo:hover {
    transform: scale(1.1);
}
</style>