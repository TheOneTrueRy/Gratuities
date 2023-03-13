<template>
  <div v-if="block" class="container-fluid backdrop" :style="{ backgroundImage: `url(${block.backdrop})` }">
    <div v-if="block.health > 0" class="row">
      <div class="col-12 d-flex justify-content-center">
        <span class="fs-1 mt-3 text-light my-shadow">{{ block.name }}</span>
      </div>
      <div class="col-12 d-flex justify-content-center">
        <span class="text-light my-shadow fs-2">
          {{ block.health }} / {{ block.maxHealth }}
        </span>
      </div>
      <div class="col-12 d-flex justify-content-center my-1">
        <progress :value="block.health" :max="block.maxHealth"></progress>
      </div>
      <div class="col-12 d-flex justify-content-center mt-1">
        <span class="fs-3 text-light my-shadow">{{ block.description }}</span>
      </div>
      <div class="col-12 d-flex justify-content-center mt-4">
        <img :src="block.healthyPic" alt="" class="block" @click="mine()">
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";

export default {
  setup() {
    let block = ref({})
    function getRandomBlock() {
      let randomBlock = AppState.blocks[Math.floor(Math.random() * AppState.blocks.length)]
      block.value = randomBlock
    }
    onMounted(() => {
      getRandomBlock()
    })
    return {
      block,
      mine() {
        block.value.health -= 1
      }
    }
  }
}
</script>


<style lang="scss" scoped>
@keyframes shake {
  0% {
    transform: translate(1px, 1px) rotate(0deg);
  }

  10% {
    transform: translate(-1px, -2px) rotate(-1deg);
  }

  20% {
    transform: translate(-3px, 0px) rotate(1deg);
  }

  30% {
    transform: translate(3px, 2px) rotate(0deg);
  }

  40% {
    transform: translate(1px, -1px) rotate(1deg);
  }

  50% {
    transform: translate(-1px, 2px) rotate(-1deg);
  }

  60% {
    transform: translate(-3px, 1px) rotate(0deg);
  }

  70% {
    transform: translate(3px, 1px) rotate(-1deg);
  }

  80% {
    transform: translate(-1px, -1px) rotate(1deg);
  }

  90% {
    transform: translate(1px, 2px) rotate(0deg);
  }

  100% {
    transform: translate(1px, -2px) rotate(-1deg);
  }
}

.backdrop {
  background-size: cover;
  height: 100%;
}

.block {
  height: 45vh;
  cursor: pointer;
}

.block:active {
  animation-name: shake;
  animation-duration: 0.2s;
  animation-iteration-count: 1;
}

.my-shadow {
  text-shadow: 1px 1px 2px black;
}
</style>