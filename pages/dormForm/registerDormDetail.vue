<template>
  <div class="py-3 md:py-5">
    <div>
      <h1 class="text-cream-dark font-bold text-center text-xl">เพิ่มหอพัก</h1>
      <RegisterDormInfoForm ref="registerDormInfoForm" @validate="checkForDormInfo"/>
      <RegisterDormAddressForm ref="registerDormAddressForm" @validate="checkForDormAddress"/>
      <button class="btn btn-neutral mx-auto block bg-cheese" @click="next">Next</button>
      <nuxt-link to="/dormForm" class="btn btn-neutral mx-auto block bg-cheese">Back</nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
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
