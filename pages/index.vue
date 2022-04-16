<template>
	<div class="p-8">
		<nuxt-link :to="{ name: 'dorm', params: { userId: 123 }}" >test</nuxt-link>
		<DormInfo v-for="dorm in ip" :Dorm='dorm' :key='dorm.dormId' class="mt-4 mx-5"/>
	</div>
</template>
<script>
export default {
async asyncData({ $axios, store }) {
  var ip = await $axios.$get(`${store.state.DBUrl}/Dorm`)
  return { ip }
}
}
</script>

