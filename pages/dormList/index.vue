<template>
  <div>
    <div class="bg-ghostWhite px-5 py-12 xl:p-20">
      <div class="breadcrumbs text-gray-500 md:text-lg lg:text-xl">
        <ul>
          <li>หน้าหลัก</li>
          <li>หอพัก</li>
        </ul>
      </div>
      <h1 class="text-PrussianBlue font-bold text-3xl md:text-4xl lg:text-5xl">หอพัก</h1>
    </div>
    <div class="px-5 md:my-20 xl:p-20">
      <AllDormInfo class="my-10 md:my-0"
                v-for="dorm in dormList"
                :Dorm="dorm"
                :key="dorm.dormId" />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    dormList() {
      return this.$store.state.dormList;
    }
  },
}
</script>
