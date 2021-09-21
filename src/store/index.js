import { createStore } from 'vuex'

export default createStore({
  state: {
    count: 0,
    json: {},
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    saveJson(state, value) {
      state.count = 0;
      state.json = value;
    },
  },
  actions: {
  },
  modules: {
  }
})
