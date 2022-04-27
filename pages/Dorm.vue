<template>
	<div class="text-white">
		<img src="https://api.lorem.space/image/album?w=400&h=400" />
		<h1>{{ Dorm.name }}</h1>
		<!-- <nuxt-link to="/1">Link</nuxt-link> -->
		<div>
			<p>ที่อยู่: {{Dorm.number}} {{Dorm.street}} {{Dorm.alley}} {{Dorm.zipCode}} {{Dorm.state}} {{Dorm.district}} {{Dorm.city}} {{Dorm.region}} {{Dorm.country}}<p>
			<p>ช่องทางการติดต่อ: {{ Dorm.phone }}, {{ Dorm.email }}</p>
			<p>ราคาเท่าไตข้างซ้าย/Month</p>
			<p>สถานะ: ยืนยันแล้ว</p>
		</div>
		<nuxt-child />
	</div>
</template>

<script>
export default {
	name: 'Dorm',
	props: ['Dorm']
}
</script>