<template>
  <div class="container">
    <div class="row">
      <div class="col-12 col-md-6 offset-md-3 d-flex justify-content-center mt-2">
        <h1 class="w-ease container-type "><i><span class="ms-3 ms-md-0">Tipping</span><span
              class="typewriter ms-md-2 d-flex">With
              Ease.</span></i></h1>
      </div>
      <div class="offset-1 col-10 col-md-8 offset-md-2 mb-2 mt-1 desc-card rounded d-flex justify-content-center"
        :class="[theme ? 'bg-light-green' : 'bg-dark-green']">
        <p class="p-2 pt-3 fs-5">&nbsp; &nbsp; &nbsp;The Gratuities App is all about giving deserving workers their due.
          <br><br>
          &nbsp; &nbsp; &nbsp;
          Ever run into the problem of doing your best but still having to share your tips with co-workers not pulling
          their weight? Maybe you wanted to reward a specific package delivery person for how considerate they were with
          your cargo. Now, with Gratuities, you can find a business, employee, or independent user and send them a tip or
          write
          them a review based on their service.
          <br><br>
          &nbsp; &nbsp; &nbsp;
          Gratuities is made for both mobile and desktop, though the on-the-fly nature of the service has this leaning
          more towards a mobile application.
        </p>
      </div>

      <!-- SECTION dev carousel -->
      <div class="col-12 col-md-6 offset-md-3 mt-3 mb-2">
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

            <!-- SECTION Joe's card -->
            <div class="carousel-item active">
              <div class="d-flex justify-content-center">
                <p class="bio rounded bg-gradient px-3 d-flex align-items-center">After a decade of customer-facing roles,
                  Joe was tired...a lover of both
                  art and logic, coding and software development seemed to be the path forward. His end goal is to work in
                  game development but wants all the experience he can get until then. 5th
                  most handsome member of the Gratuities team.</p>
              </div>
              <img src="https://ca.slack-edge.com/T1GGQN1RU-U04JUTAK8CE-7fb60e9eb27e-512" class="d-flex rounded"
                alt="...">
              <div class="carousel-caption d-flex align-items-center flex-column">
                <h5 class="our-names">Joe Calvi</h5>
                <p class="gratuities-links d-flex justify-content-around rounded-pill px-3 ze-border"><a target="_blank"
                    href="https://github.com/JoeCalvi" class="text-light mdi link-logo mdi-github"></a><a target="_blank"
                    href="https://www.linkedin.com/in/joe-calvi/" class="mdi link-logo mdi-linkedin text-light"></a></p>
              </div>
            </div>

            <!-- SECTION Ry's Card -->
            <div class="carousel-item">
              <div class="d-flex justify-content-center">
                <p class="bio rounded bg-gradient px-3 d-flex align-items-center">Video Game GOD and Official "Funniest
                  Man
                  Alive" suddenly gets into
                  coding due to actually needing money (we live in a society) and it being surprisingly enjoyable. 5th
                  most handsome developer on the
                  Gratuities
                  team.</p>
              </div>
              <img src="https://ca.slack-edge.com/T1GGQN1RU-U04KR6PJ7FS-06b92423e603-512" class="d-block rounded"
                alt="...">
              <div class="carousel-caption d-flex align-items-center flex-column">
                <h5 class="our-names">Ryan "Ry" Wittman</h5>
                <p class="gratuities-links d-flex justify-content-around rounded-pill px-3"><a target="_blank"
                    href="https://github.com/theonetruery" class="text-light mdi link-logo mdi-github"></a><a
                    target="_blank" href="https://www.linkedin.com/in/theonetruery/"
                    class="mdi link-logo mdi-linkedin text-light"></a></p>
              </div>
            </div>

            <!-- SECTION Andrew's Card -->
            <div class="carousel-item">
              <div class="d-flex justify-content-center">
                <p class="bio rounded bg-gradient px-3 d-flex align-items-center">Went into Coding in College. Sought more
                  education at CodeWorks. Fifth
                  most handsome man on the Gratuities dev team. Love being with friends and making new coding projects.
                  Boardgame enthusiast, driven to learn, and dedicated to coding. </p>
              </div>
              <img src="https://ca.slack-edge.com/T1GGQN1RU-U04JYH9MQ3X-085de4f9b941-512" class="d-block w-100 rounded"
                alt="...">
              <div class="carousel-caption d-flex align-items-center flex-column">
                <h5 class="our-names">Andrew Meyers</h5>
                <p class="gratuities-links d-flex justify-content-around rounded-pill px-3"><a target="_blank"
                    href="https://github.com/laxmeyers" class="text-light mdi link-logo mdi-github"></a><a target="_blank"
                    href="https://www.linkedin.com/in/andrew-meyers-5474ab205/"
                    class="mdi link-logo mdi-linkedin text-light"></a>
                </p>
              </div>
            </div>

            <!-- SECTION Bryson's Card -->
            <div class="carousel-item">
              <div class="d-flex justify-content-center">
                <p class="bio rounded bg-gradient px-3 d-flex align-items-center">Playing and modding video games my whole
                  life has led me to a deep
                  interest in how it
                  all actually works. Thanks to CodeWorks
                  I've been able to expand my knowledge in programming and web development. Most
                  handsome
                  developer on the
                  Gratuities dev team.</p>
              </div>
              <img src="https://ca.slack-edge.com/T1GGQN1RU-U04JLV5G4NB-7e93e64f0292-512" class="d-block w-100 rounded"
                alt="...">
              <div class="carousel-caption d-flex align-items-center flex-column">
                <h5 class="our-names">Bryson Bloom</h5>
                <p class="gratuities-links d-flex justify-content-around rounded-pill px-3"><a target="_blank"
                    href="https://github.com/BrysonBloom" class="text-light mdi link-logo mdi-github"></a><a
                    target="_blank" href="https://www.linkedin.com/in/bryson-bloom-520973262/"
                    class="mdi link-logo mdi-linkedin text-light"></a>
                </p>
              </div>
            </div>

            <!-- SECTION Jonah's Card -->
            <div class="carousel-item">
              <div class="d-flex justify-content-center">
                <p class="bio rounded bg-gradient px-3 d-flex align-items-center">Being an avid LEGO builder since I was
                  quite young, I've always had a love for the art of
                  creation and
                  programming gives exactly that. 5th most handsome developer on the Gratuities team.
                </p>
              </div>
              <img src="https://ca.slack-edge.com/T1GGQN1RU-U04K3VA3544-b04aee2f5a06-512" class="d-block w-100 rounded"
                alt="...">
              <div class="carousel-caption d-flex align-items-center flex-column">
                <h5 class="our-names">Jonah Wood</h5>
                <p class="gratuities-links d-flex justify-content-around rounded-pill px-3"><a target="_blank"
                    href="https://github.com/JonahWood" class="text-light mdi link-logo mdi-github"></a><a target="_blank"
                    href="https://www.linkedin.com/in/jonah-wood-a9591b262/"
                    class="mdi link-logo mdi-linkedin text-light"></a></p>
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
import { computed } from "vue";
import { AppState } from "../AppState.js";


