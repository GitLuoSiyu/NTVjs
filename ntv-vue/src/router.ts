import Vue from "vue";
import Router from "vue-router";

// page components
import Home from "./views/Home.vue";
import Game from "./views/Game.vue";
import Levels from "./views/Levels.vue";
import Shop from "./views/Shop.vue"

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/menu",
      name: "menu",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Menu.vue")
    },
    {
      path: "/game",
      name: "game",
      component: Game
    },
    {
      path: "/levels",
      name: "Levels",
      component: Levels
    },
    {
      path: "/shop",
      name: "shop",
      component: Shop
    }
  ]
});
