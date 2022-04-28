<template>
    <div class="flex flex-wrap relative justify-center item-center">
		<button class="absolute left-7 top-3 text-gray-soil">
			<span class="material-icons">search</span>
        </button>
		<input type="text" placeholder="Search" v-model="search" class="focus:outline-none input input-bordered bg-dark-blue text-light-blue w-11/12 px-12">
		<button class="absolute right-7 top-3 text-gray-soil">
			<span class="material-icons">filter_list</span>
        </button>
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
