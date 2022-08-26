<template>
  <div>
   <!-- DormList -->
    <div class="p-5">
      <DormInfo :Dorm="dorm" :key="dorm.dormId" class="my-10" />
    </div>
  </div>
</template>
<script>
export default {
  methods: {
  },
  async beforeMount() {
    if(this.$store.state.dormList.length == 0) await this.$store.dispatch('fetchDormList');
    await this.$store.dispatch('fetchProvinceList');
  },
  computed : {
    dormList() {
      return this.$store.state.dormList;
    }
  },
};
</script>

