<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 g-0 d-flex justify-content-center">
                <img class="coverImg" :src="business?.coverImg" alt="">
            </div>
            <div class="col-12 d-flex justify-content-center">
                <span class="move-logo text-center">
                    <img class="business-logo" :src="business?.logo" alt="">
                    <h1>{{ business?.name }}</h1>
                    <h3 class=""><i class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i
                            class="mdi mdi-star star"></i><i class="mdi mdi-star-outline"></i><i
                            class="mdi mdi-star-outline"></i></h3>
                </span>
            </div>
            <div class="col-12 col-md-6 offset-md-3">
                <h2>Top Rated Employees:</h2>
                <form class="mb-4" @submit.prevent="search()">
                    <div class="input-group">
                        <input v-model="editable.query" required class="form-control" placeholder="Search Employees"
                            aria-describedby="button-addon2" aria-label="Search Employees" type="text">
                        <button class="btn btn-outline-secondary" type="submit" id="button-addon2">
                            <i class="mdi mdi-magnify"></i>
                        </button>
                    </div>
                </form>
            </div>
            <!-- SECTION employees placeholders -->
            <div>
                <div class="rounded col-12 col-md-6 offset-md-3 tips my-2">
                    <div class="row align-items-center">
                        <div class="col-3">
                            <img class="profile-picture" :src="account?.picture" :alt="account?.name">
                        </div>
                        <div class="col-9">
                            <p>
                                {{ account?.name }}
                                <br>
                                <i class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i
                                    class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i
                                    class="mdi mdi-star star"></i>
                                <br>
                                "Customer service is my passion"
                            </p>
                        </div>
                    </div>
                </div>
                <div class="rounded col-12 col-md-6 offset-md-3 tips my-2">
                    <div class="row align-items-center">
                        <div class="col-3">
                            <img class="profile-picture" :src="account?.picture" :alt="account?.name">
                        </div>
                        <div class="col-9">
                            <p>
                                {{ account?.name }}
                                <br>
                                <i class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i
                                    class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i
                                    class="mdi mdi-star star"></i>
                                <br>
                                "Customer service is my passion"
                            </p>
                        </div>
                    </div>
                </div>
                <div class="rounded col-12 col-md-6 offset-md-3 tips my-2">
                    <div class="row align-items-center">
                        <div class="col-3">
                            <img class="profile-picture" :src="account?.picture" :alt="account?.name">
                        </div>
                        <div class="col-9">
                            <p>
                                {{ account?.name }}
                                <br>
                                <i class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i
                                    class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i
                                    class="mdi mdi-star star"></i>
                                <br>
                                "Customer service is my passion"
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>


<script>
import { computed, onMounted, watchEffect, ref } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { businessesService } from '../services/BusinessesService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {
    setup() {
        const editable = ref({})
        const route = useRoute();
        async function getBusinessById() {
            try {
                const businessId = route.params.businessId
                await businessesService.getBusinessById(businessId)
            } catch (error) {
                Pop.error(error.message)
                logger.error(error)
            }
        }
        onMounted(() => {
            getBusinessById()
        })
        watchEffect(() => {
            if (route.params.businessId) {
                getBusinessById()
            }
        })
        return {
            editable,
            business: computed(() => AppState.business),
            account: computed(() => AppState.account),
        }
    }
}
</script>


<style lang="scss" scoped>
.coverImg {
    max-height: 32vh;
    object-fit: cover;
    background-position: center;
    width: 100%;
}

.business-logo {

    border: 2px solid black;
    width: 20vh;
    height: 20vh;
    border-radius: 50%;
    object-fit: cover;
    background-position: center;
}

.move-logo {
    transform: translate(0px, -10vh);
}

.profile-picture {
    height: 8vh;
    width: 8vh;
    border-radius: 50%;
    object-fit: cover;
    background-position: center;
}

.tips {
    padding: 1vh;
    background-color: #06D6A0;
    color: white;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.518);
}
</style>