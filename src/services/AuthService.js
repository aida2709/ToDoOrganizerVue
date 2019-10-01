export default {
    login(Email, Password, RememberMe) {
        if (Email === "test@test.com" && Password === "test") {
            let user = {
                Email,
                Username: "Username",
                RememberMe,
            }

            localStorage.setItem('loggedUser', JSON.stringify(user));

            return user;
        }
        return null;
    },

    isLogged() {
        let data = localStorage.getItem('loggedUser');

        if (data) {
            let user = JSON.parse(data);
            if(user)
                return true;

            return false;
        }
        return false;
    },

    isRememberMeActivated() {
        let data = localStorage.getItem('loggedUser');

        if (data) {
            let user = JSON.parse(data);
            return (user && user.RememberMe);
        }
        return false;
    },

    logout() {
        localStorage.removeItem('loggedUser');
        //localStorage.clear();
    },

    getUsername() {
        let user = JSON.parse(localStorage.getItem('loggedUser'));
        return user ? user.Username : '';
    }
}