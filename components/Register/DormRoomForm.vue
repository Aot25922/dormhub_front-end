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
              <select
                v-if="editForm"
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

              <select
                v-else
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
                @click="
                  removeRoom(room);
                  $delete(floor.rooms, index);
                "
                class="btn btn-accent btn-sm"
                v-if="floor.rooms.length > 1 && editForm"
              >
                <span class="material-icons">delete</span>
                ลบห้อง {{ room.roomNum }}
              </button>
              <button
                @click="$delete(floor.rooms, index)"
                class="btn btn-accent btn-sm"
                v-else-if="floor.rooms.length > 1 && !disableForm"
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
      <button
        v-if="!disableForm"
        class="btn btn-secondary w-full my-5"
        @click="addNewFloor"
      >
        เพิ่มชั้นของหอพัก
      </button>
      <button
        class="btn btn-accent w-full"
        @click="disableForm = false"
        v-if="disableForm"
      >
        เเก้ไขข้อมูลของห้องพัก
      </button>
      <button v-if="editForm" @click="submit()" class="bg-emerald-900">
        ยืนยันการเเก้ไขข้อมูล
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
      deleteRoomList: [],
      disableForm: false,
    };
  },
  methods: {
    async submit() {
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
      if (this.editForm) {
        const loading = this.$vs.loading();
        for (let i in this.deleteRoomList) {
          newRoomList.push(this.deleteRoomList[i]);
        }
        for (let i in newRoomList) {
          newRoomList[i].roomTypeId =
            this.$store.state.selectedDorm.roomTypes.find(
              (type) => type.type == newRoomList[i].roomType
            ).roomTypeId;
          newRoomList[i].dormId = this.$store.state.selectedDorm.dormId;
          delete newRoomList[i].roomType;
        }
        let formData = new FormData();
        const data = {
          room: newRoomList,
        };
        formData.append("data", JSON.stringify(data));
        try {
          await this.$axios.$put(
            `${this.$store.state.Backend_URL}/dorm/edit`,
            formData,
            {
              withCredentials: true,
            }
          );
          const noti = this.$vs.notification({
            progress: "auto",
            icon: `<i class='bx bx-folder-open' ></i>`,
            color: "success",
            position: "top-right",
            title: `Data Update`,
            text: `Update Dorm room complete!`,
          });
          let dormInfo = {
            dorm: null,
            id: this.$store.state.selectedDorm.dormId,
          };
          await this.$store.dispatch("dormSelected", dormInfo);
          loading.close();
        } catch (error) {
          loading.close();
          const noti = this.$vs.notification({
            progress: "auto",
            icon: `<i class='bx bx-folder-open' ></i>`,
            color: "warn",
            position: "top-right",
            title: `Data Update`,
            text: error.response.data.error.message,
          });
        }
      } else {
        this.$store.commit("SET_ROOM", newRoomList);
        this.disableForm = true;
        this.$emit("validate", true);
      }
    },
    removeRoom(room) {
      if (room.roomId != undefined) {
        room.delete = true;
        this.deleteRoomList.push(room);
      }
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
              roomId: this.$store.state.selectedDorm.rooms[i].roomId,
              roomNum: this.$store.state.selectedDorm.rooms[i].roomNum,
              status: this.$store.state.selectedDorm.rooms[i].status,
              floors: room.floor,
              description: this.$store.state.selectedDorm.rooms[i].description,
              roomType: this.$store.state.selectedDorm.roomTypes.find(
                (type) =>
                  type.roomTypeId ==
                  this.$store.state.selectedDorm.rooms[i].roomTypeId
              ).type,
            });
            return true;
          }
        });
      }
      roomList.sort((a, b) => {
        return a.floor - b.floor;
      });
      this.roomList = roomList;
    }
  },
};
</script>
