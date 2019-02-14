<template>
  <div>
    <h1>{{ userName }}</h1>
    <section class="section">
      <div class="container"></div>
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
import Options from "./OptionsModal";
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
    ...mapActions("user", ["fetchUserData"]),
    ...mapMutations("user", ["setProfileName", "toggleUserOptions"])
  },
  created() {
    this.setProfileName(this.userName);
    this.fetchUserData();
  }
};
</script>

<style scoped>
</style>