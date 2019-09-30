import { LOGOUT, LOGIN } from '../mutation-types'

const AuthModule = {
    namespaced: true,
    state: {
        loggedUser: JSON.parse(localStorage.getItem('loggedUser')),
    },
    getters: {
        isLogged: state => {
            if (state.loggedUser)
                return true;

            return false;
        },
        isRememberMeActivated: state => {
            if (state.loggedUser && state.loggedUser.RememberMe)
                return true;

            return false;
        },
        getUsername: state => {
            return state.loggedUser ? state.loggedUser.Username : '';
        }
    },
    mutations: {
        [LOGOUT](state) {
            localStorage.removeItem('loggedUser');
            state.loggedUser = null;
        },
        [LOGIN](state, user) {
            if (user.Email === "test@test.com" && user.Password === "test") {
                user.Username = "Username";
                localStorage.setItem('loggedUser', JSON.stringify(user));

                return true;
            }
            return false;
        }
    }
}

export default AuthModule;