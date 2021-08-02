window.axios = require('axios');
export const routes = [
    {
        path : '/',
        name : 'home',
        component: require ("../views/posts/PostIndex").default
    },

];
