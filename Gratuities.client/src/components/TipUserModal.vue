<template>
    <div class="TipUserModal">
        <div class="modal" tabindex="-1" id="tipUserModal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content modal-style">
                    <div class="modal-header">
                        <h5 class="modal-title">Send {{ profile?.name }} a Tip?</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="sendTip()">
                            <div class="input-group mb-3">
                                <input v-model="editable.tip" type="number" min="0.01" :max="account.currency" step=".01" class="form-control"
                                    placeholder="tip amount" aria-label="Recipient's username"
                                    aria-describedby="button-addon2">
                                <button class="btn btn-outline-light modal-button" type="submit" required
                                    data-bs-dismiss="modal" id="button-addon2">Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
import { AppState } from "../AppState.js";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { tipsService } from "../services/TipsService.js";

export default {
    setup() {
        const editable = ref({})
        const route = useRoute()
        return {
            editable,
            profile: computed(() => AppState.profile),
            account: computed(() => AppState.account),

            async sendTip() {
                try {
                    const tip = editable.value
                    const profileId = route.params.profileId
                    await tipsService.sendTip(profileId, tip)
                    if() {
                        
                    }
                    editable.value = {}
                } catch (error) {
                    Pop.error('[SENDING TIP]', error)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped>
.modal-style {
    background-color: #06d69e50;
    color: white;
    text-shadow: 1px 1px 2px black;
}

.modal-button {
    color: white;
    text-shadow: 1px 1px 2px black;
}
</style>