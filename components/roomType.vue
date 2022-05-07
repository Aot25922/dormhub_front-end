<template>
  <div>
    <client-only>
    <agile>
    <div class="slide text-white block" v-for="i in roomType" :key="i.roomTypeId">
      <img :src="$store.state.Backend_URL+'/dorm/image/roomType/'+i.roomTypeId"/>
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
  name: "roomType",
  props: ["roomType","elecPerUnit","waterPerUnit"],
  data() {
    return {

    };
  },
};
</script>