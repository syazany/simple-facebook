import Vue from "vue";

require('./bootstrap');

const files = require.context("./components", true, /\.vue$/i);
files.keys().map(key =>
    Vue.component(
        key
            .split("/")
            .pop()
            .split(".")[0],
        files(key).default
    )
);

Vue.filter('thousandSeparator', function (value) {
    if (isNaN(value) || value === "" || value === null) return 0;
    return Number(parseFloat(value).toFixed(2)).toLocaleString('en', {
        minimumFractionDigits: 2
    });
});


const app = new Vue({
    el: "#app",
})