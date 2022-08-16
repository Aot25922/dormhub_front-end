<template>
  <div class="p-5 my-14">
	<h1 class="pb-5 text-2xl font-bold text-cream-darker">Login</h1>
	<input class="py-6 px-2 w-full input input-sm rounded text-gray-soil bg-cream-light my-2" placeholder="Email">
	<input class="py-6 px-2 w-full input input-sm rounded text-gray-soil bg-cream-light my-2" placeholder="Password">

	<div class="flex flex-wrap mt-10">
		<nuxt-link to="/register" class="btn btn-secondary w-1/2">Register</nuxt-link>
		<button class="btn btn-accent w-1/2">Login</button>
	</div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>