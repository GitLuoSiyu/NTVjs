<template>
  <div id="app">
    <HomeMenu />
    <router-view />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import HomeMenu from "@/components/HomeMenu/HomeMenu.vue";
@Component({
  components: {
    HomeMenu
  }
})
export default class App extends Vue {}
</script>

<style lang="less"></style>
