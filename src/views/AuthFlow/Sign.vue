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
import { mapActions, mapMutations } from "vuex";
import { AmplifyEventBus } from "aws-amplify-vue";
import router from "../../router.js"
export default {
  name: "SignView",
  methods: {
    ...mapActions("user", ["findUser"]),
    ...mapMutations("user", ["setNewUser"])
  },
  created() {
    AmplifyEventBus.$on("authState", info => {
      if (info === "signedIn") {
        console.log(info);
        this.findUser();
        router.push("/");
      } else {
        console.log(info);
      }
    });
  }
};
</script>

<style scoped>
</style>