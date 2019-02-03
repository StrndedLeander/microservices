import Vue from "vue";
import Vuex from "vuex";

//Module imports
import user from "./storeModules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user
  },
  state: {},
  mutations: {},
  actions: {}
});
