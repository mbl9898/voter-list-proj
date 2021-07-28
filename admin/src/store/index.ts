import { createStore } from "vuex";

export default createStore({
  state: {
    user: null,
    currentUser: null,
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setCurrentUser(state, payload) {
      state.currentUser = payload;
    },
  },
  actions: {
    async setUser(state, payload) {
      state.commit("setUser", payload);
    },
    async setCurrentUser(state, payload) {
      state.commit("setCurrentUser", payload);
    },
  },
  modules: {},
  getters: {
    getUser: (state) => state.user,
    getCurrentUser: (state) => state.currentUser,
  },
});
