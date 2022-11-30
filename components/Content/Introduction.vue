<template>
  <div class="lg:flex lg:flex-wrap xl:pl-36">
    <div class="lg:w-2/3">
      <div class="intro-bg">
        <h1 class="intro-h1">
          Dorm Hub - เว็ปไซต์ที่จะนำพาผู้เช่าหอพัก เจอหอพักที่ใช่ ค้นหาง่าย
          ตามต้องการ
        </h1>
        <div class="flex flex-row">
          <div class="intro-cross"></div>
          <p class="intro-des">
            โดยเว็ปไซต์นี้จะรวบรวมหอพักที่มีการสมัครเข้ากับทางเว็ปไซต์ของของเรา
            เจ้าของหอพักสามารถเข้ามาสร้างหอพักของคุณได้
            เพื่อให้ผู้เช่าหอพักเห็นหอพักของคุณ
          </p>
        </div>
        <SearchBar />
      </div>
    </div>
    <img src="@/assets/intro.webp" class="intro-img" />
  </div>
</template>

<script>
export default {
  name: "Introduction",
};
</script>
