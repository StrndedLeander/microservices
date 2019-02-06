<template>
  <div>
    <h1>{{ userName }}</h1>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "User",
  props: ["userName"],
  computed: {
    ...mapState("user", {
      profileUserData: state => state.profileView
    })
  },
  methods: {}
};
</script>

<style scoped>
</style>