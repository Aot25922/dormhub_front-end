export const state = () => ({
    Backend_URL: process.env.Backend_URL || 'http://localhost:8080'
  });

  export const mutations = {
    increment(state) {
      state.counter++;
    }
  };
