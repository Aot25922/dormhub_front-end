var _ = require('lodash');

export const state = () => ({
  // Backend_URL: 'http://dormhub-dev.azurewebsites.net',
  Backend_URL: 'http://localhost:3001',
  userAccount: { role: "Guest" },
  dormList: [],
  provinceList: [],
  selectedDorm: null,
  newDorm: { dorm: {}, address: {}, roomType: [], room: [], dormImg: [], roomTypeImg: {}, bankAccount: [] }
});

export const mutations = {
  SET_USERACCOUNT(state, data) {
    state.userAccount = data.data
    console.log(state.userAccount)
  },
  SET_DORMLIST(state, data) {
    state.dormList = data;
  },
  SET_PROVINCELIST(state, data) {
    state.provinceList = data;
  },
  DORM_SELECTED(state, dorm) {
    state.selectedDorm = dorm;
    console.log(state.selectedDorm)
  },
  SET_DORMINFO(state, data) {
    state.newDorm.dorm = data;
    console.log(state.newDorm.dorm)
  },
  SET_DORMIMG(state, data) {
    state.newDorm.dormImg = data
  },
  SET_DORMADDRESS(state, data) {
    state.newDorm.address = data
    console.log(state.newDorm.address)
  },
  SET_ROOMTYPEIMG(state, data) {
    let key = data.key
    let oldRoomType = data.oldRoomType
    state.newDorm.roomTypeImg = _.pickBy(state.newDorm.roomTypeImg, function(value, key) {
      return !(_.isEqual(key, oldRoomType));
    });
    console.log(state.newDorm.roomTypeImg)
    state.newDorm.roomTypeImg[key] = data.roomTypeImg
  },
  SET_ROOMTYPE(state, data) {
    for (let i in state.newDorm.roomType) {
      if (state.newDorm.roomType[i].type == data.type || state.newDorm.roomType[i].type == data.oldRoomType) {
        state.newDorm.roomType[i] = _.omitBy(data, (value, key) => key.includes("oldRoomType"));
        console.log(state.newDorm.roomType)
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
    state.newDorm.roomTypeImg = _.pickBy(state.newDorm.roomTypeImg, function(value, key) {
      return !(_.isEqual(key, data.type));
    });
  },
  SET_ROOM(state, data) {
    state.newDorm.room = data
    console.log(state.newDorm.room)
  },
  SET_BANKACCOUNT(state, data) {
    state.newDorm.bankAccount = data
    console.log(state.newDorm.bankAccount)
  }
};

export const actions = {
  async nuxtServerInit({ commit, state }) {
    try {
      let data = await this.$axios.$post(`${state.Backend_URL}/account/login`,{
        withCredentials: true,
      })
      if (data != null) {
        commit('SET_USERACCOUNT', data)
      }
    } catch (err) {
      console.log(err)
    }
    try {
      await this.$axios.get(`${this.state.Backend_URL}/dorm`)
        .then(response => {
          commit('SET_DORMLIST', response.data)
        })
    } catch (err) {
      console.log(err)
    }
  },
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
  async logout({ state, commit }) {
    try {
      await this.$axios.$delete(`${state.Backend_URL}/account/logout`,{
        withCredentials: true,
      })
      commit('SET_USERACCOUNT', { data: { role: "Guest" } })
    } catch (err) {
      console.log(err)
    }
  },
  async dormSelected({ commit, state }, dormInfo) {
    let dorm;
    if (dormInfo.dorm == null && dormInfo.id != '') {
      try {
        dorm = await this.$axios.$get(`${state.Backend_URL}/dorm/${dormInfo.id}`)
      } catch (err) {
        console.log(err)
      }
      console.log(dorm)
      commit('DORM_SELECTED', dorm)
    } else {
      commit('DORM_SELECTED', dormInfo.dorm)
    }
  },
  setNewRoomTypeImg({ commit }, { image, roomType, oldRoomType }) {
    let newRoomTypeImgList = { roomTypeImg: image, key: roomType ,oldRoomType: oldRoomType}
    commit('SET_ROOMTYPEIMG', newRoomTypeImgList)
  },
  async addDorm({ state }) {
    let dorm = state.newDorm
    if (!(_.isEmpty(dorm.dorm)) && !(_.isEmpty(dorm.address)) && !(_.isEmpty(dorm.roomType)) && !(_.isEmpty(dorm.room)) && !(_.isEmpty(dorm.dormImg)) && !(_.isEmpty(dorm.roomTypeImg))) {
      let formData = new FormData()
      let data = {}
      let newbankAccount = _.cloneDeep(dorm.bankAccount)
      console.log(newbankAccount)
      for(let i in newbankAccount){
        newbankAccount[i].bankId = newbankAccount[i].bankId.bankId
      }
      _.assign(data, { dorm: dorm.dorm }, { address: dorm.address }, { roomType: dorm.roomType }, { room: dorm.room }, {bankAccount: newbankAccount})
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
      return await this.$axios.$post(`${state.Backend_URL}/dorm/register`, formData, {withCredentials: true,})
     
      
    }
  },
}
