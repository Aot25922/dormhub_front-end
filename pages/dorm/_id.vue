<template>
  <div class="text-white my-5 md:px-[68px] lg:px-[335px]">
    <div v-if="dorm != null">
      <client-only>
      <agile>
        <div class="slide text-white block relative h-60 md:h-[480px] lg:h-[550px]" v-for="i in dorm.media.filter(x => x.roomTypeId == null)" :key="i.mediaId">
          <img :src="$store.state.Backend_URL+'/dorm/image/'+dorm.dormId+'/'+i.mediaId" class="object-cover object-center w-full h-full"/>
        </div>
        <template slot="prevButton"><span class="material-icons">chevron_left</span></template>
        <template slot="nextButton"><span class="material-icons">chevron_right</span></template>
      </agile>
      </client-only>
	  <div class="py-2 px-5">
		<div class="flex flex-1">
			<h1 class="py-1">{{ dorm.name }}</h1>
			<div class="bg-dark-gray rounded text-white p-1 text-2xs mt-1 ml-2">
				{{ dorm.rating }}
				<div class="rating rating-xs">
					<input type="radio" name="rating-2" class="mask mask-star-2 bg-cheese">
				</div>
			</div>
		</div>
        <div class="rounded-md text-sm">
			<p>
			ที่อยู่: <span class="text-light-blue">{{ dorm.address.number }} {{ dorm.address.street }}
			{{ dorm.address.alley }} {{ dorm.address.subDistrict.name }}
			{{ dorm.address.subDistrict.zipCodeId }}
			{{ dorm.address.subDistrict.district.name }}
			{{ dorm.address.subDistrict.district.province.name }}
			{{ dorm.address.subDistrict.district.province.region.name }}
			</span></p>
			<p class="pt-2">ราคา : <span class="text-light-blue">{{ lowPrice }} - {{ highPrice }}</span></p>
			<p class="pt-2">ช่องทางการติดต่อ:</p>
			<!-- <ul class="list-none">
				<li class="pl-3">อีเมล: <span class="text-light-blue">{{ owner.email }}</span></li>
				<li class="pl-3">เบอร์โทรศัพท์:  <span class="text-light-blue">{{ owner.phone }}</span></li>
			</ul> -->
		</div>
      </div>
      <div class="dropdown px-4">
        <label tabindex="0" class="btn btn-sm m-1">Roomtype<span class="material-icons">expand_more</span></label>
        <ul
          tabindex="0"
          class="dropdown-content menu p-2 shadow rounded-box w-52 bg-dark-blue border-dark-gray border-2"
        >
          <li v-for="type in dorm.roomTypes" :key="type.roomTypeId">
            <p class="text-gray-soil" @click="selectRoomtype(type)">{{ type.type }}</p>
          </li>
        </ul>
      </div>
      <div>
       <room-type class="mt-1" v-if="roomType" :roomType="roomType" :elecPerUnit="dorm.elecPerUnit" :waterPerUnit="dorm.waterPerUnit" :media="roomTypeMedia" :key="roomType.roomTypeId"/>
      </div>
    </div>
    <div v-else>
      <errorPage />
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
      for (let i in this.dorm.userAccounts) {
        if (this.dorm.userAccounts[i].role == "Dorm Manage") {
          this.owner = this.dorm.userAccounts[i];
        }
      }
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
      for (let i in this.dorm.userAccounts) {
        if (this.dorm.userAccounts[i].role == "Dorm Manage") {
          this.owner = this.dorm.userAccounts[i];
        }
      }
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
      owner: null,
      lowPrice: 0,
      highPrice: 0,
      roomType : null,
      roomTypeMedia:null
    };
  },
  methods: {
    selectRoomtype(data){
      this.roomType = data
      this.roomTypeMedia = this.dorm.media.filter(i => i.roomTypeId == this.roomType.roomTypeId)
    }
  },
};
</script>
