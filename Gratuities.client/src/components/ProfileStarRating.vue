<template>
        <span v-if="rating == 0.5"><i class="mdi mdi-star-half-full star"></i><i class="mdi mdi-star-outline star"></i><i
                        class="mdi mdi-star-outline star"></i><i class="mdi mdi-star-outline star"></i><i
                        class="mdi mdi-star-outline star"></i>
        </span>
        <span v-else-if="rating == 1"><i class="mdi mdi-star star"></i><i class="mdi mdi-star-outline star"></i><i
                        class="mdi mdi-star-outline star"></i><i class="mdi mdi-star-outline star"></i><i
                        class="mdi mdi-star-outline star"></i>
        </span>
        <span v-else-if="rating == 1.5"><i class="mdi mdi-star star"></i><i class="mdi mdi-star-half-full star"></i><i
                        class="mdi mdi-star-outline star"></i><i class="mdi mdi-star-outline star"></i><i
                        class="mdi mdi-star-outline star"></i>
        </span>
        <span v-else-if="rating == 2"><i class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i
                        class="mdi mdi-star-outline star"></i><i class="mdi mdi-star-outline star"></i><i
                        class="mdi mdi-star-outline star"></i>
        </span>
        <span v-else-if="rating == 2.5"><i class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i
                        class="mdi mdi-star-half-full star"></i><i class="mdi mdi-star-outline star"></i><i
                        class="mdi mdi-star-outline star"></i>
        </span>
        <span v-else-if="rating == 3"><i class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i
                        class="mdi mdi-star star"></i><i class="mdi mdi-star-outline star"></i><i
                        class="mdi mdi-star-outline star"></i>
        </span>
        <span v-else-if="rating == 3.5"><i class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i
                        class="mdi mdi-star star"></i><i class="mdi mdi-star-half-full  star"></i><i
                        class="mdi mdi-star-outline star"></i>
        </span>
        <span v-else-if="rating == 4"><i class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i
                        class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i class="mdi mdi-star-outline star"></i>
        </span>
        <span v-else-if="rating == 4.5"><i class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i
                        class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i
                        class="mdi mdi-star-half-full star"></i>
        </span>
        <span v-else-if="rating == 5"><i class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i
                        class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i></span>
        <span v-else="rating">No Ratings Yet</span>
</template>


<script>
import { computed } from 'vue'
import { AppState } from '../AppState';
import { logger } from '../utils/Logger';

export default {
        props: {
                rating: {
                        type: Number,
                        required: true
                }
        },
        setup(props) {
                logger.log('props:', props)
                return {
                        profile: computed(() => AppState.profile),
                        business: computed(() => AppState.business),
                }
        }
}
</script>


<style lang="scss" scoped></style>