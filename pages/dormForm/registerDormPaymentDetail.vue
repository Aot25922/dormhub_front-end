<template>
  <div class="py-3 md:py-5">
    <div>
      <RegisterDormPaymentForm ref="bank" @validate="checkForPaymentInfo"/>
      <button class="btn btn-neutral mx-auto block bg-cheese" @click="next">Next</button>
      <nuxt-link to="/dormForm/registerDormRoomDetail" class="btn btn-neutral mx-auto block bg-cheese">Back</nuxt-link>
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
