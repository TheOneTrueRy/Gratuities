<template>
    <div class="EditAccountOffcanvas">
        <div class="offcanvas offcanvas-end" :class="theme ? '' : 'text-bg-dark'" tabindex="-1" id="offcanvasExample"
            aria-labelledby="offcanvasExampleLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasExampleLabel">Edit Account</h5>
                <button type="button" class="btn-close" :class="theme ? '' : 'btn-close-white'" data-bs-dismiss="offcanvas"
                    aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <form @submit.prevent="editAccount()">
                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input required v-model="editable.name" type="text" minLength="3" maxlength="15"
                            class="form-control" id="name" name="name">
                    </div>
                    <div>
                        <label for="picture" class="form-label">Picture</label>
                        <input required v-model="editable.picture" class="form-control" id="picture" type="text">
                    </div>
                    <div>
                        <label for="bio" class="form-label">Bio</label>
                        <input v-model="editable.bio" class="form-control" id="bio" type="text">
                    </div>
                    <div>
                        <label for="openToFeedback" class="form-label">Would you like to receive
                            feedback?&nbsp;&nbsp;&nbsp;</label>
                        <input v-model="editable.openToFeedback" class="my-3" id="openToFeedback" type="checkbox">
                    </div>
                    <div>
                        <label for="notifications" class="form-label">Would you like email
                            notifications?&nbsp;&nbsp;&nbsp;</label>
                        <input v-model="editable.notifications" class="my-3" id="notifications" type="checkbox">
                    </div>
                    <button data-bs-dismiss="offcanvas" class="btn btn-success" type="submit">Save Changes</button>
                </form>
            </div>
        </div>

    </div>
</template>


<script>
import { ref, watchEffect, computed } from "vue";
import { AppState } from "../AppState";
import { accountService } from "../services/AccountService.js";
import { logger } from "../utils/Logger.js";
import Pop from "../utils/Pop.js";


export default {

    setup() {
        const editable = ref({})

        watchEffect(() => {
            if (AppState.account.id) {
                editable.value = { ...AppState.account }
                editable.bio = { ...AppState.account.bio }
            }
        })

        return {
            editable,
            async editAccount() {
                try {
                    const formData = editable.value;
                    await accountService.editAccount(formData);
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