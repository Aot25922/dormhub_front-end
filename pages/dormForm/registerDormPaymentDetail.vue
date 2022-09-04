<template>
  <div class="py-3 md:py-5">
    <div>
      <RegisterDormPaymentForm ref="bank" @validate="checkForPaymentInfo"/>
      <div class="flex flex-wrap mt-10">
        <div class="w-1/2 px-1">
          <nuxt-link to="/dormForm/registerDormRoomDetail" class="btn btn-ghost w-full">ย้อนกลับ</nuxt-link>
        </div>
        <div class="w-1/2 px-1">
          <button class="btn btn-primary w-full" @click="next">ต่อไป</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    middleware: ['permission','checkData'],
  data(){
    return {
      validatePayment: false
    }
  },
  methods: {
    next(){
      this.$refs.bank.submit()
      if(this.validatePayment){ 
        const noti = this.$vs.notification({
          progress: "auto",
          icon: `<i class='bx bx-folder-open' ></i>`,
          color: "success",
          position: "top-right",
          title: `ข้อมูลของคุณได้ถูกเพิ่มเเล้ว`,
          text: `เพิ่มข้อมูช่องทางการชำระเงินเรียบร้อย!`,
        });
        this.$router.push({ path: "/dormForm/confirmForm" })};
    },
    checkForPaymentInfo(data){
      this.validatePayment = data
    }
  }
};
</script>
