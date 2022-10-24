<template>
  <div class="bg-ghostWhite px-5 py-20 md:py-32 md:grid md:grid-cols-2 xl:px-48 2xl:px-80">
    <div>
      <img src="@/assets/specify/identify.png" class="hidden md:block"/>
    </div>

    <div class="md:py-10 lg:py-20 xl:px-10">
      <h1 class="pb-10 text-2xl md:text-3xl font-bold text-PrussianBlue text-center md:py-5 xl:py-10">เข้าสู่ระบบ</h1>
      <input class="py-6 px-2 w-full input input-sm md:input-md rounded-lg border-x-0 border-t-0 border-b-gray-400 my-2 md:my-4"
        placeholder="อีเมล" v-model="userAccount.email" @keypress.enter="submit"/>
      <input class="py-6 px-2 w-full input input-sm md:input-md rounded-lg border-x-0 border-t-0 border-b-gray-400 my-2 md:my-4"
        placeholder="รหัสผ่าน" v-model="userAccount.password" @keypress.enter="submit"/>

      <div class="flex flex-wrap mt-10">
        <div class="w-1/2 px-1">
          <nuxt-link to="/register" class="btn btn-ghost w-full">สมัครสมาชิก</nuxt-link>
        </div>
        <div class="w-1/2 px-1">
          <button class="btn btn-primary w-full" @click="submit">เข้าสู่ระบบ</button>
        </div>
      </div>
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
      const loading = this.$vs.loading();
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
          text: `Login complete!`,
        });
        loading.close();
		this.$store.commit("SET_USERACCOUNT",data)
    this.$router.push({path:"/"})
      } catch (error) {
        loading.close();
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
