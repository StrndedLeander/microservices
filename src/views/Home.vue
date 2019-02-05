<template>
  <div class="home">Hello</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
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
  }
};
</script>
