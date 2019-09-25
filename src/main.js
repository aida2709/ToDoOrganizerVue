import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import VueRouter from 'vue-router'

import Login from './components/Login'
import Todo from './components/Todo'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', name: 'login', component: Login },
    { path: '/todo', name: 'todo', component: Todo },
    { path: '/login', name: 'login', component: Login }
  ]
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
