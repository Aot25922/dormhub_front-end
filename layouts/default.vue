<template>
  <div class="bg-white text-black min-h-screen font-Kanit">
    <NavBar class="md:p-3 lg:p-5" />
    <Nuxt />
    <ContentFooter />
  </div>
</template>

<script>
export default {
  head() {
    return {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        },
      ],
    };
  },
  created(){
    this.$store.dispatch("nuxtServerInit")
  }
};
</script>
