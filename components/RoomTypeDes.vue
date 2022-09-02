<template>
  <div>
    <client-only>
      <agile style="touch-action: none" v-if="checkRoomtypeImg">
        <div
          class="slide text-white block relative h-60 md:h-[480px] lg:h-[550px]"
          v-for="i in media"
          :key="i.mediaId"
        >
          <img
            :src="
              $store.state.Backend_URL +
              '/dorm/image/' +
              i.dormId +
              '/' +
              i.mediaId +
              '/' +
              roomType.roomTypeId
            "
            class="object-cover object-center w-full h-full"
            @error="checkRoomtypeImg = false"
          />
        </div>
        <template slot="prevButton"
          ><span class="material-icons">chevron_left</span></template
        >
        <template slot="nextButton"
          ><span class="material-icons">chevron_right</span></template
        >
      </agile>
      <div v-else>
        <p
          class="slide text-black block relative h-60 md:h-[480px] lg:h-[550px]"
        >
          IMAGE NOT FOUND
        </p>
      </div>
    </client-only>
    <div class="overflow-x-auto px-5 pt-5">
      <div
        class="
          grid grid-cols-3
          w-full
          rounded-md
          text-black
          bg-cream-dark
          p-5
          text-center
        "
      >
        <h1>ประเภทห้อง</h1>
        <div class="col-span-2">{{ roomType.type }}</div>

        <h1>ราคา</h1>
        <div class="col-span-2">{{ roomType.dormHasRoomType.price }}</div>

        <h1>มัดจำ</h1>
        <div class="col-span-2">{{ roomType.dormHasRoomType.deposit }}</div>

        <h1>ค่าน้ำ</h1>
        <div class="col-span-2">{{ waterPerUnit }}</div>

        <h1>ค่าไฟ</h1>
        <div class="col-span-2">{{ elecPerUnit }}</div>

        <h1>ขนาดพื้นที่(ตร.ม.*)</h1>
        <div class="col-span-2">{{roomType.dormHasRoomType.area}}</div>

        <h1>รายละเอียดเพิ่มเติม</h1>
        <div class="col-span-2" v-if="roomType.description == ''">-</div>
        <div class="col-span-2" v-else>{{roomType.description}}</div>
      </div>
    </div>
    <div>
      <h1>ห้องพักทั้งหมด</h1>
      <div v-for="(room, index) in rooms" :key="index">
        <p>เลขห้องพัก : {{ room.roomNum }}</p>
          <p>สถานะห้องพัก : {{ room.status }}</p>
          <p>ชั้น : {{ room.floors }}</p>
          <p>รายละเอียดเพิ่มเติม : {{ room.description }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "RoomTypeDes",
  props: ["roomType", "elecPerUnit", "waterPerUnit", "media", "rooms"],
  data() {
    return {
      checkRoomtypeImg: true,
    };
  },
};
</script>

<style scoped>
h1 {
  font-weight: bold;
}
</style>
