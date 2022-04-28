export const state = () => ({
    DBUrl:'http://localhost:8080',
    // DBUrl:'',
  });
  
  export const mutations = {
    increment(state) {
      state.counter++;
    }
  };