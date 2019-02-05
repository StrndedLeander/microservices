import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import News from "./views/News.vue";

import Store from "./store";

Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/groups",
      name: "GroupsView",
      component: () => import("./views/Groups.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/news",
      name: "NewsView",
      component: News,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/sign",
      name: "SignView",
      component: () => import("./views/AuthFlow/Sign.vue"),
      meta: {
        requiresGuest: true
      }
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let user = await Store.dispatch("user/findUser");
    console.log(to.fullPath, user);
    if (user === {} || !user) {
      next({
        path: "/sign",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    let user = await Store.dispatch("user/findUser");
    console.log(to.fullPath, user);
    if (user === {} || !user) {
      next();
    } else {
      next({
        path: "/",
        query: {
          redirect: to.fullPath
        }
      });
    }
  } else {
    next();
  }
});

export default router;
