<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 mt-5">
        <div id="carouselExampleCaptions" class="carousel slide">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
              aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
              aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
              aria-label="Slide 3"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3"
              aria-label="Slide 4"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4"
              aria-label="Slide 5"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                src="https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=579&q=80"
                class="d-block w-100" alt="...">
              <div class="carousel-caption d-md-block">
                <h5>First slide label</h5>
                <p class="gratuities-links"><a target="_blank" href="https://github.com/"
                    class="text-light mdi mdi-github"></a><a target="_blank" href="https://linkedin.com/"
                    class="mdi mdi-linkedin text-light"></a></p>
              </div>
            </div>
            <div class="carousel-item">
              <img
                src="https://plus.unsplash.com/premium_photo-1666899887863-7fea4751a161?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80"
                class="d-block w-100" alt="...">
              <div class="carousel-caption d-md-block">
                <h5>Second slide label</h5>
                <p class="gratuities-links"><a target="_blank" href="https://github.com/"
                    class="text-light mdi mdi-github"></a><a target="_blank" href="https://linkedin.com/"
                    class="mdi mdi-linkedin text-light"></a></p>
              </div>
            </div>
            <div class="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1633621412960-6df85eff8c85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80"
                class="d-block w-100" alt="...">
              <div class="carousel-caption d-md-block">
                <h5>Third slide label</h5>
                <p class="gratuities-links"><a target="_blank" href="https://github.com/"
                    class="text-light mdi mdi-github"></a><a target="_blank" href="https://linkedin.com/"
                    class="mdi mdi-linkedin text-light"></a></p>
              </div>
            </div>
            <div class="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1633621412960-6df85eff8c85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80"
                class="d-block w-100" alt="...">
              <div class="carousel-caption d-md-block">
                <h5>Fourth slide label</h5>
                <p class="gratuities-links"><a target="_blank" href="https://github.com/"
                    class="text-light mdi mdi-github"></a><a target="_blank" href="https://linkedin.com/"
                    class="mdi mdi-linkedin text-light"></a></p>
              </div>
            </div>
            <div class="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1633621412960-6df85eff8c85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=327&q=80"
                class="d-block w-100" alt="...">
              <div class="carousel-caption d-md-block">
                <h5>Fifth slide label</h5>
                <p class="gratuities-links"><a target="_blank" href="https://github.com/"
                    class="text-light mdi mdi-github"></a><a target="_blank" href="https://linkedin.com/"
                    class="mdi mdi-linkedin text-light"></a></p>
              </div>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {

    }
  }
}
</script>
<style scoped>
img {
  height: 50vh;
  width: 100%;
}

.gratuities-links {
  font-size: 4vh;
}

.profile-picture {
  height: 5vh;
  width: 5vh;
  border-radius: 50%;
  box-shadow: 2px 2px 4px black;
}
</style>
