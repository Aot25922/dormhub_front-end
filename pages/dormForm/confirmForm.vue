<template>
  <div class="py-3 md:py-5">
    <!--Dorm Info-->
    <div>
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
      <p>
        ที่อยู่ : บ้านเลขที่ {{ dorm.address.number }} ซอย
        {{ dorm.address.alley }} เขต {{ dorm.address.district }} อำเภอ
        {{ dorm.address.subDistrict }} จังหวัด
        {{ dorm.address.province }} รหัสไปรษณีย์ {{ dorm.address.zipCodeId }}
      </p>
    </div>

    <!--Address Info-->
    <div>
      <div v-for="(roomType, index) of dorm.roomType" :key="index">
        <h1>ประเภทห้องพัก : {{ roomType.type }}</h1>
        <p>ราคาค่าเช่าห้องพัก : {{ roomType.price }}</p>
        <p>ราคาค่ามัดจำ : {{ roomType.deposit }}</p>
        <p>ขนาดพื้นที่ห้องพัก : {{ roomType.area }}</p>
        <p>รายละเอียดเพิ่มเติม : {{ roomType.facility }}</p>
        <div class="md:grid md:grid-cols-2 lg:grid lg:grid-cols-4">
          <img v-for="i in roomTypeImg[roomType.type]" :key="i" :src="i" />
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
    return {
      dormImg: [],
      roomTypeImg: {},
    };
  },
  methods: {
    submit() {
      console.log(this.$store.state.newDorm);
      // this.$store.dispatch("addDorm")
    },
  },
  created() {
    for (let i in this.$store.state.newDorm.dormImg) {
      console.log(this.$store.state.newDorm.dormImg[i])
      this.dormImg.push(
        URL.createObjectURL(this.$store.state.newDorm.dormImg[i])
      );
    }
    // this.roomTypeImg = {...this.$store.state.newDorm.roomTypeImg};
    this.roomTypeImg = Object.assign({}, this.$store.state.newDorm.roomTypeImg);
    console.log(this.roomTypeImg)
    for (let i in this.roomTypeImg) {
      let img = this.roomTypeImg[i];
      for (let j in img) {
        if(typeof img[j] == "object"){
          this.roomTypeImg[i][j] = URL.createObjectURL(img[j])
        }
        console.log(this.roomTypeImg[i][j])
      }
    }
  },
  computed: {
    dorm() {
      return this.$store.state.newDorm;
    },
  },
};
</script>
