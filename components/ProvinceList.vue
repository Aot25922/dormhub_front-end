<template>
  <div class="py-5 relative carousel carousel-center cursor-pointer">  
	  <img
      src="https://api.lorem.space/image/album?w=400&h=400"
      class="h-36 w-28 rounded-xl mx-2 filter brightness-50 carousel-item"
      alt="Album"
    />
    <div class="absolute bottom-6 pl-3 text-white text-2xs">
      {{ Province.address.subDistrict.district.province.name }}
      <p class="text-light-blue">Thailand</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProvinceList",
  props: ["Province"],
};
</script>