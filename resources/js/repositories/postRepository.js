window.axios = require('axios');

export default {
    all(url = "") {
        if (url === "") {
            return axios.get(`/api/posts`);
        }

        return axios.get(url);
    },
    store(payload) {
        return axios.post(`/api/posts`, payload)
    },
    update(id, payload) {
      return axios.patch(`/api/posts/${id}`, payload)
    },
    get(id) {
        return axios.post(`/api/posts/${id}`);
    },
    delete(id) {
        return axios.delete(`/api/posts/${id}`)
    }
}