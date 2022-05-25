<template>
  <div class="bg-dark-gray min-h-screen">
    <NavBar class="md:p-3 lg:p-5"/>
	<SearchBar class="my-3 md:my-5"/>
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
