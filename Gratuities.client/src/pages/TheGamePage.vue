<template>
  <div v-if="block" class="container-fluid backdrop" :style="{ backgroundImage: `url(${block.backdrop})` }">

  </div>
</template>


<script>
import { computed } from "vue";
import { AppState } from "../AppState.js";

export default {
  setup() {
    return {
      block: computed(() => AppState.block)
    }
  }
}
</script>


<style lang="scss" scoped></style>