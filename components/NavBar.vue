<template>
  <div class="navbar h-20 z-10 bg-white flex flex-row xl:px-48 2xl:px-80" :class="{ 'navbar--hidden': !showNavbar }">
    <div class="font-bold text-PrussianBlue mr-auto cursor-pointer">
      <NuxtLink to="/" class="flex flex-row px-3">
        <span class="mt-[15px]">Dorm</span>
        <span class=" m-1 py-2 px-3 bg-PrussianBlue text-HoneyDew w-1/2 rounded-lg text-xl">hub</span></NuxtLink>
    </div>

  <!-- Navbar for Mobile to Ipad -->
      <div class="dropdown dropdown-end lg:hidden">
        <div tabindex="0" class="btn btn-neutral btn-sm text-PrussianBlue">
          <span class="material-icons duration-150 ease-out">menu</span>
        </div>
        <ul tabindex="0" class=" p-2 shadow menu dropdown-content rounded-box w-52 text-gray-600 bg-white z-10">
          <li>
            <nuxt-link to="/">หน้าหลัก</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/about">เกี่ยวกับเรา</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/dormList">หอพัก</nuxt-link>
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
          <li v-if="$store.state.userAccount.role == 'Owner'">
            <nuxt-link to="/dormList/owner">หอพักของฉัน</nuxt-link>
          </li>
          <li v-if="$store.state.userAccount.role != 'Guest'">
            <nuxt-link to="/booking" >การจองห้องพักของฉัน</nuxt-link>
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
          <nuxt-link to="/about" class="btn btn-ghost">เกี่ยวกับเรา</nuxt-link>
        </li>
        <li class="px-1">
          <nuxt-link to="/dormList" class="btn btn-ghost">หอพัก</nuxt-link>
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
        <li v-if="$store.state.userAccount.role == 'Customer' || $store.state.userAccount.role == 'Owner'">
          <nuxt-link to="/booking" class="btn btn-ghost">การจองห้องพักของฉัน</nuxt-link>
        </li>
        <li class="px-1" v-if="$store.state.userAccount.role != 'Guest'">
          <button class="btn btn-secondary" @click="logout">ออกจากระบบ</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      showNavbar: true,
      lastScrollPosition: 0
    }
  },
  methods: {
    async logout() {
      this.$router.push({path:"/"})
      this.$store.dispatch('logout')
    },
    onScroll () {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop
      if (currentScrollPosition < 0) {
        return
      }
      // Stop executing this function if the difference between
      // current scroll position and last scroll position is less than some offset
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
        return
      }
      this.showNavbar = currentScrollPosition < this.lastScrollPosition
      this.lastScrollPosition = currentScrollPosition
    }
  },
  mounted () {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  }
};
</script>

<style>
 .navbar {
   position: fixed;
   transform: translate3d(0, 0, 0);
   transition: 0.1s all ease-out;
 }

 .navbar.navbar--hidden {
   box-shadow: none;
   transform: translate3d(0, -100%, 0);
 }
</style>
