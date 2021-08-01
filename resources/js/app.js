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

Vue.directive('click-outside', {

    bind: function (el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== 'function') {
            const compName = vNode.context.name
            let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
            if (compName) {
                warn += `Found in component '${compName}'`
            }

            console.warn(warn)
        }
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble
        const handler = (e) => {
            if (bubble || (!el.contains(e.target) && el !== e.target)) {
                binding.value(e)
            }
        }
        el.__vueClickOutside__ = handler

        // add Event Listeners
        document.addEventListener('click', handler)
    },

    unbind: function (el, binding) {
        // Remove Event Listeners
        document.removeEventListener('click', el.__vueClickOutside__)
        el.__vueClickOutside__ = null

    }

});

Vue.component('default-transition', {
    template : '\  <transition\n' +
        'enter-active-class="transition ease-out duration-100"\n' +
        'enter-class="opacity-0 scale-95 transform"\n' +
        'enter-to-class="opacity-100 scale-100 transform"\n' +
        'leave-active-class="transition ease-in duration-75"\n' +
        'leave-class="opacity-100 scale-100 transform"\n' +
        'leave-to-class="opacity-0 scale-95 transform"\n' +
        '>\
        \<slot></slot>\
        </transition>',
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