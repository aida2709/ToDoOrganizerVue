<template>
  <div class="navigation-bar">
    <div id="navigation-container">
      <img src="../assets/icons/logo.png" class="logoImg" />

      <ul id="menu">
        <li @click="onShowDropdownClicked">
          <div class="username">{{username}}</div>
          <a class="btn"></a>

          <div class="dropdown-content" v-if="showDropdown">
            <img src="../assets/icons/logout.png" class="logoutImg" />
            <a @click="onLogoutClicked" class="logout">Log out</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import AuthService from "../services/AuthService";

export default {
  name: "Toolbar",
  data() {
    return {
      username: "",
      showDropdown: false
    };
  },
  methods: {
    onShowDropdownClicked() {
      this.showDropdown = !this.showDropdown;
    },
    onLogoutClicked() {
      AuthService.logout();
      this.$router.push('login');
    }
  },
  mounted: function() {

    if (AuthService.isLogged() == false) {
        this.$router.push('login');
    } 
    else{
    this.username = AuthService.getUsername();
    }
  }
};
</script>

<style scoped>
#navigation-container {
  margin: 0 auto;
  height: 70px;
}

.navigation-bar {
  background-color: #f5f6fa;
  height: 60px;
  width: 100%;
  text-align: center;
}

.logoImg {
  float: left;
  width: 95px;
  margin-top: 15px;
  margin-left: 250px;
}

.navigation-bar ul {
  padding: 0px;
  margin: 0px;
  text-align: center;
  display: inline-block;
  vertical-align: top;
}

.navigation-bar li {
  list-style-type: none;
  padding: 0px;
  display: inline;
}

.navigation-bar li a {
  color: black;
  font-size: 16px;
  text-decoration: none;
  line-height: 70px;
  padding: 5px 15px;
  opacity: 0.7;
}

#menu {
  float: right;
  margin-right: 250px;
  cursor: pointer;
}

.btn {
  background: url(../assets/icons/avatar.png) no-repeat padding-box center;
  background-color: #dadadd;
  background-size: 20px 25px;
  height: 25px;
  width: 5px;
  border-radius: 50%;
  border: 1px solid #d2d3d5;
  float: right;
  margin-top: 10px;
}

.username {
  position: absolute;
  display: inline;
  padding-top: 20px;
  margin-right: 50px;
  right: 250px;
  font-size: 12px;
  font-weight: bold;
}

.dropdown-content {
  position: absolute;
  right: 250px;
  top: 60px;
  background-color: #fff;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.logout {
  color: black;
  padding: 12px 16px;
  line-height: 20px !important;
  text-decoration: none;
  display: block;
  margin-right: 40px;
  font-size: 12px !important;
  font-weight: bold;
}

.logoutImg {
  position: absolute;
  float: left;
  left: 5px;
  top: 5px;
}

@media (min-width: 1432px) {
  .navigation-bar {
    height: 80px !important;
  }
  .logoImg {
    width: 115px;
    margin-top: 20px;
  }
  .username {
    font-size: 16px;
    padding-top: 30px;
  }
  .btn {
    height: 30px;
    width: 10px;
    margin-top: 17px;
  }
  .dropdown-content {
    top: 80px;
  }
  .logout {
    line-height: 40px !important;
  }
  .logoutImg {
    top: 15px;
  }
}

@media (max-width: 1215px) {
  .logoImg {
    margin-left: 180px;
  }
  #menu {
    margin-right: 180px;
  }
  .username,
  .dropdown-content {
    right: 180px;
  }
}

@media (max-width: 1215px) and (min-width: 601px) {
  .logoImg {
    margin-left: 10px;
  }
  #menu {
    margin-right: 10px;
  }
  .username,
  .dropdown-content {
    right: 10px;
  }
}

@media (max-width: 600px) {
  .logoImg {
    margin-left: 10px;
  }

  #menu {
    margin-right: 10px;
  }

  .username {
    right: 10px;
  }
}
</style>