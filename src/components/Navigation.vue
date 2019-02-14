<template>
  <div class="navigation">
    <div class="tabs is-centered">
      <ul>
        <li>
          <router-link :to="`/user/${userName}`" class="button is-rounded">
            <span class="icon">
              <i class="far fa-user"></i>
            </span>
          </router-link>
        </li>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/groups">Groups</router-link>
        </li>
        <li>
          <router-link to="/news">News</router-link>
        </li>
        <li>
          <button @click="triggerSignOut" class="button is-rounded">
            <span class="icon">
              <i class="fas fa-power-off"></i>
            </span>
          </button>
        </li>
      </ul>
      <div v-if="signingOut" class="modal is-active">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Are you sure to sign out?</p>
            <button @click="cancelSignOut" class="delete" aria-label="close"></button>
          </header>
          <footer class="modal-card-foot">
            <button @click="confirmSignOut" class="button is-success">Sign Out</button>
            <button @click="cancelSignOut" class="button is-danger">Cancel</button>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Navigation",
  data() {
    return {
      signingOut: false
    };
  },
  computed: {
    ...mapState("user", {
      userName: state => state.CognitoUser.username
    })
  },
  methods: {
    ...mapActions("user", ["globalSignOut"]),
    triggerSignOut() {
      this.signingOut = true;
      console.log("Signing Out", this.signingOut);
    },
    cancelSignOut() {
      this.signingOut = false;
    },
    confirmSignOut() {
      this.signingOut = false;
      this.globalSignOut();
    }
  }
};
</script>

<style scoped>
li {
  margin: 0 2px 5px 2px;
}
</style>