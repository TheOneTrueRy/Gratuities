<template>
    <div class="ProfilePage">
        <div class="container-fluid">
            <div class="row justify-content-center mt-3">
                <div class="col-11">
                    <div id="profileCarousel" class="carousel slide">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img :src="account.picture" class="d-block w-100 rounded" :alt="account.picture">
                            </div>
                            <div class="carousel-item">
                                <img :src="QRCode" class="d-block w-100 rounded" :alt="QRCode">
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#profileCarousel" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon visually-hidden" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#profileCarousel" data-bs-slide="next">
                            <span class="carousel-control-next-icon visually-hidden" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
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

        onMounted(() => {
            generateQRCode()
        })
        return {
            QRCode: computed(() => AppState.QRCode),
            account: computed(() => AppState.account)
        }
    }
}
</script>


<style lang="scss" scoped></style>