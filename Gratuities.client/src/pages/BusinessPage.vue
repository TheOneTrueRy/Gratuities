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
                    <div v-if="business?.id">
                        <ProfileStarRating :rating="business?.rating" />
                    </div>

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
                        <input v-model="editable3.query" class="form-control" placeholder="Search Employees"
                            aria-describedby="button-addon2" aria-label="Search Employees" type="text">
                        <button class="btn btn-outline-secondary" type="submit" id="button-addon2">
                            <i class="mdi mdi-magnify"></i>
                        </button>
                    </div>
                </form>
            </div>
            <!-- SECTION employees -->
            <div v-for="e in employees">
                <ProfileCard :profile='e' />
            </div>
        </div>
    </div>

    <!-- SECTION edit business offcanvas -->
    <EditBusinessOffcanvas />
</template>


<script>
import { computed, onMounted, watchEffect, ref, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import EditBusinessOffcanvas from '../components/EditBusinessOffcanvas.vue';
import ProfileCard from '../components/ProfileCard.vue';
import ProfileStarRating from '../components/ProfileStarRating.vue';
import { businessesService } from '../services/BusinessesService';
import { employeesService } from '../services/EmployeesService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {
    setup() {
        const editable = ref({});
        const editable3 = ref({});
        const route = useRoute();

        async function getBusinessById() {
            try {
                const businessId = route.params.businessId;
                await businessesService.getBusinessById(businessId);
            }
            catch (error) {
                Pop.error(error.message);
                logger.error(error);
            }
        }

        async function getBusinessRating() {
            try {
                await businessesService.getBusinessRating()
            } catch (error) {
                Pop.error(error.message)
                logger.error(error)
            }
        }

        async function getEmployeesByBusinessId() {
            try {
                const businessId = route.params.businessId;
                await employeesService.getEmployeesByBusinessId(businessId);
                await getBusinessById(businessId)
                getBusinessRating()
            }
            catch (error) {
                Pop.error(error.message);
                logger.error(error);
            }
        }

        onMounted(() => {
            getBusinessById();
            getEmployeesByBusinessId();
        });

        onUnmounted(() => {
            AppState.business = null
        })

        watchEffect(async () => {
            if (route.params.businessId) {
                getBusinessById();
            }
        });

        return {
            editable,
            editable3,

            business: computed(() => AppState.business),
            account: computed(() => AppState.account),
            employees: computed(() => AppState.employees),
            profiles: computed(() => AppState.profiles),
            theme: computed(() => AppState.account.theme),

            async search() {
                try {
                    let query = editable3.value;
                    const businessId = route.params.businessId
                    await employeesService.getEmployeeByQuery(query, businessId);
                }
                catch (error) {
                    Pop.error("SEARCHING FOR BUSINESSES", error);
                }
            }
        };
    },
    components: { ProfileCard, ProfileStarRating, EditBusinessOffcanvas }
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
</style>