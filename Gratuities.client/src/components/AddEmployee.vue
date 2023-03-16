<template>
    <div class="offcanvas offcanvas-top" :class="theme ? '' : 'text-bg-dark'" tabindex="-1" id="offcanvasTop"
        aria-labelledby="offcanvasTopLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasTopLabel">Add to Business</h5>
            <button type="button" class="btn-close" :class="theme ? '' : 'btn-close-white'" data-bs-dismiss="offcanvas"
                aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <form @submit.prevent="addEmployee()">
                <select v-model="editable.businessId" class="form-select mb-3" required aria-label="Default select example">
                    <option v-for="b in businesses" :value="b.id">{{ b.name }}</option>
                </select>
                <div class="text-end">
                    <button data-bs-dismiss="offcanvas" class="btn btn-success">Add</button>
                </div>
            </form>
        </div>
    </div>
</template>


<script>
import { computed, watchEffect, ref } from 'vue';
import { useRoute } from 'vue-router';
import { AppState } from '../AppState';
import { Account } from '../models/Account';
import { businessesService } from '../services/BusinessesService';
import { employeesService } from '../services/EmployeesService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';

export default {
    setup() {
        const route = useRoute()
        const editable = ref({})
        async function getMyBusinesses() {
            try {
                await businessesService.getMyBusiness(AppState.account.id)
            } catch (error) {
                Pop.error(error.message)
                logger.error(error)
            }
        }
        watchEffect(() => {
            if (AppState.account.id) {
                getMyBusinesses()

            }
        })
        return {
            route,
            editable,
            businesses: computed(() => AppState.businesses),
            theme: computed(() => AppState.account.theme),
            account: computed(() => AppState.account),
            async addEmployee() {
                try {
                    const businessId = editable.value
                    logger.log('businessId', businessId)
                    const profileId = route.params.profileId
                    const employee = await employeesService.addEmployee(profileId, businessId)
                    Pop.success(`You hired ${employee.employeeName}`)
                } catch (error) {
                    Pop.error(error.message)
                    logger.error(error)
                }
            },
            async removeEmployee() {
                try {
                    await employeesService.removeEmployee()
                } catch (error) {
                    Pop.error(error.message)
                    logger.error(error)
                }
            }
        }
    }
}
</script>


<style lang="scss" scoped></style>