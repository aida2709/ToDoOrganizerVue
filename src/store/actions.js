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
    DELETE_DONE_ITEM: ({ commit }, payload) => {
        let response = TodoService.removeDoneItem(payload);
        commit('UPDATE_DONE_LIST', response);
    },
    EDIT_TODO_ITEM: ({ commit }, payload) => {
        let response = TodoService.editToDoItem(payload);
        commit('UPDATE_TODO_LIST', response);
    },
    UPDATE_TODO_LIST: ({ commit }, payload) => {
        commit('UPDATE_TODO_LIST', payload);
    },
    UPDATE_DONE_LIST: ({ commit }, payload) => {
        commit('UPDATE_DONE_LIST', payload);
    },
    ADD_TODO_ITEM: ({ commit }, payload) => {
        let response = TodoService.addToDo(payload);
        commit('UPDATE_TODO_LIST', response);
    },
    ADD_DONE_ITEM: ({ commit }, payload) => {
        let response = TodoService.addDone(payload);
        commit('UPDATE_DONE_LIST', response);
    },
    REMOVE_ALL_DONE_ITEMS: ({ commit }) => {
        TodoService.removeAllDoneItems();
        commit('UPDATE_DONE_LIST', []);
    },
    TODO_ITEM_STATUS_CHANGED: ({ commit }, payload) => {
        let todoList = TodoService.removeToDoItem(payload);
        let doneList = TodoService.addDone(payload);

        commit('UPDATE_TODO_LIST', todoList);
        commit('UPDATE_DONE_LIST', doneList);
    },
    DONE_ITEM_STATUS_CHANGED: ({ commit }, payload) => {
        let doneList = TodoService.removeDoneItem(payload);
        let todoList = TodoService.addToDo(payload);

        commit('UPDATE_TODO_LIST', todoList);
        commit('UPDATE_DONE_LIST', doneList);
    },
}