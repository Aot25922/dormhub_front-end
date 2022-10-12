<template>
  <!-- Using in dormList page -->
  <div>
    <div class="card w-full shadow-xl my-5 md:card-side">
      <figure v-if="checkDormImg" class="relative md:w-1/2 lg:w-1/3">
              <img :src="$store.state.Backend_URL+'/dorm/image/'+Dorm.dormId+'/'+Dorm.media.filter(x=>x.roomTypeId == null)[0].mediaId" @error="checkDormImg = false" class="w-full h-full object-cover"/>
      </figure>
      <figure v-else class="relative md:w-1/2 lg:w-1/3">
        <img src="https://placeimg.com/400/225/arch" class="h-full w-full object-cover" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">
          {{ Dorm.name }}
        </h2>
        <div class="flex space-x-0 text-gray-500">
          <span class="material-icons">location_on</span>
          <p class="text-xs mt-1 px-1 lg:text-base">
            {{ Dorm.address.number }}
            {{ Dorm.address.street }}
            {{ Dorm.address.alley }}
            {{ Dorm.address.subDistrict.name_th }}
            {{ Dorm.address.subDistrict.zip_code }}
            {{ Dorm.address.subDistrict.district.name_th }}
            {{ Dorm.address.subDistrict.district.province.name_th }}
          </p>
        </div>
        <div class="flex py-1 text-gray-500">
          <span class="material-icons">schedule</span>
          <div class="text-xs flex px-1 mt-1 lg:text-base">
            <h1 v-if="Dorm.openTime != null">{{ Dorm.openTime }}-</h1>
            <h1 v-if="Dorm.closeTime != null">{{ Dorm.closeTime }} น.</h1>
            <h1 v-if="Dorm.openTime != null && Dorm.closeTime == null">เปิด {{ Dorm.openTime }}</h1>
            <h1 v-if="Dorm.openTime == null && Dorm.closeTime != null">ปิด {{ Dorm.closeTime }}</h1>
            <span v-else>ไม่มีข้อมูล</span>
          </div>
        </div>
        <div class="flex py-1 text-gray-500">
          <span class="material-icons">local_offer</span>
          <div class="text-xs px-1 mt-1 lg:text-base" v-if="minPrice != maxPrice">
            {{ minPrice }} ถึง {{ maxPrice }} บาท<span class="text-gray-400 font-normal">/ เดือน</span>
          </div>
          <div class="text-xs px-1 mt-1 lg:text-base" v-else>
            {{ minPrice }} บาท<span class="text-gray-400 font-normal">/ เดือน</span>
          </div>
        </div>
        <div class="flex flex-wrap md:flex-row">
          <div class="w-full p-1 lg:w-1/2">
            <button v-if="$store.state.userAccount.role == 'Owner'" @click="dormInfo('edit')" class="btn btn-accent w-full duration-300 ease-in-out">เเก้ไขข้อมูลหอพัก</button>
          </div>
          <div class="w-full p-1 lg:w-1/2">
            <button @click="dormInfo()" class=" btn btn-primary w-full duration-300 ease-in-out">รายละเอียดทั้งหมด</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AllDormInfo",
  props: ["Dorm"],
  data() {
    return {
      dorm: this.$props.Dorm,
      checkDormImg: true
    };
  },
  methods: {
    dormInfo(data) {
      if (data == "edit") {
        let dormInfo = { dorm: this.dorm };
        this.$store.dispatch("dormSelected", dormInfo);
        this.$router.push({ path: `/dorm/edit/${this.dorm.dormId}`});
      } else {
        let dormInfo = { dorm: this.dorm };
        this.$store.dispatch("dormSelected", dormInfo);
        this.$router.push({ path: `/dorm/${this.dorm.dormId}`});
      }
    },
  },
  computed: {
    minPrice() {
      let minvalue = [];
      for (let i in this.dorm.roomTypes) {
        minvalue.push(this.dorm.roomTypes[i].dormHasRoomType.price);
      }
      return Math.min(...minvalue);
    },
    maxPrice() {
      let maxvalue = [];
      for (let i in this.dorm.roomTypes) {
        maxvalue.push(this.dorm.roomTypes[i].dormHasRoomType.price);
      }
      return Math.max(...maxvalue);
    },
  },
};
</script>
