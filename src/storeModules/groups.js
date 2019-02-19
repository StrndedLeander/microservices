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
    getAllGroups() {
      return new Promise((resolve, reject) => {
        let params = {
          TableName: "groupsTable",
          ProjectionExpression: "#groupID, groupName",
          ExpressionAttributeNames: {
            "#groupID": "groupID"
          }
        };
        API.get("groups", "/group", params)
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
        let path = "/group/object/" + state.fetchID;
        let myInit = {
          response: true
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
