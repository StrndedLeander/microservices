<template>
  <div class="sign container">
    <div v-if="hasToConfirmEmail">
      <article class="message is-danger">
        <div class="message-header">
          <p>Confirm E-Mail adress</p>
          <button class="delete" aria-label="delete"></button>
        </div>
        <div class="message-body">
          <p>We have to make sure the E-Mail adress you entered exists.</p>
          <p>Please check your inbox and enter the confirmation code in the input field below.</p>
          <button class="button is-warning" @click="sendConfirmationCode">Resend Code</button>
          <button class="button" @click="hasToConfirmEmail = false">Got it</button>
        </div>
      </article>
    </div>
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
import router from "../../router.js";
export default {
  name: "SignView",
  data() {
    return {
      hasToConfirmEmail: false
    };
  },
  methods: {
    ...mapActions("user", ["findUser", "addUserToDdb"]),
    ...mapMutations("user", ["setFetchName"])
  },
  created() {
    AmplifyEventBus.$on("authState", info => {
      console.log(info);
      switch (info) {
        case "confirmSignUp":
          break;
        case "signedOut":
          break;
        case "signedIn":
          // triggers: 1. findUser; 2. fetchUserData; (3.addUserToDdb)
          this.findUser()
            .then(user => {
              this.setFetchName(user.username)
              console.log(user.username.toString());
              this.addUserToDdb()
                .then(res => {
                  console.log(res);
                  router.push("/");
                })
                .catch(err => {
                  console.log(err);
                  router.push("/");
                });
            })
            .catch(err => {
              console.log(err);
            });
          break;
        case "confirmSignIn":
          this.hasToConfirmEmail = true;
          break;
        default:
          console.log(info);
          router.push("/");
      }
    });
  }
};
</script>

<style scoped>
</style>