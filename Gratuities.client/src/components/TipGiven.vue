<template>
    <router-link :to="{ name: 'Profile', params: { profileId: tip?.receiver.id } }" class="text-light">
        <div class="rounded col-12 tips my-1" :class="theme ? 'employee-card' : 'employee-card-dark'">
            <div class="row align-items-center p-2 mb-2">
                <div class="col-3">
                    <img class="profile-picture border border-dark border-1" :src="tip?.receiver.picture"
                        :alt="tip?.receiver.name" onerror="this.src='broken-image.png'">
                </div>
                <div class="col-9">
                    <p class="pt-2">
                        {{ tip?.receiver.name }} - ₲{{ ((tip?.tip).toLocaleString('en-US')) }}<br>
                        {{ new Date(tip?.createdAt).toLocaleString('en-US') }}
                    </p>
                </div>
            </div>
        </div>
    </router-link>
</template>


<script>
import { computed } from '@vue/reactivity';
import { AppState } from '../AppState';

export default {
    props: {
        tip: { type: Object, required: true }
    },
    setup() {
        return {
            theme: computed(() => AppState.account.theme),
        }
    }
}
</script>


<style lang="scss" scoped>
.profile-picture {
    height: 8vh;
    width: 8vh;
    border-radius: 50%;
    object-fit: cover;
    background-position: center;
}
</style>