<template>
  <div>
    <div class="bg-ghostWhite px-5 py-12 xl:p-20">
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
    <div class="px-5 md:my-20 xl:p-20">
      <SearchBar />
      <AllDormInfo
        class="my-10 md:my-0"
        v-for="dorm in dormList.results"
        :Dorm="dorm"
        :key="dorm.dormId"
      />
      <div>
        <vs-pagination v-model="page" :length="dormList.totalPage" />
        {{ dormList.totalPage }}
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
  async created() {
    for (let i in this.$store.state.userAccount.dorms) {
      this.userDormId.push(this.$store.state.userAccount.dorms[i].dormId);
    }
    console.log(this.userDormId);
    await this.changePage();
  },
  computed: {
    dormList() {
      return this.$store.state.dormList;
    },
  },
};
</script>
