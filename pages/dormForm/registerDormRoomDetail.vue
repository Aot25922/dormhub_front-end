<template>
  <div class="py-3 md:py-5">
    <RegisterDormRoomForm ref="room" @validate="checkForRoomInfo"/>
    <nuxt-link to="/dormForm/registerDormRoomTypeDetail" class="btn btn-neutral mx-auto block bg-cheese">Back</nuxt-link>
    <button  class="btn btn-neutral mx-auto block bg-cheese" @click="next">Next</button>
  </div>
</template>
<script>
export default {
    middleware: 'permission',
  data() {
    return {
    validateRoom: false
    };
  },
  methods: {
    next(){
      this.$refs.room.submit()
      if(this.validateRoom) {this.$router.push({ path: "/dormForm/registerDormPaymentDetail" })};
    },
    checkForRoomInfo(data){
      this.validateRoom = data
    }
  },
};
</script>
