<template>
    <div>
        <div class="d-flex align-items-center flex-column">
            <div class="dropdown ps-2">
                <img class="business-logo" :src="business.logo" alt="" data-bs-toggle="dropdown">
                <ul class="dropdown-menu">
                    <li>
                        <router-link :to="{ name: 'Business', params: { businessId: business._id } }">
                            <a class="dropdown-item">Go To Business</a>
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

export default {
    props: {
        business: { type: Object, required: true }
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
}
</style>