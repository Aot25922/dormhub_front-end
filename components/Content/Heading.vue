<template>
  <div class="bg-ghostWhite px-5 py-12 xl:py-20 xl:px-52 2xl:px-[21rem]">
      <div class="breadcrumbs text-gray-500 md:text-lg lg:text-xl">
        <ul>
          <li>หน้าหลัก</li>
          <li>{{ pageName }}</li>
        </ul>
      </div>
      <h1 class="text-PrussianBlue font-bold text-3xl md:text-4xl lg:text-5xl">
        {{ headingName }}
      </h1>
    </div>
</template>

<script>
export default {
	name: "Heading",
	props: {
		pageName: String,
		headingName: String
	}

}
</script>