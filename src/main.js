import Vue from 'vue'
import 'es6-promise/auto'
import Vuex from 'vuex'
import Vuelidate from 'vuelidate'
import VueRouter from 'vue-router'

import App from './App.vue'
import Login from './components/Login'
import Todo from './components/Todo'
import i18n from './plugins/i18n'

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(Vuelidate)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', name: 'login', component: Login },
    { path: '/todo', name: 'todo', component: Todo }
  ]
})

import AuthModule from './store/modules/authModule'
import TodoModule from './store/modules/todoModule'

const store = new Vuex.Store({
  modules: {
    authModule: AuthModule,
    todoModule: TodoModule
  }
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
