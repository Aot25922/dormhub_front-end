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
              md:h-[480px] lg:h-[550px]
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
          <template slot="prevButton"><span class="material-icons">chevron_left</span></template>
          <template slot="nextButton"><span class="material-icons">chevron_right</span></template>
        </agile>
      </client-only>
      <div class="p-5">
        <div class="">
          <div class="font-bold text-lg md:text-xl lg:text-2xl 2xl:text-3xl">{{ roomType.type }}</div>

          <div class="ml-3 font-bold text-sm md:text-base lg:text-lg xl:text-xl">
            ราคา :
            <span class="font-normal"
              >{{ roomType.dormHasRoomType.price }} บาท</span
            >
          </div>

          <div class="ml-3 font-bold text-sm md:text-base lg:text-lg xl:text-xl">
            มัดจำ :
            <span class="font-normal"
              >{{ roomType.dormHasRoomType.deposit }} บาท</span
            >
          </div>

          <div class="ml-3 font-bold text-sm md:text-base lg:text-lg xl:text-xl">
            ค่าน้ำ :
            <span class="font-normal">{{ waterPerUnit }} บาทต่อหน่วย</span>
          </div>

          <div class="ml-3 font-bold text-sm md:text-base lg:text-lg xl:text-xl">
            ค่าไฟ :
            <span class="font-normal">{{ elecPerUnit }} บาทต่อหน่วย</span>
          </div>

          <div class="ml-3 font-bold text-sm md:text-base lg:text-lg xl:text-xl">
            ขนาดพื้นที่ :
            <span class="font-normal"
              >{{ roomType.dormHasRoomType.area }} ตารางเมตร</span
            >
          </div>

          <div class="pt-5 font-bold md:text-lg lg:text-xl xl:text-2xl">รายละเอียดเพิ่มเติม</div>
          <div
            class="w-full text-gray-600 px-2 py-3 bg-ghostWhite mt-3 rounded text-sm md:text-base lg:text-lg xl:text-xl"
          >
            <div class="text-sm md:text-base lg:text-lg xl:text-xl" v-if="roomType.description">
              {{ roomType.description }}
            </div>
            <div v-else class="text-gray-400 text-sm md:text-base lg:text-lg xl:text-xl">&emsp;ไม่มีข้อมูล</div>
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
              >วันที่จะเริ่มเข้าพัก<span class="text-imperialRed">*</span></label
            >
            <input type="Date" class="py-4 px-2 w-full input input-sm md:input-md rounded" placeholder="" v-model="startDate"/>
            <label class="label-text text-gray-500 tracking-wide font-bold my-2">วันที่จะสิ้นสุดการเข้าพัก<span class="text-imperialRed">*</span></label>
            <input type="Date" class="py-4 px-2 w-full input input-sm md:input-md rounded" placeholder="" v-model="endDate"/> 
            <label class="label-text text-gray-500 tracking-wide font-bold my-2">เลือกภาพสลิป<span class="text-imperialRed">*</span></label>
            <input type="file" class="focus:outline-none form-control block w-full rounded transition ease-in-out border-none" @change="onFileChange($event)" />
            <img :src="slipImgUrl" class="py-2 md:p-2 md:max-h-80 md:max-w-full md:object-cover"/>
          </div>
          <div class="modal-action">
            <label for="my-modal-6" class="btn">ยกเลิกการจอง</label>
            <label
              for="my-modal-6"
              class="btn"
              v-if="selectedBankAccount && (startDate<endDate)"
              @click="booking"
              >ยืนยันการจอง</label
            >
          </div>
        </div>
      </div>

      <!--All room-->
      <h1 class="font-bold text-lg md:text-xl lg:text-2xl 2xl:text-3xl">ห้องพักทั้งหมด</h1>
      <div v-for="(room, index) in rooms" :key="index">
        <div class="font-bold md:text-lg lg:text-xl xl:text-2xl">ชั้น : {{ room.floors }}</div>
        <div class="bg-ghostWhite p-3 rounded-lg text-sm md:text-base lg:text-lg xl:text-xl">
          <p>เลขห้องพัก : {{ room.roomNum }}</p>
          <p>สถานะห้องพัก : {{ room.status }}</p>
          <p v-if="room.description != ''">รายละเอียดเพิ่มเติม : {{ room.description }}</p>
          <p v-else class="hidden"></p>
          <!-- <button class="bg-imperialRed" v-if="room.status != 'booking'" @click="">
            จองห้องพัก
          </button> -->
          <label
            for="my-modal-6"
            class="btn modal-button"
            v-if="room.status != 'จองเเล้ว' && $store.state.userAccount.role == 'Customer'"
            @click="selectedRoom = room"
            >จองห้องพัก</label
          >
        </div>
      </div>
    </div>

    <!--    <div>-->
    <!--      <div v-for="(floor, key) in rooms" :key="key" class="flex flex-wrap">-->
    <!--        <p>ชั้น : {{ key }}</p>-->
    <!--        <div v-for="(room, index) in floor" :key="index">-->
    <!--          <div class="p-5 w-1/2 rounded bg-ghostWhite flex flex-wrap">-->
    <!--            <p class="font-bold w-full text-center">{{ room.roomNum }}</p>-->
    <!--            <div class="w-1/2 text-success text-left">-->
    <!--              <div v-if="room.status == 'ว่าง'">{{ room.status }}</div>-->
    <!--              <div v-else class="text-imperialRed">{{ room.status }}</div>-->
    <!--            </div>-->
    <!--            <div class="w-1/2 text-right">{{ room.roomType }}</div>-->
    <!--            <div class="w-full px-2 py-3 bg-white mt-3 rounded">-->
    <!--              <div v-if="room.description != ''">{{ room.description }}</div>-->
    <!--              <div v-else class="text-gray-400">ไม่มีข้อมูล</div>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>
<script>
export default {
  name: "RoomTypeDes",
  props: ["roomType", "elecPerUnit", "waterPerUnit", "media", "rooms"],
  data() {
    return {
      checkRoomtypeImg: true,
      selectedBankAccount: null,
      selectedRoom: null,
      startDate: null,
      endDate: null,
      slipImg:null,
      slipImgUrl:null
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
          text: "You not customer",
        });
        return;
      }
      const loading = this.$vs.loading();
      let formData = new FormData();
      let bookingInfo = {
        bankAccId: this.selectedBankAccount.bankAccId,
        startDate: this.startDate,
        endDate: this.endDate,
        dormId: this.$store.state.selectedDorm.dormId,
        roomId: this.selectedRoom.roomId,
      };
      formData.append("moneySlip", this.slipImg);
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
         let bookingStatus = { roomId: this.selectedRoom.roomId, status: "จองเเล้ว" };
        this.$store.commit("SET_ROOMSTATUS", bookingStatus)
        this.selectedBankAccount = null
        this.selectedRoom = null
        this.startDate = null
        this.endDate = null
        this.slipImg = null
        this.slipImgUrl = null
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
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      this.slipImgUrl = URL.createObjectURL(files[0])
      this.slipImg = files[0]
    },
  },
  computed: {
    bankAccount() {
      return this.$store.state.selectedDorm.bankAccounts;
    },
  },
};
</script>

