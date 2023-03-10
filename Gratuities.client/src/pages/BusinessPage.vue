<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 g-0 d-flex justify-content-center">
                <img class="coverImg" :src="business?.coverImg" alt="">
            </div>
            <div class="col-12 d-flex justify-content-center">
                <span class="move-logo text-center">
                    <img class="business-logo" :src="business?.logo" alt="">
                    <h1>{{ business?.name }}
                    </h1>
                    <h3 class=""><i class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i
                            class="mdi mdi-star star"></i><i class="mdi mdi-star-outline"></i><i
                            class="mdi mdi-star-outline"></i></h3>
                    <button v-if="account.id == business?.ownerId" class="w-50 rounded-pill btn btn-outline-success"
                        type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample"
                        aria-controls="offcanvasExample">
                        <i class="mdi mdi-pen"></i>
                    </button>
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
                        <div class="col-9 mt-2">
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
    <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">Edit Business</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <div>
                <form @submit.prevent="editBusiness(business?.id)">
                    <div class="mb-3" v-if="business?.name">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" required v-model="editable2.name">
                    </div>
                    <div class="mb-3" v-if="business?.name">
                        <label for="coverImg" class="form-label">CoverImg</label>
                        <input type="text" class="form-control" required v-model="editable2.coverImg">
                    </div>
                    <div class="mb-3" v-if="business?.name">
                        <label for="logo" class="form-label">Logo</label>
                        <input type="text" class="form-control" required v-model="editable2.logo">
                    </div>
                    <button type="submit" class="btn btn-success">Save Changes</button>
                </form>
            </div>
            <div class="dropdown mt-3">
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
        const editable2 = ref({
            name: AppState.business?.name,
            coverImg: AppState.business?.coverImg,
            logo: AppState.business?.logo,
        })
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
            editable2,
            business: computed(() => AppState.business),
            account: computed(() => AppState.account),
            async editBusiness(businessId) {
                try {
                    const formData = editable2.value
                    await businessesService.editBusiness(formData, businessId)
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
.figma-buttons {
    background-color: #ef476eaf;
}

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