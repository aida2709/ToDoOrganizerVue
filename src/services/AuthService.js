export default {

    login(email, password, rememberMe) {
        if (email == "test@test.com" && password == "test") {
            let user={
                Email: email,
                Username: "Username",
                RememberMe: rememberMe,
            }

            localStorage.setItem('loggedUser', JSON.stringify(user));

            return true;
        }
        return false;
    },

    isLogged() {
        let data = localStorage.getItem('loggedUser');

        if (data) {
            let user = JSON.parse(data);
            if (user) {
                return true;
            }
            return false;
        }
        return false;
    },

    isRememberMeActivated() {
        let data = localStorage.getItem('loggedUser');

        if (data) {
            let user = JSON.parse(data);
            if (user && user.RememberMe == true) {
                return true;
            }
            return false;
        }
        return false;
    },

    logout() {
        localStorage.removeItem('loggedUser');
    },

    getUsername() {
        let user = JSON.parse(localStorage.getItem('loggedUser'));

        if (user)
            return user.Username;

        return '';
    }
}