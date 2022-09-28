<template>
  <div class="bg-ghostWhite px-5 py-20 md:py-32 md:grid md:grid-cols-2">
    <div v-if="$store.state.userAccount.role == 'Customer'">
        {{bookingList}}
    </div>
  </div>
</template>

<script>
export default {
   async fetch() {
    this.bookingList = await this.$axios.$get(
      `${this.$store.state.Backend_URL}/booking/${this.$store.state.userAccount.userId}`
    );
  },
  data() {
    return {
        bookingList: null
    };
  },
  methods: {
    
  },

};
</script>

<style>
</style>
