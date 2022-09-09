<template>
  <div>
    <div class="mt-2 bg-white drop-shadow-lg rounded-lg">
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
          <div class="relative">
            <img src="@/assets/error/404.png" class="w-full mx-auto md:w-1/2 " />
          </div>
        </div>
      </client-only>
      <div class="p-5">
        <div class="">
          <div class="font-bold text-lg">{{ roomType.type }}</div>

          <div class="font-bold">
            ราคา : <span class="font-normal">{{ roomType.dormHasRoomType.price }} บาท</span>
          </div>

          <div class="font-bold">
            มัดจำ : <span class="font-normal">{{ roomType.dormHasRoomType.deposit }} บาท</span>
          </div>

          <div class="font-bold">
            ค่าน้ำ : <span class="font-normal">{{ waterPerUnit }} บาทต่อหน่วย</span>
          </div>

          <div class="font-bold">
            ค่าไฟ : <span class="font-normal">{{ elecPerUnit }} บาทต่อหน่วย</span>
          </div>

          <div class="font-bold">
            ขนาดพื้นที่ : <span class="font-normal">{{roomType.dormHasRoomType.area}} ตารางเมตร</span>
          </div>

          <div class="pt-5 font-bold">รายละเอียดเพิ่มเติม</div>
          <div class="w-full text-gray-600 px-2 py-3 bg-ghostWhite mt-3 rounded">
            <div v-if="roomType.description != ''">{{ roomType.description }}</div>
            <div v-else class="text-gray-400">ไม่มีข้อมูล</div>
          </div>
        </div>
      </div>
    </div>

    <div class="my-5 p-5 bg-white drop-shadow-lg rounded-lg">
      <h1 class="font-bold text-lg">ห้องพักทั้งหมด</h1>
      <div v-for="(room, index) in rooms" :key="index">
        <p>ชั้น : {{ room.floors }}</p>
        <p>เลขห้องพัก : {{ room.roomNum }}</p>
        <p>สถานะห้องพัก : {{ room.status }}</p>
        <p>รายละเอียดเพิ่มเติม : {{ room.description }}</p>
      </div>
    </div>

<!--    <div>-->
<!--      <div v-for="(floor, key) in rooms" :key="key" class="flex flex-wrap">-->
<!--        <p>ชั้น : {{ key }}</p>-->
<!--        <div v-for="(room, index) in floor" :key="index">-->
<!--          <div class="p-5 w-1/2 rounded bg-ghostWhite flex flex-wrap">-->
<!--            <p class="font-bold w-full text-center">{{ room.roomNum }}</p>-->
<!--            <div class="w-1/2 text-success text-left">-->
<!--              <div v-if="room.status == 'ว่าง'">{{ room.status }}</div>-->
<!--              <div v-else class="text-imperialRed">{{ room.status }}</div>-->
<!--            </div>-->
<!--            <div class="w-1/2 text-right">{{ room.roomType }}</div>-->
<!--            <div class="w-full px-2 py-3 bg-white mt-3 rounded">-->
<!--              <div v-if="room.description != ''">{{ room.description }}</div>-->
<!--              <div v-else class="text-gray-400">ไม่มีข้อมูล</div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
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

