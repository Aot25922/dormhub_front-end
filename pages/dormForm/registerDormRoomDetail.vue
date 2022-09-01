<template>
  <div class="py-3 md:py-5">
    <RegisterDormRoomForm ref="room" @validate="checkForRoomInfo"/>
    <nuxt-link to="/dormForm/registerDormRoomTypeDetail" class="btn btn-neutral mx-auto block bg-cheese">Back</nuxt-link>
    <button  class="btn btn-neutral mx-auto block bg-cheese" @click="next">Next</button>
  </div>
</template>
<script>
export default {
    middleware: ['permission','checkData'],
  data() {
    return {
    validateRoom: false
    };
  },
  methods: {
    next(){
      this.$refs.room.submit()
      if(this.validateRoom) {
        const noti = this.$vs.notification({
          progress: "auto",
          icon: `<i class='bx bx-folder-open' ></i>`,
          color: "success",
          position: "top-right",
          title: `ข้อมูลของคุณได้ถูกเพิ่มเเล้ว`,
          text: `เพิ่มข้อมูลห้องพักเรียบร้อย!`,
        });
        this.$router.push({ path: "/dormForm/registerDormPaymentDetail" })};
    },
    checkForRoomInfo(data){
      this.validateRoom = data
    }
  },
};
</script>
