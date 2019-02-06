import { Auth, API } from "aws-amplify";
import router from "../router";

export default {
  namespaced: true,
  state: {
    currentAuthUser: {},
    signedIn: false
  },
  getters: {},
  actions: {
    findUser({ commit }) {
      return new Promise((resolve, reject) => {
        Auth.currentAuthenticatedUser()
          .then(user => {
            commit("setSignedIn", true);
            commit("setCognitoUser", user);
            console.log("user", user);
            resolve(user);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    addUsertToDdb({ state, getters }) {
      let params = {
        body: {
          userID: getters.userID,
          userName: state.userName,
          recentActivity: new Date(Date.now()).toDateString()
        }, // replace this with attributes you need
        headers: {} // OPTIONAL
      };
      API.post("authUsers", "/auth", params)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error.response);
        });
    },
    globalSignOut({ commit }) {
      Auth.signOut({ global: true })
        .then(data => {
          console.log(data);
          commit("setSignedIn", false);
          commit("resetUser");
          router.push("/sign");
        })
        .catch(err => console.log(err));
    }
  },
  mutations: {
    resetUser(state) {
      state.currentAuthUser = {};
    },
    setCognitoUser(state, user) {
      state.currentAuthUser.CognitoUser = user;
    },
    setUserData(state, data) {
      state.currentAuthUser.data = data;
    },
    setSignedIn(state, bool) {
      state.signedIn = bool;
    }
  }
};
