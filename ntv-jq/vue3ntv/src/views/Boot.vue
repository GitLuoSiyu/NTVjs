<template>
  <div class="boot">
    <div class="menu_select"></div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "boot",
  components: {},
  props: [],
  data() {
    return {};
  },
  created() {
    // 开启键盘
    this.startKeyDown();
  },
  methods: {
    startKeyDown() {
      var selectIndex = 2;
      var _this = this;
      document.onkeydown = function(e) {
        var event = e || event;
        switch (event.keyCode) {
          case 8:
            break;
          case 13:
            switch (selectIndex) {
              case 1:
                window.location.href = "./www/views/levelsone.html";
                break;
              case 2:
                window.location.href = "./www/views/levelstwo.html";
                break;
              case 3:
                self.location.href = "./www/views/shop.html";
                break;
              case 4:
                self.location.href = "./www/views/purchase.html";
                break;
              default:
                break;
            }
            break;
          case 37:
            if (selectIndex == 1) {
              selectIndex = 4;
            } else {
              selectIndex--;
            }
            _this.selectMove(selectIndex);
            break;
          case 38:
            if (selectIndex == 4) {
              selectIndex = 1;
            } else {
              selectIndex++;
            }
            _this.selectMove(selectIndex);
            break;
          case 39:
            if (selectIndex == 4) {
              selectIndex = 1;
            } else {
              selectIndex++;
            }
            _this.selectMove(selectIndex);
            break;
          case 40:
            if (selectIndex == 1) {
              selectIndex = 4;
            } else {
              selectIndex--;
            }
            _this.selectMove(selectIndex);
            break;
        }
      };
    },
    selectMove(selectIndex) {
      var go = document.querySelector(".menu_select");
      switch (selectIndex) {
        case 1:
          go.style.left = "240px";
          go.style.top = "410px";
          break;
        case 2:
          go.style.left = "640px";
          go.style.top = "410px";
          break;
        case 3:
          go.style.left = "1030px";
          go.style.top = "410px";
          break;
        case 4:
          go.style.left = "1100px";
          go.style.top = "100px";
          break;
        default:
          break;
      }
    }
  },
  computed: {}
};
</script>

<style lang="less" scoped>
.boot {
  background: url(./../assets/img/menu_bg.jpg) no-repeat center;
  width: 100%;
  height: 100%;
  background-size: contain;
  .menu_select {
    background: url(./../assets/img/select.png) no-repeat center;
    width: 60px;
    height: 60px;
    background-size: 100% 100%;
    position: absolute;
    left: 240px;
    top: 410px;
  }
}
</style>
