<template>
  <div class="sign">
    <amplify-authenticator></amplify-authenticator>
  </div>
</template>

<script>
import { Auth } from "aws-amplify";
import { AmplifyEventBus } from "aws-amplify-vue";
export default {
  name: "SignView",
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