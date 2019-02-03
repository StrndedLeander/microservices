<template>
  <div class="sign container">
    <div class="columns">
      <div class="column"></div>
      <div class="column">
        <amplify-authenticator></amplify-authenticator>
      </div>
      <div class="column"></div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { AmplifyEventBus } from "aws-amplify-vue";
export default {
  name: "SignView",
  methods: {
    ...mapActions("user", ["findUser"])
  },
  created() {
    AmplifyEventBus.$on("authState", info => {
      if (info === "signedIn") {
        this.findUser();
      } else {
        console.log(info);
      }
    });
  }
};
</script>

<style scoped>
</style>