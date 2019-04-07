import Vue from "vue";
import Router from "vue-router";

// import Home from "./views/Home.vue";
import Boot from "./views/Boot.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "boot",
      component: Boot
    },
    {
      path: "/levelOne",
      name: "levelOne",
      component: () => import("./views/LevelOne.vue")
    },
    {
      path: "/levelTwo",
      name: "levelTwo",
      component: () => import("./views/LevelTwo.vue")
    },
    {
      path: "/shop",
      name: "shop",
      component: () => import("./views/Shop.vue")
    },
    {
      path: "/pruchase",
      name: "purchase",
      component: () => import("./views/Purchase.vue")
    },
    {
      path: "/game",
      name: "game",
      component: () => import("./views/Game.vue")
    }
  ]
});
