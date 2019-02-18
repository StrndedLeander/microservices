<template>
  <div class="groups">
    <GroupsListing></GroupsListing>
  </div>
</template>

<script>
// import GroupsCreation from "../components/groups/GroupsCreation";
import GroupsListing from "../components/groups/GroupsListing";
export default {
  name: "GroupsView",
  components: {
    // GroupsCreation,
    GroupsListing
  }
};
</script>

<style scoped>
</style>