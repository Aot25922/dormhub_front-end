<template>
  <div class="p-8">
	  <button @click="seeAll=!seeAll" class=" text-white">See All</button>
    <div v-if="!seeAll">
      <DormInfo
        v-for="dorm in dormList.slice(0, 1)"
        :Dorm="dorm"
        :key="dorm.dormId"
        class="mt-4 mx-5"
      />
    </div>
    <div v-else>
      <DormInfo
        v-for="dorm in dormList"
        :Dorm="dorm"
        :key="dorm.dormId"
        class="mt-4 mx-5"
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
  data() {
    return {
		seeAll:false
	};
  },
};
</script>

