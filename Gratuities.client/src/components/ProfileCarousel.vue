<template>
    <div class="ProfileCarousel">
        <div id="profileCarousel" class="carousel slide">
            <div class="carousel-inner">
                <div class="carousel-item active text-center">
                    <img :src="profile?.picture" class="rounded profile-picture" :alt="profile?.picture">
                </div>
                <div class="carousel-item text-center">
                    <img :src="QRCode" class="profile-picture" :alt="QRCode">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#profileCarousel" data-bs-slide="prev">
                <span class="carousel-control-prev-icon d-none d-md-block" aria-hidden="true"><i
                        class="mdi mdi-arrow-left fs-1 text-dark" v-if="theme"></i></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#profileCarousel" data-bs-slide="next">
                <span class="carousel-control-next-icon d-none d-md-block" aria-hidden=""><i
                        class="mdi mdi-arrow-right fs-1 text-dark" v-if="theme"></i></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
</template>


<script>
import { AppState } from '../AppState.js'
import { computed } from "vue";

export default {
    setup() {
        return {
            QRCode: computed(() => AppState.QRCode),
            profile: computed(() => AppState.profile),
            theme: computed(() => AppState.account.theme)
        }
    }
}
</script>


<style lang="scss" scoped>
.profile-picture {
    height: 20em;
    width: auto;
    object-fit: cover;
    object-position: center;
    background-position: center;
}
</style>