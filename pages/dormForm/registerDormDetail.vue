<template>
  <div class="py-3 md:py-5">
    <div class="xl:px-48 2xl:px-80">
      <h1 class="font-bold text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl">เพิ่มหอพัก</h1>
      <RegisterDormInfoForm ref="registerDormInfoForm" @validate="checkForDormInfo"/>
      <RegisterDormAddressForm ref="registerDormAddressForm" @validate="checkForDormAddress"/>
      <div class="flex flex-wrap mt-10">
        <div class="w-1/2 px-1">
          <nuxt-link to="/dormForm" class="btn btn-ghost w-full">ย้อนกลับ</nuxt-link>
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
    middleware: 'permission',
  data(){
    return {
      validateDormInfo: false,
      validateDormAddress: false
    }
  },
  methods: {
    next(){
      this.$refs.registerDormInfoForm.submit()
      this.$refs.registerDormAddressForm.submit()
      if(this.validateDormInfo && this.validateDormAddress){
        const noti = this.$vs.notification({
          progress: "auto",
          icon: `<i class='bx bx-folder-open' ></i>`,
          color: "success",
          position: "top-right",
          title: `ข้อมูลของคุณได้ถูกเพิ่มเเล้ว`,
          text: `เพิ่มข้อมูลหอพักเรียบร้อย!`,
        });
      this.$router.push({path:'/dormForm/registerDormRoomTypeDetail'})
      }
    },
    checkForDormInfo(validate){
      this.validateDormInfo = validate
    },
    checkForDormAddress(validate){
      this.validateDormAddress = validate
    }
  }
};
</script>
