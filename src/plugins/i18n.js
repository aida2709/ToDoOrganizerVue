import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

const messages = {
    'en': {
    _EMAIL: 'Email',
    _PASSWORD: 'Password',
    _REMEMBER_ME: 'Remember me',
    _FORGET_PASSWORD: 'Forget your password?',
    _SIGN_IN: 'Sign in',
    _USER_DATA_NOT_VALID:'User data is not valid.',
    _LOGOUT:'Log out',
    _TODO_LIST:'To-do list',
    _DONE_LIST:'Done',
    _MANAGE_TO_DO_LIST:'Manage your to do list',
    _SUBTITLE_CLICK_ON_CHECKBOX:'Click on checkbox or drag and drop to done',
    _IMAGE:'Image',
    _DELETE:'Delete'
    }
};

const i18n = new VueI18n({
    locale: 'en', // set locale    
    fallbackLocale: 'en', // set fallback locale    
    messages, // set locale messages
});

export default i18n;