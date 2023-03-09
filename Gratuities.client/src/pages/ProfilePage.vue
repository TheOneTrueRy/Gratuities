<template>
    <div class="ProfilePage">
        <h1 class="text-dark">
            <img :src="QRCode" alt="">
        </h1>
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
            QRCode: computed(() => AppState.QRCode)
        }
    }
}
</script>


<style lang="scss" scoped></style>