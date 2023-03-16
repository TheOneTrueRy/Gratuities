<template>
    <div class="AddBusinessOffCanvas">
        <div class="offcanvas offcanvas-start" :class="theme ? '' : 'text-bg-dark'" tabindex="-1" id="addBusiness"
            aria-labelledby="addBusinessLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="addBusinessLabel">New Business</h5>
                <button type="button" class="btn-close" :class="theme ? '' : 'btn-close-white'" data-bs-dismiss="offcanvas"
                    aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <div>
                    <form @submit.prevent="newBusiness()">
                        <div class="mb-2">
                            <label class="form-label">Name</label>
                            <input required v-model="editable.name" minlength="3" maxlength="50"
                                placeholder="What's it called?" type="text" class="form-control">
                        </div>

                        <div class="mb-2">
                            <label class="form-label">Location</label>
                            <input required v-model="editable.location" minlength="3" maxlength="500"
                                placeholder="Where is it?" type="text" class="form-control">
                        </div>

                        <div class="mb-2">
                            <label class="form-label">Logo</label>
                            <input required v-model="editable.logo" minlength="3" maxlength="500"
                                placeholder="What's it's logo?" type="text" class="form-control">
                        </div>
                        <div class="mb-2">
                            <label class="form-label">Cover Image</label>
                            <input required v-model="editable.coverImg" minlength="3" maxlength="500"
                                placeholder="What's it's cover image?" type="text" class="form-control">
                        </div>
                        <button data-bs-dismiss="offcanvas" class="btn btn-success" type="submit">Create Business</button>
                    </form>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
import { computed, ref } from 'vue';
import { AppState } from "../AppState.js";
import { businessesService } from '../services/BusinessesService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
    setup() {
        const editable = ref({})

        return {
            editable,

            async newBusiness() {
                try {
                    const formData = editable.value;
                    await businessesService.newBusiness(formData);
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