<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-5 mt-4 ps-3">
        <img class="elevation-3 rounded" :src="account.picture" alt="">
      </div>
      <div class="col-7 mt-4 ps-3">
        <h1>{{ account.name }}</h1>
        <div class="justify-content-center row">
          <div class="col-10">
            <h6>Monthly Payout: <i class="cash">$896.83</i>
            </h6>
            <h6>Biggest Tip:</h6>
            <ul>
              <li>This Cycle: <i class="cash">$34.25</i>
              </li>
              <li>Ever: <i class="cash">$66.66</i>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-12 d-flex justify-content-around pe-4">
        <button @click="addBusiness()" class="btn figma-buttons text-light elevation-3 rounded-pill">Add Business</button>
        <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"
          class="btn figma-buttons text-light elevation-3 rounded-pill">Edit</button>
      </div>

      <!-- SECTION Offcanvas vvvv -->
      <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasExampleLabel">Edit Account</h5>
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
          <form @submit.prevent="editAccount()">
            <div class="mb-3">
              <label for="name" class="form-label">name</label>
              <input required v-model="editable.name" type="text" class="form-control" id="name" name="name">
            </div>
            <button class="btn btn-success" type="submit">Save Changes</button>
          </form>
        </div>
      </div>
      <!-- SECTION End of offcanvas ^^^^ -->

      <div class="col-12 mt-3">
        <h1>Recent Tips:</h1>
      </div>
      <!-- SECTION tips list -->
      <div>
        <div class="rounded col-12 tips mb-2">
          <div class="row align-items-center">
            <div class="col-3">
              <img class="profile-picture" :src="account?.picture" :alt="account?.name">
            </div>
            <div class="col-9">
              <p>
                {{ account?.name }} - <i class="cash">$8</i>
                <br>
                <i class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i
                  class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i>
                <br>
                "Customer service is great yay"
              </p>
            </div>
          </div>
        </div>


        <div class="rounded col-12 tips mb-2">
          <div class="row align-items-center">
            <div class="col-3">
              <img class="profile-picture" :src="account?.picture" :alt="account?.name">
            </div>
            <div class="col-9">
              <p>
                {{ account?.name }} - <i class="cash">$8</i>
                <br>
                <i class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i
                  class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i>
                <br>
                "Customer service is great yay"
              </p>
            </div>
          </div>
        </div>
        <div class="rounded col-12 tips mb-2">
          <div class="row align-items-center">
            <div class="col-3">
              <img class="profile-picture" :src="account?.picture" :alt="account?.name">
            </div>
            <div class="col-9">
              <p>
                {{ account?.name }} - <i class="cash">$8</i>
                <br>
                <i class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i
                  class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i>
                <br>
                "Customer service is great yay"
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <h1>My Business:</h1>
        <div class="d-flex align-items-center flex-column">
          <div class="dropdown ps-2">
            <img class="business-logo"
              src="https://www.applebees.com/-/media/Applebees/Images/logos/applebees-social-logo.ashx" alt=""
              data-bs-toggle="dropdown">
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Go To Business</a></li>
              <li><a class="dropdown-item" href="#">Edit</a></li>
              <li><a class="dropdown-item" href="#">Remove</a></li>
            </ul>
          </div>
          <div>
            <h3><i class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i class="mdi mdi-star star"></i><i
                class="mdi mdi-star-outline"></i><i class="mdi mdi-star-outline"></i></h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue'
import { accountService } from '../services/AccountService';
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
  setup() {
    const editable = ref({})
    watchEffect(() => {
      if (AppState.account.id) {
        editable.value = { name: AppState.account.name }
      }
    })

    return {
      editable,
      account: computed(() => AppState.account),
      async editAccount() {
        try {
          const formData = editable.value
          await accountService.editAccount(formData)

        } catch (error) {
          Pop.error(error.message)
          logger.error(error)
        }
      },
      async addBusiness() {
        try {
          logger.log('this will be the add business function')
        } catch (error) {
          Pop.error(error.message)
          logger.error(error)
        }
      },
    }
  }
}
</script>

<style scoped>
.star {
  color: #FFEE33;
  text-shadow: 1px 1px 1px black;
}

.business-logo {
  border: 2px solid black;
  width: 16vh;
  height: 16vh;
  border-radius: 50%;
  object-fit: cover;
  background-position: center;
}

.profile-picture {
  height: 8vh;
  width: 8vh;
  border-radius: 50%;
}

.tips {
  padding: 1vh;
  background-color: #06D6A0;
  color: white;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.518);
}

.figma-buttons {
  background-color: #EF476F;
}



img {
  width: 150px;
}

.w-90 {
  width: 90%;
}

.w-10 {
  width: 10%;
}
</style>
