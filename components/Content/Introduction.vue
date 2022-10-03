<template>
  <div class="lg:flex lg:flex-wrap xl:pl-36">
    <div class="lg:w-2/3">
      <div class="bg-ghostWhite py-20 px-5 lg:rounded-l-lg lg:pl-20">
        <h1 class="text-PrussianBlue font-bold text-3xl md:text-4xl md:pr-44">
          Dorm Hub - เว็ปไซต์ที่จะนำพาผู้เช่าหอพัก เจอหอพักที่ใช่ ค้นหาง่าย ตามต้องการ
        </h1>
        <div class="flex flex-row">
          <div class="divider divider-horizontal bg-PrussianBlue ml-0 my-5 text-PrussianBlue"></div>
          <p class="py-5 md:pr-48 md:py-8 text-gray-500">
            โดยเว็ปไซต์นี้จะรวบรวมหอพักที่มีการสมัครเข้ากับทางเว็ปไซต์ของของเรา เจ้าของหอพักสามารถเข้ามาสร้างหอพักของคุณได้
            เพื่อให้ผู้เช่าหอพักเห็นหอพักของคุณ
          </p>
        </div>
        <SearchBar />
      </div>
    </div>
    <img src="@/assets/intro.webp" class="hidden lg:block lg:w-1/3 lg:object-cover">
  </div>
</template>

<script>
export default {
	name: 'Introduction'
}
</script>
