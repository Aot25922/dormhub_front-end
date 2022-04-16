<template>
  <div class="card card-side bg-base-100 shadow-xl">
    <figure >
      <img
        src="https://api.lorem.space/image/album?w=400&h=400"
        class=""
        alt="Album"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title text-base">{{ Dorm.name }}</h2>
      <div class="flex text-sm">
        <h1>เวลาเปิด/ปิด :&nbsp;</h1>
        <h1 v-if="Dorm.openTime != null">{{ Dorm.openTime }} /</h1>
        <h1 v-else>- /</h1>
        <h1 v-if="Dorm.closeTime != null">{{ Dorm.closeTime }}</h1>
        <h1 v-else>-</h1>
      </div>
      <div class="flex space-x-0">
        <p class=" text-sm">
          {{ Dorm.address.number }}
          {{ Dorm.address.street }}
          {{ Dorm.address.alley }}
          {{ Dorm.address.subDistrict.name }}
          {{ Dorm.address.subDistrict.zipCodeId }}
          {{ Dorm.address.subDistrict.district.name }}
          {{ Dorm.address.subDistrict.district.province.name }}
          {{ Dorm.address.subDistrict.district.province.region.name }}
        </p>
      </div>
      <div class="card-actions absolute top-5 right-8">
        <p class=" bg-dark-blue text-white px-1">{{Dorm.rating}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DormInfo",
  props: ["Dorm"],
};
</script>
