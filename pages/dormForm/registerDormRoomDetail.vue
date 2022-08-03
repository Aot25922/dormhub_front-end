<template>
  <div class="py-3 md:py-5">
    <form-progress :currentPath='this.$route.path'/>
    <div>
      <h1 class="text-cream-dark font-bold text-center text-xl">
        รายละเอียดห้องพัก
      </h1>
      <RegisterDormRoomForm />
      <nuxt-link to="/dormForm/registerDormDetail" class="btn btn-neutral mx-auto block bg-cheese">Back</nuxt-link>
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
