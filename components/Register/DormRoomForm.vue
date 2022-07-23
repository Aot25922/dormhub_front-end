<template>
  <div>
    <div class="px-3 md:px-20 lg:px-[335px]">
      <div class="relative" v-for="(i, index) in roomTypeCount" :key="i.id">
      {{$store.state.newDorm.roomType}}
        <RegisterDormRoomtypeForm @removeRoomType = "removeRoomType(index,...arguments)" />
      </div>
    </div>
    <button>
      <span
        class="material-icons text-white"
        @click="
          roomTypeCount.push({
            id: roomTypeCount[roomTypeCount.length - 1].id + 1,
          })
        "
        >add_box</span
      >
    </button>
    <div v-for="(i, index) in room" :key="index" class="relative">
      <div class="w-full bg-dark-gray rounded-md p-3">
      <button
          @click="$delete(room, index)"
          class="absolute top-0 right-0"
          v-if="room.length > 1"
        >
          <h1>{{ i.id }}</h1>
          <span class="material-icons text-white">close</span>
        </button>
        <label
          for=""
          class="label-text text-light-blue tracking-wide font-bold my-2"
          >เลขห้อง</label
        >
        <input
          type="text"
          class="
            py-4
            mb-3
            px-2
            w-full
            input-sm
            rounded
            text-light-blue
            bg-dark-gray
            focus:outline-none focus:bg-gray-soil focus:text-light-blue
            disabled:bg-light-blue disabled:text-dark-blue
          "
          placeholder="101"
          v-model="room[index].roomNum"
        />
        <!-- <p class="text-error text-right mt-2" v-if="!validateRoomNum">กรุณาใส่เลขห้อง</p> -->

        <label
          for=""
          class="label-text text-light-blue tracking-wide font-bold my-2"
          >สถานะ</label
        >
        <input
          type="text"
          class="
            py-4
            mb-3
            px-2
            w-full
            input-sm
            rounded
            text-light-blue
            bg-dark-gray
            focus:outline-none focus:bg-gray-soil focus:text-light-blue
            disabled:bg-light-blue disabled:text-dark-blue
          "
          placeholder="ว่าง/ไม่ว่าง"
          v-model="room[index].status"
        />
        <!-- <p class="text-error text-right mt-2" v-if="!validateStatus">กรูณาใส่สถานะห้อง</p> -->

        <label
          for=""
          class="label-text text-light-blue tracking-wide font-bold my-2"
          >ชั้น</label
        >
        <input
          type="text"
          class="
            py-4
            mb-3
            px-2
            w-full
            input-sm
            rounded
            text-light-blue
            bg-dark-gray
            focus:outline-none focus:bg-gray-soil focus:text-light-blue
            disabled:bg-light-blue disabled:text-dark-blue
          "
          placeholder="1-100"
          v-model="room[index].floors"
        />
        <!-- <p class="text-error text-right mt-2" v-if="!validateFloors">ระบุชั้นของห้องพัก</p> -->

        <label
          for=""
          class="label-text text-light-blue tracking-wide font-bold my-2"
          >รายละเอียดเพิ่มเติม</label
        >
        <input
          type="text"
          class="
            py-4
            mb-3
            px-2
            w-full
            input-sm
            rounded
            text-light-blue
            bg-dark-gray
            focus:outline-none focus:bg-gray-soil focus:text-light-blue
            disabled:bg-light-blue disabled:text-dark-blue
          "
          placeholder="หอมชื่นใจ"
          v-model="room[index].description"
        />

        <!-- <label
          for=""
          class="label-text text-light-blue tracking-wide font-bold my-2"
          >ประเภทห้อง</label
        >
        <select
          class="
            select
            mb-5
            w-full
            text-light-blue
            bg-dark-gray
            border-2 border-gray-soil
            disabled:bg-light-blue disabled:text-dark-blue
          "
          v-model="room[index].roomType"
        >
          <option option disabled selected>กรุณาเลือกประเภทห้อง</option>
          <option
            v-for="option in roomType"
            :value="option.type"
            :key="option.type"
          >
            {{ option.type }}
          </option>
        </select> -->
      </div>    
    </div>
    <button>
      <span
        class="material-icons text-white"
        @click="
          room.push({
            roomNum: '',
            status: '',
            floors: 0,
            description: '',
            roomType: '',
          })
        "
        >add_box</span
      >
    </button>
    <button @click="submitRoom">ยืนยันข้อมูลประเภทห้องพัก</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      roomTypeCount: [{ id: 0 ,room:null}],
      room: [
        {
          roomNum: "",
          status: "",
          floors: 0,
          description: "",
          roomType: "",
        },
      ],
    };
  },
  methods: {
    submitRoom(){
      this.$store.commit("SET_ROOM", this.room);
    },
    removeRoomType(index,roomType){
      this.$store.commit("REMOVE_ROOMTYPE",roomType)
      this.$delete(this.roomTypeCount,index)
    }
  }
};
</script>