<template>
    <div class="RateProfileOffcanvas">
        <div class="offcanvas offcanvas-end " tabindex="-1" id="notificationOffcanvas"
            aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasRightLabel">Notifications</h5>
                <button type="button" @click="clearNotifications()" class="btn-close" data-bs-dismiss="offcanvas"
                    aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div class="container">
                    <div class="row">
                        <div class="col-12 d-flex align-items-center" v-for="n in notification">
                            <div class="selectable" data-bs-dismiss="offcanvas" aria-label="Close">
                                <NotificationCard :notification="n" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
import { AppState } from '../AppState.js'
import { ref, computed } from "vue";
import { useRoute } from 'vue-router';
import Pop from '../utils/Pop.js';
import { profilesService } from '../services/ProfilesService.js';
import ProfileStarRating from './ProfileStarRating.vue';
import { notificationsService } from '../services/NotificationsService';
import NotificationCard from './NotificationCard.vue';

export default {
    setup() {
        return {
            account: computed(() => AppState.account),
            notification: computed(() => AppState.notifications),
            async clearNotifications() {
                try {
                    await notificationsService.clearNotifications();
                }
                catch (error) {
                    Pop.error(error);
                }
            }
        };
    },
    components: { ProfileStarRating, NotificationCard }
}
</script>


<style lang="scss" scoped></style>