<template>
  <div>
    <div v-for="floor in floors" :key="floor">
      <h1>ชั้น {{ floor }}</h1>
      <div
        v-if="$store.state.newDorm.roomType.length > 0"
        class="grid grid-cols-4 gap-4"
      >
        <div v-for="(i, index) in room[floor]" :key="index" class="relative">
          <div class="w-full bg-cream rounded-md p-3">
          <span v-show="false">{{i.floors = floor}}</span>
            <button
              @click="$delete(room[floor], index)"
              class="absolute top-0 right-0"
              v-if="room[floor].length > 1"
            >
              <span class="material-icons text-black">close</span>
            </button>
            <label
              for=""
              class="label-text text-gray-soil tracking-wide font-bold my-2"
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
                text-gray-soil
                bg-cream-light
                border-0
                focus:outline-none focus:bg-cream-lightest focus:text-gray-soil
                disabled:bg-green-darker disabled:text-dark-gray
              "
              placeholder="101"
              v-model="i.roomNum"
            />
            <label
              for=""
              class="label-text text-gray-soil tracking-wide font-bold my-2"
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
                text-gray-soil
                bg-cream-light
                border-0
                focus:outline-none focus:bg-cream-lightest focus:text-gray-soil
                disabled:bg-green-darker disabled:text-dark-gray
              "
              placeholder="ว่าง/ไม่ว่าง"
              v-model="i.status"
            />
            <!-- <p class="text-error text-right mt-2" v-if="!validateStatus">กรูณาใส่สถานะห้อง</p> -->
            <!-- <p class="text-error text-right mt-2" v-if="!validateFloors">ระบุชั้นของห้องพัก</p> -->

            <label
              for=""
              class="label-text text-gray-soil tracking-wide font-bold my-2"
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
                text-gray-soil
                bg-cream-light
                border-0
                focus:outline-none focus:bg-cream-lightest focus:text-gray-soil
                disabled:bg-green-darker disabled:text-dark-gray
              "
              placeholder="หอมชื่นใจ"
              v-model="i.description"
            />

            <label
              for=""
              class="label-text text-gray-soil tracking-wide font-bold my-2"
              >ประเภทห้อง</label
            >
            <select
              class="
                select
                mb-5
                w-full
                text-gray-soil
                bg-dark-gray
                border-2 border-gray-soil
                disabled:bg-gratext-gray-soil disabled:text-dark-blue
              "
              v-model="i.roomType"
            >
              <option option disabled selected>กรุณาเลือกประเภทห้อง</option>
              <option
                v-for="option in $store.state.newDorm.roomType"
                :value="option.type"
                :key="option.type"
              >
                {{ option.type }}
              </option>
            </select>
          </div>
        </div>
        <div class="py-3">
          <button class="text-black">
            <span
              class="material-icons"
              @click="
                room[floor].push({
                  roomNum: '',
                  status: '',
                  floors: 0,
                  description: '',
                  roomType: '',
                })
              "
              >add_box</span
            >เพิ่มห้อง
          </button>
        </div>
      </div>
      <button class="btn btn-primary" @click="submitRoom">
        ยืนยันข้อมูลห้องพัก
      </button>
    </div>
    <button
      class="btn btn-primary"
      @click="addNewRoom"
    >
      เพิ่มชั้นของหอพัก
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      room: {
        1: [
          {
            roomNum: "",
            status: "",
            floors: 0,
            description: "",
            roomType: "",
          },
        ],
      },
      floors: [1],
    };
  },
  methods: {
    submitRoom() {
      let newRoom = JSON.parse(JSON.stringify(this.room));
      console.log(newRoom);
      this.$store.commit("SET_ROOM", newRoom);
    },
    removeRoomType(index, roomType) {
      this.$store.commit("REMOVE_ROOMTYPE", roomType);
      this.$delete(this.roomTypeCount, index);
    },
    addNewRoom() {
      this.floors.push(this.floors.slice(-1)[0] + 1);
      this.room[this.floors.slice(-1)[0]] = [
        {
          roomNum: "",
          status: "",
          floors: 0,
          description: "",
          roomType: "",
        },
      ];
      console.log(this.room)
    },
  },
};
</script>