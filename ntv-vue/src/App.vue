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

<style lang="less">
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  outline: 0;
  vertical-align: baseline;
}
html,
body {
  color: #fff;
  background: #fff;
  font: 12px/22px "";
  width: 100%;
  overflow: hidden;
}
input,
select,
button {
  font-size: 100%;
  outline: 0;
  vertical-align: middle;
  -webkit-appearance: none;
}
button {
  border: 0;
  background-clip: padding-box;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
ol,
ul,
li {
  list-style: none;
}
/* 定义图片边框，当图片作为链接内容被填充时，会有默认边框出现，重定义掉 */
img {
  border: none;
  vertical-align: baseline;
}
a,
a:link,
a:visited {
  color: #000;
  text-decoration: none;
}
a:hover {
  color: #000;
  text-decoration: underline;
}
/* 标签属性，textarea,input 强制输入时内容超出时换行，打断 */
textarea,
input {
  word-wrap: break-word;
  word-break: break-all;
}
span,
p,
div {
  word-wrap: break-word;
}
.lf {
  float: left;
}
.rt {
  float: right;
}
.clearfix {
  content: "";
  display: block;
  clear: both;
}

/* Game.html  CSS */
body,
html {
  margin: 0;
  padding: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: #171717;
}
body {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica Neue,
    Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif;
}

*,
*:before,
*:after {
  box-sizing: border-box;
}

a,
a:focus,
a:hover {
  color: inherit;
  outline: none;
  text-decoration: none;
}

div:focus {
  outline: none;
}

.clearfix {
  &:after {
    content: "";
    display: table;
    clear: both;
  }
}
</style>
