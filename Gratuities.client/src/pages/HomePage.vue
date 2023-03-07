<template>
  <div class="container-fluid">
    <div class="row pb-1 mt-3 d-flex flex-column align-items-center justify-content-center">
      <div class="offset-3 col-9">
        <img class="profile-picture" src="villain.jpg" alt="">
      </div>
      <div class="col-12">
        <h1 class="my-3 text-dark rounded text-center user-name">
          Big Jimmy
        </h1>
      </div>
      <div class="col-12">
        <h6 class="biggest-tip">Your Biggest Tip: <span class="biggest-tip-amount">$0.89</span> to AppleBees server @Bill
        </h6>
      </div>
      <div class="col-12 mt-5">
        <h6>Search for an employee or business:</h6>
      </div>
      <div class="col-12">
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
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { logger } from '../utils/Logger';

export default {
  setup() {
    const editable = ref({})

    return {
      editable,
      async search() {
        logger.log('we will implement the search function soon')
      }
    }
  }
}
</script>

<style scoped lang="scss">
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
