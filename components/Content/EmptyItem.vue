<template>
  <div>
    <div class="text-center">
      <!-- <img :src="`@/assets/error/${imgPath}`" class="mx-auto w-full" :class="imgSize" /> -->
	  <img src="@/assets/error/dummy.png" class="mx-auto w-full" :class="imgSize" />
      <h1 class="font-bold py-2 md:text-lg lg:text-xl">{{ msg }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "EmptyItem",
  props: {
		msg: String,
		imgSize: String,
		// imgPath: String
  }
};
</script>

<style></style>
