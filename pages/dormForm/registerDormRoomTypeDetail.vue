<template>
  <div class="py-3">
    <div class="xl:px-48 2xl:px-80">
      <h1 class="font-bold text-center text-xl mb-5 md:text-2xl lg:text-3xl xl:text-4xl">รายละเอียดห้องพัก</h1>
      <div class="px-3 md:grid md:grid-cols-2 md:gap-4">
          <RegisterDormRoomtypeForm v-for="(i, index) in roomTypeCount" :key="index" class="md:h-full"
          ref="test" :index="index" @removeRoomType="removeRoomType(index, ...arguments)" @validate="checkForRoomType(index, ...arguments)" />
        <!-- Mobile Button -->
        <button @click="roomTypeCount.push({ id: roomTypeCount[roomTypeCount.length - 1].id + 1, validate: false, })" class="md:hidden btn btn-secondary mt-10 text-center p-5 w-full">
          <p>เพิ่มประเภทห้องพัก</p>
        </button>
        <!-- Ipad or More than Button -->
        <button class="hidden md:block rounded-lg mt-10 text-center p-5 w-full md:m-0 md:h-full border shadow-lg">
          <span class="material-icons" style="font-size: 60px"
                @click="
              roomTypeCount.push({
                id: roomTypeCount[roomTypeCount.length - 1].id + 1,
                validate: false,
              })">add_box</span>
          <p>เพิ่มประเภทห้องพัก</p>
        </button>
      </div>
      <div class="flex flex-wrap mt-10">
        <div class="w-1/2 px-1">
          <nuxt-link to="/dormForm/registerDormDetail" class="btn btn-ghost w-full border">ย้อนกลับ</nuxt-link>
        </div>
        <div class="w-1/2 px-1">
          <button class="btn btn-primary w-full" @click="next">ต่อไป</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    middleware: ['permission','checkData'],
  data() {
    return {
      roomTypeCount: [{ id: 0, validate: false }],
    };
  },
  methods: {
    removeRoomType(index, roomType) {
      this.$store.commit("REMOVE_ROOMTYPE", roomType);
      this.$delete(this.roomTypeCount, index);
    },
    next() {
      for(let i in this.$refs.test){
        this.$refs.test[i].addRoomTypes()
      }
      for (let i in this.roomTypeCount) {
        if (!this.roomTypeCount[i].validate) {
          return;
        }
      }
      this.$router.push({ path: "/dormForm/registerDormRoomDetail" });
    },
    checkForRoomType(index, validate) {
      this.roomTypeCount[index].validate = validate;
    },
  },
};
</script>
