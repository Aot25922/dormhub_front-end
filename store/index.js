var _ = require('lodash');

export const state = () => ({
  Backend_URL: process.env.Backend_URL || 'http://localhost:3001',
  dormList: [],
  provinceList: [],
  selectedDorm: null,
  newDorm: {dorm:{}, address:{}, roomType:[], room:[], dormImg:[],roomTypeImg:[]}
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
  },
  SET_ROOMTYPEIMG(state, data){
    for(let i in data){
      state.newDorm.roomTypeImg.push(data[i])
    }
  },
  SET_ROOMTYPE(state, data){
    for(let i in state.newDorm.roomType){
      if(_.isMatch(data,state.newDorm.roomType[i])){
        return
      }
    }
      state.newDorm.roomType.push(data)
  },
  REMOVE_ROOMTYPE(state, data){
    console.log("TESTer")
    for(let i in state.newDorm.roomType){
      if(data,state.newDorm.roomType[i].type == data.type){
        console.log("TEST")
        state.newDorm.roomType.splice(i,1)
      }
    }
  },
  SET_ROOM(state, data){
    state.newDorm.room = data
    console.log(state.newDorm.room)
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
