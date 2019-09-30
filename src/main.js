import Vue from 'vue'
import store from './store';
import Vuelidate from 'vuelidate'
import VueRouter from 'vue-router'

import App from './App.vue'
import Login from './components/Login'
import Todo from './components/Todo'
import i18n from './plugins/i18n'

Vue.config.productionTip = false
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

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
