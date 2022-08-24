<template>
    <div class="py-3 md:py-5 px-4 md:px-5">
      <form-progress />
      <div
        v-if="!this.$route.path.includes('dormForm/')"
        class="p-3 bg-green-darker rounded"
      >
        <h1 class="font-bold">ขั้นตอนการสร้างหอพัก</h1>
        <p>จะมีการสร้างทั้งหมด n ขั้นตอนโดย</p>
      </div>
      <nuxt-link
        v-if="!this.$route.path.includes('dormForm/')"
        to="/dormForm/registerDormDetail"
        class="btn btn-accent w-full mt-3"
        >เริ่มสร้างหอพักของคุณ</nuxt-link
      >
      <NuxtChild keep-alive />
    </div>
</template>
<script>
export default {
  middleware: 'permission',
  data() {
    return {};
  },
  methods: {
    submitForm() {
      this.$store.dispatch("addDorm");
    },
  },
};
</script>
