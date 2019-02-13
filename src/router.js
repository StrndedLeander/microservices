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
    },
    {
      path: "/user/:userName",
      name: "ProfileView",
      component: () => import("./views/Profile")
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    Store.dispatch("user/findUser")
      .then(() => {
        next();
      })
      .catch(err => {
        console.log(err);
        next({
          path: "/sign",
          query: {
            redirect: to.fullPath
          }
        });
      });
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    Store.dispatch("user/findUser")
      .then(() => {
        next({
          path: "/",
          query: {
            redirect: to.fullPath
          }
        });
      })
      .catch(err => {
        console.log(err);
        next();
      });
  } else {
    Store.dispatch("user/findUser");
    next();
  }
});

export default router;
