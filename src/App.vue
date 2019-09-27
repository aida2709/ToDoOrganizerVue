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
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Nunito Sans", sans-serif !important;
}

body {
  font-family: "Nunito Sans", sans-serif !important;
  margin: 0 !important;
  padding: 0 !important;
}

input, label, textarea, button{
  font-family: "Nunito Sans", sans-serif !important;
}
</style>
