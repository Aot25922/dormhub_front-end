<template>
  <div>
    <div class="bg-ghostWhite px-5 py-12 xl:py-20 xl:px-52 2xl:px-96">
      <div class="breadcrumbs text-gray-500 md:text-lg lg:text-xl">
        <ul>
          <li>หน้าหลัก</li>
          <li>เกี่ยวกับเรา</li>
        </ul>
      </div>
      <h1 class="text-PrussianBlue font-bold text-3xl md:text-4xl lg:text-5xl">
        เกี่ยวกับเรา
      </h1>
    </div>

    <div class="py-20 px-5 xl:px-52 2xl:px-96">
      <div class="md:grid md:grid-cols-2">
        <h1 class="text-black font-bold text-3xl md:text-4xl">สาเหตุที่ควรเลือกใช้ Drom Hub ของเรา</h1>
        <p class="text-gray-500 py-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tortor turpis, consequat non aliquet maximus, finibus id nisl. Mauris volutpat commodo felis eu euismod.</p>
      </div>

      <div class="stats shadow w-full stats-vertical md:stats-horizontal">
        <div class="stat place-items-center">
          <div class="stat-title text-PrussianBlue">Downloads</div>
          <div class="stat-value text-PrussianBlue">31K</div>
          <div class="stat-desc text-gray-500">From January 1st to February 1st</div>
        </div>
        <div class="stat place-items-center">
          <div class="stat-title text-PrussianBlue">Users</div>
          <div class="stat-value text-celadonBlue">4,200</div>
          <div class="stat-desc text-gray-500">↗︎ 40 (2%)</div>
        </div>
        <div class="stat place-items-center">
          <div class="stat-title text-PrussianBlue">New Registers</div>
          <div class="stat-value text-gray-500">1,200</div>
          <div class="stat-desc text-gray-500">↘︎ 90 (14%)</div>
        </div>
      </div>
    </div>

    <div class="p-5 md:flex md:flex-row md:pb-0 xl:px-52 2xl:px-96">
      <h1 class="text-3xl font-bold text-center py-5 md:text-4xl md:text-left">หอพัก</h1>
      <nuxt-link to="/dormList" class="btn btn-secondary w-full py-3 md:w-1/4 md:ml-auto md:mt-4">ดูหอพักทั้งหมด</nuxt-link>
    </div>
    <div class="p-5 md:grid md:grid-cols-2 md:pb-0 md:pt-0 lg:grid-cols-3 lg:pb-20 xl:px-52 2xl:px-96">
      <DormInfo class="my-10 md:my-0" v-for="dorm in dormList.slice(0, 3)" :Dorm="dorm" :key="dorm.dormId" />
    </div>

    <div class="p-5 md:py-20 xl:flex xl:flex-wrap xl:px-52 2xl:px-96">
      <div class="xl:py-5 xl:w-1/2">
        <h1 class="font-bold text-xl md:text-2xl lg:text-3xl">ขั้นตอนในการจองห้องพัก</h1>
        <div class="py-5 xl:pt-5 xl:pb-0">
          <div class="flex flex-wrap font-semibold" v-for="booking in bookingRoom" :key="booking.id">
            <div class="w-1/4 md:w-1/6 lg:flex lg:justify-center">
              <img :src="booking.img" class="w-full p-5 xl:px-0 xl:py-5">
            </div>
            <div class="w-3/4 py-3 md:w-5/6 2xl:py-6">
              <h2 class="pl-5 md:text-lg lg:text-xl">{{ booking.id }}. {{ booking.name }}</h2>
              <p class="text-gray-500 text-xs md:text-sm md:pr-10 lg:text-base xl:px-3">{{ booking.desc }}</p>
            </div>
          </div>
          <div class="py-10 xl:pt-10 xl:pb-0">
            <nuxt-link to="/dormList" class="btn btn-primary w-full py-3 md:w-1/4 xl:w-1/2">เลือกห้องพักของคุณ</nuxt-link>
          </div>
        </div>
      </div>
      <div class="hidden xl:block xl:w-1/2">
        <img src="@/assets/about1.webp" class="h-full rounded-md object-cover"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dormList:[],
      bookingRoom: [
        {
          id: 1,
          name: 'การหาห้องพักที่ต้องการ',
          desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tortor turpis, consequat non aliquet maximus, finibus id nisl.',
          img: 'https://cdn-icons-png.flaticon.com/512/2534/2534800.png'
        },
        {
          id: 2,
          name: 'กรอกข้อมูลและชำระค่ามัดจำ',
          desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tortor turpis, consequat non aliquet maximus, finibus id nisl.',
          img: 'https://cdn-icons-png.flaticon.com/512/2014/2014997.png'
        },
        {
          id: 3,
          name: 'ตรวจสอบสถานะการจอง',
          desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tortor turpis, consequat non aliquet maximus, finibus id nisl.',
          img: 'https://cdn-icons-png.flaticon.com/512/4436/4436481.png'
        },
      ]
    }
  },
  async created() {
    if (this.$store.state.dormList.length == 0) {
      await this.$store.dispatch('fetchDormList', 0)
    }
    await this.$store.dispatch('fetchProvinceList')
    this.dormList = this.$store.state.dormList.results
  },
}
</script>
