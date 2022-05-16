<template>
  <div class="navbar flex flex-row">
    <div class="text-white w-1/2">
		<div>
			<p class="text-xs text-gray-soil px-2">Welcome back</p>
				<div class="dropdown">
					<div tabindex="0" class="btn btn-secondary btn-sm">
						Username<span class="material-icons">arrow_drop_down</span>
					</div>
				<ul tabindex="0" class="p-2 shadow menu dropdown-content rounded-box w-52 text-gray-soil bg-dark-blue border-dark-gray border-2">
					<li>
						<nuxt-link to="">Login</nuxt-link>
					</li>
					<li>
						<nuxt-link to="">Register</nuxt-link>
					</li>
					<li>
						<nuxt-link to="/dormForm">Add Dorm</nuxt-link>
					</li>
				</ul>
			</div>
		</div>
	</div>
    <div class="font-bold text-white ml-auto cursor-pointer">
	<NuxtLink to="/">Dorm<span class="m-1 py-2 px-3 bg-cheese text-black w-1/2 rounded-lg text-xl">hub</span></NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
	name: 'NavBar'
}
</script>
