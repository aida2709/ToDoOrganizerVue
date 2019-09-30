import Vue from 'vue'
import 'es6-promise/auto'
import Vuex from 'vuex'
import Vuelidate from 'vuelidate'
import VueRouter from 'vue-router'

import App from './App.vue'
import Login from './components/Login'
import Todo from './components/Todo'
import i18n from './plugins/i18n'

import { ADD_TO_DO_ITEM, ADD_DONE_ITEM} from './store/mutation-types'

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

const store = new Vuex.Store({
  state: {
    todoList: JSON.parse(localStorage.getItem('todoList')),
    doneList: JSON.parse(localStorage.getItem('doneList')),

  },
  getters: {
    todoList: state => {
      return state.todoList;
    },
    doneList: state => {
      return state.doneList;
    },
    getNextId: state=> {
      let id = 1;

      if (state.todoList) {
        state.todoList.map(function (obj) {
          if (obj.Id >= id)
            id = obj.Id + 1;
        });
      }

      if (state.doneList) {
        state.doneList.map(function (obj) {
          if (obj.Id >= id)
            id = obj.Id + 1;
        });
      }

      return id;
    },

    getPositionForToDoItem:state=> {
      let position = 1;

      if (state.todoList) {
        state.todoList.map(function (obj) {
          if (obj.Position >= position)
            position = obj.Position + 1;
        });
      }

      return position;
    },
    getPositionForDoneItem: state=>{
      let position = 1;

      if (state.doneList) {
        state.doneList.map(function (obj) {
          if (obj.Position >= position)
            position = obj.Position + 1;
        });
      }

      return position;
    }
  },
  mutations: {
    [ADD_TO_DO_ITEM](state, toDoItem) {
      toDoItem.IsFinished = false;
      toDoItem.Position = state.getPositionForToDoItem;

      if (!toDoItem.Id)//if item already has its id, do not update it
        toDoItem.Id = state.getNextId;

      if (!state.todoList) {
        state.todoList = [];
      }

      state.todoList.push(toDoItem);
      localStorage.setItem('todoList', JSON.stringify(state.todoList));
    },
    [ADD_DONE_ITEM](state, toDoItem) {
      toDoItem.IsFinished = true;
      toDoItem.Position = state.getPositionForToDoItem;

      if (!toDoItem.Id)//if item already has its id, do not update it
        toDoItem.Id = state.getNextId;

      if (!state.doneList) {
        state.doneList = [];
      }

      state.doneList.push(toDoItem);
      localStorage.setItem('doneList', JSON.stringify(state.doneList));
    }
  }
})

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
