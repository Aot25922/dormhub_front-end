<template>
  <div class="flex flex-wrap relative justify-center item-center">
    <button class="absolute lg:left-[270px] md:left-20 left-7 top-3 text-black">
    <!-- <button class="absolute top-1/3 -left-3/4 text-black"> -->
      <span class="material-icons">search</span>
    </button>
    <input
      type="text"
      placeholder="ค้นหาหอพัก"
      v-model="search"
      class="
        focus:outline-none
        input input-bordered
        bg-cream
        text-gray-soil
        w-11/12
        px-12
        md:w-5/6
        lg:w-2/3
      "
    />
    <button
      class="absolute lg:right-[270px] md:right-20 right-7 top-3 text-black"
    >
      <span class="material-icons">filter_list</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      search: "",
    };
  },
  computed: {
    filteredDorms() {
      return 0;
    },
  },
};
</script>
