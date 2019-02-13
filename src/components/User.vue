<template>
  <div>
    <h1>{{ userName }}</h1>
    <button class="buton" @click="options = true">
      <span class="icon">
        <i class="fas fa-cogs"></i>
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
  data() {},
  props: ["userName"],
  computed: {
    ...mapState("user", {
      profileUserData: state => state.profileView,
      inUserOptions: state => state.userOptions.isActive
    })
  },
  methods: {
    ...mapActions("user", ["fetchUserData"]),
    ...mapMutations("user", ["setProfileName"])
  },
  created() {
    this.setProfileName(this.userName);
    this.fetchUserData();
  }
};
</script>

<style scoped>
</style>