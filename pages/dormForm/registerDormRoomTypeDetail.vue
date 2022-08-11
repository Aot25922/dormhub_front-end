<template>
  <div class="py-3 md:py-5">
    <div>
      <h1 class="text-cream-dark font-bold text-center text-xl">
        รายละเอียดห้องพัก
      </h1>
      <div class="px-3 md:px-20 lg:px-[335px] grid grid-cols-2 gap-4">
        
          <RegisterDormRoomtypeForm
          v-for="(i, index) in roomTypeCount" :key="index"
          ref="test"
            :index="index"
            @removeRoomType="removeRoomType(index, ...arguments)"
            @validate="checkForRoomType(index, ...arguments)"
          />
        
        <button
          class="text-black hover:text-gray-soil hover:bg-cream rounded-lg"
        >
          <span
            class="material-icons"
            style="font-size: 60px"
            @click="
              roomTypeCount.push({
                id: roomTypeCount[roomTypeCount.length - 1].id + 1,
                validate: false,
              })
            "
            >add_box</span
          >
          <p>เพิ่มประเภทห้องพัก</p>
        </button>
      </div>
      <button class="btn btn-neutral mx-auto block bg-cheese" @click="next">
        Next
      </button>
      <nuxt-link
        to="/dormForm/registerDormDetail"
        class="btn btn-neutral mx-auto block bg-cheese"
        >Back</nuxt-link
      >
    </div>
  </div>
</template>
<script>
export default {
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
          console.log("Error");
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
