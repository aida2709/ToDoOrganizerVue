<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import AuthService from "./services/AuthService";
export default {
  name: "app",
  components: {},
  mounted: function() {
    if (AuthService.isLogged() == true) {
      if (AuthService.isRememberMeActivated() == true) {
        this.$router.push("todo");
      } else {
        localStorage.removeItem("loggedUser");
        this.$router.push("");
      }
    } else {
      this.$router.push("");
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
