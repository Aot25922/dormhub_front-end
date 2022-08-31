<template>
  <div class="navbar flex flex-row">
    <div class="font-bold text-PrussianBlue mr-auto cursor-pointer">
      <NuxtLink to="/" class="flex flex-row px-3">
<!--        <img src="@/assets/logo.png" class="mt-1 mx-1 w-10 h-10"/>-->
        <span class="mt-[15px]">Dorm</span>
        <span class=" m-1 py-2 px-3 bg-PrussianBlue text-HoneyDew w-1/2 rounded-lg text-xl">hub</span></NuxtLink>
    </div>

  <!-- Navbar for Mobile to Ipad -->
      <div class="dropdown dropdown-end lg:hidden">
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
            <nuxt-link to="/dormList">หอพัก</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/">การติดต่อ</nuxt-link>
          </li>
          <li v-if="$store.state.userAccount.role == 'Guest'">
            <nuxt-link to="/login">เข้าสู่ระบบ</nuxt-link>
          </li>
          <li class="font-bold" v-if="$store.state.userAccount.role == 'Guest'">
            <nuxt-link to="/register">สมัครสมาชิก</nuxt-link>
          </li>
          <li v-if="$store.state.userAccount.role == 'Owner'">
            <nuxt-link to="/dormForm">เพิ่มหอพัก</nuxt-link>
          </li>
          <li class="px-1" v-if="$store.state.userAccount.role == 'Owner'">
            <nuxt-link to="/dormList/owner">หอพักของฉัน</nuxt-link>
          </li>
          <li class="font-bold" v-if="$store.state.userAccount.role != 'Guest'">
            <p @click="logout">ออกระบบ</p>
          </li>
        </ul>
      </div>

  <!-- Navbar Laptop -->
    <div class="hidden lg:block">
      <ul class="flex flex-row">
        <li class="px-1">
          <nuxt-link to="/" class="btn btn-ghost">หน้าหลัก</nuxt-link>
        </li>
        <li class="px-1">
          <nuxt-link to="/" class="btn btn-ghost">เกี่ยวกับเรา</nuxt-link>
        </li>
        <li class="px-1">
          <nuxt-link to="/dormList" class="btn btn-ghost">หอพัก</nuxt-link>
        </li>
        <li class="px-1">
          <nuxt-link to="/" class="btn btn-ghost">การติดต่อ</nuxt-link>
        </li>
        <li class="px-1" v-if="$store.state.userAccount.role == 'Guest'">
          <nuxt-link to="/login" class="btn btn-ghost">เข้าสู่ระบบ</nuxt-link>
        </li>
        <li class="px-1" v-if="$store.state.userAccount.role == 'Guest'">
          <nuxt-link to="/register" class="btn btn-secondary">สมัครสมาชิก</nuxt-link>
        </li>
        <li class="px-1" v-if="$store.state.userAccount.role == 'Owner'">
          <nuxt-link to="/dormForm" class="btn btn-ghost">เพิ่มหอพัก</nuxt-link>
        </li>
        <li class="px-1" v-if="$store.state.userAccount.role == 'Owner'">
          <nuxt-link to="/dormList/owner" class="btn btn-ghost">หอพักของฉัน</nuxt-link>
        </li>
        <li class="px-1" v-if="$store.state.userAccount.role != 'Guest'">
          <button class="btn btn-secondary">ออกจากระบบ</button>
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
