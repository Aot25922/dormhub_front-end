<template>
	<div>
		<div v-if="!layout" class="bg-dark-blue p-3 rounded-lg mb-3">
			<h1 class="text-white text-lg ml-2 mb-2 font-bold">ประเภทห้อง</h1>
			<input type="number" class="py-4 mb-3 px-2 w-full input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue"
			placeholder="ห้องนี้สีเขียว" />

			<h1 class="text-white text-lg ml-2 mb-2 font-bold">ภาพประเภทห้อง</h1>
			<div class="flex justify-center">
				<div class="mb-3 w-96">
					<label for="formFileMultiple" class="label-text text-light-blue tracking-wide font-bold my-2">เลือกได้มากกว่า1รูป</label>
					<input class="mb-5 focus:outline-none form-control block w-full bg-dark-gray text-gray-soil rounded transition ease-in-out border-none" type="file" id="formFileMultiple" multiple>
				</div>
			</div>

			<div class="center con-checkbox text-light-blue">
				<vs-checkbox warn val="html" v-model="options">
					Html
				</vs-checkbox>
				<vs-checkbox warn val="css" v-model="options">
					Css
				</vs-checkbox>
				<vs-checkbox warn val="javascript" v-model="options">
					Javascript
				</vs-checkbox>
				<vs-checkbox warn val="vue" v-model="options">
					Vue
				</vs-checkbox>
				<vs-checkbox warn val="vuesax" v-model="options">
					Vuesax
				</vs-checkbox>
				<textarea class="resize-y p-2 w-full input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue border-none"
				placeholder="กรณีติ๊กอื่น ๆ"/>
			</div>
			<button class="btn btn-neutral mt-3 ml-auto block">เพิ่ม</button>

			<!-- RoomtypeList Here -->
		</div>
	</div>
</template>

<script>
export default {
	name: 'RoomType',
	data() {
		return {
			option: [
				'javascript', 'css', 'html', 'vue', 'vuesax'
			]
		}
	},
}
</script>