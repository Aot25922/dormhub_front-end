<template>
  <div class="p-5">
	<h1 class="pb-5 text-2xl font-bold text-cream-darker text-center">Sign Up</h1>
	<div class="bg-cream p-3 rounded-lg my-3">
		<h1 class="text-black text-lg ml-2 mb-2 font-bold">สำหรับการเข้าสู่ระบบ</h1>
		<input class="py-4 px-2 w-full input input-sm rounded text-gray-soil bg-cream-light my-2" placeholder="Email">
		<input class="py-4 px-2 w-full input input-sm rounded text-gray-soil bg-cream-light my-2" placeholder="Password">
	</div>

	<div class="bg-cream p-3 rounded-lg my-3">
      <h1 class="text-black text-lg ml-2 mb-2 font-bold">รายละเอียดส่วนบุคคล</h1>
      <div class="mb-2">
        <label class="label-text text-gray-soil tracking-wide font-bold my-2">ชื่อ</label>
        <input type="text" class=" py-4 px-2 w-full input input-sm rounded text-gray-soil bg-cream-light focus:outline-none focus:bg-cream-lightest focus:text-gray-soil border-none disabled:text-white disabled:bg-dark-gray" placeholder="สมบัติ" />
	  </div>
	  <div class="mb-2">
        <label class="label-text text-gray-soil tracking-wide font-bold my-2">นามสกุล</label>
        <input type="text" class=" py-4 px-2 w-full input input-sm rounded text-gray-soil bg-cream-light focus:outline-none focus:bg-cream-lightest focus:text-gray-soil border-none disabled:text-white disabled:bg-dark-gray" placeholder="สั้นสุดฤทธิ์" />
	  </div>
	  <div class="mb-2">
        <label class="label-text text-gray-soil tracking-wide font-bold my-2">เพศ</label>
        <input type="text" class=" py-4 px-2 w-full input input-sm rounded text-gray-soil bg-cream-light focus:outline-none focus:bg-cream-lightest focus:text-gray-soil border-none disabled:text-white disabled:bg-dark-gray" placeholder="จ๊าบ" />
	  </div>
	  <div class="mb-2">
        <label class="label-text text-gray-soil tracking-wide font-bold my-2">เบอร์โทรศัพท์</label>
        <input type="text" class=" py-4 px-2 w-full input input-sm rounded text-gray-soil bg-cream-light focus:outline-none focus:bg-cream-lightest focus:text-gray-soil border-none disabled:text-white disabled:bg-dark-gray" placeholder="0941111111" />
	  </div>
	  <h1 class="text-black text-lg mt-5 ml-2 mb-2 font-bold">เลือกบทบาท</h1>
	  <div class="flex flex-wrap">
		<!-- เดี๋ยวหาภาพมาแปะแทนปุ่ม -->
		<button class="btn btn-secondary w-1/2">ผู้เช่า</button>
		<button class="btn btn-accent w-1/2">เจ้าของหอพัก</button>
	</div>
	</div>

	<div class="flex flex-wrap mt-5">
		<button class="btn btn-secondary w-1/2">Cancel</button>
		<button class="btn btn-accent w-1/2">Confirm</button>
	</div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>