<template>
  <div class="py-3 md:py-5">
    <!--Dorm Info-->
    <div class="bg-white rounded-b-lg mb-5">
      <client-only>
        <agile>
          <div class="slide text-white block relative h-60 md:h-[480px] lg:h-[550px]" v-for="i in dormImg" :key="i">
            <img :src="i" class="object-cover object-center w-full h-full" />
          </div>
          <template slot="prevButton"><span class="material-icons">chevron_left</span></template>
          <template slot="nextButton"><span class="material-icons">chevron_right</span></template>
        </agile>
      </client-only>
      <div class="p-5 text-sm">
        <h1 class=" py-2 font-bold text-xl">{{ dorm.dorm.name }}</h1>
        <p>
          ที่อยู่ : {{ dorm.address.number }} <span v-if="dorm.address.alley != ''">ซอย {{ dorm.address.alley }}</span>
          เขต {{ dorm.address.district }} อำเภอ
          {{ dorm.address.subDistrict }} จังหวัด
          {{ dorm.address.province }} รหัสไปรษณีย์ {{ dorm.address.zipCodeId }}
        </p>
        <div class="flex flex-wrap">
          <p class="w-1/2">เวลาเปิด : {{ dorm.dorm.openTime }}</p>
          <p class="w-1/2">เวลาปิด : {{ dorm.dorm.closeTime }}</p>
          <p class="w-1/2">ค่าไฟต่อหน่วย : {{ dorm.dorm.elecPerUnit }} ฿</p>
          <p class="w-1/2">ค่าน้ำหน่วย : {{ dorm.dorm.waterPerUnit }} ฿</p>
          <div class="font-bold w-full mt-5">รายละเอียด :
            <div class="bg-ghostWhite p-5 text-gray-500 rounded-lg mt-2 text-xs">
              <div v-if="dorm.description != null">
                <p>{{ dorm.dorm.description }}</p>
              </div>
              <div v-else>ไม่มีข้อมูล</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--roomType Info-->
    <div class="bg-white rounded-lg mb-5" v-for="(roomType, index) of dorm.roomType" :key="index">
      <div class="p-5">
        <h1 class=" pt-2 pb-5 font-bold text-xl">ข้อมูลประเภทห้องพัก</h1>
        <div class="flex flex-wrap">
          <h1 class="w-full">ประเภทห้องพัก : <span class="font-bold">{{ roomType.type }}</span></h1>
          <p class="w-1/2">ราคาค่าเช่าห้องพัก : {{ roomType.price }} ฿</p>
          <p class="w-1/2">ราคาค่ามัดจำ : {{ roomType.deposit }} ฿</p>
          <p class="w-full">ขนาดพื้นที่ห้องพัก : {{ roomType.area }} ตารางเมตร</p>
          <div class="w-full font-bold mt-5">รายละเอียดเพิ่มเติม :
            <div class="bg-ghostWhite p-5 text-gray-500 rounded-lg mt-2 mb-5 text-xs">
              <div v-if="roomType.facility != ''">
                {{ roomType.facility }}
              </div>
              <div v-else>ไม่มีข้อมูล</div>
            </div>
          </div>
        </div>
          <div class="p-0">
            <client-only>
              <agile>
                <div class="slide text-white block relative h-60 md:h-[480px] lg:h-[550px]"v-for="i in roomTypeImg[roomType.type]" :key="i">
                  <img :src="i" class="object-cover object-center w-full h-full" />
                </div>
                <template slot="prevButton"><span class="material-icons">chevron_left</span></template>
                <template slot="nextButton"><span class="material-icons">chevron_right</span></template>
              </agile>
            </client-only>
          </div>

      </div>
    </div>

    <!--room Info-->
    <div class="p-5 bg-white rounded-lg mb-5">
      <h1 class="pt-2 pb-5 font-bold text-xl">ข้อมูลห้องพัก</h1>
      <div>
        <div v-for="(room, index) in dorm.room" :key="index" class="flex flex-wrap">
          <p class="font-bold w-full">ชั้น : {{ room.floors }}</p>
          <div class="p-5 w-1/2 rounded bg-ghostWhite flex flex-wrap">
            <p class="font-bold w-full text-center">{{ room.roomNum }}</p>
            <div class="w-1/2 text-success text-left">
              <div v-if="room.status == 'ว่าง'">{{ room.status }}</div>
              <div v-else class="text-imperialRed">{{ room.status }}</div>
            </div>
            <div class="w-1/2 text-right">{{ room.roomType }}</div>
            <div class="w-full px-1 py-3 bg-white mt-3 rounded">
              <div v-if="room.description != ''">{{ room.description }}</div>
              <div v-else class="text-gray-400">ไม่มีข้อมูล</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--bankAccount -->
    <div class="p-5 bg-white rounded-lg mb-5 flex flex-wrap">
      <h1 class="pt-2 pb-5 font-bold w-full text-xl">ช่องทางการชำระเงิน</h1>
      <div class="w-1/2">
        <div v-for="(bank, index) in dorm.bankAccount" :key="index" class="p-3 bg-ghostWhite rounded">
          <p>เลขบัญชี : {{ bank.accountNum }}</p>
          <p>ชื่อบัญชี : {{ bank.accountName }}</p>
          <p>ธนาคาร : {{ bank.bankId.name }}</p>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap mt-10">
      <div class="w-1/2 px-1">
        <nuxt-link to="/dormForm/registerDormPaymentDetail" class="btn btn-ghost w-full">ย้อนกลับ</nuxt-link>
      </div>
      <div class="w-1/2 px-1">
        <button class="btn btn-primary w-full" @click="submit">ยืนยีน</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  middleware: "permission",
  data() {
    return {};
  },
  methods: {
    submit() {
      const loading = this.$vs.loading()
      this.$store
        .dispatch("addDorm")
        .then(() => {
          loading.close()
          const noti = this.$vs.notification({
            progress: "auto",
            icon: `<i class='bx bx-folder-open' ></i>`,
            color: "success",
            position: "top-right",
            title: `Data Update`,
            text: `You data is submit`,
          });
          this.$router.push({ path: "/" });
          this.$store.dispatch("nuxtServerInit");
        })
        .catch((error) => {
          const noti = this.$vs.notification({
            progress: "auto",
            icon: `<i class='bx bx-folder-open' ></i>`,
            color: "warning",
            position: "top-right",
            title: `Data Update`,
            text: `${error.response.data.error.message}, please edit it in form`,
          });
        });
    },
  },
  computed: {
    dorm() {
      return this.$store.state.newDorm;
    },
    dormImg() {
      let dormImg = []
      let myDormImg = {...this.$store.state.newDorm.dormImg}
      for (let i in myDormImg) {
        dormImg.push(
          URL.createObjectURL(myDormImg[i])
        );
      }
      return dormImg;
    },
    roomTypeImg() {
      let roomTypeImg = {};
      let myroomTypeImg = { ...this.$store.state.newDorm.roomTypeImg };
      for (let key in myroomTypeImg) {
        for (let img in myroomTypeImg[key]) {
          if (typeof myroomTypeImg[key][img] == "object") {
            if (roomTypeImg[key] == undefined) {
              roomTypeImg[key] = [];
            }
            roomTypeImg[key].push(URL.createObjectURL(myroomTypeImg[key][img]));
          }
        }
      }
      // console.log(roomTypeImg)
      return roomTypeImg;
    },
  },
};
</script>
