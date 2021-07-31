window.axios = require('axios');
export const routes = [
    {
        path : '/home',
        name : 'home',
        component: require ("../views/posts/PostIndex").default
    },

];
