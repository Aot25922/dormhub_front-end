<template>
  <div class="navbar flex flex-row">
    <div class="text-white w-1/2">
		<div class="flex flex-wrap">
			<span class="material-icons text-black mr-2">person</span>
			<div>
				<p class="text-xs text-black px-2">Welcome back</p>
					<div class="dropdown">
						<div tabindex="0" class="btn btn-secondary btn-sm">
							Username<span class="material-icons">arrow_drop_down</span>
						</div>
					<ul tabindex="0" class="p-2 shadow menu dropdown-content rounded-box w-52 text-black bg-cream border-dark-gray border-2">
						<li>
							<nuxt-link to="/login">Login</nuxt-link>
						</li>
						<li>
							<nuxt-link to="/register">Register</nuxt-link>
						</li>
						<li>
							<nuxt-link to="/dormForm">Add Dorm</nuxt-link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
    <div class="font-bold text-black ml-auto cursor-pointer">
	<NuxtLink to="/">Dorm<span class="m-1 py-2 px-3 bg-green-darker text-cream-light w-1/2 rounded-lg text-xl">hub</span></NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
	name: 'NavBar'
}
</script>
