<template>
  <div>
	<!-- Condition -->
    <div>
      <h1 class="roomForm-h1">
        ข้อกำหนด
      </h1>
      <ul class="roomForm-ul">
        <li class="indent-5">
          ไม่สามารถเเก้ไขข้อมูลของห้องพักได้หากยังไม่ได้ยกเลิกการจองทั้งหมด
        </li>
      </ul>
    </div>

	<!-- Add Floor&Room Template -->
    <div class="roomForm-bg">
      <h1 class="font-bold text-lg">สร้างชั้นเเละห้องพัก</h1>
		<div class="flex wrap">
			<div class="w-1/2 md:w-2/5">จำนวนชั้น : {{ roomList.length }}/10</div>
		</div>
      <div class="flex flex-wrap">
		<div class="p-1 w-1/2 md:w-2/5">
			<label class="form-label">จำนวนชั้น </label>
			<input type="number" min="1" max="10" v-model="floorCount" class="form-input input-md"
             />
			</div>
			<div class="p-1 w-1/2 md:w-2/5">
				<label class="form-label"
					>จำนวนห้องในเเต่ละชั้น
				</label>
				<input type="number" min="1" max="15" v-model="roomPerFloor" class="form-input input-md" />
			</div>
			<div class="roomForm-floor">
				<button v-if="editForm" class="btn btn-secondary w-full" @click="confirmChange = true">
					สร้างชั้นเเละห้องพักใหม่
				</button>
				<button v-else class="btn btn-secondary w-full" @click="addFloorAndRoom">
					สร้างชั้นเเละห้องพักใหม่
				</button>
			</div>
		</div>
    </div>
    
	<!-- Floor List -->
	<div
      v-for="(floor, index) in roomList"
      :key="index"
      class="roomForm-floor-bg"
    >
      <div>
        <span class="font-bold">ชั้น {{ floor.floor }}</span>
        <div v-for="(room, index) in floor.rooms" :key="index">
          <div
            class="roomForm-floor-grid"
          >
            <div class="col-span-1 px-1 md:col-span-1">
              <label class="form-label"
                >เลขห้อง
              </label>
              <input
                type="text"
                class="form-input input-md"
                maxlength="6"
                placeholder="A101"
                v-model="room.roomNum"
                :disabled="disableForm"
              />
              <div class="roomForm-countNum">
                <span v-text="6 - room.roomNum.length"></span>
                <span>/6</span>
              </div>
            </div>

            <div class="col-span-1 px-1 md:col-span-1">
              <label class="form-label"
                >สถานะ</label
              >
              <div class="center con-switch py-2">
                <vs-switch
                  success
                  class="w-full"
                  v-model="room.status"
                  :disabled="disableForm"
                >
                  <template #off> ไม่ว่าง </template>
                  <template #on> ว่าง </template>
                </vs-switch>
              </div>
            </div>

            <div class="col-span-1 px-1 md:col-span-2">
              <label class="form-label"
                >ประเภทห้อง</label
              >
              <select
                v-if="editForm"
                class="selectWithDis mb-5"
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
                class="roomForm-sel"
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

			<div class="roomForm-del">
              <button
                @click="removeRoom(room, floor, index)"
                class="btn btn-accent btn-sm"
                v-if="floor.rooms.length > 0 && editForm"
              >
                <span class="material-icons">delete</span>
                ห้อง {{ room.roomNum }}
              </button>
              <button
                @click="removeRoom(room, floor, index)"
                class="btn btn-accent btn-sm"
                v-else-if="floor.rooms.length > 0 && !disableForm"
              >
                <span class="material-icons">delete</span>
                ห้อง {{ room.roomNum }}
              </button>
            </div>

            <div class="col-span-3 px-1 md:col-span-5">
              <label class="form-label"
                >หมายเหตุห้อง {{ room.roomNum }}</label
              >
              <textarea
                type="text"
                placeholder="โต๊ะ เตียง เก้าอี้"
                v-model="room.description"
                :disabled="disableForm"
              />
            </div>

            <div class="col-span-3 ml-auto md:hidden">
              <button
                @click="removeRoom(room, floor, index)"
                class="btn btn-accent btn-sm"
                v-if="floor.rooms.length > 0 && editForm"
              >
                <span class="material-icons">delete</span>
                ห้อง {{ room.roomNum }}
              </button>
              <button
                @click="removeRoom(room, floor, index)"
                class="btn btn-accent btn-sm"
                v-else-if="floor.rooms.length > 0 && !disableForm"
              >
                <span class="material-icons">delete</span>
                ห้อง {{ room.roomNum }}
              </button>
            </div>
            <div class="col-span-3 divider"></div>
          </div>
        </div>
      </div>

      <div v-if="!disableForm && floor.rooms.length<15" class="py-3 w-full">
        <button class="btn btn-neutral w-full" @click="addNewRoom(floor)">
          เพิ่มห้อง
        </button>
      </div>
    </div>
    <div class="py-5 w-full">
      <button
        v-if="!disableForm && this.roomList.length < 10"
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
    <vs-dialog width="550px" not-center v-model="confirmChange">
              <template #header>
                <h4 class="not-margin">
                  <b>การสร้างชั้นเเละห้องพักใหม่นี้จะลบข้อมูลเก่าของคุณทั้งหมดคุณเเน่ใจหรือไม่?</b>
                </h4>
              </template>
              <template #footer>
                <div class="con-footer">
                  <vs-button @click="addFloorAndRoom" transparent>
                    ยืนยัน
                  </vs-button>
                  <vs-button @click="confirmChange = false" dark transparent>
                    ยกเลิก
                  </vs-button>
                </div>
              </template>
            </vs-dialog>
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
      floorCount: 0,
      roomPerFloor: 0,
      confirmChange: false,
    };
  },
  methods: {
    async submit() {
      let newRoomList = [];
      for (let i in this.roomList) {
        for (let j in this.roomList[i].rooms) {
          if (
            this.roomList[i].rooms[j].roomNum == "" ||
            this.roomList[i].rooms[j].roomType == ""
          ) {
            const noti = this.$vs.notification({
              progress: "auto",
              icon: `<i class='bx bx-folder-open' ></i>`,
              color: "warn",
              position: "top-right",
              title: `เเจ้งเตือน`,
              text: `มีบางห้องพักของคุณยังใส่ข้อมูลไม่เรียบร้อย`,
            });
            return;
          }
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
    removeRoom(room, floor, indexofRoom) {
      if (floor) {
        if (floor.rooms.length == 1) {
          this.$delete(this.roomList, floor.floor - 1);
        }
        this.$delete(floor.rooms, indexofRoom);
      }
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
      if (this.roomList.length == 0) {
        this.roomList.push({
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
        });
      } else {
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
      }
    },
    addNewRoom(floor) {
      if (floor.rooms.length >= 15) {
        const noti = this.$vs.notification({
          progress: "auto",
          icon: `<i class='bx bx-folder-open' ></i>`,
          color: "warn",
          position: "top-right",
          title: `ไม่สามารถเพิ่มห้องได้`,
          text: "ไม่สามารถเพิ่มห้องเกิน 15 ห้องต่อชั้น",
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
    addFloorAndRoom() {
      if (this.floorCount > 10) {
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
      if (this.roomPerFloor > 15) {
        const noti = this.$vs.notification({
          progress: "auto",
          icon: `<i class='bx bx-folder-open' ></i>`,
          color: "warn",
          position: "top-right",
          title: `ไม่สามารถเพิ่มห้องได้`,
          text: "ไม่สามารถเพิ่มห้องเกิน 15 ห้องต่อชั้น",
        });
        return;
      }
      this.confirmChange = false;
      let newRoomList = [];
      if (this.editForm) {
        for (let i in this.roomList) {
          for (let j in this.roomList[i].rooms) {
            this.removeRoom(this.roomList[i].rooms[j]);
          }
        }
      }
      for (let i = 1; i <= this.floorCount; i++) {
        let newFloor = {};
        newFloor.floor = i;
        let rooms = [];
        for (let j = 0; j < this.roomPerFloor; j++) {
          rooms.push({
            roomNum: "",
            status: true,
            floors: i,
            description: "",
            roomType: "",
          });
          newFloor.rooms = rooms;
        }
        newRoomList.push(newFloor);
      }
      this.roomList = newRoomList;
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
