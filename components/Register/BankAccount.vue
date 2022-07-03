<template>
	<div>
		<h1 class="text-cheese font-bold text-center text-xl">การติดตั้งหอพัก</h1>
		<h2 class="text-center text-gray-soil py-2">Dorm Name Dummy</h2>
		<ul class="steps w-full pb-2">
			<li class="step step-primary" />
			<li class="step" />
			<li class="step" />
			<li class="step" />
			<li class="step" />
		</ul>
		<div v-if="!roomFloor">
			<form action="" class="px-3">
				<div class="bg-dark-blue p-3 rounded-lg my-3">
					<h1 class="text-white text-lg ml-2 mb-2 font-bold">บัญชีธนาคาร</h1>
					<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">ธนาคาร</label>
					<select v-model="selected" class="select select-sm w-full text-light-blue bg-dark-gray border-0"></select>
					
					<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">ชื่อบัญชี</label>
					<input class="py-4 px-2 w-full input input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue"
					placeholder="นามสมมติ"/>

					<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">เลขบัญชี</label>
					<input class="py-4 px-2 w-full input input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue"
					placeholder="999999999"/>

					<button class="btn btn-neutral ml-auto block mt-3 px-4">เพิ่ม</button>
				</div>
			</form>

			<div class="bg-dark-blue p-3 rounded-lg m-3 px-3">
				<p class="text-center text-white">ยังไม่มีข้อมูล</p>
			</div>
			<div class="bg-dark-blue p-3 rounded-lg m-3 px-3">
				<h1 class="text-white text-lg ml-2 mb-2 font-bold">ขั้นตอนการแจ้งและการชำระเงิน</h1>
				<textarea class="resize-y p-2 w-full input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue border-none"
				placeholder="ตัวอย่างเช่น แอดไลน์ แล้วส่งสลิปมาหรือ ส่งสลิปทางอีเมลล์"/>
				<button class="btn btn-neutral mt-3 ml-auto block">บันทึก</button>
			</div>
		</div>
		<div class="grid grid-cols-2 py-3">
			<button @click="previousPage" v-if="!roomFloor" class="btn btn-neutral ml-3 mr-auto">ย้อนกลับ</button>
			<button @click="nextPage" v-if="!roomFloor" class="btn btn-neutral mr-3 ml-auto block">ต่อไป</button>
		</div>
		<RoomFloor v-if="roomFloor" />
	</div>
</template>

<script>

export default {
	name: 'BankAccount',
	data() {
		return {
			roomFloor: false,
			form: true,
			selected: null,
		}
	},
	methods: {
		nextPage() {
			this.roomFloor = true
			this.form = false
		},

		previousPage() {
			router.push({path: '/dormForm'})
		}
	}
}
</script>