var _ = require('lodash');

export const state = () => ({
  Backend_URL: process.env.Backend_URL || 'http://localhost:3001',
  dormList: [],
  provinceList: [],
  selectedDorm: null,
  newDorm: { dorm: {}, address: {}, roomType: [], room: [], dormImg: [], roomTypeImg: {} }
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
  SET_DORMADDRESS(state, data) {
    state.newDorm.address = data
  },
  SET_ROOMTYPEIMG(state, data) {
    let key = data.key
    state.newDorm.roomTypeImg[key] = data.roomTypeImg
  },
  SET_ROOMTYPE(state, data) {
    for (let i in state.newDorm.roomType) {
      if (_.isMatch(data, state.newDorm.roomType[i])) {
        return
      }
    }
    state.newDorm.roomType.push(data)
  },
  REMOVE_ROOMTYPE(state, data) {
    for (let i in state.newDorm.roomType) {
      if (data, state.newDorm.roomType[i].type == data.type) {
        state.newDorm.roomType.splice(i, 1)
      }
    }
  },
  REMOVE_ROOMTYPEIMG(state, data) {
    if (_.find(state.newDorm.roomTypeImg, data)) {
      delete state.newDorm.roomTypeImg[data]
    }
  },
  SET_ROOM(state, data) {
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
    for (let i in state.dormList) {
      if (!(state.provinceList.includes(state.dormList[i].address.subDistrict.district.province.name))) {
        commit('SET_PROVINCELIST', state.dormList[i].address.subDistrict.district.province.name);
      }
    }
    console.log("Fetch ProvinceList");

  },
  async dormSelected({ commit, state }, dormInfo) {
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
  setNewRoomTypeImg({ commit }, { image, roomType }) {
    let newRoomTypeImgList = { roomTypeImg: image, key: roomType }
    console.log(newRoomTypeImgList)
    commit('SET_ROOMTYPEIMG', newRoomTypeImgList)
  },
  async addDorm({ state }) {
    console.log("CHECK")
    let dorm = state.newDorm
    if (!(_.isEmpty(dorm.dorm)) && !(_.isEmpty(dorm.address)) && !(_.isEmpty(dorm.roomType)) && !(_.isEmpty(dorm.room)) && !(_.isEmpty(dorm.dormImg)) && !(_.isEmpty(dorm.roomTypeImg))) {
      let formData = new FormData()
      let data = {}
      _.assign(data, { dorm: dorm.dorm }, { address: dorm.address }, { roomType: dorm.roomType }, { room: dorm.room })
      formData.append('data', JSON.stringify(data))
      for (let i in state.newDorm.roomTypeImg) {
        for (let j in state.newDorm.roomTypeImg[i]) {
          let roomTypeImg = state.newDorm.roomTypeImg[i]
          formData.append(`dorm_roomType_${i}`, roomTypeImg[j], 'test.jpg')
        }
      }
      for (let i in dorm.dormImg) {
        formData.append(`dorm_${dorm.dorm.name}`, dorm.dormImg[i], 'test.jpg')
      }
      for (var pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      let postData = await this.$axios.$post(`${state.Backend_URL}/dorm/register`,formData)
    }
  }
}
