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
        <img :src="block.healthyPic" :alt="block.name" class="block" @click="mine()">
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-12 d-flex justify-content-center">
        <span v-if="block.id != 'chest'" class="fs-1 mt-3 text-light my-shadow">{{ block.name }} Mined!</span>
        <span v-else-if="block.id == 'mimic'" class="fs-1 mt-3 text-light my-shadow"> OH NO! It was a mimic!</span>
        <span v-else class="fs-1 mt-3 text-light my-shadow">Sweet, you opened a chest!</span>
      </div>
      <div class="col-12 d-flex justify-content-center">
        <span v-if="block.id != 'mimic'" class="fs-2 text-light my-shadow">You earned ₲{{ block.value }}!</span>
        <span v-else-if="block.id == 'mimic' && account.currency >= 100" class="fs-2 text-light my-shadow">You lost ₲{{
          block.value }}...</span>
        <span v-else class="fs-2 text-light my-shadow">You were so broke, the mimic took pity on you...</span>
      </div>
      <div class="col-12 d-flex justify-content-center mt-4">
        <img :src="block.destroyedPic" :alt="block.name" class="item">
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { gameService } from "../services/gameService.js"
import { tipsService } from "../services/TipsService";

export default {
  setup() {
    let block = ref({})
    function getRandomBlock() {
      let randomBlock = AppState.blocks[Math.floor(Math.random() * AppState.blocks.length)]
      logger.log(randomBlock)
      block.value = randomBlock
    }
    onMounted(() => {
      getRandomBlock()
      tipsService.getTipsReceived()
    })
    return {
      block,
      account: computed(() => AppState.account),
      async mine() {
        let account = AppState.account
        if (block.value.health > 0) {
          block.value.health -= 1
        }
        if (block.value.health == 0 && block.value.id != 'mimic') {
          let value = block.value.value
          account.currency += value
          await gameService.destroyBlock(value)
          setTimeout(getRandomBlock, 5000)
        } else if (block.value.health == 0 && block.value.id == 'mimic') {
          let value = -block.value.value
          if (account.currency >= 100) {
            account.currency += value
          }
          await gameService.destroyBlock(value)
          setTimeout(getRandomBlock, 5000)
        }
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

.item {
  height: 45vh;
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