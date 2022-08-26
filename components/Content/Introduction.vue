<template>
  <div class="bg-ghostWhite py-20 px-5">
    <h1 class="text-PrussianBlue font-bold text-3xl">
      Dorm Hub - เว็ปไซต์ที่จะนำพาผู้เช้าหอพัก เจอหอพักที่ใช่ ค้นหาง่าย ตามต้องการ
    </h1>
    <div class="flex flex-row">
      <div class="divider divider-horizontal bg-PrussianBlue ml-0 my-5 text-gray-400"></div>
      <p class="py-5">
        โดยเว็ปไซต์นี้จะรวมรวบหอพักที่มีการสมัครเข้ากับทางเว็ปไซต์ของของเรา เจ้าของหอพักสามารถเข้ามาสร้างหอพักของคุณได้
        เพื่อให้ผู้เช่าหอพักเห็นหอพักของคุณ
      </p>
    </div>
	<SearchBar />
  </div>
</template>

<script>
export default {
	name: 'Introduction'
}
</script>