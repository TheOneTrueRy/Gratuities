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
                    <li><a class="dropdown-item" href="#">Edit</a></li>
                    <li><a class="dropdown-item" href="#">Remove</a></li>
                </ul>
            </div>
            <div>
                <h3><i class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i
                        class="mdi mdi-star-outline"></i><i class="mdi mdi-star-outline"></i></h3>
            </div>
        </div>
    </div>
</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
import { Business } from "../models/Business.js";

export default {
    props: {
        business: { type: Business, required: true }
    },

    setup() {
        return {
            account: computed(() => AppState.account)
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