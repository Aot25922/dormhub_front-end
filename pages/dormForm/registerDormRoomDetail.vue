<template>
  <div class="py-3 md:py-5">
    <RegisterDormRoomForm/>
    <nuxt-link to="/dormForm/registerDormRoomTypeDetail" class="btn btn-neutral mx-auto block bg-cheese">Back</nuxt-link>
    <nuxt-link to="/dormForm/registerDormPaymentDetail" class="btn btn-neutral mx-auto block bg-cheese">Next</nuxt-link>
  </div>
</template>
<script>
export default {
    middleware: 'permission',
  data() {
    return {
    
    };
  },
  methods: {
   
  },
};
</script>
