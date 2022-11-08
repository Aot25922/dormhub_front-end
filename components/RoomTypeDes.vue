<template>
  <div>
    <div class="mt-2 bg-white drop-shadow-lg rounded-lg">
      <client-only>
        <agile style="touch-action: none" v-if="checkRoomtypeImg">
          <div
            class="
              slide
              text-white
              block
              relative
              h-60
              md:h-[480px]
              lg:h-[550px]
            "
            v-for="i in media"
            :key="i.mediaId"
          >
            <img
              :src="
                $store.state.Backend_URL +
                '/dorm/image/' +
                i.dormId +
                '/' +
                i.mediaId +
                '/' +
                roomType.roomTypeId
              "
              class="object-cover object-center w-full h-full"
              @error="checkRoomtypeImg = false"
            />
          </div>
          <template slot="prevButton"
            ><span class="material-icons">chevron_left</span></template
          >
          <template slot="nextButton"
            ><span class="material-icons">chevron_right</span></template
          >
        </agile>
      </client-only>
      <div class="p-5">
        <div class="text-sm lg:text-base 2xl:text-lg">
          <div class="font-bold text-xl lg:text-2xl">
            ห้องพักประเภท : {{ roomType.type }}
          </div>
          <div class="px-3">
            <vs-table>
              <template #tbody>
                <vs-tr>
                  <vs-td> ค่าเช่าต่อเดือน </vs-td>
                  <vs-td> {{ roomType.dormHasRoomType.price }} บาท </vs-td>
                </vs-tr>
                <vs-tr>
                  <vs-td> ค่าจองห้องพัก </vs-td>
                  <vs-td> {{ roomType.dormHasRoomType.deposit }} บาท </vs-td>
                </vs-tr>
                <vs-tr>
                  <vs-td> ขนาดพื้นที่ </vs-td>
                  <vs-td> {{ roomType.dormHasRoomType.area }} ตารางเมตร </vs-td>
                </vs-tr>
                <vs-tr>
                  <vs-td> รายละเอียดหรือสิ่งอำนวยความสะดวกเพิ่มเติม </vs-td>
                  <vs-td>
                    <span v-if="roomType.description">{{
                      roomType.dormHasRoomType.description
                    }}</span>
                    <span v-else>ไม่มีข้อมูล</span>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </div>
      </div>
    </div>

    <div class="my-5 p-5 bg-white drop-shadow-lg rounded-lg">
      <!--Modal Zone-->
      <input type="checkbox" id="my-modal-6" class="modal-toggle" />
      <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box h-64">
          <div>
            <h3 class="font-bold text-lg">เลือกช่องทางการชำระเงิน</h3>
            <label class="label-text text-gray-500 tracking-wide font-bold my-2"
              >ช่องทางการชำระเงิน <span class="text-imperialRed">*</span></label
            >
            <select
              v-model="selectedBankAccount"
              class="select w-full text-gray-500 border-0"
            >
              <option option disabled selected>
                กรุณาเลือกช่องทางการชำระเงิน
              </option>
              <option
                v-for="option in this.bankAccount"
                :value="option"
                :key="option.bankAccId"
              >
                เลขที่บัญชี: {{ option.accountName }} ชื่อบัญชี:
                {{ option.accountNum }} ธนาคาร{{ option.bank.name }}
              </option>
            </select>
            <label class="label-text text-gray-500 tracking-wide font-bold my-2"
              >วันที่จะเริ่มเข้าพัก<span class="text-imperialRed"
                >*</span
              ></label
            >
            <input
              type="Date"
              class="py-4 px-2 w-full input input-sm md:input-md rounded"
              placeholder=""
              v-model="startDate"
            />
            <label class="label-text text-gray-500 tracking-wide font-bold my-2"
              >วันที่จะสิ้นสุดการเข้าพัก<span class="text-imperialRed"
                >*</span
              ></label
            >
            <input
              min="1"
              max="12"
              type="number"
              class="py-4 px-2 w-full input input-sm md:input-md rounded"
              placeholder="3"
              v-model="endDate"
            />
          </div>
          <div class="modal-action">
            <label for="my-modal-6" class="btn">ยกเลิกการจอง</label>
            <label
              for="my-modal-6"
              class="btn"
              v-if="selectedBankAccount && startDate && endDate"
              @click="booking"
              >ยืนยันการจอง</label
            >
          </div>
        </div>
      </div>

      <!--All room-->
      <h1 class="font-bold text-xl lg:text-2xl">ห้องพักทั้งหมด</h1>
      <div v-for="(floor, key) in roomList" :key="key" class="flex flex-wrap">
        <div class="w-full font-bold text-lg lg:text-xl">
          ชั้น : {{ floor.floor }}
        </div>
        <div
          v-for="(room, index) in floor.rooms.filter(
            (x) => x.roomType == roomType.type
          )"
          :key="index"
          class="w-1/2 md:w-1/3 lg:w-1/4"
        >
          <div class="p-5 m-1 rounded bg-ghostWhite flex flex-wrap shadow">
            <p class="w-full">
              เลขห้อง: <b>{{ room.roomNum }}</b>
            </p>
            <div class="w-full">
              <div v-if="room.status == 'ว่าง'">
                สถานะ: <b class="text-success">{{ room.status }}</b>
              </div>
              <div v-else>
                สถานะ: <b class="text-imperialRed">{{ room.status }}</b>
              </div>
            </div>
            <div class="w-full">
              <p>
                ประเภทห้อง: <b>{{ room.roomType }}</b>
              </p>
            </div>
            <div>
              <div
                v-if="room.description != ''"
                class="w-full px-2 py-3 bg-white mt-3 rounded"
              >
                {{ room.description }}
              </div>
              <div v-else class="bg-inherit hidden"></div>
            </div>
            <label
              for="my-modal-6"
              class="btn modal-button"
              v-if="
                room.status == 'ว่าง' &&
                $store.state.userAccount.role == 'Customer'
              "
              @click="selectedRoom = room"
              >จองห้องพัก</label
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "RoomTypeDes",
  props: ["roomType", "media", "rooms"],
  data() {
    return {
      roomList: [],
      checkRoomtypeImg: true,
      selectedBankAccount: null,
      selectedRoom: null,
      startDate: null,
      endDate: null,
      slipImg: null,
      slipImgUrl: null,
    };
  },
  methods: {
    async booking() {
      if (this.$store.state.userAccount.role != "Customer") {
        const noti = this.$vs.notification({
          progress: "auto",
          icon: `<i class='bx bx-folder-open' ></i>`,
          color: "warn",
          position: "top-right",
          title: `Data Update`,
          text: "คุณไม่ใช่ผู้เช่าหอพัก",
        });
        return;
      }
      if (this.endDate > 12 || this.endDate < 1) {
        const noti = this.$vs.notification({
          progress: "auto",
          icon: `<i class='bx bx-folder-open' ></i>`,
          color: "warn",
          position: "top-right",
          title: `ข้อมูลผิดพลาด`,
          text: "คุณไม่สามารถจองได้เกิน 12 เดือน หรือ น้อยกว่า 1 เดือน",
        });
        return;
      }
      this.selectedRoom.status = "จองเเล้ว";
      const loading = this.$vs.loading();
      let formData = new FormData();
      var newStartDate = new Date(this.startDate);
      var newEndDate = new Date(this.startDate);
      newEndDate.setMonth(newEndDate.getMonth() + parseInt(this.endDate));
      let startDay = newStartDate.getDate();
      let endDay = newEndDate.getDate();

      let endMonth = newEndDate.getMonth() + 1;
      let startMonth = newStartDate.getMonth() + 1;

      let endYear = newEndDate.getFullYear();
      let startYear = newStartDate.getFullYear();

      newStartDate = startDay + "/" + startMonth + "/" + startYear;
      newEndDate = endDay + "/" + endMonth + "/" + endYear;
      let bookingInfo = {
        bankAccId: this.selectedBankAccount.bankAccId,
        startDate: newStartDate,
        endDate: newEndDate,
        dormId: this.$store.state.selectedDorm.dormId,
        roomId: this.selectedRoom.roomId,
      };
      formData.append("data", JSON.stringify(bookingInfo));
      try {
        await this.$axios.$post(
          `${this.$store.state.Backend_URL}/booking/new`,
          formData,
          {
            withCredentials: true,
          }
        );
        loading.close();
        const noti = this.$vs.notification({
          progress: "auto",
          icon: `<i class='bx bx-folder-open' ></i>`,
          color: "success",
          position: "top-right",
          title: `Data Update`,
          text: `booking complete!`,
        });
        let bookingStatus = {
          roomId: this.selectedRoom.roomId,
          status: "จองเเล้ว",
        };
        this.$store.commit("SET_ROOMSTATUS", bookingStatus);
        this.selectedBankAccount = null;
        this.selectedRoom = null;
        this.startDate = null;
        this.endDate = null;
        this.slipImg = null;
        this.slipImgUrl = null;
      } catch (error) {
        loading.close();
        const noti = this.$vs.notification({
          progress: "auto",
          icon: `<i class='bx bx-folder-open' ></i>`,
          color: "warn",
          position: "top-right",
          title: `Data Update`,
          text: error,
        });
      }
    },
  },
  computed: {
    bankAccount() {
      return this.$store.state.selectedDorm.bankAccounts;
    },
  },
  created() {
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
  },
};
</script>

