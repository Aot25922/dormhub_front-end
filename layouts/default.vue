<template>
  <div class="bg-dark-gray min-h-screen">
    <NavBar/>
	<SearchBar class="my-3"/>
    <nuxt/>
	<Footer />
  </div>
</template>

<script>

export default {
  head () {
    return {
      link: [
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
      ],
    }
  }
}
</script>
