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
}