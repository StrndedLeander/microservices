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
      user: state => state.userProps,
      signedIn: state => state.signedIn
    })
  },
  methods: {
    ...mapActions("user", ["findUser"])
  }
};
</script>
