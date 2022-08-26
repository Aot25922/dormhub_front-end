<template>
  <div class="navbar flex flex-row text-white">
      <div class="flex flex-wrap">
<!--        <span class="material-icons text-black mr-2">person</span>-->
        <div class="">
          <img src="@/assets/logo.png" class="w-10 h-10"/>
      </div>
        <div>
          <p class="text-xs text-black px-2">ยินดีต้อนรับสู่ DormHub</p>
          <div class="dropdown">
            <div tabindex="0" class="btn btn-secondary btn-sm">
              ผู้ใช้<span class="material-icons">arrow_drop_down</span>
            </div>
            <ul
              tabindex="0"
              class="
                p-2
                shadow
                menu
                dropdown-content
                rounded-box
                w-52
                text-black
                bg-cream
                border-dark-gray border-2
              "
            >
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
      </div>

    <div class="font-bold text-black ml-auto cursor-pointer">
      <NuxtLink to="/"
        >Dorm<span
          class="
            m-1
            py-2
            px-3
            bg-green-darker
            text-cream-light
            w-1/2
            rounded-lg
            text-xl
          "
          >hub</span
        ></NuxtLink
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  methods: {
    async logout() {
      this.$store.dispatch('logout')
    },
  },
};
</script>
