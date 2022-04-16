<template>
	<div>
		<div class="text-white flex flex-wrap mt-5 px-5">
			<h1 class="w-1/2">Suggestions City</h1>
			<span class="w-1/2 text-xs text-right">See all ></span>
		</div>
		<div>
			<img src="https://api.lorem.space/image/album?w=400&h=400" class="h-64 w-64" alt="Album">
			<div class="absolute transform space-y-2 flex flex-col items-center w-full top-1/2 -translate-y-1/2 h-auto">
				<p>{{ City.city }}</p>
				<p>{{ City.country }}</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CityList',
	props: ['City']
}
</script>