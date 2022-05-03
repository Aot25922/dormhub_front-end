<template>
  <div>
    <client-only >
    <agile>
    <div class="slide text-white block" v-for="i in roomType" :key="i.roomTypeId">
      <img :src="$store.state.Backend_URL+'/dorm/image/roomType/'+i.roomTypeId"/>
    </div>
    <template slot="prevButton">left<i class="fas fa-chevron-left"></i></template>
    <template slot="nextButton">right<i class="fas fa-chevron-right"></i></template>
  </agile>
    </client-only>
   <div class="overflow-x-auto">
  <table class="table w-full text-black">
    <tbody>
      <tr>
        <td>Roomtype</td>
        <td>{{roomType.type}}</td>
      </tr>
      <tr>
        <td>Price</td>
        <td>{{roomType.dormHasRoomType.price}}</td>
      </tr>
      <tr>
        <td>Deposit</td>
        <td>{{roomType.dormHasRoomType.deposit}}</td>
      </tr>
      <tr>
        <td>ค่าน้ำ</td>
        <td>{{waterPerUnit}}</td>
      </tr>
      <tr>
        <td>ค่าไฟ</td>
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