<template>
  <div class="p-5">
    <div class="text-white flex flex-wrap">
      <h1 class="w-1/2">จังหวัดแนะนำ</h1>
      <span class="w-1/2 text-xs text-right">ดูเพิ่มเติม ></span>
    </div>
    <div class="flex">
		<ProvinceList v-for="province in dormList.slice(0, 7)" :Province="province" :key="province.dormId" />
    </div>
	<!-- DormList -->
    <div class="text-white flex flex-wrap my-5">
      <h1 class="w-1/2">หอพัก</h1>
      <div class="w-1/2 text-xs text-right">
        <button @click="seeAll = !seeAll">ดูทั้งหมด ></button>
      </div>
    </div>
    <div v-if="!seeAll">
      <DormInfo
        v-for="dorm in dormList.slice(0, 1)"
        :Dorm="dorm"
        :key="dorm.dormId"
        class=""
      />
    </div>
    <div v-else>
      <DormInfo
        v-for="dorm in dormList"
        :Dorm="dorm"
        :key="dorm.dormId"
        class="mt-4 "
      />
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ $axios, store }) {
    var dormList = await $axios.$get(`${store.state.DBUrl}/Dorm`);
    return { dormList };
  },

  //   async getProvince({ $axios, store }) {
  // 	  var provinceList = await $axios.$get(`${store.state.DBUrl}/Province`);
  // 	  return { provinceList };
  //   },
  data() {
    return {
      seeAll: false,
    };
  },
};
</script>

