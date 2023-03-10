<template>
        <h3 v-if="account?.rating == 0.5"><i class="mdi mdi-star-half star"></i><i class="mdi mdi-star-outline"></i><i
                        class="mdi mdi-star-outline"></i><i class="mdi mdi-star-outline"></i><i
                        class="mdi mdi-star-outline"></i>
        </h3>
        <h3 v-if="account?.rating == 1"><i class="mdi mdi-star star"></i><i class="mdi mdi-star-outline"></i><i
                        class="mdi mdi-star-outline"></i><i class="mdi mdi-star-outline"></i><i
                        class="mdi mdi-star-outline"></i>
        </h3>
        <h3 v-if="account?.rating == 1.5"><i class="mdi mdi-star star"></i><i class="mdi mdi-star-half star"></i><i
                        class="mdi mdi-star-outline"></i><i class="mdi mdi-star-outline"></i><i
                        class="mdi mdi-star-outline"></i>
        </h3>
        <h3 v-if="account?.rating == 2"><i class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i
                        class="mdi mdi-star-outline"></i><i class="mdi mdi-star-outline"></i><i
                        class="mdi mdi-star-outline"></i>
        </h3>
        <h3 v-if="account?.rating == 2.5"><i class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i
                        class="mdi mdi-star-half star"></i><i class="mdi mdi-star-outline"></i><i
                        class="mdi mdi-star-outline"></i>
        </h3>
        <h3 v-if="account?.rating == 3"><i class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i
                        class="mdi mdi-star star"></i><i class="mdi mdi-star-outline"></i><i class="mdi mdi-star-outline"></i>
        </h3>
        <h3 v-if="account?.rating == 3.5"><i class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i
                        class="mdi mdi-star star"></i><i class="mdi mdi-star-half  star"></i><i
                        class="mdi mdi-star-outline"></i>
        </h3>
        <h3 v-if="account?.rating == 4"><i class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i
                        class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i class="mdi mdi-star-outline"></i></h3>
        <h3 v-if="account?.rating == 4.5"><i class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i
                        class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i class="mdi mdi-star-half star"></i>
        </h3>
        <h3 v-if="account?.rating == 5"><i class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i
                        class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i></h3>
</template>


<script>
import { computed, ref, watchEffect, onMounted, onUnmounted } from 'vue'
import { AppState } from '../AppState';
export default {
        setup() {
                return {
                        account: computed(() => AppState.account)
                }
        }
}
</script>


<style lang="scss" scoped></style>