export default {
  setup() {
    return {
      theme: computed(() => AppState.account.theme)
    }
  }
}
</script>
<style scoped>
.bio {
  padding: 1vh;
  background-color: #06d69e5d;
  font-family: 'Lato', sans-serif;
  font-size: 2vh;
  height: 25vh;
  width: 95%;
  overflow-y: scroll;
  box-shadow: 5px 5px 2px 1px #0158415d;
}

.bio::-webkit-scrollbar {
  display: none;
}

.bg-dark-green {
  background-color: #186350;
}

.bg-light-green {
  background-color: #06D6A0;
}

.w-ease {
  font-weight: 400;
}

.desc-card {
  font-size: 2vh;
  font-weight: 200;
  color: white;
  text-shadow: 1px 1px 2px black;
  box-shadow: 5px 5px 2px 1px #0158415d;
}

img {
  width: 100%;
}

.link-logo {
  transition: 0.5s;
}

.link-logo:hover {
  transform: scale(1.1);
}

.ze-border {
  animation-name: borderColorPalette;
  animation-duration: 10s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

@keyframes borderColorPalette {
  0% {
    border: 2px solid #06d69ec1;
  }


  50% {
    border: 2px solid #06d69eba;
  }


  100% {
    border: 2px solid #46f4e0b1;
  }
}

.typewriter {
  overflow: hidden;
  border-right: .15em solid #07805fc1;
  white-space: nowrap;
  font-size: 1.6rem;
  width: 0;
  animation:
    typing 1s steps(20, end) forwards,
    blink .8s infinite;
  animation-delay: 1s;
}

.container-type {
  display: inline-block;
}

@keyframes typing {
  from {
    width: 0
  }

  to {
    width: 100%
  }
}

@keyframes blink {
  from {
    border-color: transparent
  }

  to {
    border-color: #07805fc1;
  }
}





.gratuities-links {
  font-size: 5vh;
  background-color: #06d69ec1;
  width: 35%;
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.587);
}

.our-names {
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.587);
}
</style>
