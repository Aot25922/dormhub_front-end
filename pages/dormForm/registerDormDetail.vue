<template>
  <div class="py-3 md:py-5">
    <form-progress :currentPath='this.$route.path'/>
    <div>
      <h1 class="text-cream-dark font-bold text-center text-xl">เพิ่มหอพัก</h1>
      <RegisterDormInfoForm />
      <!-- <RegisterDormAddressForm msg="สถานที่ตั้งหอพัก" /> -->
      <nuxt-link to="/dormForm" class="btn btn-neutral mx-auto block bg-cheese">Back</nuxt-link>
      <nuxt-link to="/dormForm/registerDormRoomDetail" class="btn btn-neutral mx-auto block bg-cheese">Next</nuxt-link>
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
