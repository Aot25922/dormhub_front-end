<template>
  <div>
    <div
      v-for="(floor, index) in roomList"
      :key="index"
      class="rounded border shadow-lg p-5 mt-5"
    >
      <div class="">
        <span class="font-bold">ชั้น {{ floor.floor }}</span>
        <div v-for="(room, index) in floor.rooms" :key="index">
          <div class="w-full rounded-md p-3 relative grid grid-cols-3">
            <div class="col-span-1 px-1">
              <label class="label-text tracking-wide font-bold my-2"
                >เลขห้อง</label
              >
              <input
                type="text"
                class="py-4 mb-3 px-2 w-full input-md rounded border-0"
                placeholder="101"
                v-model="room.roomNum"
                :disabled="disableForm"
              />
            </div>

            <div class="col-span-1 px-1">
              <label class="label-text tracking-wide font-bold my-2"
                >สถานะ</label
              >
              <input
                type="text"
                class="py-4 mb-3 px-2 w-full input-md rounded border-0"
                placeholder="ว่าง/ไม่ว่าง"
                v-model="room.status"
                :disabled="disableForm"
              />
            </div>

            <div class="col-span-1 px-1">
              <label class="label-text tracking-wide font-bold my-2"
                >ประเภทห้อง</label
              >
              <select v-if="editForm"
                class="select mb-5 w-full"
                v-model="room.roomType"
                :disabled="disableForm"
              >
                <option option disabled selected>กรุณาเลือกประเภทห้อง</option>

                  <option
                    v-for="option in $store.state.selectedDorm.roomTypes"
                    :value="option.type"
                    :key="option.type"
                  >
                    {{ option.type }}
                  </option>
              </select>

              <select v-else
                class="select mb-5 w-full"
                v-model="room.roomType"
                :disabled="disableForm"
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

            <div class="col-span-3 px-1">
              <label class="label-text tracking-wide font-bold my-2"
                >รายละเอียดเพิ่มเติม</label
              >
              <textarea
                type="text"
                class="
                  py-4
                  mb-3
                  px-2
                  h-20
                  w-full
                  input-sm
                  md:input-md
                  rounded
                  border-0
                "
                placeholder="โต๊ะ เตียง เก้าอี้"
                v-model="room.description"
                :disabled="disableForm"
              />
            </div>

            <div class="col-span-3 ml-auto">
              <button
                @click="$delete(floor.rooms, index)"
                class="btn btn-accent btn-sm"
                v-if="floor.rooms.length > 1 && !disableForm"
              >
                <span class="material-icons">delete</span>
                ลบห้อง {{ room.roomNum }}
              </button>
            </div>
            <div class="col-span-3 divider"></div>
          </div>
        </div>
      </div>

      <div v-if="!disableForm" class="py-3 w-full">
        <button class="btn btn-neutral w-full" @click="addNewRoom(floor)">
          เพิ่มห้อง
        </button>
      </div>
    </div>
    <div class="py-5 w-full">
      <button v-if="!disableForm" class="btn btn-secondary w-full my-5" @click="addNewFloor">
        เพิ่มชั้นของหอพัก
      </button>
      <button
        class="btn btn-accent w-full"
        @click="disableForm = false"
        v-if="disableForm"
      >
        เเก้ไขข้อมูลของห้องพัก
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: ["editForm"],
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
      disableForm: false,
    };
  },
  methods: {
    submit() {
      let newRoomList = [];
      for (let i in this.roomList) {
        this.roomList[i].rooms = this.roomList[i].rooms.filter(
          (x) => !(x.roomNum == "" || x.status == "" || x.roomType == "")
        );
        for (let j in this.roomList[i].rooms) {
          newRoomList.push(this.roomList[i].rooms[j]);
        }
      }
      newRoomList = JSON.parse(JSON.stringify(newRoomList));
      this.$store.commit("SET_ROOM", newRoomList);
      this.disableForm = true;
      this.$emit("validate", true);
    },
    removeRoomType(index, roomType) {
      this.$store.commit("REMOVE_ROOMTYPE", roomType);
      this.$delete(this.roomTypeCount, index);
    },
    addNewFloor() {
      let newFloor = this.roomList[this.roomList.length - 1].floor + 1;
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
  created() {
    if (this.editForm) {
      if (!this.$store.state.selectedDorm) {
        this.$router.push({ path: "/dormList" });
        return;
      }
      let roomList = [];
      let floorList = [
        ...new Map(
          this.$store.state.selectedDorm.rooms.map((item) => [
            item["floors"],
            item,
          ])
        ).values(),
      ];
      for (let i in floorList) {
        roomList.push({
          floor: floorList[i].floors,
          rooms: [],
        });
      }
      for (let i in this.$store.state.selectedDorm.rooms) {
          roomList.some((room, index) => {
            if (room.floor == this.$store.state.selectedDorm.rooms[i].floors) {
              roomList[index].rooms.push({
                roomNum: this.$store.state.selectedDorm.rooms[i].roomNum,
                status: this.$store.state.selectedDorm.rooms[i].status,
                floors: room.floor,
                description:
                  this.$store.state.selectedDorm.rooms[i].description,
                roomType: this.$store.state.selectedDorm.roomTypes.find(
                  (type) =>
                    type.roomTypeId ==
                    this.$store.state.selectedDorm.rooms[i].roomTypeId
                ).type,
              });
              return true
            }
          });
      }
      console.log(this.$store.state.selectedDorm);
      this.roomList = roomList;
    }
  },
};
</script>
