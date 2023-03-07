<template>
  <div class="d-flex flex-column align-items-center justify-content-center">
    <div class="pb-1 mt-3 d-flex flex-column align-items-center justify-content-center">
      <img class="profile-picture" src="villain.jpg" alt="">
      <h1 class="my-3 text-dark rounded text-center user-name">
        Big Jimmy
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {}
  }
}
</script>

<style scoped lang="scss">
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
