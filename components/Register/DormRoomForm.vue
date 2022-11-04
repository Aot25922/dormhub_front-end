<template>
  <div>
    <div>
      <h1 class="font-bold text-lg md:text-xl xl:text-2xl 2xl:text-3xl">
        ข้อกำหนด
      </h1>
      <ul
        class="
          py-5
          text-sm
          space-y-5
          md:text-base
          lg:text-lg
          xl:text-xl
          2xl:space-y-10
        "
      >
        <li class="indent-5">
          ไม่สามารถเเก้ไขข้อมูลของห้องพักได้หากยังไม่ได้ยกเลิกการจองทั้งหมด
        </li>
      </ul>
    </div>
    <div
      v-for="(floor, index) in roomList"
      :key="index"
      class="rounded border shadow-lg p-5 mt-5"
    >
      <div class="">
        <span class="font-bold">ชั้น {{ floor.floor }}</span>
        <div v-for="(room, index) in floor.rooms" :key="index">
          <div class="w-full rounded-md p-3 relative grid grid-cols-3 md:grid-cols-4">
            <div class="col-span-1 px-1">
              <label class="label-text tracking-wide font-bold my-2"
                >เลขห้อง
                </label
              >
              <input
                type="text"
                class="py-4 px-2 w-full input-md rounded border-0 disabled:text-gray-400 :disabled:bg-gray-800"
                maxlength="6"
                placeholder="A101"
                v-model="room.roomNum"
                :disabled="disableForm"
              />
              <div class="text-gray-300 pt-1 font-bold text-xs md:text-sm">
                <span v-text="6 - room.roomNum.length"></span>
                <span>หลัก</span>
              </div>
            </div>

            <div class="col-span-1 px-1">
              <label class="label-text tracking-wide font-bold my-2"
                >สถานะ</label
              >
              <div class="center con-switch py-2">
                <vs-switch success class="w-full" v-model="room.status" :disabled="disableForm">
                  <template #off> ไม่ว่าง </template>
                  <template #on> ว่าง </template>
                </vs-switch>
              </div>
            </div>

            <div class="col-span-1 px-1 md:col-span-2">
              <label class="label-text tracking-wide font-bold my-2"
                >ประเภทห้อง</label
              >
              <select
                v-if="editForm"
                class="select mb-5 w-full disabled:text-gray-400"
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
                class="select mb-5 w-full disabled:text-gray-400"
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

            <div class="col-span-3 px-1 md:col-span-4">
              <label class="label-text tracking-wide font-bold my-2"
                >รายละเอียดเพิ่มเติม(ถ้ามี)</label
              >
              <textarea
                type="text"
                class="textarea w-full disabled:text-gray-400"
                placeholder="โต๊ะ เตียง เก้าอี้"
                v-model="room.description"
                :disabled="disableForm"
              />
            </div>

            <div class="col-span-3 ml-auto md:col-span-4">
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
    </div>
    <div class="py-3">
      <button v-if="editForm" @click="submit()" class="btn btn-success w-full">
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
              status: true,
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
          (x) => !(x.roomNum == "" && x.roomType == "")
        );
        for (let j in this.roomList[i].rooms) {
          newRoomList.push(this.roomList[i].rooms[j]);
        }
      }
      newRoomList = JSON.parse(JSON.stringify(newRoomList));
      for (let i in newRoomList) {
        if (newRoomList[i].status) {
          newRoomList[i].status = "ว่าง";
        } else {
          newRoomList[i].status = "ไม่ว่าง";
        }
      }
      console.log(newRoomList);
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
          let result = await this.$axios.$put(
            `${this.$store.state.Backend_URL}/dorm/edit`,
            formData,
            {
              withCredentials: true,
            }
          );
          const noti = this.$vs.notification({
            progress: "auto",
            icon: `<i class='bx bx-folder-open' ></i>`,
            color: result.message ? "warn" : "success",
            position: "top-right",
            title: `เเจ้งเตือน`,
            text: result.message
              ? result.message
              : "เเก้ไขข้อมูลห้องพักเรียบร้อย",
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
      if (this.roomList.length >= 10) {
        const noti = this.$vs.notification({
          progress: "auto",
          icon: `<i class='bx bx-folder-open' ></i>`,
          color: "warn",
          position: "top-right",
          title: `ไม่สามารถเพิ่มชั้นได้`,
          text: `ไม่สามารถเพิ่มชั้นเกิน 10 ชั้น`,
        });
        return;
      }
      let newFloor = this.roomList[this.roomList.length - 1].floor + 1;
      this.roomList.push({
        floor: newFloor,
        rooms: [
          {
            roomNum: "",
            status: true,
            floors: newFloor,
            description: "",
            roomType: "",
          },
        ],
      });
    },
    addNewRoom(floor) {
      if (floor.rooms.length >= 15) {
        const noti = this.$vs.notification({
          progress: "auto",
          icon: `<i class='bx bx-folder-open' ></i>`,
          color: "warn",
          position: "top-right",
          title: `ไม่สามารถเพิ่มห้องได้`,
          text: "ไม่สามารถเพิ่มห้องเกิน 15 ห้อง",
        });
        return;
      }
      floor.rooms.push({
        roomNum: "",
        status: true,
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
              status:
                this.$store.state.selectedDorm.rooms[i].status == "ว่าง"
                  ? true
                  : false,
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
