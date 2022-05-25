<template>
    <div class="flex flex-wrap relative justify-center item-center">
		<button class="absolute lg:left-[335px] md:left-20 left-7 top-3 text-gray-soil">
			<span class="material-icons">search</span>
        </button>
		<input type="text" placeholder="Search" v-model="search" class="focus:outline-none input input-bordered bg-dark-blue text-light-blue w-11/12 px-12 md:w-5/6 lg:w-2/3">
		<button class="absolute lg:right-[335px] md:right-20 right-7 top-3 text-gray-soil">
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
