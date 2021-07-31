
const state = () => ({
    show: false,
    message: 'Notification',
    variant: 'success',
    duration: 3000,
    dismissable: true
});

// getters
const getters = {
    show: (state) => {
        return state.show;
    },
    message: (state) => {
        return state.message;
    },
    variant: (state) => {
        return state.variant;
    },
    duration: (state) => {
        return state.duration;
    }
};

// mutations
const mutations = {
    showNotification: (state, payload) => {
        state.message = payload.message;
        state.variant = payload.hasOwnProperty('variant') ? payload.variant : 'success';
        state.show = !state.show;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations
};
