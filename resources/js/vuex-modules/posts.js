import postRepository from "../repositories/postRepository";

const state = () => ({
    posts : [],
    dismissable: true
});

// getters
const getters = {
    posts: (state) => {
        return state.posts;
    },
};

// mutations
const mutations = {
    SET_POSTS : (state, payload) => {
        state.posts = payload;
    }
};

const actions = {
    async fetchPosts(state) {
        const response = await postRepository.all();
        console.log({response});
        state.commit('SET_POSTS', response.data.data);
    },
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
};
