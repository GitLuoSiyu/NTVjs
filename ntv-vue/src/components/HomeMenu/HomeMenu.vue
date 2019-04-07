<template>
  <div class="hello">
    <div id="select" class=""></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Route } from "vue-router";

@Component
export default class HomeMenu extends Vue {
  constructor() {
    super();
  }
  public menuSelectIndex: number = 1;
  public select = document.querySelector("#select");

  created() {
    this.keydown(this.menuSelectIndex);
  }
  private goUrl(menuSelectIndex: number): void {
    switch (menuSelectIndex) {
      case 1:
        select.style.left = "20%";
        select.style.top = "60%";
        break;
      case 2:
        select.style.left = "50%";
        select.style.top = "60%";
        break;
      case 3:
        // 暂时不跳转
        select.style.left = "78%";
        select.style.top = "60%";
        break;
      case 4:
        select.style.left = "85%";
        select.style.top = "13%";
        break;
      default:
        break;
    }
  }
  private test() {
    // console.log("跳转");
    this.$router.push({ name: "game" });
  }
  private keydown(menuSelectIndex: number): void {
    let _this = this;
    document.onkeydown = function(event) {
      let e = event || window.event || arguments.callee.caller.arguments[0];
      switch (e.keyCode) {
        case 8:
          break;
        case 13:
          let that = _this;
          switch (menuSelectIndex) {
            case 1:
              that.test();
              break;
            case 2:
              that.test();
              break;
            case 3:
              that.test();
              break;
            case 4:
              that.test();
              break;
            default:
              break;
          }
          break;
        case 37:
          if (menuSelectIndex == 1) {
            menuSelectIndex = 4;
          } else {
            menuSelectIndex--;
          }
          _this.goUrl(menuSelectIndex);
          break;
        case 38:
          if (menuSelectIndex == 4) {
            menuSelectIndex = 1;
          } else {
            menuSelectIndex++;
          }
          _this.goUrl(menuSelectIndex);
          break;
        case 39:
          if (menuSelectIndex == 4) {
            menuSelectIndex = 1;
          } else {
            menuSelectIndex++;
          }
          _this.goUrl(menuSelectIndex);
          break;
        case 40:
          if (menuSelectIndex == 1) {
            menuSelectIndex = 4;
          } else {
            menuSelectIndex--;
          }
          _this.goUrl(menuSelectIndex);
          break;
        default:
          break;
      }
    };
  }
}
</script>

<style scoped lang="less">
.hello {
  position: fixed;
  display: inline-block;
  background: url(./../../assets/img/menu_bg.jpg) no-repeat center;
  // background-size: 100% 100%;
  background-size: contain;
  width: 100%;
  height: 100%;
}
#select {
  position: absolute;
  display: inline-block;
  background: url(./../../assets/img/select.png) no-repeat center;
  background-size: 100% 100%;
  width: 60px;
  height: 60px;
  left: 20%;
  top: 60%;
}
</style>
