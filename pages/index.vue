<template>
  <div class="p-3 md:py-8 md:px-[68px] lg:px-[335px]">
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
        v-for="dorm in dormList.slice(0, 2)"
        :Dorm="dorm"
        :key="dorm.dormId"
        class="my-4"
      />
    </div>
    <div v-else>
      <DormInfo
        v-for="dorm in dormList"
        :Dorm="dorm"
        :key="dorm.dormId"
        class="my-4 "
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      seeAll: false
    };
  },
  methods: {
  },
  async beforeMount() {
    await this.$store.dispatch('fetchDormList');
    await this.$store.dispatch('fetchProvinceList');
  },
  computed : {
    dormList() {
      return this.$store.state.dormList;
    },
    provinceList() {
      return this.$store.state.provinceList;
    }
  },
};
</script>

