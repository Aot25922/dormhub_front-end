<template>
  <div>
    <div class="bg-ghostWhite px-5 py-12 xl:py-20 xl:px-52 2xl:px-96">
      <div class="breadcrumbs text-gray-500 md:text-lg lg:text-xl">
        <ul>
          <li>หน้าหลัก</li>
          <li>หอพัก</li>
        </ul>
      </div>
      <h1 class="text-PrussianBlue font-bold text-3xl md:text-4xl lg:text-5xl">
        หอพัก
      </h1>
    </div>
    <div class="p-5 xl:pb-20 xl:px-52 2xl:px-96">
      <SearchBar />
      <AllDormInfo
        class="my-10 md:my-0"
        v-for="dorm in dormList.results"
        :dorm="dorm"
        :key="dorm.dormId"
      />
      <div class="center con-pagination my-10 md:my-20 lg:mb-0">
        <vs-pagination not-margin v-model="page" :length="dormList.totalPage" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: "success",
      page: 1,
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
    changePage() {
      this.$store.dispatch("fetchDormList", this.page - 1);
    },
  },
  created() {
    if(this.$router.history.current.params.search ){
      return
    }
    this.changePage();
  },
  computed: {
    dormList() {
      return this.$store.state.dormList;
    },
  },
};
</script>
