import Vue from "vue";

require('./bootstrap');

import VueRouter from 'vue-router'
import VModal from 'vue-js-modal';
require('alpinejs');

import {routes} from "./routes/routes";
import Vuex from 'vuex'
import VueToast from "vue-toast-notification";
import notification from "./vuex-modules/notification";
import posts from "./vuex-modules/posts";
import dayjs from "dayjs";
import LocalizedFormat from 'dayjs/plugin/localizedFormat';


[VueRouter, Vuex, VueToast, VModal, dayjs].forEach((x) => Vue.use(x));
dayjs.extend(LocalizedFormat);
window.axios = require('axios');

// axios.interceptors.response.use(
//     res => {
//         return res;
//     },
//     err => {
//         if (err.response.status === 401) {
//             location.replace('/login');
//         }
//
//         throw err;
//     }
// );

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

Vue.filter('formatDateTime', function (value) {
    let dateTime = dayjs(value);
    return dateTime.format('LLL');
});

export const store = new Vuex.Store({
    modules: {
        notification,
        posts
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