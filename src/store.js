import Vue from "vue";
import Vuex from "vuex";

//Module imports
import user from "./storeModules/user";
import groups from "./storeModules/groups";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    groups
  },
  state: {},
  mutations: {},
  actions: {}
});
