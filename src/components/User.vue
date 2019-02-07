<template>
  <div>
    <h1>{{ userName }}</h1>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "User",
  props: ["userName"],
  computed: {
    ...mapState("user", {
      profileUserData: state => state.profileView
    })
  },
  methods: {
    ...mapActions("user", ["fetchUserData"])
  },
  created() {
    this.fetchUserData(this.userName);
  }
};
</script>

<style scoped>
</style>