<template>
  <div class="p-3">
    <div class="text-white flex flex-wrap">
      <h1 class="w-1/2">จังหวัดแนะนำ</h1>
      <span class="w-1/2 text-xs text-right text-light-blue">ดูเพิ่มเติม ></span>
    </div>
    <div class="flex overflow-x-auto">
		<ProvinceList v-for="province in provinceList" :Province="province" :key="province" />
    </div>
	<!-- DormList -->
    <div class="text-white flex flex-wrap py-3">
      <h1 class="w-1/2">หอพัก</h1>
      <div class="w-1/2 text-xs text-right text-light-blue">
        <button @click="seeAll = !seeAll">
			<div v-if="!seeAll">ดูทั้งหมด ></div>
			<div v-else>ย่อ ></div>
		</button>
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
    var dormList = await $axios.$get(`${store.state.Backend_URL}/dorm`);
	var provinceList = [];
	for(let i in dormList){
		if(!(provinceList.includes(dormList[i].address.subDistrict.district.province.name))) {
		provinceList.push(dormList[i].address.subDistrict.district.province.name)
	}
	}
	return { dormList, provinceList };
  },
  data() {
    return {
      seeAll: false,
    };
  }
};
</script>

