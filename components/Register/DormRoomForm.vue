<template>
  <div>
    <div v-for="(floor, index) in roomList" :key="index" class="grid grid-cols-4 gap-4">
      <span>ชั้น {{ floor.floor }}</span>
      <div v-for="(room, index) in floor.rooms" :key="index">
        <div class="w-full bg-cream rounded-md p-3 relative">
          <button
            @click="$delete(floor.rooms, index)"
            class="top-0 right-0 absolute"
            v-if="floor.rooms.length > 1"
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
            v-model="room.roomNum"
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
            v-model="room.status"
          />

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
            v-model="room.description"
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
            v-model="room.roomType"
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
          <span class="material-icons" @click="addNewRoom(floor)">add_box</span
          >เพิ่มห้อง
        </button>
      </div>
    </div>
    <button class="btn btn-primary" @click="addNewFloor">
      เพิ่มชั้นของหอพัก
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      roomList: [
        {
          floor: 1,
          rooms: [
            {
              roomNum: "",
              status: "",
              floors: 1,
              description: "",
              roomType: "",
            },
          ],
        },
      ],
    };
  },
  methods: {
    submit() {
      let newRoomList = []
      for (let i in this.roomList) {
        this.roomList[i].rooms = this.roomList[i].rooms.filter(
          x => !(x.roomNum == "" || x.status == "" || x.roomType == "")
        );
        for(let j in this.roomList[i].rooms){
          newRoomList.push(this.roomList[i].rooms[j])
        }
      }
      newRoomList = JSON.parse(JSON.stringify(newRoomList));
      this.$store.commit("SET_ROOM", newRoomList);
      this.$emit("validate", true);
    },
    removeRoomType(index, roomType) {
      this.$store.commit("REMOVE_ROOMTYPE", roomType);
      this.$delete(this.roomTypeCount, index);
    },
    addNewFloor() {
      let newFloor = this.roomList[this.roomList.length -1].floor +1
      this.roomList.push({
        floor: newFloor,
        rooms: [
          {
            roomNum: "",
            status: "",
            floors: newFloor,
            description: "",
            roomType: "",
          },
        ],
      });
    },
    addNewRoom(floor) {
      floor.rooms.push({
        roomNum: "",
        status: "",
        floors: floor.floor,
        description: "",
        roomType: "",
      });
    },
  },
};
</script>
