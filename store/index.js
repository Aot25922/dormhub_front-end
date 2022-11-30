var _ = require('lodash');

export const state = () => ({
  Backend_URL: process.env.Backend_URL || 'http://localhost:3001',
  userAccount: { role: "Guest" },
  dormList: [],
  provinceList: [],
  selectedDorm: null,
  addressOption: [],
  searchData: null,
  newDorm: { dorm: {}, address: {}, roomType: [], room: [], dormImg: [], roomTypeImg: {}, bankAccount: [] }
});

export const mutations = {
  SET_SEARCH(state, data) {
    state.searchData = data
  },
  RESET_NEWDORM(state) {
    state.newDorm = { dorm: {}, address: {}, roomType: [], room: [], dormImg: [], roomTypeImg: {}, bankAccount: [] }
  },
  SET_ADDRESSOPTIONS(state, data) {
    state.addressOption = data
  },
  SET_ROOMSTATUS(state, data) {
    for (let i in state.selectedDorm.rooms) {
      if (state.selectedDorm.rooms[i].roomId == data.roomId) {
        state.selectedDorm.rooms[i].status = data.status
      }
    }
  },
  SET_USERACCOUNT(state, data) {
    state.userAccount = data.data
  },
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
    state.newDorm.dorm.address = data
  },
  SET_ROOMTYPEIMG(state, data) {
    let key = data.key
    let oldRoomType = data.oldRoomType
    state.newDorm.roomTypeImg = _.pickBy(state.newDorm.roomTypeImg, function (value, key) {
      return !(_.isEqual(key, oldRoomType));
    });
    state.newDorm.roomTypeImg[key] = data.roomTypeImg
  },
  SET_ROOMTYPE(state, data) {
    for (let i in state.newDorm.roomType) {
      if (state.newDorm.roomType[i].type == data.type || state.newDorm.roomType[i].type == data.oldRoomType) {
        state.newDorm.roomType[i] = _.omitBy(data, (value, key) => key.includes("oldRoomType"));
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
    state.newDorm.roomTypeImg = _.pickBy(state.newDorm.roomTypeImg, function (value, key) {
      return !(_.isEqual(key, data.type));
    });
  },
  SET_ROOM(state, data) {
    state.newDorm.room = data
  },
  SET_BANKACCOUNT(state, data) {
    state.newDorm.bankAccount = data
  }
};

export const actions = {
  async nuxtServerInit({ commit, state }) {
    try {
      await this.$axios.$get(
        `${state.Backend_URL}/address`
      ).then(option => {
        if (option != null) {
          commit('SET_ADDRESSOPTIONS', option)
        }
      })
      let data = await this.$axios.$post(`${state.Backend_URL}/account/login`, null, {
        withCredentials: true,
      })
      if (data != null) {
        commit('SET_USERACCOUNT', data)
      }
    } catch (err) {
      console.log("handle error:" + err)
    }
  },
  async fetchDormList({ commit }, page) {
    const request = {
      params: {
        page: page,
        limit: 10
      },
      withCredentials: true
    }
    if (this.state.searchData) {
      let formData = new FormData();
      let searchData = {
        search: this.state.searchData.search,
        region: this.state.searchData.selectedRegion.name,
        province: this.state.searchData.selectedProvince.name_th,
        district: this.state.searchData.selectedDistrict.name_th,
        subDistrict: this.state.searchData.selectedSubDistrict.name_th,
        roomTypeDes: this.state.searchData.roomTypeDes,
        elecPerUnit:
          this.state.searchData.maxElecPerUnit
            ? [this.state.searchData.minElecPerUnit, this.state.searchData.maxElecPerUnit]
            : null,
        waterPerUnit:
          this.state.searchData.maxWaterPerUnit
            ? [this.state.searchData.minWaterPerUnit, this.state.searchData.maxWaterPerUnit]
            : null,
        price: this.state.searchData.maxPrice  ? [this.state.searchData.minPrice, this.state.searchData.maxPrice] : null,
        deposit:
          this.state.searchData.maxDeposit  ? [this.state.searchData.minDeposit, this.state.searchData.maxDeposit] : null,
        area: this.state.searchData.maxArea  ? [this.state.searchData.minArea, this.state.searchData.maxArea] : null,
        orderBy: this.state.searchData.orderBy
      };
      formData.append("data", JSON.stringify(searchData));
      await this.$axios.post(`${this.state.Backend_URL}/dorm/search`, formData,request)
        .then(response => {
          commit('SET_DORMLIST', response.data)
        }).catch(function (error) {
          console.log(error);
          commit('SET_DORMLIST', [])
        })
    } else {
      await this.$axios.get(`${this.state.Backend_URL}/dorm`, request)
        .then(response => {
          commit('SET_DORMLIST', response.data)
        }).catch(function (error) {
          console.log(error);
          commit('SET_DORMLIST', [])
        })
    }
  },
  async fetchDormOwnerList({ commit }, { page, dormIdList }) {
    if (!dormIdList) {
      return
    }
    const request = {
      params: {
        page: page,
        dormIdList: dormIdList,
        limit: 10
      },
      withCredentials: true
    }
    await this.$axios.get(`${this.state.Backend_URL}/dorm/owner`, request)
      .then(response => {
        commit('SET_DORMLIST', response.data)
      }).catch(function (error) {
        console.log(error);
        commit('SET_DORMLIST', [])
      })
  },
  async fetchProvinceList({ commit }) {
    for (let i in state.dormList) {
      if (!(state.provinceList.includes(state.dormList[i].address.subDistrict.district.province.name))) {
        commit('SET_PROVINCELIST', state.dormList[i].address.subDistrict.district.province.name);
      }
    }

  },
  async logout({ state, commit }) {
    try {
      await this.$axios.$delete(`${state.Backend_URL}/account/logout`, {
        withCredentials: true,
      })
      commit('SET_USERACCOUNT', { data: { role: "Guest" } })
    } catch (err) {
    }
  },
  async dormSelected({ commit, state }, dormInfo) {
    let dorm;
    if (dormInfo.dorm == null && dormInfo.id != '') {
      try {
        dorm = await this.$axios.$get(`${state.Backend_URL}/dorm/${dormInfo.id}`)
      } catch (err) {
      }
      commit('DORM_SELECTED', dorm)
    } else {
      commit('DORM_SELECTED', dormInfo.dorm)
    }
  },
  setNewRoomTypeImg({ commit }, { image, roomType, oldRoomType }) {
    let newRoomTypeImgList = { roomTypeImg: image, key: roomType, oldRoomType: oldRoomType }
    commit('SET_ROOMTYPEIMG', newRoomTypeImgList)
  },
  async addDorm({ state }) {
    let dorm = state.newDorm
    if (!(_.isEmpty(dorm.dorm)) && !(_.isEmpty(dorm.roomType)) && !(_.isEmpty(dorm.room)) && !(_.isEmpty(dorm.dormImg)) && !(_.isEmpty(dorm.roomTypeImg))) {
      let formData = new FormData()
      let data = {}
      let newbankAccount = _.cloneDeep(dorm.bankAccount)
      for (let i in newbankAccount) {
        newbankAccount[i].bankId = newbankAccount[i].bankId.bankId
      }
      _.assign(data, { dorm: dorm.dorm }, { roomType: dorm.roomType }, { room: dorm.room }, { bankAccount: newbankAccount })
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
      return await this.$axios.$post(`${state.Backend_URL}/dorm/register`, formData, { withCredentials: true, })
    }
  },
}
