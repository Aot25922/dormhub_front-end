<template>
  <div class="card card-side bg-cream text-black p-3 cursor-pointer" @click="dormInfo()">
    <figure>
      <img
        :src="$store.state.Backend_URL+'/dorm/image/'+Dorm.dormId+'/'+Dorm.media.filter(x=>x.roomTypeId == null)[0].mediaId"
        class="h-24 w-24 rounded-md"
        alt="Album"
      />
    </figure>
    <div class="px-2">
      <h2 class="card-title text-base">{{ Dorm.name }}</h2>
	  <p class="text-sm py-1"><span class="material-icons absolute top-9">local_offer</span> 
	  	<span class="ml-7">ไตข้างซ้าย <span class="text-gray-soil">/ เดือน</span>
		</span>
		</p>
      <div class="flex text-sm py-1">
        <h1>เวลาเปิด/ปิด :&nbsp;</h1>
        <h1 v-if="Dorm.openTime != null">{{ Dorm.openTime }} /</h1>
        <h1 v-else>- / </h1>
        <h1 v-if="Dorm.closeTime != null">{{ Dorm.closeTime }}</h1>
        <h1 v-else>-</h1>
      </div>
	  <!-- Address -->
      <div class="flex space-x-0 text-gray-soil">
        <span class="material-icons text-black">location_on</span>
		<p class="text-2xs">
          {{ Dorm.address.number }}
          {{ Dorm.address.street }}
          {{ Dorm.address.alley }}
          {{ Dorm.address.subDistrict.name }}
          {{ Dorm.address.subDistrict.zipCodeId }}
          {{ Dorm.address.subDistrict.district.name }}
          {{ Dorm.address.subDistrict.district.province.name }}
        </p>
      </div>
      <div class="card-actions absolute top-4 right-2 text-2xs">
        <div class="bg-green-darker rounded text-gray-soil p-1">
			{{Dorm.rating}}
			<div class="rating rating-xs">
				<input type="radio" name="rating-2" class="mask mask-star-2 bg-cream-light">
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
