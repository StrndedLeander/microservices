<template>
  <div class="home">Hello</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import router from "../router.js";
export default {
  name: "home",
  components: {},
  computed: {
    ...mapState("user", {
      currentAuthUser: state => state.currentAuthUser,
      signedIn: state => state.signedIn
    })
  },
  methods: {
    ...mapActions("user", ["findUser"])
  },
  created() {
    this.findUser();
    console.log(this.signedIn);
    if (this.signedIn === false) {
      router.push("/sign");
    }
  }
};
</script>
