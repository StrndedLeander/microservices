<template>
  <div class="profile">
    <User :userName="userName"></User>
  </div>
</template>

<script>
import User from "../components/User";
export default {
  name: "ProfileView",
  components: {
    User
  },
  computed: {
    userName() {
      this.$route.params.userName;
    }
  }
};
</script>

<style scoped>
</style>