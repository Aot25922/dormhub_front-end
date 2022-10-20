<template>
  <div>
    <div class="bg-ghostWhite px-5 py-12 xl:py-20 xl:px-52 2xl:px-96">
      <div class="breadcrumbs text-gray-500 md:text-lg lg:text-xl">
        <ul>
          <li>หน้าหลัก</li>
          <li>หอพักของฉัน</li>
        </ul>
      </div>
      <h1 class="text-PrussianBlue font-bold text-3xl md:text-4xl lg:text-5xl">
        หอพัก
      </h1>
    </div>
    <div class="p-5 xl:pb-20 xl:px-52 2xl:px-96">
      <h1 v-if="!dormList.results" class="text-center">คุณยังไม่มีหอพัก</h1>
      <div v-else>
        <AllDormInfo
          class="my-10 md:my-0"
          v-for="dorm in dormList.results"
          :dorm="dorm"
          :key="dorm.dormId"
        />
      </div>
      <div class="center con-pagination my-10 md:my-20 lg:mb-0">
        <vs-pagination v-model="page" :length="dormList.totalPage" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      userDormId: [],
    };
  },
  watch: {
    page(newPage, oldPage) {
      if (newPage != oldPage) {
        this.changePage();
      }
    },
  },
  methods: {
    async changePage() {
      await this.$store.dispatch("fetchDormOwnerList", {
        page: this.page - 1,
        dormIdList: this.userDormId,
      });
    },
  },
  created() {
    if (this.userDormId.length == 0) {
      for (let i in this.$store.state.userAccount.dorms) {
        this.userDormId.push(this.$store.state.userAccount.dorms[i].dormId);
      }
      this.changePage();
    }
  },
  computed: {
    dormList() {
      return this.$store.state.dormList;
    },
  },
};
</script>
