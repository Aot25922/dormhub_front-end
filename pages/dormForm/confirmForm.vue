<template>
  <div class="py-3 md:py-5">
    <div class="xl:px-48 2xl:px-80">
    <!--Dorm Info-->
    <div class="bg-white rounded-b-lg mb-5 shadow-lg">
      <agile>
        <div
          class="slide text-white block relative h-60 md:h-[480px] lg:h-[550px]"
          v-for="(i, index) in dormImg"
          :key="index"
        >
          <img :src="i" class="object-cover object-center w-full h-full" />
        </div>
        <template slot="prevButton"
          ><span class="material-icons">chevron_left</span></template
        >
        <template slot="nextButton"
          ><span class="material-icons">chevron_right</span></template
        >
      </agile>
      <div class="p-5 text-sm">
        <h1 class="py-2 font-bold text-xl">{{ dorm.dorm.name }}</h1>
        <p>
          ที่อยู่ : {{ dorm.dorm.address}}
        </p>
        <div class="flex flex-wrap">
          <p class="w-1/2">เวลาเปิด : {{ dorm.dorm.openTime }}</p>
          <p class="w-1/2">เวลาปิด : {{ dorm.dorm.closeTime }}</p>
          <p class="w-1/2">ค่าไฟต่อหน่วย : {{ dorm.dorm.elecPerUnit }} ฿</p>
          <p class="w-1/2">ค่าน้ำหน่วย : {{ dorm.dorm.waterPerUnit }} ฿</p>
          <div class="font-bold w-full mt-5">
            รายละเอียด :
            <div
              class="bg-ghostWhite p-5 text-gray-500 rounded-lg mt-2 text-xs"
            >
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
    <div
      class="bg-white rounded-lg mb-5 shadow-lg"
      v-for="(roomType, index) of dorm.roomType"
      :key="index"
    >
      <div class="p-5">
        <h1 class="pt-2 pb-5 font-bold text-xl">ข้อมูลประเภทห้องพัก</h1>
        <div class="flex flex-wrap">
          <h1 class="w-full">
            ประเภทห้องพัก : <span class="font-bold">{{ roomType.type }}</span>
          </h1>
          <p class="w-1/2">ค่าเช่าห้องพัก : {{ roomType.price }} ฿</p>
          <p class="w-1/2">ค่ามัดจำ : {{ roomType.deposit }} ฿</p>
          <p class="w-full">
            ขนาดพื้นที่ห้องพัก : {{ roomType.area }} ตารางเมตร
          </p>
          <div class="w-full font-bold mt-5">
            รายละเอียดเพิ่มเติม :
            <div
              class="
                bg-ghostWhite
                p-5
                text-gray-500
                rounded-lg
                mt-2
                mb-5
                text-xs
              "
            >
              <div v-if="roomType.facility != ''">
                {{ roomType.facility }}
              </div>
              <div v-else>ไม่มีข้อมูล</div>
            </div>
          </div>
        </div>
        <div class="p-0">
          <agile>
            <div
              class="
                slide
                text-black
                block
                relative
                h-60
                md:h-[480px]
                lg:h-[550px]
              "
              v-for="(i, index) in roomTypeImg[roomType.type].img"
              :key="index"
            >
              <img :src="i" class="object-cover object-center w-full h-full" />
            </div>
            <template slot="prevButton"
              ><span class="material-icons">chevron_left</span></template
            >
            <template slot="nextButton"
              ><span class="material-icons">chevron_right</span></template
            >
          </agile>
        </div>
      </div>
    </div>

    <!--room Info-->
    <div class="p-5 bg-white rounded-lg mb-5 shadow-lg">
      <h1 class="pt-2 pb-5 font-bold text-xl">ข้อมูลห้องพัก</h1>
      <div>
        <div v-for="(floor, key) in roomList" :key="key" class="flex flex-wrap">
          <div class="w-full font-bold">ชั้น : {{ key }}</div>
          <div v-for="(room, index) in floor" :key="index" class="w-1/2 md:w-1/3 lg:w-1/4">
            <div class="p-5 m-1 rounded bg-ghostWhite flex flex-wrap shadow">
              <p class="font-bold w-full md:text-center"><span class="md:hidden">เลขห้อง: </span><b>{{ room.roomNum }}</b></p>
              <div class="w-full text-success md:text-left md:w-1/2">
                <div v-if="room.status == 'ว่าง'"><span class="md:hidden">สถานะ: </span><b>{{ room.status }}</b></div>
                <div v-else class="text-imperialRed">{{ room.status }}</div>
              </div>
              <div class="w-full md:w-1/2 md:text-right"><span class="md:hidden">ประเภทห้อง: </span><b>{{ room.roomType }}</b></div>
              <div>
                <div v-if="room.description != ''" class="w-full px-2 py-3 bg-white mt-3 rounded">{{ room.description }}</div>
                <div v-else class="bg-inherit hidden"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--bankAccount -->
    <div class="p-5 bg-white rounded-lg mb-5 shadow-lg">
      <h1 class="pt-2 pb-5 font-bold text-xl">ช่องทางการชำระเงิน</h1>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div v-for="(bank, index) in dorm.bankAccount" :key="index" class="p-3 bg-ghostWhite rounded m-1 shadow">
          <p>เลขบัญชี : <b>{{ bank.accountNum }}</b></p>
          <p>ชื่อบัญชี : <b>{{ bank.accountName }}</b></p>
          <p>ธนาคาร : <b>{{ bank.bankId.name }}</b></p>
        </div>
      </div>
    </div>
    <div class="flex flex-wrap mt-10">
      <div class="w-1/2 px-1">
        <nuxt-link
          to="/dormForm/registerDormPaymentDetail"
          class="btn btn-ghost w-full"
          >ย้อนกลับ</nuxt-link
        >
      </div>
      <div class="w-1/2 px-1">
        <button class="btn btn-primary w-full" @click="submit">ยืนยีน</button>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  middleware: "permission",
  methods: {
    submit() {
      const loading = this.$vs.loading();
      this.$store
        .dispatch("addDorm")
        .then(() => {
          loading.close();
          const noti = this.$vs.notification({
            progress: "auto",
            icon: `<i class='bx bx-folder-open' ></i>`,
            color: "success",
            position: "top-right",
            title: `Data Update`,
            text: `You data is submit`,
          });
          this.$router.push({ path: "/" });
          this.$store.commit('RESET_NEWDORM')
          this.$store.dispatch("nuxtServerInit");
        })
        .catch((error) => {
          loading.close();
          const noti = this.$vs.notification({
            progress: "auto",
            icon: `<i class='bx bx-folder-open' ></i>`,
            color: "warning",
            position: "top-right",
            title: `Data Update`,
            text: `${error.response.data}, please edit it in form`,
          });
        });
    },
  },
  computed: {
    dorm() {
      return this.$store.state.newDorm;
    },
    dormImg() {
      let IMGLIST = [];
      let myDormImg = { ...this.$store.state.newDorm.dormImg };
      for (let i in myDormImg) {
        IMGLIST.push(URL.createObjectURL(myDormImg[i]));
      }
      return IMGLIST;
    },
    roomTypeImg() {
      let IMGLIST = {};
      let myroomTypeImg = { ...this.$store.state.newDorm.roomTypeImg };
      for (let key in myroomTypeImg) {
        let imgList = [];
        for (let i in Object.values(myroomTypeImg[key])) {
          imgList.push(
            URL.createObjectURL(Object.values(myroomTypeImg[key])[i])
          );
        }
        this.$set(IMGLIST, key, { img: imgList });
      }
      return IMGLIST;
    },
    roomList() {
      let rooms = {};
      let myRooms = [...this.$store.state.newDorm.room];
      for (let i in myRooms) {
        if (!rooms.hasOwnProperty(myRooms[i].floors)) {
          this.$set(rooms, myRooms[i].floors, []);
        }
        rooms[myRooms[i].floors].push(myRooms[i]);
      }
      return rooms;
    },
  },
};
</script>
