<template>
	<div div class="bg-dark-blue p-3 rounded-lg my-3">
		<h1 class="text-white text-lg ml-2 mb-2 font-bold">{{ msg }}</h1>
			<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">เลขที่/เลขห้อง</label>
			<input class="py-4 px-2 mb-5 w-full input input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue"
			placeholder="999/999"/>

			<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">ถนน</label>
			<input class="py-4 px-2 mb-5 w-full input input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue"
			placeholder="ถนนของเรา"/>

			<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">ซอย</label>
			<input class="py-4 px-2 mb-5 w-full input input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue"
			placeholder="69"/>

			<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">ภูมิภาค</label>
			<select v-model="selected" class="select select-sm w-full mb-5 text-light-blue bg-dark-gray border-0">
				<option	option disabled selected>กรุณาเลือกภูมิภาค</option>
				<option>ภาคเหนือ</option>
				<option>ภาคกลาง</option>
				<option>ภาคตะวันออก</option>
				<option>ภาคใต้</option>
				<option>ภาคอีสาน</option>
			</select>

			<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">จังหวัด</label>
			<select v-model="selected" class="select select-sm mb-5 w-full text-light-blue bg-dark-gray border-0"></select>

			<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">เขต/อำเภอ</label>
			<select v-model="selected" class="select select-sm mb-5 w-full text-light-blue bg-dark-gray border-0"></select>

			<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">แขวง/ตำบล</label>
			<select v-model="selected" class="select select-sm mb-5 w-full text-light-blue bg-dark-gray border-0"></select>

			<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">รหัสไปรษณีย์</label>
			<input class="py-4 px-2 mb-5 w-full input input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue"
			placeholder="10111"/>
	</div>
</template>

<script>
export default {
	name: 'Address',
    props: { msg: String },
	data() {
		return {
			selected: null
		}
	}
}
</script>