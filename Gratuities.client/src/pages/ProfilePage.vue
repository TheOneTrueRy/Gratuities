<template>
    <div class="ProfilePage">
        <h1 class="text-dark">
            hello from profile page
        </h1>
    </div>
</template>


<script>
import { profilesService } from '../services/ProfilesService.js';
import Pop from '../utils/Pop.js';

export default {
    setup() {

        async function generateQRCode() {
            try {
                await profilesService.generateQRCode()
            } catch (error) {
                Pop.error('[GENERATING QR CODE]', error)
            }
        }
        return {}
    }
}
</script>


<style lang="scss" scoped></style>