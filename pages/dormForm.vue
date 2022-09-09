<template>
    <div class="bg-ghostWhite p-5 xl:p-20">
      <form-progress />
      <div v-if="!this.$route.path.includes('dormForm/')" class="md:grid md:grid-cols-2">
        <img src="@/assets/form1.png" class="hidden md:block md:py-24 lg:py-10">
        <div class="lg:py-10">
          <h1 class="font-bold text-lg md:text-xl xl:text-2xl 2xl:text-3xl">ขั้นตอนการสร้างหอพัก</h1>
          <ul class="py-5 text-sm space-y-5 md:text-base lg:text-lg xl:text-xl 2xl:space-y-10">
            <li class="indent-5">
              1. ชื่อของหอพัก เวลาที่เปิดและปิด ข้อมูลเพิ่มเติมถ้าหากว่ามี เช่น สถานที่ใกล้เคียง ร้านอาหารใกล้หอพัก ค่าน้ำ ค่าไฟ ต่อหน่ววยที่จะคิดต่อผู้เช่าหอพัก
            </li>
            <li class="indent-5">
              2. สถานที่ตั้งหอพักไม่ว่าจะเป็น เลขที่/เลขห้อง ซอย ถนน เขต/อำเภอ แขวง/ตำบล จังหวัด
            </li>
            <li class="indent-5">
              3. ประเภทห้องจองท่านที่มี เช่น ห้องขนาดเล็ก ห้องขาดกลาง ห้องขนาดใหญ่ และมีราคาห้อง ค่ามัดจำ และขนาดพื้นที่ใช้สอยโดยประมาณ (ตารางเมตร)
            </li>
            <li class="indent-5">
              4. จำนวนห้องในแต่ละชั้น และห้องนั้น ๆ ต้องมีประเภทห้องกำกับด้วย
            </li>
            <li class="indent-5">
              5. บัญชีธนาคารต่าง ๆ ของเจ้าของหอพัก ประกอบไปด้วย เลขบัญชี ชื่อเจ้าของบัญชี และการยืนยันการมัดจำของผู้เช้าหอ โดยกำหนดโดยเจ้าของหอเอง
            </li>
            <li class="text-center text-imperialRed border border-dashed border-imperialRed p-5">
              <span class="material-icons">warning</span>
              <span>กรุณาตรวจสอบรายละเอียดต่าง ๆ ก่อนกดยืนยัน ทางเราจะมีหน้าสรุปผลให้ดูประกอบ ที่ขั้นตอนที่ 6</span>
            </li>
          </ul>
          <div class="hidden xl:block xl:grid xl:grid-cols-4 xl:mt-5">
            <nuxt-link v-if="!this.$route.path.includes('dormForm/')" to="/dormForm/registerDormDetail" class="btn btn-accent w-full col-start-4">เริ่มสร้างหอพักของคุณ</nuxt-link>
          </div>
        </div>

      </div>
      <div class="md:grid md:grid-cols-6 xl:hidden">
        <nuxt-link v-if="!this.$route.path.includes('dormForm/')" to="/dormForm/registerDormDetail" class="btn btn-accent w-full my-5 md:mb-10 md:col-start-5 md:col-span-2">เริ่มสร้างหอพักของคุณ</nuxt-link>
      </div>
      <NuxtChild keep-alive class="md:px-10 lg:px-20 xl:px-32 2xl:px-52" />
    </div>
</template>
<script>
export default {
  middleware: 'permission',
  data() {
    return {};
  },
  methods: {
    submitForm() {
      this.$store.dispatch("addDorm");
    },
  },
};
</script>
