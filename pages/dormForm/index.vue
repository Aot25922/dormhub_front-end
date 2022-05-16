<template>
	<div class="py-3">
		<div v-if="!banking">
		<h1 class="text-cheese font-bold text-center text-xl">เพิ่มหอพัก</h1>
			<form action="" class="px-3">
				<div class="bg-dark-blue p-3 rounded-lg my-3">
					<h1 class="text-white text-lg ml-2 mb-2 font-bold">เกี่ยวกับหอพัก</h1>
					<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">ชื่อหอพัก</label>
					<input type="text" autofocus class="py-4 px-2 mb-5 w-full input input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue border-none"
					placeholder="แฮปปี้ดอร์ม"/>
				
					<label for="" class="label-text text-light-blue tracking-wide font-bold">เวลาเปิด</label>
					<input type="time" class="p-2 mb-5 rounded text-light-blue bg-dark-gray border-none focus:outline-none focus:bg-gray-soil w-full" />
					
					<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">เวลาปิด</label>
					<input type="time" class="p-2 mb-5 rounded text-light-blue bg-dark-gray border-none focus:outline-none focus:bg-gray-soil w-full" />
					
					<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">ค่าน้ำต่อหน่วย</label>
					<input class="py-4 px-2 mb-5 w-full input input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue border-none"
					placeholder="0.01"/>

					<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">ค่าไฟต่อหน่วย</label>
					<input class="py-4 px-2 mb-5 w-full input input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue border-none"
					placeholder="0.01"/>

					<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">เลือกภาพปกที่ใช้แสดงบนหน้าเว็ป</label>
					<input type="file" class="mb-5 focus:outline-none form-control block w-full bg-dark-gray text-gray-soil rounded transition ease-in-out border-none" />
				</div>

				<Address msg="ที่ตั้งหอพัก"/>
			</form>
		</div>
		<button @click="nextPage" v-if="!banking" class="btn btn-neutral mr-3 ml-auto block">ต่อไป</button>
		<BankAccount v-if="banking"/>
		
	</div>
</template>

<script>
import Address from '@/components/Address.vue';
import BankAccount from '~/components/InstallationDorm/BankAccount.vue';

export default {
	components: { Address, BankAccount },
	data() {
      return {
		banking: false,
		form: true,
      }
	},
	methods: {
		nextPage(){
			this.banking = true
			this.form = false
		}
	}
}
</script>