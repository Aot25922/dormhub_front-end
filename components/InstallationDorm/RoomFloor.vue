<template>
	<div>
		<div class="px-3" v-if="!layout">
			<div class="bg-dark-blue p-3 rounded-lg mb-3">
				<h1 class="text-white text-lg ml-2 mb-2 font-bold">จำนวนชั้น</h1>
				<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">ระบุจำนวนชั้น (1 ถึง 50 ชั้น)</label>
				<input type="number" class="py-4 mb-3 px-2 w-full input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue"
				placeholder="ระหว่าง 1-50 ชั้น" min="1" max="50"/>

				<h1 class="text-white text-lg ml-2 mb-2 font-bold">จำนวนห้องต่อชั้น</h1>
				<!-- Floor Here -->
				<label class="input-group input-group-sm mb-3 px-2">
					<span>ชั้นที่ 1</span>
					<input type="number" class="input input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue"
					placeholder="1" min="1" max="50"/>
					<span>ห้อง</span>
				</label>
			</div>
			<RoomType />
		</div>
		<div class="grid grid-cols-2 py-3">
			<button @click="previousPage" v-if="!layout" class="btn btn-neutral ml-3 mr-auto">ย้อนกลับ</button>
			<button @click="nextPage" v-if="!layout" class="btn btn-neutral mr-3 ml-auto block">ต่อไป</button>
		</div>
		<RoomLayout v-if="layout" />
	</div>
</template>

<script>
import RoomType from '@/components/InstallationDorm/RoomType.vue'
import RoomLayout from  '@/components/InstallationDorm/RoomLayout.vue'

export default {
	name: 'RoomFloor',
	components: { RoomType, RoomLayout },
	data() {
		return {
			layout: false,
		}
	},
	methods: {
		nextPage() {
			this.layout = true
		},
	}
}
</script>