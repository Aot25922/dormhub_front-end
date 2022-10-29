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
            <template slot="prevButton"><span class="material-icons">chevron_left</span></template>
            <template slot="nextButton"><span class="material-icons">chevron_right</span></template>
          </agile>
          <div v-else>
            <div class="relative">
              <img src="@/assets/error/404.png" class="w-full mx-auto md:w-1/2 " />
            </div>
          </div>
          </client-only>
        <div class="p-5">
        <div class="flex flex-1">
          <h1 class="py-1 font-bold text-lg md:text-xl lg:text-2xl 2xl:text-3xl">{{ dorm.name }}</h1>
    <!--			<div class="rounded p-1 text-2xs my-1 mx-2">-->
    <!--				{{ dorm.rating }}-->
    <!--				<div class="rating rating-xs">-->
    <!--					<input type="radio" name="rating-2" class="mask mask-star-2">-->
    <!--				</div>-->
    <!--			</div>-->
        </div>
            <div class="pt-2 rounded-md text-sm md:text-base lg:text-lg xl:text-xl">
          <p class="ml-3">
          <span class="font-bold">ที่อยู่ :</span> {{ dorm.address }} 
          </p>
          <p class="pt-2 ml-3 text-sm md:text-base lg:text-lg xl:text-xl"><span class="font-bold">ราคา :</span> {{ lowPrice }} - {{ highPrice }} บาท</p>
          <p class="pt-2 font-bold">ช่องทางการติดต่อ:</p>
          <ul class="list-none">
            <li class="pl-3">อีเมล : <span class="text-light-blue">{{ dorm.userAccount.email }}</span></li>
            <li class="pl-3">เบอร์โทรศัพท์ : <span class="text-light-blue">{{ dorm.userAccount.phone }}</span></li>
          </ul>
        </div>
          </div>
        </div>
          <div class="my-5 dropdown">
            <label tabindex="0" class="btn btn-neutral m-1 md:text-lg lg:text-xl xl:text-2xl">ประเภทห้องพัก<span class="material-icons">expand_more</span></label>
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
