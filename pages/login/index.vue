<template>
  <div class="p-5 my-14">
    <h1 class="pb-5 text-2xl font-bold text-cream-darker">Login</h1>
    <input
      class="
        py-6
        px-2
        w-full
        input input-sm
        rounded
        text-gray-soil
        bg-cream-light
        my-2
      "
      placeholder="Email"
	  v-model="userAccount.email"
    />
    <input
      class="
        py-6
        px-2
        w-full
        input input-sm
        rounded
        text-gray-soil
        bg-cream-light
        my-2
      "
      placeholder="Password"
	  v-model="userAccount.password"
    />

    <div class="flex flex-wrap mt-10">
      <nuxt-link to="/register" class="btn btn-secondary w-1/2"
        >Register</nuxt-link
      >
      <button class="btn btn-accent w-1/2" @click="submit">Login</button>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'accountExist',
  data() {
    return {
      userAccount: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async submit() {
      let formData = new FormData();
      formData.append("data", JSON.stringify(this.userAccount));
      try {
        let data = await this.$axios.$post(
          `${this.$store.state.Backend_URL}/account/login`,
          formData,
          {
            withCredentials: true,
          }
        );
        const noti = this.$vs.notification({
          progress: "auto",
          icon: `<i class='bx bx-folder-open' ></i>`,
          color: "success",
          position: "top-right",
          title: `Data Update`,
          text: `Register account complete!`,
        });
		this.$store.commit("SET_USERACCOUNT",data)
    this.$router.push({path:"/"})
      } catch (error) {
        const noti = this.$vs.notification({
          progress: "auto",
          icon: `<i class='bx bx-folder-open' ></i>`,
          color: "warn",
          position: "top-right",
          title: `Data Update`,
          text: error.response.data.error.message,
        });
      }
    },
  },
};
</script>

<style>
</style>