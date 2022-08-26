<template>
    <!--  Search Bar with filer -->
    <div class="bg-white p-5 rounded-xl">
      <div class="py-2">
		<h1 class="font-bold p-1">ค้นหาหอพักที่ต้องการ</h1>
		<input type="text" class="input w-full border-x-0 border-t-0 border-b-gray-400" placeholder="ค้นหาหอพัก...">
	  </div>

	  <div class="py-2">
		<p class="font-bold p-1">ภูมิภาค</p>
		<select class="select border-x-0 border-t-0 border-b-gray-400 w-full">
			<option disabled selected>เลือกภูมิภาค</option>
			<option>Han Solo</option>
			<option>Greedo</option>
		</select>
	  </div>

	  <div class="py-2">
		<p class="font-bold p-1">จังหวัด</p>
		<select class="select border-x-0 border-t-0 border-b-gray-400 w-full">
			<option disabled selected>เลือกจังหวัด</option>
			<option>Han Solo</option>
			<option>Greedo</option>
		</select>
	  </div>

	  <div class="py-2">
		<p class="font-bold p-1">เขต/อำเภอ</p>
		<select class="select border-x-0 border-t-0 border-b-gray-400 w-full">
			<option disabled selected>เลือกเขต/อำเภอ</option>
			<option>Han Solo</option>
			<option>Greedo</option>
		</select>
	  </div>

	  <div class="py-2">
		<p class="font-bold p-1">แขวง/ตำบล</p>
		<select class="select border-x-0 border-t-0 border-b-gray-400 w-full">
			<option disabled selected>เลือกแขวง/อำเภอ</option>
			<option>Han Solo</option>
			<option>Greedo</option>
		</select>
	  </div>

	  <div class="py-3 w-full">
		<button class="btn btn-primary w-full">ค้นหา</button>
	  </div>
    </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      search: "",
    };
  },
  computed: {
    filteredDorms() {
      return 0;
    },
  },
};
</script>
