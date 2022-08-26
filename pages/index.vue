<template>
  <div>
    <ContentIntroduction />
    <div class="p-5">
      <h1 class="text-3xl font-bold text-center py-5">หอพัก</h1>
      <nuxt-link to="/Content/DormList" class="btn btn-secondary w-full py-3">ดูหอพักทั้งหมด</nuxt-link>
    </div>

    <!-- DormList -->
    <div class="p-5">
    <DormInfo
        v-for="dorm in dormList.slice(0, 2)"
        :Dorm="dorm"
        :key="dorm.dormId"
        class="my-10" />
    </div>

  <!--  Ads  -->
    <div class="p-5">
      <div class="card w-full bg-primary text-white">
        <div class="card-body items-center text-center">
          <h2 class="card-title">ท่องไปกับหอพักได้อีกมาก</h2>
          <p class="text-left">ก่อนการตัดสินใจบางอย่าง ท่านควรวางแผนความคุ้มค่า การเดินทาง กำลังทรัพย์ที่ไหว</p>
          <div class="flex flex-row py-3">
            <div class="divider divider-horizontal bg-white ml-0 text-white"></div>
            <p class="italic">"คุณไม่สามารถไว้ใจใครได้อีกต่อไปหากคุณต้องการทำสิ่งที่คุณต้องทำด้วยตัวเอง"</p>
          </div>
        </div>
        <div class="card-actions p-5">
          <button class="btn btn-secondary w-full duration-300 ease-in-out">เลือกหอพักได้เลย!</button>
        </div>
      </div>
    </div>

  <!-- Last Content -->
    <div class="p-5 py-10 bg-ghostWhite">
      <h1 class="font-bold text-3xl">ค้นหาความเหมาะสมให้เข้ากับคุณในทุกด้าน ไม่ไหวอย่าฝืน</h1>
      <p class="py-3">การอ่านหนังสือโดยไม่ได้คิดค้น การอ่านจะไม่ได้อะไรเลย การคิดค้นโดยไม่ได้อ่านหนังสือ การคิดค้นจะเปล่าประโยชน์</p>
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
      "cardList": [
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
      ]
    }
  },
      methods: {},
      async beforeMount() {
        if (this.$store.state.dormList.length == 0) await this.$store.dispatch('fetchDormList');
        await this.$store.dispatch('fetchProvinceList');
      },
      computed: {
        dormList() {
          return this.$store.state.dormList;
        }
      },
}
</script>

