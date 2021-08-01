import postRepository from "../repositories/postRepository";

const state = () => ({
    posts : [],
    deletePostId : null
});

// getters
const getters = {
    posts: (state) => state.posts,
    deletePostId : (state) => state.deletePostId
};

// mutations
const mutations = {
    SET_POSTS : (state, payload) => {
        state.posts = payload;
    },
    SET_POST_DELETE_ID : (state, payload) => {
        state.deletePostId = payload;
    },
};

const actions = {
    async fetchPosts(state) {
        const response = await postRepository.all();
        console.log({response});
        state.commit('SET_POSTS', response.data.data);
    },
    async deletePost() {
        const response = await re
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
};
