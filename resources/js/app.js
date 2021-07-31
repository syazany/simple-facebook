import Vue from "vue";

require('./bootstrap');

import VueRouter from 'vue-router'

import {routes} from "./routes/routes";
import Vuex from 'vuex'
import notification from "./vuex-modules/notification";

Vue.use(Vuex)

window.axios = require('axios');

axios.interceptors.response.use(
    res => {
        return res;
    },
    err => {
        if (err.response.status === 401) {
            location.replace('/login');
        }

        throw err;
    }
);

Vue.use(VueRouter)

const files = require.context("./", true, /\.vue$/i);
files.keys().map(key =>
    Vue.component(
        key
            .split("/")
            .pop()
            .split(".")[0],
        files(key).default
    )
);

export const store = new Vuex.Store({
    modules: {
        notification,
    }
});

const router = new VueRouter({
    mode: 'history',
    routes,
    linkActiveClass: 'active', // apply active class when url matches the route
    linkExactActiveClass: 'active'
})

Vue.filter('thousandSeparator', function (value) {
    if (isNaN(value) || value === "" || value === null) return 0;
    return Number(parseFloat(value).toFixed(2)).toLocaleString('en', {
        minimumFractionDigits: 2
    });
});


const app = new Vue({
    el: "#app",
    router,
    store,
})