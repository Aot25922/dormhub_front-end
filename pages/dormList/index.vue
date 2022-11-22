<template>
  <div>
	<ContentHeading pageName="หอพัก" headingName="หอพัก"/>
    <div class="p-5 xl:pb-20 xl:px-52 2xl:px-[21rem]">
      <SearchBar @resetPage="page = 1" />
      <AllDormInfo
        class="my-5"
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
      page: 1,
      lastPage: null,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.lastPage = from;
    });
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
  mounted() {
    if (this.lastPage.name == "dorm-id" || this.lastPage.name == "index") {
      return;
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
