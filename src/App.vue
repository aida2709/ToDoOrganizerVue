<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { AUTH_MODULE } from "./store/mutation-types";
export default {
  name: "app",
  components: {},
  computed: {
    isUserLogged() {
      return this.$store.getters.isLogged;
    },
    isRememberMeActivated() {
      return this.$store.getters.isRememberMeActivated;
    }
  },
  mounted: function() {
    if (this.isUserLogged && this.isRememberMeActivated) {
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
