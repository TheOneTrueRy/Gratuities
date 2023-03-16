<template>
    <div class="EditBusinessOffcanvas">
        <div class="offcanvas offcanvas-start" :class="theme ? '' : 'text-bg-dark'" tabindex="-1" id="offcanvasExample"
            aria-labelledby="offcanvasExampleLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasExampleLabel">Edit Business</h5>
                <button type="button" class="btn-close" :class="theme ? '' : 'btn-close-white'" data-bs-dismiss="offcanvas"
                    aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div v-if="business">
                    <form @submit.prevent="editBusiness(business?.id)">
                        <div class="mb-3" v-if="business?.name">
                            <label for="name" class="form-label">Name</label>
                            <input type="text" class="form-control" minlength="3" maxlength="50" required
                                v-model="editable.name">
                        </div>
                        <div class="mb-3" v-if="business?.name">
                            <label for="coverImg" class="form-label">CoverImg</label>
                            <input type="text" class="form-control" minlength="3" maxlength="500" required
                                v-model="editable.coverImg">
                        </div>
                        <div class="mb-3" v-if="business?.name">
                            <label for="logo" class="form-label">Logo</label>
                            <input type="text" class="form-control" minlength="3" maxlength="500" required
                                v-model="editable.logo">
                        </div>
                        <button data-bs-dismiss="offcanvas" type="submit" class="btn btn-success">Save Changes</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { ref, computed, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import { businessesService } from '../services/BusinessesService.js';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {
    setup() {
        const editable = ref({})

        watchEffect(() => {
            if (AppState.business?.id) {
                editable.value = { ...AppState.business }
            }
        })

        return {
            editable,

            business: computed(() => AppState.business),

            async editBusiness(businessId) {
                try {

                    const formData = editable.value;
                    await businessesService.editBusiness(formData, businessId);
                }
                catch (error) {
                    Pop.error(error.message);
                    logger.error(error);
                }
            },
            theme: computed(() => AppState.account.theme)
        }
    }
}
</script>


<style lang="scss" scoped></style>