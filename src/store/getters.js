import sortByPosition from './helper'

export default {
    isLogged: state => state.loggedUser,
    isRememberMeActivated: state => state.loggedUser && state.loggedUser.RememberMe,
    getUsername: state => state.loggedUser ? state.loggedUser.Username : '',
    getTodoList: state => {
        return state.todoList ? state.todoList.sort(sortByPosition) : [];
    },
    getDoneList: state => {
        return state.doneList ? state.doneList.sort(sortByPosition) : [];
    },
}