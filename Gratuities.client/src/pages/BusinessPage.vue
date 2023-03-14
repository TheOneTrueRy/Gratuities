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
            <!-- SECTION employees placeholders -->
            <div v-for="e in employees">
                <ProfileCard :profile='e' />
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
                        <input type="text" class="form-control" minlength="3" maxlength="50" required
                            v-model="editable2.name">
                    </div>
                    <div class="mb-3" v-if="business?.name">
                        <label for="coverImg" class="form-label">CoverImg</label>
                        <input type="text" class="form-control" minlength="3" maxlength="500" required
                            v-model="editable2.coverImg">
                    </div>
                    <div class="mb-3" v-if="business?.name">
                        <label for="logo" class="form-label">Logo</label>
                        <input type="text" class="form-control" minlength="3" maxlength="500" required
                            v-model="editable2.logo">
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
import { computed, onMounted, watchEffect, ref, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import ProfileCard from '../components/ProfileCard.vue';
import ProfileStarRating from '../components/ProfileStarRating.vue';
import { businessesService } from '../services/BusinessesService';
import { employeesService } from '../services/EmployeesService';
import { tipsService } from '../services/TipsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {
    setup() {
        const editable = ref({});
        const editable2 = ref({
            name: AppState.business?.name,
            coverImg: AppState.business?.coverImg,
            logo: AppState.business?.logo,
        })
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
            // tipsService.getTipsReceived()
        });
        onUnmounted(() => {
            AppState.business = null
        })
        watchEffect(async () => {
            if (route.params.businessId) {
                getBusinessById();
                // getBusinessRating()
            }

            if (AppState.account.id && !AppState.hasNotifications) {
                await accountService.getMyReviews()
                await tipsService.getTipsReceived()
                await notificationsService.findNotifications()

            }
        });
        return {
            editable,
            editable2,
            editable3,
            async search() {
                try {
                    let query = editable3.value;
                    const businessId = route.params.businessId
                    await employeesService.getEmployeeByQuery(query, businessId);
                }
                catch (error) {
                    Pop.error("SEARCHING FOR BUSINESSES", error);
                }
            },
            business: computed(() => AppState.business),
            account: computed(() => AppState.account),
            employees: computed(() => AppState.employees),
            profiles: computed(() => AppState.profiles),
            async editBusiness(businessId) {
                try {
                    const formData = editable2.value;
                    await businessesService.editBusiness(formData, businessId);
                }
                catch (error) {
                    Pop.error(error.message);
                    logger.error(error);
                }
            },

        };
    },
    components: { ProfileCard, ProfileStarRating }
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
}</style>