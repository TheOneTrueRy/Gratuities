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
        <button class="btn figma-buttons text-light elevation-3 rounded-pill">Add Business</button>
        <button class="btn figma-buttons text-light elevation-3 rounded-pill">Edit</button>
      </div>
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
                *****
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
                *****
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
                *****
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
import { computed } from 'vue'
import { AppState } from '../AppState'
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
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
