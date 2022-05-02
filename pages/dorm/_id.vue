<template>
  <div class="text-white">
    <div v-if="dorm != null">
      <img src="https://via.placeholder.com/150" />
      <h1>{{ dorm.name }}</h1>
      <div>
        <p>
          ที่อยู่: {{ dorm.address.number }} {{ dorm.address.street }}
          {{ dorm.address.alley }} {{ dorm.address.subDistrict.name }}
          {{ dorm.address.subDistrict.zipCodeId }}
          {{ dorm.address.subDistrict.district.name }}
          {{ dorm.address.subDistrict.district.province.name }}
          {{ dorm.address.subDistrict.district.province.region.name }}
        </p>
        <p></p>
        <p>ช่องทางการติดต่อ: Email {{ owner.email }}, Tel. {{ owner.phone }}</p>
        <p>ราคา : {{ lowPrice }} - {{ highPrice }}</p>
        <p>Rating : {{ dorm.rating }}</p>
      </div>
      <div class="dropdown">
        <label tabindex="0" class="btn m-1">Roomtype<span class="material-icons">expand_more</span></label>
        <ul
          tabindex="0"
          class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li v-for="type in dorm.roomTypes" :key="type.dormId">
            <p class=" text-black" @click="selectRoomtype(type)">{{type.type}}</p>
          </li>
        </ul>
      </div>
      <div>
       <room-type :roomType="roomType" :elecPerUnit="dorm.elecPerUnit" :waterPerUnit="dorm.waterPerUnit" v-if="roomType"/>
      </div>
    </div>
    <div v-else>
      <p>Error</p>
    </div>
  </div>
</template>

<script>
import roomType from '~/components/roomType.vue';
export default {
  components: { roomType },
  async fetch() {
    if (this.$store.state.dorm != null) {
      this.dorm = this.$store.state.dorm;
      for (let i in this.dorm.userAccounts) {
        if (this.dorm.userAccounts[i].role == "Dorm Manage") {
          this.owner = this.dorm.userAccounts[i];
        }
      }
      let price = [];
      for (let i in this.dorm.roomTypes) {
        price.push(this.dorm.roomTypes[i].dormHasRoomType.price);
      }
      this.lowPrice = Math.min(...price);
      this.highPrice = Math.max(...price);
    } else {
      let dormInfo = { dorm: null, id: this.$route.params.id };
      await this.$store.dispatch("dormSelected", dormInfo);
      this.dorm = this.$store.state.dorm;
      for (let i in this.dorm.userAccounts) {
        if (this.dorm.userAccounts[i].role == "Dorm Manage") {
          this.owner = this.dorm.userAccounts[i];
        }
      }
      let price = [];
      for (let i in this.dorm.roomTypes) {
        price.push(this.dorm.roomTypes[i].dormHasRoomType.price);
      }
      this.lowPrice = Math.min(...price);
      this.highPrice = Math.max(...price);
    }
  },
  data() {
    return {
      dorm: null,
      owner: null,
      lowPrice: 0,
      highPrice: 0,
      roomType : null
    };
  },
  methods: {
    selectRoomtype(data){
      this.roomType = data
    }
  },
};
</script>
