<template>
  <div class="card card-side bg-dark-blue text-white p-3 cursor-pointer" @click="dormInfo()">
    <figure >
      <img
        src="https://via.placeholder.com/150"
        class="h-24 w-24 rounded-md"
        alt="Album"
      />
    </figure>
    <div class="px-2">
      <h2 class="card-title text-base">{{ Dorm.name }}</h2>
	  <p class="text-sm py-1">Price: ไตข้างซ้าย <span class="text-gray-soil">/ เดือน</span></p>
      <div class="flex text-sm">
        <h1>เวลาเปิด/ปิด :&nbsp;</h1>
        <h1 v-if="Dorm.openTime != null">{{ Dorm.openTime }} /</h1>
        <h1 v-else>- / </h1>
        <h1 v-if="Dorm.closeTime != null">{{ Dorm.closeTime }}</h1>
        <h1 v-else>-</h1>
      </div>
	  <!-- Address -->
      <div class="flex space-x-0 text-gray-soil">
        <p class="text-2xs">
          {{ Dorm.address.number }}
          {{ Dorm.address.street }}
          {{ Dorm.address.alley }}
          {{ Dorm.address.subDistrict.name }}
          {{ Dorm.address.subDistrict.zipCodeId }}
          {{ Dorm.address.subDistrict.district.name }}
          {{ Dorm.address.subDistrict.district.province.name }}
          <!-- {{ Dorm.address.subDistrict.district.province.region.name }} -->
        </p>
      </div>
      <div class="card-actions absolute top-4 right-2 text-2xs">
        <div class="bg-dark-gray rounded text-white p-1">
			{{Dorm.rating}}
			<div class="rating rating-xs">
				<input type="radio" name="rating-2" class="mask mask-star-2 bg-cheese">
			</div>
		</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DormInfo",
  props: ["Dorm"],
  data() {
    return {
      dorm : this.$props.Dorm
    }
  },
  methods : {
     dormInfo(){
       let dormInfo = {dorm:this.dorm}
       this.$store.dispatch('dormSelected',dormInfo)
       this.$router.push({path:`/dorm/${this.dorm.dormId}`})
    }
  }
};
</script>
