<template>
  <div class="home">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/gameOne">gameOne</router-link>
      <router-link to="/gameTwo">gameTwo</router-link>
      <router-link to="/shop">shop</router-link>
      <router-link to="/purchase">purchase</router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

export default class Home extends Vue {}
</script>
<style scoped lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
