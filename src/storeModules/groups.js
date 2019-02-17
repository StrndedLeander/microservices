import { API } from "aws-amplify";

export default {
  namespaced: true,
  state: {
    fetchID: "",
    groupProfile: {},
    groups: []
  },
  getters: {},
  actions: {
    listAllGroups() {
      return new Promise((resolve, reject) => {
        API.get("groups")
          .then(response => {
            console.log(response);
            resolve(response);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
    },
    fetchGroupData({ state, commit }) {
      return new Promise((resolve, reject) => {
        let path = "/groups/object/" + state.fetchID;
        let myInit = {
          response: true // OPTIONAL (return the entire Axios response object instead of only response.data)
        };
        API.get("groups", path, myInit)
          .then(response => {
            console.log(response);
            resolve(response);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
        commit("setFetchID", "");
      });
    }
  },
  mutations: {
    setFetchID(state, id) {
      state.fetchID = id;
    }
  }
};
