<template>
  <!-- Using in Home page -->
  <div class="md:px-2">
    <div class="card w-full shadow-xl my-5 md:h-[30rem] lg:h-[38rem] 2xl:h-[35rem]">
      <figure v-if="checkDormImg" class="relative">
        <img
          :src="
            $store.state.Backend_URL +
            '/dorm/image/' +
            dorm.dormId +
            '/' +
            dorm.media.filter((x) => x.roomTypeId == null)[0].mediaId +
            '?cache=' +
            $route.params.rand
          "
          @error="checkDormImg = false"
          class="w-full object-cover"
        />
      </figure>
      <figure v-else class="relative">
        <img
          src="@/assets/error/noData.png"
          class="h-full object-cover md:w-full md:max-h-40 lg:max-h-72"
          alt="No Image"
        />
      </figure>
      <!-- Info -->
      <div class="card-body">
        <!-- Dorm name -->
        <h2 class="card-title">
          {{ dorm.name }}
        </h2>
        <!-- Address -->
        <div class="flex space-x-0 text-gray-500">
          <span class="material-symbols-outlined">location_on</span>
          <p class="text-xs mt-1 px-1">
            {{ dorm.address }}
          </p>
        </div>
        <!-- Water&Electric -->
        <div class="flex flex-wrap text-xs cursor-pointer text-gray-500">
          <!-- Water Per Unit -->
          <div class="w-1/2 flex flex-row items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3119/3119421.png"
              class="w-5"
            />
            <span class="pl-1 w-full"
              >฿ {{ dorm.waterPerUnit }}
              <span class="hidden md:inline">ต่อหน่วย</span></span
            >
          </div>
          <!-- Electric Per Unit-->
          <div class="w-1/2 flex flex-row items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/616/616660.png"
              class="w-5"
            />
            <span class="pl-1 w-full"
              >฿ {{ dorm.elecPerUnit }}
              <span class="hidden md:inline">ต่อหน่วย</span></span
            >
          </div>
        </div>
        <!-- Beginning Price&Deposit Mobile to Ipad -->
        <div class="flex flex-col xl:hidden">
          <div
            @click="dormInfo()"
            class="text-xl cursor-pointer ml-auto text-imperialRed font-medium md:pr-1"
          >
            <span class="text-black text-xs">ค่าเช่าเริ่มต้นที่ ฿&nbsp;</span>
            {{ minPrice }} - {{ maxPrice }}
          </div>
          <div @click="dormInfo()" class="flex cursor-pointer justify-end">
            <span class="text-black text-xs"
              >ค่าจองเริ่มต้นที่ ฿
              <span class="text-error"
                >{{ minDeposit }} - {{ maxDeposit }}</span
              >
            </span>
          </div>
        </div>
        <div class="card-actions">
          <button
            @click="dormInfo()"
            class="btn btn-ghost w-full duration-300 ease-in-out"
          >
            รายละเอียดเพิ่มเติม
              <span class="material-symbols-outlined"> arrow_forward_ios </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "DormInfo",
  props: ["dorm"],
  data() {
    return {
      checkDormImg: this.$props.dorm != null,
    };
  },
  methods: {
    dormInfo(data) {
      if (data == "edit") {
        let dormInfo = { dorm: this.dorm };
        this.$store.dispatch("dormSelected", dormInfo);
        this.$router.push({ path: `/dorm/edit/${this.dorm.dormId}` });
      } else {
        let dormInfo = { dorm: this.dorm };
        this.$store.dispatch("dormSelected", dormInfo);
        this.$router.push({ path: `/dorm/${this.dorm.dormId}` });
      }
    },
  },
  computed: {
    minPrice() {
      let minvalue = [];
      for (let i in this.dorm.roomTypes) {
        minvalue.push(this.dorm.roomTypes[i].dormHasRoomType.price);
      }
      return Math.min(...minvalue);
    },
    maxPrice() {
      let maxvalue = [];
      for (let i in this.dorm.roomTypes) {
        maxvalue.push(this.dorm.roomTypes[i].dormHasRoomType.price);
      }
      return Math.max(...maxvalue);
    },
	minDeposit() {
      let minvalue = [];
      for (let i in this.dorm.roomTypes) {
        minvalue.push(this.dorm.roomTypes[i].dormHasRoomType.deposit);
      }
      return Math.min(...minvalue);
    },
    maxDeposit() {
      let maxvalue = [];
      for (let i in this.dorm.roomTypes) {
        maxvalue.push(this.dorm.roomTypes[i].dormHasRoomType.deposit);
      }
      return Math.max(...maxvalue);
    },
  },
};
</script>
