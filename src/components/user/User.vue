<template>
  <div>
    <h1>{{ userName }}</h1>
    <section class="section">
      <div class="container">
        <ul v-for="(value, key) in profileUserData" :key="value.userName">
          <li>{{key}} : {{value}}</li>
        </ul>
      </div>
    </section>
    <button class="button is-rounded" @click="toggleUserOptions(true)">
      <span class="icon">
        <i class="fas fa-cog"></i>
      </span>
    </button>
    <div v-if="inUserOptions">
      <Options></Options>
    </div>
  </div>
</template>

<script>
import Options from "./ProfileOptions";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  name: "User",
  components: {
    Options
  },
  props: ["userName"],
  computed: {
    ...mapState("user", {
      profileUserData: state => state.profileView,
      inUserOptions: state => state.userOptions.isActive
    })
  },
  methods: {
    ...mapActions("user", ["fetchUserProfile"]),
    ...mapMutations("user", ["setProfileName", "toggleUserOptions"])
  },
  mounted() {
    if (this.userName == this.profileUserData.userName) {
      return;
    }
    this.setProfileName(this.userName);
    this.fetchUserProfile();
  }
};
</script>

<style scoped>
</style>