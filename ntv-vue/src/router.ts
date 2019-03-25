import Vue from "vue";
import Router from "vue-router";

// page components
import Home from "./views/Home.vue";
import LevelOne from "./views/LevelOne.vue";
import LevelTwo from "./views/LevelTwo.vue";
import Shop from "./views/Shop.vue";
import Purchase from "./views/Purchase.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/game",
      name: "game",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Game.vue")
    },
    {
      path: "/levelone",
      name: "LevelOne",
      component: LevelOne
    },
    {
      path: "/leveltwo",
      name: "LevelTwo",
      component: LevelTwo
    },
    {
      path: "/shop",
      name: "shop",
      component: Shop
    },
    {
      path: "/purchase",
      name: "purchase",
      component: Purchase
    }
  ]
});
