<template>
  <div class="container">
    <form class="login-form">
      <div class="wrapper">
        <div v-if="isError" class="error">{{ $t('_USER_DATA_NOT_VALID') }}</div>

        <div>
          <img src="../assets/icons/logo.png" class="logo-img" />
        </div>

        <div class="form-control">
          <input
            type="text"
            class="form-input"
            v-model="email"
            :placeholder="$t('_EMAIL')"
            name="emailInput"
            :class="{ 'has-error': submitted && !$v.email.required }"
          />
        </div>

        <div class="form-control">
          <input
            type="password"
            id="passwordId"
            class="form-input"
            v-model="password"
            :placeholder="$t('_PASSWORD')"
            name="passwordInput"
            :class="{ 'has-error': submitted && !$v.password.required }"
          />

          <span
            @click="toggle"
            class="fa fa-lg toggle-password"
            :class="{'fa-eye':!showPassword, 'fa-eye-slash':showPassword}"
          ></span>
        </div>

        <div class="row login-form-section">
          <div class="col m--align-left m-login__form-left">
            <label class="label-container">
              {{ $t('_REMEMBER_ME') }}
              <input type="checkbox" name="rememberMe" v-model="rememberMe" />
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col m--align-right m-login__form-right">
            <span id="m_login_forget_password" class="m-link">{{ $t('_FORGET_PASSWORD') }}</span>
          </div>
        </div>

        <div>
          <button class="signin-button" @click="onSignInClicked">{{ $t('_SIGN_IN') }}</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { LOGIN } from "../store/mutation-types";

export default {
  name: "Login",
  data() {
    return {
      isError: false,
      email: "",
      password: "",
      rememberMe: false,
      submitted: false,
      showPassword: false
    };
  },
  validations: {
    email: { required },
    password: { required }
  },

  methods: {
    toggle() {
      this.showPassword = !this.showPassword;

      if (this.showPassword) {
        document.getElementById("passwordId").setAttribute("type", "text");
      } else {
        document.getElementById("passwordId").setAttribute("type", "password");
      }
    },

    onSignInClicked(e) {
      e.preventDefault();
      this.submitted = true;
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      const user = {
        Email: this.email,
        Password: this.password,
        RememberMe: this.rememberMe
      };
      //this.$store.commit("authModule/"+LOGIN, user);
      this.$store.dispatch('LOGIN', user);

      if (this.isLogged) {
        this.isError = false;
        this.$router.push({ name: "todo" });
      } else {
        this.isError = true;
      }
    }
  },
  computed: {
    isLogged() {
      return this.$store.getters.isLogged;
    }
  }
};
</script>

<style scoped>
input,
label,
button,
a {
  font-family: "Nunito Sans", sans-serif;
}

.container {
  font-size: 12px;
  color: #aba5b6;
  position: absolute;
  top: 29%;
  display: table;
  width: 100%;
}

.login-form {
  margin-left: auto;
  margin-right: auto;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}

.wrapper {
  margin-left: 39%;
  margin-right: 39%;
}

.form-control {
  margin-top: 15px;
}

.form-input {
  font-size: 12px;
  padding: 15px;
  width: 100%;
  border: 1px solid #bdc3d478;
  border-radius: 3px;
  color: #aba5b6;
}

.logo-img {
  width: 140px;
  margin-bottom: 30px;
  cursor: pointer;
}

.row {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.col {
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
  -ms-flex-preferred-size: 0;
  flex-basis: 0;
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  max-width: 100%;
}

.m--align-left {
  text-align: left;
}

*,
::after,
::before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

input[type="checkbox"] {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0;
}

button,
input {
  overflow: visible;
}

.m--align-right {
  text-align: right;
}

#m_login_forget_password {
  cursor: pointer;
}

.m-link {
  text-decoration: none;
  position: relative;
  display: inline-block;
  outline: 0;
  color: #aba5b6;
  font-size: 10px;
}

.m-link:after {
  display: block;
  content: "";
  position: absolute;
  bottom: 0;
  top: 1rem;
  left: 0;
  width: 0%;
  -webkit-transition: width 0.3s ease;
  transition: width 0.3s ease;
}

.login-form-section {
  margin-top: 15px;
}

.signin-button {
  width: 100%;
  background-color: #2d4ef5;
  color: white;
  cursor: pointer;
  border: none;
  padding: 15px;
  font-size: 12px;
  margin-top: 25px;
  border-radius: 3px;
  -webkit-box-shadow: 0 12px 15px -6px #2d4ef5;
  -moz-box-shadow: 0 12px 15px -6px #2d4ef5;
  box-shadow: 0 12px 15px -6px #2d4ef5;
}

::placeholder {
  color: #aba5b6;
  opacity: 1;
  /* Firefox */
}

:-ms-input-placeholder {
  /* Internet Explorer 10-11 */
  color: #aba5b6;
}

::-ms-input-placeholder {
  /* Microsoft Edge */
  color: #aba5b6;
}

.toggle-password {
  float: right;
  margin-right: 20px;
  margin-top: -30px;
  position: relative;
  z-index: 2;
  cursor: pointer;
}

.error {
  padding: 15px;
  background-color: #ef8282;
  color: white;
  margin-bottom: 15px;
  border-radius: 2px;
}

.has-error {
  border: 1px solid #ef8282;
}

.label-container {
  display: block;
  position: relative;
  padding-left: 20px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 10px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */

.label-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 12px;
  width: 12px;
  border-radius: 3px;
  background-color: white;
  border: 1px solid #bdc3d4;
}

/* On mouse-over, add a grey background color */

.label-container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */

.label-container input:checked ~ .checkmark {
  background-color: #1563ff;
}

/* Create the checkmark/indicator (hidden when not checked) */

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */

.label-container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */

.label-container .checkmark:after {
  left: 2px;
  top: 0px;
  width: 6px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

@media (min-width: 1432px) {
  .logo-img {
    width: 200px;
  }
  .form-input {
    font-size: 16px;
    padding: 20px;
  }
  .label-container,
  .m-link {
    font-size: 14px;
    padding-left: 25px;
  }
  .checkmark {
    height: 18px;
    width: 18px;
  }
  .form-control {
    margin-top: 25px;
  }
  .toggle-password {
    margin-top: -35px;
  }
  .label-container .checkmark:after {
    left: 4px;
    top: 0px;
    width: 9px;
    height: 11px;
  }
  .signin-button {
    padding: 20px;
    font-size: 14px;
  }
  .error {
    font-size: 14px;
  }
}

@media (max-width: 1100px) {
  .wrapper {
    margin-left: 20%;
    margin-right: 20%;
  }
}

@media (max-width: 800px) {
  .container {
    top: 10%;
  }
}

@media (max-width: 600px) {
  .wrapper {
    margin-left: 5%;
    margin-right: 5%;
  }
  .logo-img {
    width: 120px;
  }
  .container {
    top: 10%;
  }
}

@media (max-width: 500px) {
  .form-input,
  .signin-button {
    font-size: 12px;
    padding: 10px;
  }
  .toggle-password {
    margin-top: -25px;
  }
}

@media (min-width: 320px) and (max-width: 480px) {
  .container {
    top: 10%;
  }
}
</style>