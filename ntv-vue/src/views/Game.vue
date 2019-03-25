<template>
  <div class="home">
    <GameTitle msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import GameTitle from "@/components/GameTitle.vue"; // @ is an alias to /src

@Component({
  components: {
    GameTitle
  }
})
export default class Game extends Vue {}
</script>
<style scoped lang="less"></style>
