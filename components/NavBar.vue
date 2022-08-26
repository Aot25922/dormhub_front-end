<template>
  <div class="navbar flex flex-row">
    <div class="font-bold text-PrussianBlue mr-auto cursor-pointer">
      <NuxtLink to="/" class="flex flex-row px-3">
<!--        <img src="@/assets/logo.png" class="mt-1 mx-1 w-10 h-10"/>-->
        <span class="mt-[15px]">Dorm</span>
        <span class=" m-1 py-2 px-3 bg-PrussianBlue text-HoneyDew w-1/2 rounded-lg text-xl">hub</span></NuxtLink>
    </div>

      <div class="dropdown dropdown-end">
        <div tabindex="0" class="btn btn-neutral btn-sm text-PrussianBlue">
          <span class="material-icons duration-150 ease-out">menu</span>
        </div>
        <ul tabindex="0" class=" p-2 shadow menu dropdown-content rounded-box w-52 text-gray-600 bg-white">
          <li>
            <nuxt-link to="/">หน้าหลัก</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/">เกี่ยวกับเรา</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/">หอพัก</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/">การติดต่อ</nuxt-link>
          </li>
          <li v-if="$store.state.userAccount.role == 'Guest'">
            <nuxt-link to="/login">เข้าสู่ระบบ</nuxt-link>
          </li>
          <li v-if="$store.state.userAccount.role == 'Guest'">
            <nuxt-link to="/register">สมัครสมาชิก</nuxt-link>
          </li>
          <li v-if="$store.state.userAccount.role == 'Owner'">
            <nuxt-link to="/dormForm">เพิ่มหอพัก</nuxt-link>
          </li>
          <li v-if="$store.state.userAccount.role != 'Guest'">
            <p @click="logout">ออกระบบ</p>
          </li>
        </ul>
      </div>

  </div>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    async logout() {
      this.$store.dispatch('logout')
    }
  },
};
</script>
