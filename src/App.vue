<template>
  <div id="app" class="hero">
    <div class="hero-body">
      <router-view/>
    </div>
    <Navigation></Navigation>
  </div>
</template>
<script>
import Navigation from "./components/Navigation";
export default {
  components: {
    Navigation
  }
};
</script>

<style>
</style>
