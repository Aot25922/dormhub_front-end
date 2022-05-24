<template>
  <div>
    <client-only>
    <agile style="touch-action: none">
    <div class="slide text-white block" v-for="i in media" :key="i.mediaId">
      <img :src="$store.state.Backend_URL+'/dorm/image/'+i.dormId+'/'+i.mediaId+'/'+roomType.roomTypeId" class="w-64 h-64"/>
    </div>
    <template slot="prevButton"><span class="material-icons">chevron_left</span></template>
    <template slot="nextButton"><span class="material-icons">chevron_right</span></template>
  </agile>
    </client-only>
   <div class="overflow-x-auto px-5 pt-5">
  <div class="grid grid-cols-3 w-full rounded-md text-light-blue bg-dark-blue p-5 text-center">
        <div>ประเภทห้อง</div>
        <div class="col-span-2">{{roomType.type}}</div>
    
        <div>ราคา</div>
        <div class="col-span-2">{{roomType.dormHasRoomType.price}}</div>
      
        <div>มัดจำ</div>
        <div class="col-span-2">{{roomType.dormHasRoomType.deposit}}</div>
      
        <div>ค่าน้ำ</div>
        <div class="col-span-2">{{waterPerUnit}}</div>
      
        <div>ค่าไฟ</div>
        <div class="col-span-2">{{elecPerUnit}}</div>
      
        <div>สิ่งอำนวยความสะดวก/บริการเสริม</div>
        <div class="col-span-2">
          <span v-for="facility in roomType.facilities" :key="facility.facilityId" class="grid grid-cols-4">
			<span class="col-span-3">{{facility.name}}</span>
		<vs-tooltip left v-if="facility.description != null">
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
