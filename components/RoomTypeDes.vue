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
  <table class="table-auto w-full rounded-md text-gray-soil bg-dark-blue p-5">
    <tbody>
      <tr>
        <td class="text-center">ประเภทห้อง</td>
        <td>{{roomType.type}}</td>
      </tr>
      <tr>
        <td class="text-center">ราคา</td>
        <td>{{roomType.dormHasRoomType.price}}</td>
      </tr>
      <tr>
        <td class="text-center">มัดจำ</td>
        <td>{{roomType.dormHasRoomType.deposit}}</td>
      </tr>
      <tr>
        <td class="text-center">ค่าน้ำ</td>
        <td>{{waterPerUnit}}</td>
      </tr>
      <tr>
        <td class="text-center">ค่าไฟ</td>
        <td>{{elecPerUnit}}</td>
      </tr>
    </tbody>
  </table>
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