<template>
  <div class="container-fluid">
    <div class="row pb-1 mt-3 d-flex flex-column align-items-center justify-content-center">
      <div class="col-12 text-center">
        <img class="profile-picture border border-dark border-2 elevation-1" :src="account.picture" :alt="account.picture">
      </div>
      <div class="col-12 text-center">
        <h1 class="my-3 text-dark rounded text-center user-name">
          {{ account.name }}
        </h1>
      </div>
      <div class="col-12 text-center">
        <h6 class="biggest-tip">Your Biggest Tip: <span class="biggest-tip-amount">$0.89</span> to AppleBees server @Bill
        </h6>
      </div>
      <div class="col-12 col-md-6 mt-4">
        <h6>Search for an employee or business:</h6>
      </div>
      <div class="col-12 col-md-6">
        <form @submit.prevent="search()">
          <div class="input-group">
            <input v-model="editable.query" required class="form-control" placeholder="Search..."
              aria-describedby="button-addon2" aria-label="Search" type="text">
            <button class="btn btn-outline-secondary" type="submit" id="button-addon2">
              <i class="mdi mdi-magnify"></i>
            </button>
          </div>
        </form>
      </div>
      <div class="col-12 col-md-8 mt-5">
        <h6>Top employees this week:</h6>
      </div>
      <div>
        <div class="col-12 employee-card rounded elevation-5 p-2 mb-4 col-md-8 offset-md-2">
          <div class="row">
            <div class="col-4 d-flex align-items-center">
              <img class="profile-picture-small" src="villain.jpg" alt="">
            </div>
            <div class="col-8">
              <p>Little Jim at AppleBees<br>*****<br>“Costumer service yay!”</p>
            </div>
          </div>
        </div>
        <div class="col-12 employee-card rounded elevation-5 p-2 mb-4 col-md-8 offset-md-2">
          <div class="row">
            <div class="col-4 d-flex align-items-center">
              <img class="profile-picture-small" src="villain.jpg" alt="">
            </div>
            <div class="col-8">
              <p>Little Jim at AppleBees<br>*****<br>“Costumer service yay!”</p>
            </div>
          </div>
        </div>
        <div class="col-12 employee-card rounded elevation-5 p-2 mb-4 col-md-8 offset-md-2">
          <div class="row">
            <div class="col-4 d-flex align-items-center">
              <img class="profile-picture-small" src="villain.jpg" alt="">
            </div>
            <div class="col-8">
              <p>Little Jim at AppleBees<br>*****<br>“Costumer service yay!”</p>
            </div>
          </div>
        </div>
        <div class="col-12 employee-card rounded elevation-5 p-2 mb-4 col-md-8 offset-md-2">
          <div class="row">
            <div class="col-4 d-flex align-items-center">
              <img class="profile-picture-small" src="villain.jpg" alt="">
            </div>
            <div class="col-8">
              <p>Little Jim at AppleBees<br>*****<br>“Costumer service yay!”</p>
            </div>
          </div>
        </div>
        <div class="col-12 employee-card rounded elevation-5 p-2 mb-4 col-md-8 offset-md-2">
          <div class="row">
            <div class="col-4 d-flex align-items-center">
              <img class="profile-picture-small" src="villain.jpg" alt="">
            </div>
            <div class="col-8">
              <p>Little Jim at AppleBees<br>*****<br>“Costumer service yay!”</p>
            </div>
          </div>
        </div>
        <div class="col-12 employee-card rounded elevation-5 p-2 mb-4 col-md-8 offset-md-2">
          <div class="row">
            <div class="col-4 d-flex align-items-center">
              <img class="profile-picture-small" src="villain.jpg" alt="">
            </div>
            <div class="col-8">
              <p>Little Jim at AppleBees<br>*****<br>“Costumer service yay!”</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';

export default {
  setup() {
    const editable = ref({})

    return {
      editable,
      account: computed(() => AppState.account),
      async search() {
        logger.log('we will implement the search function soon')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.employee-card {
  background-color: #06D6A0;
  color: white;
}

.biggest-tip-amount {
  color: #06D6A0;
}

.biggest-tip {
  text-shadow: 2px 4px 4px #00000040;
  font-weight: 400;
}

.user-name {
  font-size: 5vh;
  font-weight: 400;
}

.profile-picture {
  height: 20vh;
  width: 20vh;
  border-radius: 50%;
}

.profile-picture-small {
  height: 10vh;
  width: 10vh;
  border-radius: 50%;
  border: 2px solid black;
  transition: 0.5s;
  cursor: pointer;
}

.profile-picture-small:hover {
  transform: scale(1.1);
}

.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
