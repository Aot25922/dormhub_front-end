<template>
  <div class="py-3 md:py-5">
    <div>
      <h1 class="text-cream-dark font-bold text-center text-xl">เพิ่มหอพัก</h1>
      <RegisterDormInfoForm ref="registerDormInfoForm" @validate="checkForDormInfo"/>
      <RegisterDormAddressForm ref="registerDormAddressForm" @validate="checkForDormAddress"/>
      <div class="flex flex-wrap mt-10">
        <div class="w-1/2 px-1">
          <nuxt-link to="/dormForm" class="btn btn-secondary w-full">ย้อนกลับ</nuxt-link>
        </div>
        <div class="w-1/2 px-1">
          <button class="btn btn-accent w-full" @click="next">ต่อไป</button>
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
