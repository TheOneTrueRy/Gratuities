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


<style lang="scss" scoped></style>