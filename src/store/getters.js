function sortByPosition(a, b) {
    return b.Position - a.Position;
}

export default {
    isLogged: state => state.loggedUser,
    isRememberMeActivated: state => state.loggedUser && state.loggedUser.RememberMe,
    getUsername: state => state.loggedUser ? state.loggedUser.Username : '',
    todoList: state => {
        return state.todoList ? state.todoList.sort(sortByPosition) : [];
    },
    doneList: state => {
        return state.doneList ? state.doneList.sort(sortByPosition) : [];
    },
}