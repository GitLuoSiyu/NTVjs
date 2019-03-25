<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HomeMenu from "@/components/HomeMenu/HomeMenu.vue";

@Component({
  components: {
    HomeMenu
  }
})
export default class Home extends Vue {}
</script>
