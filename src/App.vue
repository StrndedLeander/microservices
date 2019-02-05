<template>
  <div id="app" class="hero">
    <div class="hero-body">
      <router-view/>
    </div>
    <div v-if="user.CognitoUser">
      <Navigation></Navigation>
    </div>
  </div>
</template>
<script>
import { components } from "aws-amplify-vue";
import Navigation from "./components/Navigation";
import { mapState } from "vuex";
export default {
  components: {
    Navigation,
    ...components
  },
  computed: {
    ...mapState("user", {
      user: state => state.currentAuthUser
    })
  }
};
</script>

<style>
</style>
