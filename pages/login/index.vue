<template>
  <div class="p-5 my-14 md:my-32 md:px-24 lg:my-48 lg:px-96">
    <h1 class="pb-5 text-2xl md:text-3xl font-bold text-cream-darker">เข้าสู่ระบบ</h1>
    <input
      class="
        py-6
        px-2
        w-full
        input input-sm md:input-md
        rounded
        text-gray-soil
        bg-cream-light
        my-2
      "
      placeholder="อีเมล"
	  v-model="userAccount.email"
      @keypress.enter="submit"
    />
    <input
      class="
        py-6
        px-2
        w-full
        input input-sm md:input-md
        rounded
        text-gray-soil
        bg-cream-light
        my-2
      "
      placeholder="รหัสผ่าน"
	  v-model="userAccount.password"
      keypress.enter="submit"
    />

    <div class="flex flex-wrap mt-10">
      <div class="w-1/2 px-1">
        <nuxt-link to="/register" class="btn btn-secondary w-full">สมัครสมาชิก</nuxt-link>
      </div>
      <div class="w-1/2 px-1">
        <button class="btn btn-accent w-full" @click="submit">เข้าสู้ระบบ</button>
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
