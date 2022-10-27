<template>
  <div>
    <ContentIntroduction />
    <div class="p-5 md:flex md:flex-row md:pb-0 lg:px-20 lg:pt-20 xl:px-52 2xl:px-[22rem]">
      <h1 class="text-3xl font-bold text-center py-5 md:text-4xl md:text-left">หอพัก</h1>
      <nuxt-link to="/dormList" class="btn btn-secondary w-full py-3 md:w-1/4 md:ml-auto md:mt-4">ดูหอพักทั้งหมด</nuxt-link>
    </div>

    <!-- DormList -->
      <div class="p-5 md:grid md:grid-cols-2 md:pb-0 md:pt-0 lg:grid-cols-3 lg:px-20 lg:pb-20 xl:px-52 2xl:px-[22rem]">
          <DormInfo class="my-10 md:my-0"
            v-for="dorm in dormList.slice(0, 2)"
            :Dorm="dorm"
            :key="dorm.dormId" />
        <!-- Ads for Laptop -->
        <div class="hidden lg:block lg:pt-5">
          <div class="card w-full bg-primary text-white lg:h-[30rem] 2xl:h-[32rem]">
            <div class="card-body items-center text-center md:py-10">
              <h2 class="card-title">ท่องไปกับหอพักได้อีกมาก</h2>
              <p class="text-left md:py-5">ก่อนการตัดสินใจบางอย่าง ท่านควรวางแผนความคุ้มค่า การเดินทาง กำลังทรัพย์ที่ไหว</p>
              <div class="flex flex-row py-3 md:py-5">
                <div class="divider divider-horizontal bg-white ml-0 text-white"></div>
                <p class="italic font-Itim">"คุณไม่สามารถไว้ใจใครได้อีกต่อไปหากคุณต้องการทำสิ่งที่คุณต้องทำด้วยตัวเอง"</p>
              </div>
            </div>
            <div class="card-actions p-5 lg:pt-2 lg:mb-4 2xl:pt-8">
              <nuxt-link to="/dormList" class="btn btn-secondary w-full duration-300 ease-in-out">เลือกหอพักได้เลย!</nuxt-link>
            </div>
          </div>
        </div>
      </div>

    <!--  Ads Mobile to Ipad -->
      <div class="p-5 md:w-1/2 md:pl-7 md:pr-2 md:pt-0 md:pb-10 lg:hidden">
        <div class="card w-full bg-primary text-white">
          <div class="card-body items-center text-center md:py-10 lg:py-20">
            <h2 class="card-title">ท่องไปกับหอพักได้อีกมาก</h2>
            <p class="text-left md:py-5">ก่อนการตัดสินใจบางอย่าง ท่านควรวางแผนความคุ้มค่า การเดินทาง กำลังทรัพย์ที่ไหว</p>
            <div class="flex flex-row py-3 md:py-5">
              <div class="divider divider-horizontal bg-white ml-0 text-white"></div>
              <p class="italic font-Itim">"คุณไม่สามารถไว้ใจใครได้อีกต่อไปหากคุณต้องการทำสิ่งที่คุณต้องทำด้วยตัวเอง"</p>
            </div>
          </div>
          <div class="card-actions p-5">
            <nuxt-link to="/dormList" class="btn btn-secondary w-full duration-300 ease-in-out">เลือกหอพักได้เลย!</nuxt-link>
          </div>
        </div>
      </div>

  <!-- Last Content -->
    <div class="p-5 bg-ghostWhite md:py-20 lg:p-20 lg:px-52 2xl:px-96">
      <h1 class="font-bold text-3xl md:pr-44 lg:pr-64">ค้นหาความเหมาะสมให้เข้ากับคุณในทุกด้าน ไม่ไหวอย่าฝืน</h1>
      <p class="py-3 md:pr-48 md:py-8 text-gray-500">การอ่านหนังสือโดยไม่ได้คิดค้น การอ่านจะไม่ได้อะไรเลย การคิดค้นโดยไม่ได้อ่านหนังสือ การคิดค้นจะเปล่าประโยชน์</p>
      <div class="lg:py-5 md:grid md:grid-cols-2">
        <div class="card bordered md:col-span-1 flex-row md:m-3 my-2 p-3 justify-center font-semibold" v-for="card in cardList" :key="card.id">
          <img :src="card.img" class="w-10">
          <span class="pl-2 mt-2">{{ card.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cardList: [
        {
          id: 1,
          name: 'ขอบเขตหอพัก',
          img: 'https://cdn-icons-png.flaticon.com/512/2509/2509698.png'
        },
        {
          id: 2,
          name: 'รับรองหอพัก',
          img: 'https://cdn-icons-png.flaticon.com/512/5241/5241729.png'
        }
      ],
      dormList:[]
    }
  },
      methods: {},
      async created() {
        if (this.$store.state.dormList.length == 0) {
          await this.$store.dispatch('fetchDormList',0)
        }
        await this.$store.dispatch('fetchProvinceList')
        this.dormList = this.$store.state.dormList.results
      },
}
</script>

<style scoped>
  font-Itim {
    font-family: 'Itim'
  }
</style>

