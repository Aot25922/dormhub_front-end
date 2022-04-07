<template>
  <div class="bg-dark-gray h-screen">
    <NavBar/>
	<SearchBar class="my-3"/>
    <nuxt/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import SearchBar from '@/components/SearchBar'

export default {
  component: NavBar, SearchBar
}
</script>
