<template>
	<div class="px-3">
		<div class="bg-dark-blue p-3 rounded-lg mb-3 flex flex-wrap">
			<h1 class="text-white text-lg ml-2 mb-2 font-bold w-full">ชั้น1</h1>
			<div class="px-2 w-1/2">
				<div class="rounded-lg p-5 bg-dark-gray text-white shadow-xl">
  					<div class="text-center">
    					<h2 class="font-bold text-2xl">101</h2>
    					<p>รายเดือน: 0 ฿</p>
						<p>มัดจำ: 0 ฿</p>
					</div>
				</div>
			</div>

			<div class="px-2 w-1/2">
				<div class="rounded-lg p-5 bg-dark-gray text-white shadow-xl">
  					<div class="text-center">
    					<h2 class="font-bold text-2xl">102</h2>
    					<p>รายเดือน: 0 ฿</p>
						<p>มัดจำ: 0 ฿</p>
					</div>
				</div>
			</div>
		</div>
		<div class="grid grid-cols-2 py-3">
			<button class="btn btn-neutral ml-3 mr-auto">ย้อนกลับ</button>
			<button class="btn btn-neutral mr-3 ml-auto block">ต่อไป</button>
		</div>
	</div>
</template>

<script>
export default {
	name: 'RoomLayout'
}
</script>