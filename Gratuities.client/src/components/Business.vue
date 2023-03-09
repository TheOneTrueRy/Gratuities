<template>
    <div>


    </div>
</template>


<script>
import { computed } from 'vue';
import { AppState } from '../AppState';

export default {
    props: {
        business: { type: Object, required: true }
    },

    setup() {
        return {
            account: computed(() => AppState.account)
        }
    }
}
</script>


<style lang="scss" scoped>
.business-logo {
    border: 2px solid black;
    width: 16vh;
    height: 16vh;
    border-radius: 50%;
    object-fit: cover;
    background-position: center;
}
</style>