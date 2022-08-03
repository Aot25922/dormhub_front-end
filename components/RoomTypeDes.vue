<template>
  <div>
    <client-only>
    <agile style="touch-action: none">
    <div class="slide text-white block relative h-60 md:h-[480px] lg:h-[550px]" v-for="i in media" :key="i.mediaId">
      <img :src="$store.state.Backend_URL+'/dorm/image/'+i.dormId+'/'+i.mediaId+'/'+roomType.roomTypeId" class="object-cover object-center w-full h-full"/>
    </div>
    <template slot="prevButton"><span class="material-icons">chevron_left</span></template>
    <template slot="nextButton"><span class="material-icons">chevron_right</span></template>
  </agile>
    </client-only>
   <div class="overflow-x-auto px-5 pt-5">
  <div class="grid grid-cols-3 w-full rounded-md text-black bg-cream-dark p-5 text-center">
        <h1>ประเภทห้อง</h1>
        <div class="col-span-2">{{roomType.type}}</div>
    
        <h1>ราคา</h1>
        <div class="col-span-2">{{roomType.dormHasRoomType.price}}</div>
      
        <h1>มัดจำ</h1>
        <div class="col-span-2">{{roomType.dormHasRoomType.deposit}}</div>
      
        <h1>ค่าน้ำ</h1>
        <div class="col-span-2">{{waterPerUnit}}</div>
      
        <h1>ค่าไฟ</h1>
        <div class="col-span-2">{{elecPerUnit}}</div>
      
        <h1>สิ่งอำนวยความสะดวก/บริการเสริม</h1>
        <div class="col-span-2">
          <span v-for="facility in roomType.facilities" :key="facility.facilityId" class="grid grid-cols-4">
			<span class="col-span-3 mt-3 px-2">{{facility.name}}</span>
		<vs-tooltip left v-if="facility.description != null" class="">
			<vs-button border>
				<span class="material-icons">info</span>
			</vs-button>
			<template #tooltip>
			{{facility.description}}
			</template>
      	</vs-tooltip>
          </span>
        </div>  
  </div>
</div>
  </div>
</template>
<script>
export default {
  name: "RoomTypeDes",
  props: ["roomType","elecPerUnit","waterPerUnit","media"],
  data() {
    return {
    };
  },
};
</script>

<style scoped>
h1 {
	font-weight: bold;
}
</style>
