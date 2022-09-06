<template>
  <div class="py-3 md:py-5">
    <!--Dorm Info-->
    <div class="bg-white rounded-b-lg mb-5">
        <agile>
          <div class="slide text-white block relative h-60 md:h-[480px] lg:h-[550px]" v-for="(i,index) in dormImg" :key="index">
            <img :src="i" class="object-cover object-center w-full h-full" />
          </div>
          <template slot="prevButton"><span class="material-icons">chevron_left</span></template>
          <template slot="nextButton"><span class="material-icons">chevron_right</span></template>
        </agile>
      <div class="p-5 text-sm">
        <h1 class=" py-2 font-bold text-xl">{{ dorm.dorm.name }}</h1>
        <p>
          ที่อยู่ : {{ dorm.address.number }} ซอย
          {{ dorm.address.alley }} เขต {{ dorm.address.district }} อำเภอ
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
              <div v-if="roomType.facility != null">
                {{ roomType.facility }}
              </div>
              <div v-else>ไม่มีข้อมูล</div>
            </div>
          </div>
        </div>
          <div class="p-0">
              <agile>
                <div class="slide text-black block relative h-60 md:h-[480px] lg:h-[550px]" v-for="(i,index) in roomTypeImg[roomType.type].img" :key="index">
                  <img :src="i" class="object-cover object-center w-full h-full" />
                 
                </div>
                <template slot="prevButton"><span class="material-icons">chevron_left</span></template>
                <template slot="nextButton"><span class="material-icons">chevron_right</span></template>
              </agile>
          </div>

      </div>
    </div>

    <!--room Info-->
    <div>
      <h1>ข้อมูลห้องพัก</h1>
      <div class="md:grid md:grid-cols-2 lg:grid lg:grid-cols-4">
        <div v-for="(room, index) in dorm.room" :key="index">
          <p>เลขห้องพัก : {{ room.roomNum }}</p>
          <p>สถานะห้องพัก : {{ room.status }}</p>
          <p>ชั้น : {{ room.floors }}</p>
          <p>รายละเอียดเพิ่มเติม : {{ room.description }}</p>
          <p>ประเภทห้องพัก : {{ room.roomType }}</p>
        </div>
      </div>
    </div>

    <!--bankAccount -->
    <div>
      <h1>ช่องทางการชำระเงิน</h1>
      <div class="md:grid md:grid-cols-2 lg:grid lg:grid-cols-4">
        <div v-for="(bank, index) in dorm.bankAccount" :key="index">
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
      let IMGLIST = []
      let myDormImg = {...this.$store.state.newDorm.dormImg}
      for (let i in myDormImg) {
        IMGLIST.push(
          URL.createObjectURL(myDormImg[i])
        );
      }
      return IMGLIST;
    },
    roomTypeImg() {
      let IMGLIST = {};
      let myroomTypeImg = { ...this.$store.state.newDorm.roomTypeImg };
      for (let key in myroomTypeImg) {
        let imgList = []
        for(let i in Object.values(myroomTypeImg[key])){
          imgList.push(URL.createObjectURL(Object.values(myroomTypeImg[key])[i]))
        }
        this.$set(IMGLIST,key,{img:imgList})
        // IMGLIST[key]={img:imgList}
      }
      console.log(IMGLIST)
      return IMGLIST;
    },
  },
};
</script>
