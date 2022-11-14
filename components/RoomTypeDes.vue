<template>
  <div>
    <div class="mt-2 bg-white drop-shadow-lg rounded-lg">
      <client-only>
        <agile style="touch-action: none" v-if="checkRoomtypeImg">
          <div
            class="slide text-white block relative h-60 md:h-[480px] lg:h-[550px]"
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
          <div class="font-bold text-lg xl:text-xl">
            ห้องพักประเภท : {{ roomType.type }}
          </div>
          <div
            v-if="roomType.description"
            class="w-full p-3 bg-ghostWhite my-3 rounded-lg shadow text-xs xl:text-sm"
          >
            &emsp;"{{ roomType.description }}"
          </div>
          <div class="px-3">
            <vs-table>
              <template #tbody>
                <vs-tr>
                  <vs-td class="flex flex-row items-center">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2603/2603710.png"
                      class="w-5 mr-2 md:w-6 lg:w-7 xl:w-8"
                    />ค่าเช่าต่อเดือน
                  </vs-td>
                  <vs-td>฿ {{ roomType.dormHasRoomType.price }} </vs-td>
                </vs-tr>
                <vs-tr>
                  <vs-td class="flex flex-row items-center">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2664/2664669.png"
                      class="w-5 mr-2 md:w-6 lg:w-7 xl:w-8"
                    />ค่าจองห้องพัก
                  </vs-td>
                  <vs-td>฿ {{ roomType.dormHasRoomType.deposit }} </vs-td>
                </vs-tr>
                <vs-tr>
                  <vs-td class="flex flex-row items-center">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/8834/8834715.png"
                      class="w-5 mr-2 md:w-6 lg:w-7 xl:w-8"
                    />ขนาดพื้นที่
                  </vs-td>
                  <vs-td> {{ roomType.dormHasRoomType.area }} ตารางเมตร </vs-td>
                </vs-tr>
                <vs-tr>
                  <vs-td class="flex flex-row items-center">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2534/2534800.png"
                      class="w-5 mr-2 md:w-6 lg:w-7 xl:w-8"
                    />จำนวนห้องพัก
                  </vs-td>
                  <vs-td>
                    <span
                      >{{
                        $store.state.selectedDorm.rooms.filter(
                          (x) => x.roomTypeId == roomType.roomTypeId
                        ).length
                      }}
                      ห้อง
                    </span>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </div>
      </div>
    </div>

    <div class="my-5 bg-white drop-shadow-lg rounded-lg">
      <!--Modal Zone-->
      <input type="checkbox" id="my-modal-6" class="modal-toggle" />
      <div class="modal modal-bottom md:modal-middle">
        <div class="modal-box h-2/3">
          <div>
            <!-- Choose Payment Banking -->
            <div>
              <h3 class="font-bold text-lg">เลือกช่องทางการชำระเงิน</h3>
              <label
                class="label-text text-gray-500 tracking-wide font-bold my-2"
                >ช่องทางการชำระเงิน
                <span class="text-imperialRed">*</span></label
              >
              <select
                v-model="selectedBankAccount"
                class="select w-full text-gray-500 border-gray-200"
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
            </div>

            <div class="py-3">
              <label
                class="label-text text-gray-500 tracking-wide font-bold my-2"
                >วันที่จะเริ่มเข้าพัก<span class="text-imperialRed"
                  >*</span
                ></label
              >
              <input
                type="Date"
                class="py-4 px-2 w-full input input-sm md:input-md rounded border-gray-200"
                placeholder=""
                v-model="startDate"
              />
            </div>
            <div>
              <label
                class="label-text text-gray-500 tracking-wide font-bold my-2"
                >จำนวนเดือนของการเข้าพัก<span class="text-imperialRed"
                  >*</span
                ></label
              >
              <input
                min="1"
                max="12"
                type="number"
                class="py-4 px-2 w-full input input-sm md:input-md rounded border-gray-200"
                placeholder="3"
                v-model="endDate"
              />
            </div>
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

      <!-- Floor&Room List -->
      <h1 class="font-bold text-lg xl:text-xl p-5">
        ข้อมูลห้องพัก
        <span class="text-gray-400 text-xs md:hidden">(เลื่อนไปทางขวาเพื่อจอง)</span>
      </h1>
      <vs-table>
        <template #thead>
          <vs-tr>
            <vs-th> <p class="mx-auto">ชั้น</p> </vs-th>
            <vs-th> <p class="mx-auto">เลขห้อง</p> </vs-th>
            <vs-th> <p class="mx-auto">สถานะ</p> </vs-th>
            <vs-th> <p class="mx-auto">หมายเหตุ</p> </vs-th>
            <vs-th></vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr v-for="(room, key) in $vs.getPage(roomList, page, max)" :key="key"
          :data="room">
            <vs-td class="w-1/6">
              <p class="text-center">{{ room.floors }}</p>
            </vs-td>
            <vs-td class="w-1/6">
              <p class="text-center">{{ room.roomNum }}</p>
            </vs-td>
            <vs-td class="w-1/6">
              <div v-if="room.status == 'ว่าง'" class="text-success">
                <p class="text-center">{{ room.status }}</p>
              </div>
              <div v-else class="text-imperialRed">
                <p class="text-center">{{ room.status }}</p>
              </div>
            </vs-td>
            <vs-td class="w-1/6">
              <div v-if="room.description">
                <p class="text-center">{{ room.description }}</p>
              </div>
              <div v-else><p class="text-center">-</p></div>
            </vs-td>
            <vs-td class="w-2/6">
              <label
                for="my-modal-6"
                class="btn btn-success w-full modal-button"
                v-if="
                  room.status == 'ว่าง' &&
                  $store.state.userAccount.role == 'Customer'
                "
                @click="selectedRoom = room"
                >จองห้องพัก</label
              >
			  <label
                class="btn btn-accent w-full"
                v-if="room.status == 'จองแล้ว'"
                >ไม่สามารถจองได้</label
              >
            </vs-td>
          </vs-tr>
        </template>
        <template #footer>
          <vs-pagination v-model="page" :length="$vs.getLength(roomList, max)" />
        </template>
      </vs-table>
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
	  page: 1,
	  max: 10
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
    for (let i in this.$store.state.selectedDorm.rooms) {
      roomList.push(this.$store.state.selectedDorm.rooms[i]);
    }
    roomList = roomList.filter((x) => x.roomTypeId == this.roomType.roomTypeId);
    roomList = roomList.sort((a, b) => a.floors - b.floors);
    this.roomList = roomList;
  },
};
</script>
