<template>
    <div class="flex flex-wrap relative justify-center item-center">
		<button class="absolute left-7 top-3 text-gray-soil">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
			<!-- <font-awesome-icon icon="fa-solid fa-user" /> -->
        </button>
		<input type="text" placeholder="Search" v-model="search" class="focus:outline-none input input-bordered bg-dark-blue text-light-blue w-11/12 px-12">
    </div>
</template>

<script>
export default {
    name: 'SearchBar',
	data() {
		return {
			search: ""
		}
	},
	computed: {
		filteredDorms() {
			return 0
		}
	}
}
</script>
