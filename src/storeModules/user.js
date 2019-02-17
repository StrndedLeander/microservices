import { Auth, API } from "aws-amplify";
import router from "../router";
import aws from "aws-sdk";

export default {
  namespaced: true,
  state: {
    CognitoUser: {}, // AWS CognitoUser object
    userData: {}, // holding data of returned ddb table object of current user
    users: [],
    profileView: {},
    userOptions: {
      // Holding data about setting user options
      isActive: false
    },
    fetchName: "",
    signedIn: false
  },
  getters: {},
  actions: {
    addUserToDdb({ state, dispatch, commit }) {
      return new Promise((resolve, reject) => {
        dispatch("fetchUserData")
          .then(response => {
            console.log(response);
            resolve(response);
          })
          .catch(err => {
            console.log(err);
            let apiName = "users";
            let path = "/users";
            let myInit = {
              body: {
                userName: state.fetchName,
                createdAt: new Date(Date.now()).toString()
              },
              response: true // OPTIONAL (return the entire Axios response object instead of only response.data)
            };
            API.post(apiName, path, myInit)
              .then(response => {
                console.log(response);
                resolve(response);
              })
              .catch(err => {
                console.log(err);
                reject(err);
              });
          });
        commit("setFetchName", "");
      });
    },
    // fetches users table row to do something with the data resolved by a promiseq
    fetchUserData(userName) {
      return new Promise((resolve, reject) => {
        let apiName = "users";
        let path = "/users/object/" + userName;
        let myInit = {
          response: true // OPTIONAL (return the entire Axios response object instead of only response.data)
        };
        API.get(apiName, path, myInit)
          .then(response => {
            console.log(response);
            resolve(response);
          })
          .catch(error => {
            console.log(error.response);
            reject(error);
          });
      });
    },
    // api call to get the table row for a user for which the user profile shall be displayed
    fetchUserProfile({ state, commit }) {
      console.log(state.profileView.userName);
      let apiName = "users";
      let path = "/users/object/" + state.profileView.userName;
      let myInit = {
        response: true // OPTIONAL (return the entire Axios response object instead of only response.data)
      };
      API.get(apiName, path, myInit)
        .then(response => {
          commit("setProfileView", response.data);
          console.log(response);
        })
        .catch(error => {
          console.log(error.response);
        });
    },
    // returns the current user that is authenticated in a promise - not a lambda api call -
    findUser({ commit }) {
      return new Promise((resolve, reject) => {
        Auth.currentAuthenticatedUser()
          .then(user => {
            commit("setSignedIn", true);
            commit("setCognitoUser", user);
            resolve(user);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    deleteUser({ state }) {
      let accessToken = state.CognitoUser.CognitoUserSession.CognitoAccessToken;
      let apiName = "users";
      let path = "/users/object/" + state.CognitoUser.username;
      let myInit = {
        response: true // OPTIONAL (return the entire Axios response object instead of only response.data)
      };
      API.del(apiName, path, myInit)
        .then(response => {
          console.log(response);
          var params = {
            AccessToken: accessToken
          };
          aws.cognitoidentityserviceprovider.deleteUser(params, function(
            err,
            data
          ) {
            if (err) console.log(err, err.stack);
            // an error occurred
            else console.log(data); // successful response
          });
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
    },
    sendConfirmationCode() {}
  },
  mutations: {
    setProfileName(state, name) {
      state.profileView.userName = name;
    },
    setFetchName(state, name) {
      state.fetchName = name;
    },
    resetUser(state) {
      state.userData = {};
      state.CognitoUser = {};
    },
    setCognitoUser(state, user) {
      state.CognitoUser = user;
    },
    setUserData(state, data) {
      state.userData = data;
    },
    setSignedIn(state, bool) {
      state.signedIn = bool;
    },
    setProfileView(state, data) {
      state.profileView = data;
    },
    toggleUserOptions(state, bool) {
      state.userOptions.isActive = bool;
    },
    setUserChanges(state, changeObj) {
      state.userOptions.changes = changeObj;
    }
  }
};
