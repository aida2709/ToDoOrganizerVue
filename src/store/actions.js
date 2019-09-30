import TodoService from '../services/TodoService'
import AuthService from '../services/AuthService'

export default {
    LOGIN: ({ commit }, payload) => {
        let response = AuthService.login(payload.Email, payload.Password, payload.RememberMe);
        commit('SET_LOGGED_USER', response);
    },
    LOGOUT: ({ commit }) => {
        let response = AuthService.logout();
        commit('LOGOUT', response);
    },
    DELETE_TODO_ITEM: ({ commit }, payload) => {
        let response = TodoService.removeToDoItem(payload);
        commit('UPDATE_TODO_LIST', response);
    },
    EDIT_TODO_ITEM: ({ commit }, payload) => {
        let response = TodoService.editToDoItem(payload);
        window.console.log(response);
        commit('UPDATE_TODO_LIST', response);
    },
    UPDATE_TODO_LIST: ({ commit }, payload) => {
        commit('UPDATE_TODO_LIST', payload);
    },
    UPDATE_DONE_LIST: ({ commit }, payload) => {
        commit('UPDATE_DONE_LIST', payload);
    },
    ADD_TODO_ITEM: ({ commit }, payload) => {
        let response=TodoService.addToDo(payload);
        commit('UPDATE_TODO_LIST', response);
    },
    ADD_DONE_ITEM: ({ commit }, payload) => {
        let response=TodoService.addDone(payload);
        commit('UPDATE_DONE_LIST', response);
    },
    REMOVE_ALL_DONE_ITEMS: ({ commit }) => {
        let response=TodoService.removeAllDoneItems();
        commit('UPDATE_DONE_LIST', []);
    },
}