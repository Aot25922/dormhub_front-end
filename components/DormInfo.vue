<template>
  <!-- Using in Home page -->
  <div class="md:px-2">
    <div class="card w-full shadow-xl my-5">
      <figure v-if="checkDormImg" class="relative">
        <img :src="$store.state.Backend_URL+'/dorm/image/'+Dorm.dormId+'/'+Dorm.media.filter(x=>x.roomTypeId == null)[0].mediaId" @error="checkDormImg = false" class="w-full object-cover"/>
<!--        <img src="https://placeimg.com/400/225/arch" class="w-full object-cover" />-->
<!--        <div class="badge badge-secondary absolute bottom-1 right-1 font-bold">-->
<!--          {{Dorm.rating}}-->
<!--          <div class="rating rating-xs">-->
<!--            <input type="radio" name="rating-2" class="mask mask-star-2 bg-warning">-->
<!--          </div>-->
<!--        </div>-->
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
            {{ Dorm.address.number }}
            {{ Dorm.address.street }}
            {{ Dorm.address.alley }}
            {{ Dorm.address.subDistrict.name }}
            {{ Dorm.address.subDistrict.zipCodeId }}
            {{ Dorm.address.subDistrict.district.name }}
            {{ Dorm.address.subDistrict.district.province.name }}
          </p>
        </div>
        <div class="flex  py-1 text-gray-500">
          <span class="material-icons">schedule</span>
          <div class="text-xs flex px-1 mt-1 md:text-base">
            <h1 v-if="Dorm.openTime != null">{{ Dorm.openTime }} ถึง</h1>
            <h1 v-else>ไม่มีข้อมูล ถึง</h1>
            <h1 v-if="Dorm.closeTime != null">{{ Dorm.closeTime }}</h1>
            <h1 v-else>ไม่มีข้อมูล</h1>
          </div>
        </div>
        <div class="flex py-1 text-gray-500">
          <span class="material-icons">local_offer</span>
          <div class="text-xs px-1 mt-1 md:text-base">ไตข้างซ้าย<span class="text-gray-400 font-normal">/ เดือน</span></div>
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
      checkDormImg: true
    }
  },
  methods : {
     dormInfo(){
       let dormInfo = {dorm:this.dorm}
       this.$store.dispatch('dormSelected',dormInfo)
       this.$router.push({path:`/dorm/${this.dorm.dormId}`})
    }
  }
};
</script>
