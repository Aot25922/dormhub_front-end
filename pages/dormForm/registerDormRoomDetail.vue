<template>
  <div class="py-3 md:py-5">
    <div>
      <h1 class="text-cream-dark font-bold text-center text-xl">
        รายละเอียดห้องพัก
      </h1>
      <RegisterDormRoomForm />
      <button class=" bg-confirmButton" @click="submit">SUBMIT</button>
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
    submit(){
      this.$store.dispatch("addDorm")
    }
  }
};
</script>
