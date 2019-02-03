<template>
  <div class="navigation">
    <div class="tabs is-centered">
      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/groups">Groups</router-link>
        </li>
        <li>
          <router-link to="/news">News</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navigation"
};
</script>

<style scoped>
li {
  margin: 0 2px 5px 2px;
}
</style>