<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="moda-card-head">
        <p class="modal-card-title">Options</p>
        <button @click="deactivate" class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <div v-for="userProps in user" :key="userProps.username"></div>
      </section>
      <footer class="moda-card-foot">
        <button @click="setChanges" class="button is-success">Save changes</button>
        <button @click="deactivate" class="button is-danger">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Options",
  data() {
    return {
      changes: {}
    };
  },
  computed: {
    ...mapState("user", {
      user: state => state.userProps
    })
  },
  methods: {
    ...mapMutations("user", ["toggleUserOptions", "setUserChanges"]),
    deactivate() {
      this.toggleUserOptions(false);
    },
    setChanges() {
      this.setUserChanges(this.changes);
    }
  }
};
</script>

<style scoped>
</style>