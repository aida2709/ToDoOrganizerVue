import Vue from 'vue';

export default {
    UPDATE_TODO_LIST: (state, payload) => {
        Vue.set(state, 'todoList', payload);
    },
    UPDATE_DONE_LIST: (state, payload) => {
        Vue.set(state, 'doneList', payload);
    },
    SET_LOGGED_USER: (state, payload) => {
        Vue.set(state, 'loggedUser', payload);
    },
    LOGOUT: (state) => {
        Vue.set(state, 'loggedUser', null);
    },
}