const resource = 'requirements'

window.axios = require('axios');

export default {
    all() {
        return axios.get(`/api/posts`);
    },
    store(payload) {
        return axios.post(`/api/posts`, payload)
    },
    get(id) {
        return axios.post(`/api/posts/${id}`);
    },
    delete(id) {
        return axios.delete(`/api/posts/${id}`)
    }
}