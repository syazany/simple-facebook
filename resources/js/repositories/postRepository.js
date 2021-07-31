const resource = 'requirements'

window.axios = require('axios');

export default {
    all() {
        return axios.get(`/api/posts`);
    },
    store(id, payload) {
        return axios.post(`/api/${id}`, payload)
    },
    get(id) {
        return axios.post(`/api/${id}`);
    }
}