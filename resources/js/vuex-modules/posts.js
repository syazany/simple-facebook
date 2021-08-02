import postRepository from "../repositories/postRepository";

const state = () => ({
    posts : [],
    deletePostId : null,
    pagination: {
        links: null,
        meta: null
    },
    editPostId : null,
    content : "",
});

// getters
const getters = {
    posts: (state) => state.posts,
    deletePostId : (state) => state.deletePostId,
    pagination : (state) => state.pagination,
    editPostId : (state) => state.editPostId,
    content : (state) => state.content,
};

// mutations
const mutations = {
    SET_POSTS : (state, payload) => {
        state.posts = payload;
    },
    SET_POST_DELETE_ID : (state, payload) => {
        state.deletePostId = payload;
    },
    SET_PAGINATION : (state, payload) => {
      state.pagination = payload;
    },
    SET_EDIT_POST_ID : (state, payload) => {
        state.editPostId = payload;
    },
    SET_CONTENT: (state, payload) => {
        state.content = payload
    },
    RESET_CONTENT: (state) => {
        state.content = ""
    },
};

const actions = {
    async fetchPosts(state, payload = "") {
        const response = await postRepository.all(payload);
        state.commit('SET_POSTS', response.data.data);
        state.commit('SET_PAGINATION', {
            links : response.data.links,
            meta : response.data.meta
        })
    },
    async deletePost(state) {
        await postRepository.delete(state.state.deletePostId);
    }
}

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
};
