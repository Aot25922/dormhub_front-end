<template>
  <div class="bg-gray-50" v-if="dorm" >
    <div class="bg-ghostWhite px-5 py-12 xl:py-20 xl:px-52 2xl:px-96">
      <div class="breadcrumbs text-gray-500 md:text-lg lg:text-xl">
        <ul>
          <li>หน้าหลัก</li>
          <li>หอพัก</li>
        </ul>
      </div>
      <h1 class="text-PrussianBlue font-bold text-3xl md:text-4xl lg:text-5xl">{{ dorm.name }}</h1>
    </div>
    <div class="px-5 py-12 xl:py-20 xl:px-52 2xl:px-96">
      <div v-if="dorm != null">
        <div class="bg-white drop-shadow-lg rounded-lg">
          <client-only>
          <agile v-if="checkDormImg">
            <div class="slide text-white block relative h-60 md:h-[480px] lg:h-[550px]" v-for="i in dorm.media.filter(x => x.roomTypeId == null)" :key="i.mediaId">
              <img :src="$store.state.Backend_URL+'/dorm/image/'+dorm.dormId+'/'+i.mediaId" class="object-cover object-center w-full h-full" @error="checkDormImg = false"/>
            </div>
            <template slot="prevButton" class="hover:bg-gray-700"><span class="material-icons">chevron_left</span></template>
            <template slot="nextButton" class="hover:bg-gray-700"><span class="material-icons">chevron_right</span></template>
          </agile>
          <div v-else>
            <div class="relative">
              <img src="@/assets/error/404.png" class="w-full mx-auto md:w-1/2" />
            </div>
          </div>
          </client-only>
        <div class="p-5">
        <div class="flex flex-1">
          <h1 class="py-1 font-bold text-lg md:text-xl lg:text-2xl">{{ dorm.name }}</h1>
        </div>
          <div class="pt-2 rounded-md text-sm lg:text-base 2xl:text-lg">
            <p class="ml-3"><b>ที่อยู่ :</b> {{ dorm.address }}</p>
            <p class="pt-2 ml-3"><b>ราคา :</b> {{ lowPrice }} - {{ highPrice }} บาท</p>
            <p class="flex pt-2 ml-3">
              <b>เวลา :</b>
              <span v-if="dorm.openTime != null">&nbsp;{{ dorm.openTime }} -</span>
              <span v-if="dorm.closeTime != null">&nbsp;{{ dorm.closeTime }} น.</span>
              <span v-if="dorm.openTime != null && dorm.closeTime == null">เปิด {{ dorm.openTime }} น.</span>
              <span v-if="dorm.openTime == null && dorm.closeTime != null">ปิด {{ dorm.closeTime }} น.</span>
              <span v-if="dorm.openTime == null && dorm.closeTime == null">ไม่มีข้อมูล</span>
            </p>
			<div class="pt-5 font-bold text-lg lg:text-xl">
            รายละเอียดเพิ่มเติม
			</div>
			<div class="w-full text-gray-400 px-2 py-3 bg-ghostWhite mt-3 rounded-lg text-sm lg:text-base 2xl:text-lg">
				<div v-if="dorm.description">{{ dorm.description }}</div>
				<div v-else>&emsp;ไม่มีข้อมูล</div>
          	</div>
            <p class="pt-2 font-bold lg:text-lg 2xl:text-xl">ช่องทางการติดต่อ:</p>
            <ul class="list-none">
              <li class="pl-3"><b>อีเมล :</b> {{ dorm.userAccount.email }}</li>
              <li class="pl-3"><b>เบอร์โทรศัพท์ :</b> {{ dorm.userAccount.phone }}</li>
            </ul>
        </div>
          </div>
        </div>
          <div class="my-5 dropdown">
            <label tabindex="0" class="btn btn-neutral m-1 text-lg md:text-xl lg:text-2xl">ประเภทห้องพัก<span class="material-icons">expand_more</span></label>
            <ul
              tabindex="0"
              class="dropdown-content menu p-2 shadow rounded-box w-52 bg-white border border-black"
            >
              <li v-for="type in dorm.roomTypes" :key="type.roomTypeId">
                <p class="text-black text-sm md:text-base lg:text-lg xl:text-xl" @click="selectRoomtype(type)">{{ type.type }}</p>
              </li>
            </ul>
          </div>
          <div>
           <room-type v-if="roomType" :roomType="roomType" :elecPerUnit="dorm.elecPerUnit" :waterPerUnit="dorm.waterPerUnit" :media="roomTypeMedia" :key="roomType.roomTypeId" :rooms="dorm.rooms.filter(x => x.roomTypeId == roomType.roomTypeId)"/>
          </div>

      </div>
      <div v-else>
        <errorPage />
      </div>
    </div>
  </div>
</template>

<script>
import roomType from '~/components/RoomTypeDes.vue';
import errorPage from '@/layouts/error.vue';
export default {
  components: { roomType, errorPage},
  async fetch() {
    if (this.$store.state.selectedDorm != null) {
      this.dorm = this.$store.state.selectedDorm;
      let price = [];
      for (let i in this.dorm.roomTypes) {
        price.push(this.dorm.roomTypes[i].dormHasRoomType.price);
      }
      this.lowPrice = Math.min(...price);
      this.highPrice = Math.max(...price);
    } else {
      let dormInfo = { dorm: null, id: this.$route.params.id };
      await this.$store.dispatch("dormSelected", dormInfo);
      this.dorm = this.$store.state.selectedDorm;
      let price = [];
      for (let i in this.dorm.roomTypes) {
        price.push(this.dorm.roomTypes[i].dormHasRoomType.price);
      }
      this.lowPrice = Math.min(...price);
      this.highPrice = Math.max(...price);
    }
  },
  data() {
    return {
      dorm: null,
      lowPrice: 0,
      highPrice: 0,
      roomType : null,
      roomTypeMedia:null,
      checkDormImg: true
    };
  },
  methods: {
    selectRoomtype(data){
      this.roomType = data
      this.roomTypeMedia = this.dorm.media.filter(i => i.roomTypeId == this.roomType.roomTypeId)
    }
  }
};
</script>
