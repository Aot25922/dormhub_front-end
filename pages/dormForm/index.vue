<template>
	<div class="py-3">
		<h1 class="text-cheese font-bold text-center text-xl">เพิ่มหอพัก</h1>
		<form action="" class="px-3">
			<div class="bg-dark-blue p-3 rounded-lg my-3">
				<h1 class="text-white text-lg ml-2 mb-2 font-bold">เกี่ยวกับหอพัก</h1>
				<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">ชื่อหอพัก</label>
				<input type="text" autofocus class="py-4 px-2 w-full input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue"
				placeholder="แฮปปี้ดอร์ม"/>
			
				<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">เวลาเปิด/ปิด</label>
				<b-form-timepicker id="timepicker-placeholder" size="sm" placeholder="เวลาเปิด" locale="en" class="p-2 bg-dark-gray border-0 focus:outline-none focus:bg-gray-soil"></b-form-timepicker>
				<b-form-timepicker id="timepicker-placeholder" size="sm" placeholder="เวลาปิด" locale="en" class="p-2 my-2 bg-dark-gray border-0 focus:outline-none focus:bg-gray-soil"></b-form-timepicker>
				
				<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">ค่าน้ำต่อหน่วย</label>
				<input class="py-4 px-2 w-full input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue"
				placeholder="0.01"/>

				<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">ค่าไฟต่อหน่วย</label>
				<input class="py-4 px-2 w-full input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue"
				placeholder="0.01"/>

				<b-form-file v-model="file" :state="Boolean(file)" placeholder="กรุณาเลือกไฟล์" class="mt-3 focus:outline-none"></b-form-file>
			</div>

			<Address msg="ที่ตั้งหอพัก"/>
		</form>
		<button class="btn btn-neutral mr-3 ml-auto block">ต่อไป</button>
	</div>
</template>

<script>
import Address from '@/components/Address.vue';
export default {
	components: { Address },
	data() {
      return {
        file: null
      }
	}
}
</script>