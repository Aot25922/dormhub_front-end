<template>
  <div class="py-3 md:py-5">
    <div>
      <h1 class="text-cream-dark font-bold text-center text-xl">
        รายละเอียดห้องพัก
      </h1>
      <div class="px-3 md:px-20 lg:px-[335px] grid grid-cols-2 gap-4">
        <div class="relative" v-for="(i, index) in roomTypeCount" :key="index">
          <RegisterDormRoomtypeForm
            :index="index"
            @removeRoomType="removeRoomType(index, ...arguments)"
          />
        </div>
        <button
          class="text-black hover:text-gray-soil hover:bg-cream rounded-lg"
        >
          <span
            class="material-icons"
            style="font-size: 60px"
            @click="
              roomTypeCount.push({
                id: roomTypeCount[roomTypeCount.length - 1].id + 1,
              })
            "
            >add_box</span
          >
          <p>เพิ่มประเภทห้องพัก</p>
        </button>
      </div>
      <nuxt-link
        to="/dormForm/registerDormDetail"
        class="btn btn-neutral mx-auto block bg-cheese"
        >Back</nuxt-link
      >
      <nuxt-link
        to="/dormForm/registerDormRoomDetail"
        class="btn btn-neutral mx-auto block bg-cheese"
        >Next</nuxt-link
      >
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      roomTypeCount: [{ id: 0, room: null }],
    };
  },
  methods: {
    removeRoomType(index, roomType) {
      this.$store.commit("REMOVE_ROOMTYPE", roomType);
      this.$delete(this.roomTypeCount, index);
    },
  },
};
</script>
