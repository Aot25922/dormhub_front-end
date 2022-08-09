<template>
  <div class="py-3 md:py-5">
    <div>
      <h1 class="text-cream-dark font-bold text-center text-xl">เพิ่มหอพัก</h1>
      <RegisterDormInfoForm />
      <RegisterDormAddressForm />
      <nuxt-link to="/dormForm" class="btn btn-neutral mx-auto block bg-cheese">Back</nuxt-link>
      <nuxt-link to="/dormForm/registerDormRoomTypeDetail" class="btn btn-neutral mx-auto block bg-cheese">Next</nuxt-link>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return {}
  },
  methods: {
  }
};
</script>
