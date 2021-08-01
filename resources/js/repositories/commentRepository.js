const resource = 'requirements'

window.axios = require('axios');

export default {
    all() {
        return axios.get(`/api/posts/${id}/comments`);
    },
    store(id, payload) {
        return axios.post(`/api/posts/${id}/comments`, payload)
    }
}