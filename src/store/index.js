import { createStore } from "vuex";

export const store = createStore({
  state() {
    return {
      count: 0,
      json: {},
    };
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
});
