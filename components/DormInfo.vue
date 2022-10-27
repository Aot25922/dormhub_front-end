<template>
  <!-- Using in Home page -->
  <div class="md:px-2">
    <div class="card w-full shadow-xl my-5 lg:h-[30rem] 2xl:h-[32rem]">
      <figure v-if="checkDormImg" class="relative">
        <img :src="$store.state.Backend_URL+'/dorm/image/'+dorm.dormId+'/'+dorm.media.filter(x=>x.roomTypeId == null)[0].mediaId+ '?cache=' + $route.params.rand" @error="checkDormImg = false" class="w-full object-cover"/>
      </figure>
      <figure v-else class="relative">
        <img src="https://placeimg.com/400/225/arch" class="w-full object-cover" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">
          {{ Dorm.name }}
        </h2>
        <div class="flex space-x-0 text-gray-500">
          <span class="material-icons">location_on</span>
          <p class="text-xs mt-1 px-1 md:text-base">
            {{ dorm.address.number }}
            {{ dorm.address.street }}
            {{ dorm.address.alley }}
            {{ dorm.address.subDistrict.name_th }}
            {{ dorm.address.subDistrict.zip_code }}
            {{ dorm.address.subDistrict.district.name_th }}
            {{ dorm.address.subDistrict.district.province.name_th }}
          </p>
        </div>
        <div class="flex  py-1 text-gray-500">
          <span class="material-icons">schedule</span>
          <div class="text-xs flex px-1 mt-1 md:text-base">
            <h1 v-if="Dorm.openTime != null">{{ Dorm.openTime }} -</h1>
            <h1 v-if="Dorm.closeTime != null">&nbsp;{{ Dorm.closeTime }} น.</h1>
            <h1 v-if="Dorm.openTime != null && Dorm.closeTime == null">เปิด {{ Dorm.openTime }} น.</h1>
            <h1 v-if="Dorm.openTime == null && Dorm.closeTime != null">ปิด {{ Dorm.closeTime }} น.</h1>
            <h1 v-if="Dorm.openTime == null && Dorm.closeTime == null">ไม่มีข้อมูล</h1>
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
        <div class="card-actions">
          <button @click="dormInfo()" class="btn btn-ghost w-full duration-300 ease-in-out">รายละเอียดทั้งหมด</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DormInfo",
  props: ["Dorm"],
  data() {
    return {
      dorm : this.$props.Dorm,
      checkDormImg: this.dorm != null
    }
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
