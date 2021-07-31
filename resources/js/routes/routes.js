window.axios = require('axios');
export const routes = [
    {
        path : '/login',
        name : 'login',
        component: require ('../views/auth/Login').default
    },
    {
        path : '/register',
        name : 'register',
        component: require ('../views/auth/Register').default
    },

];
