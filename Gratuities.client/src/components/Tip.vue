<template>
    <router-link :to="{ name: 'Profile', params: { profileId: tip?.giver.id } }" class="text-light"
        :title="`Go to ${tip?.giver.name}'s Profile page!`">
        <div class="rounded col-12 my-1 tips" :class="theme ? 'employee-card' : 'employee-card-dark'">
            <div class="row align-items-center p-2 mb-2">
                <div class="col-3">
                    <img class="profile-picture border border-dark border-1" :src="tip?.giver.picture"
                        :alt="tip?.giver.name" onerror="this.src='broken-image.png'">
                </div>
                <div class="col-9 d-flex align-items-center">
                    <p class="pt-2">
                        {{ tip?.giver.name }} - ₲{{ ((tip?.tip).toLocaleString('en-US')) }}<br>
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
    height: 10vh;
    width: 10vh;
    border-radius: 50%;
    object-fit: cover;
    background-position: center;
}

@media screen and (min-width: 768px) {
    .profile-picture {
        height: 12vh;
        width: 12vh;
    }
}
</style>