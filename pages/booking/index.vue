<template>
  <div class="bg-ghostWhite px-5 py-20 md:py-32 md:grid md:grid-cols-2">
    {{ bookingList }}
  </div>
</template>

<script>
export default {
  async fetch() {
    if (this.$store.state.userAccount.role == "Customer") {
      this.bookingList = await this.$axios.$get(
        `${this.$store.state.Backend_URL}/booking/${this.$store.state.userAccount.userId}`
      );
    } else if (this.$store.state.userAccount.role == "Owner") {
      this.bookingList = await this.$axios.$get(
        `${this.$store.state.Backend_URL}/booking/owner/${this.$store.state.userAccount.userId}`
      );
    } else{
      this.$router.push({path:"/"})
    }
  },
  data() {
    return {
      bookingList: null,
    };
  },
  methods: {},
};
</script>

<style>
</style>
