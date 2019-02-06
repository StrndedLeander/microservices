<template>
  <div class="profile">
    <User :userName="userName"></User>
  </div>
</template>

<script>
import { mapActions } from "vuex";
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