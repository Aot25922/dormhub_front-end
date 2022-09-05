<template>
  <div class="py-3 md:py-5">
    <!--Dorm Info-->
    <div>
      <h1>ข้อมูลหอพัก</h1>
      <p>ชื่อหอพัก : {{ dorm.dorm.name }}</p>
      <p>เวลาเปิด : {{ dorm.dorm.openTime }}</p>
      <p>เวลาปิด : {{ dorm.dorm.closeTime }}</p>
      <p>รายละเอียด : {{ dorm.dorm.description }}</p>
      <p>ค่าไฟต่อหน่วย : {{ dorm.dorm.elecPerUnit }}</p>
      <p>ค่าน้ำต่อหน่วย : {{ dorm.dorm.waterPerUnit }}</p>
      <div class="md:grid md:grid-cols-2 lg:grid lg:grid-cols-4">
        <img v-for="i in dormImg" :key="i" :src="i" />
      </div>
    </div>

    <!--Address Info-->
    <div>
      <h1>ข้อมูลที่อยู่</h1>
      <p>
        ที่อยู่ : บ้านเลขที่ {{ dorm.address.number }} ซอย
        {{ dorm.address.alley }} เขต {{ dorm.address.district }} อำเภอ
        {{ dorm.address.subDistrict }} จังหวัด
        {{ dorm.address.province }} รหัสไปรษณีย์ {{ dorm.address.zipCodeId }}
      </p>
    </div>

    <!--roomType Info-->
    <div>
      <h1>ข้อมูลประเภทห้องพัก</h1>
      <div v-for="(roomType, index) of dorm.roomType" :key="index">
        <h1>ประเภทห้องพัก : {{ roomType.type }}</h1>
        <p>ราคาค่าเช่าห้องพัก : {{ roomType.price }}</p>
        <p>ราคาค่ามัดจำ : {{ roomType.deposit }}</p>
        <p>ขนาดพื้นที่ห้องพัก : {{ roomType.area }}</p>
        <p>รายละเอียดเพิ่มเติม : {{ roomType.facility }}</p>
        <div>
          <img
            v-for="i in roomTypeImg[roomType.type]"
            :key="i"
            :src="i"
            class="md:grid md:grid-cols-2 lg:grid lg:grid-cols-4"
          />
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
    <button class="btn btn-neutral mx-auto block bg-cheese" @click="submit">
      Next
    </button>
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
      this.$store
        .dispatch("addDorm")
        .then(() => {
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
