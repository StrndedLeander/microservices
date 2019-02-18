<template>
  <div class="groupsListing">
    <button class="button" @click="getAllGroups">List Groups</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      groups: []
    };
  },
  methods: {
    ...mapActions("groups", ["getAllGroups"])
  }
  // mounted() {
  //   this.getAllGroups().then(response => {
  //     for(let i=0; i < response.data)
  //   })
  // }
};
</script>

<style scoped>
</style>