export const state = () => ({
  Backend_URL: process.env.Backend_URL || 'http://localhost:3001',
  dormList: [],
  provinceList: [],
  selectedDorm: null,
  newDorm: {dorm:{}, address:{}, roomType:[], room:[], dormImg:[]}
});

export const mutations = {
  SET_DORMLIST(state, data) {
    state.dormList = data;
  },
  SET_PROVINCELIST(state, data) {
    state.provinceList = data;
  },
  DORM_SELECTED(state, dorm) {
    state.selectedDorm = dorm;
  },
  SET_DORMINFO(state, data) {
    state.newDorm.dorm = data;
  },
  SET_DORMIMG(state, data) {
    state.newDorm.dormImg = data
  },
  SET_DORMADDRESS(state, data){
    state.newDorm.address = data
    console.log(state.newDorm)
  }
};

export const actions = {
  async fetchDormList({ commit }) {
    await this.$axios.get(`${this.state.Backend_URL}/dorm`)
      .then(response => {
        commit('SET_DORMLIST', response.data)
      })
    console.log("Fetch DormList");
  },
  async fetchProvinceList({ commit }) {
    for(let i in state.dormList){
      if(!(state.provinceList.includes(state.dormList[i].address.subDistrict.district.province.name))) {
        commit('SET_PROVINCELIST', state.dormList[i].address.subDistrict.district.province.name);
      }
    }
    console.log("Fetch ProvinceList");

  },
  async dormSelected({commit, state}, dormInfo) {
    let dorm;
    if (dormInfo.dorm == null && dormInfo.id != '') {
      try {
        dorm = await this.$axios.$get(`${state.Backend_URL}/dorm/${dormInfo.id}`)
      } catch (err) {
        console.log(err)
      }
      commit('DORM_SELECTED', dorm)
    } else {
      commit('DORM_SELECTED', dormInfo.dorm)
    }
  },
}
