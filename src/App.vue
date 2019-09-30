<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  mounted: function() {
    if (
      this.$store.getters.isLogged &&
      this.$store.getters.isRememberMeActivated
    ) {
      if (this.$route.name !== "todo") {
        this.$router.push({ name: "todo" });
      }
    } else if (this.$route.name !== "login") {
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style>
#app {
  font-family: "Nunito Sans", sans-serif;
}

body {
  font-family: "Nunito Sans", sans-serif;
  margin: 0;
  padding: 0;
}

input,
label,
textarea,
button {
  font-family: "Nunito Sans", sans-serif;
}
</style>
