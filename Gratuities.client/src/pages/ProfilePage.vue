<template>
    <div class="ProfilePage">
        <div class="container-fluid">
            <div class="row mt-1">
                <div class="col-12">
                    <div class="row align-items-center">
                        <div class="col-6">
                            <div class="h1"><i class="mdi mdi-star star-yellow star-shadow"></i><i
                                    class="mdi mdi-star star-yellow star-shadow"></i>
                                <i class="mdi mdi-star star-yellow star-shadow"></i><i class="mdi mdi-star-outline"></i><i
                                    class="mdi mdi-star-outline"></i>
                            </div>
                        </div>
                        <div class="col-6 text-end">
                            <div class="btn dropstart">
                                <button class="btn btn-secondary-outline btn-sm dropdown-toggle fs-4" type="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    ...
                                </button>
                                <ul class="dropdown-menu text-center">
                                    Add to business.
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-11">
                            <div id="profileCarousel" class="carousel slide">
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img :src="profile?.picture" class="d-block rounded w-100" :alt="profile?.picture">
                                    </div>
                                    <div class="carousel-item">
                                        <img :src="QRCode" class="d-block w-100 rounded" :alt="QRCode">
                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#profileCarousel"
                                    data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon visually-hidden" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#profileCarousel"
                                    data-bs-slide="next">
                                    <span class="carousel-control-next-icon visually-hidden" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                        <div class="col-12 mt-2 text-center">
                            <h1>{{ profile?.name }}</h1>
                        </div>
                        <div class="col-6 d-flex justify-content-center">
                            <button class="btn tip-button elevation-2 rounded-pill px-4">Tip</button>
                        </div>
                        <div class="col-6 d-flex justify-content-center">
                            <button class="btn review-button elevation-2 rounded-pill">Review</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState.js';
import { profilesService } from '../services/ProfilesService.js';
import Pop from '../utils/Pop.js';

export default {
    setup() {
        const route = useRoute()

        async function generateQRCode() {
            try {
                const profileId = route.params.profileId
                await profilesService.generateQRCode(profileId)
            } catch (error) {
                Pop.error('[GENERATING QR CODE]', error)
            }
        }

        async function getProfileById() {
            try {
                const profileId = route.params.profileId
                await profilesService.getProfileById(profileId)
            } catch (error) {
                Pop.error('[GETTING PROFILE BY ID]', error)
            }
        }

        onMounted(() => {
            generateQRCode()
            getProfileById()
        })
        return {
            QRCode: computed(() => AppState.QRCode),
            profile: computed(() => AppState.profile)
        }
    }
}
</script>


<style lang="scss" scoped>
.star-yellow {
    color: #FFD166;
}

.star-shadow {
    text-shadow: 1px 1px 2px black;
}

.tip-button{
    background-color: #06D6A0;
    color: white;
    text-shadow: 1px 1px 2px black;
}

.review-button{
    background-color: #EF476F;
    color: white;
    text-shadow: 1px 1px 2px black;
}
</style>