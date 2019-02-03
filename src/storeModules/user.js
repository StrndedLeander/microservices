import { Auth } from "aws-amplify";

export default {
  namespaced: true,
  state: {
    currentAuthUser: {},
    signedIn: false
  },
  getters: {},
  actions: {
    findUser({ commit }) {
      Auth.currentAuthenticatedUser()
        .then(user => {
          commit("setSignedIn", true);
          commit("setAuthUser", user);
        })
        .catch(err => {
          if (err === "not authenticated") {
            commit("setSignedIn", false);
            commit("setAuthUser", {});
          } else {
            console.log(err);
          }
        });
    }
  },
  mutations: {
    setAuthUser(state, user) {
      state.currentAuthUser = user;
    },
    setSignedIn(state, bool) {
      state.signedIn = bool;
    }
  }
};
