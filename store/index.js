export const state = () => ({
    DBUrl:'http://localhost:8080',
    // DBUrl:'',
    dorm:null
  });
  
  export const mutations = {
    DORM_SELECTED(state,dorm) {
      state.dorm = dorm;
    }
  };

  export const actions = {
    async dormSelected({ commit,state},dormInfo){
      let dorm;
        if(dormInfo.dorm == null && dormInfo.id != ''){
          try{
          dorm = await this.$axios.$get(`${state.DBUrl}/dorm/${dormInfo.id}`)
         }catch (err) {
            console.log(err)
          }
          commit('DORM_SELECTED',dorm)
        }
        else{
          commit('DORM_SELECTED',dormInfo.dorm)
        }
    }
  }