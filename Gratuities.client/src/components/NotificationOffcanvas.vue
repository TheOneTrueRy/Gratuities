<template>
    <div class="RateProfileOffcanvas">
        <div class="offcanvas offcanvas-end" :class="theme ? '' : 'text-bg-dark'" tabindex="-1" id="notificationOffcanvas"
            aria-labelledby="offcanvasRightLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasRightLabel">Notifications</h5>
                <button v-if="notification.length > 0" type="button" @click="clearNotifications()" class="btn"
                    :class="theme ? 'btn-outline-dark' : 'btn-outline-light'" data-bs-dismiss="offcanvas"
                    aria-label="Close">Mark All As Read</button>
                <button v-else type="button" class="btn-close" :class="theme ? '' : 'btn-close-light'"
                    data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div class="container-fluid">
                    <div class="row">
                        <div v-if="notification.length > 0" class="col-12 d-flex align-items-center"
                            v-for="n in notification">
                            <div class="w-100" data-bs-dismiss="offcanvas" aria-label="Close">
                                <NotificationCard :notification="n" />
                            </div>
                        </div>
                        <div v-else>
                            <div class="text-center">
                                <span>No Unread Notifications</span>
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
            theme: computed(() => AppState.account.theme),
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