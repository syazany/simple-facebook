window.axios = require('axios');

export default {
    store(id) {
        return axios.post(`/api/posts/${id}/likes`)
    },
    delete(id) {
        return axios.delete(`/api/posts/${id}/likes`)
    }
}