<template>
  <div>
    <div class="carousel w-full">
      <div :id="`slide${i}`" class="carousel-item relative w-full" v-for="i in 5" :key="i">
        <img src="https://api.lorem.space/image/car?w=800&h=200&hash=8B7BCDC2" class="w-full">
        <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a :href="`#slide${i-1}`" class="btn btn-circle">❮</a> 
        <a :href="`#slide${i+1}`" class="btn btn-circle">❯</a>
      </div>
    </div> 
   </div>
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