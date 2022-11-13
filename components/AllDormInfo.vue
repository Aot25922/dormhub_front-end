<template>
  <!-- Using in dormList page -->
  <div>
    <div
      class="flex flex-wrap w-full rounded-lg shadow border my-2 hover:shadow-xl hover:duration-300"
    >
      <!-- Img -->
      <div
        @click="dormInfo()"
        v-if="checkDormImg"
        class="relative float-left w-1/3 cursor-pointer"
      >
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
          class="h-full object-cover md:w-full md:max-h-40 lg:h-72"
        />
      </div>

      <!-- Error Img -->
      <div
        @click="dormInfo()"
        v-else
        class="relative float-left w-1/3 cursor-pointer"
      >
        <img
          src="@/assets/error/noData.png"
          class="h-full object-cover md:w-full md:max-h-40 lg:max-h-72"
          alt="No Image"
        />
      </div>

      <!-- Info -->
      <div class="p-2 pr-5 w-2/3 md:flex md:flex-col xl:py-5 xl:w-1/3">
        <!-- Dorm name -->
        <h2
          @click="dormInfo()"
          class="font-bold text-celadonBlue cursor-pointer hover:underline hover:underline-offset-auto hover:duration-300 md:pr-1 xl:p-0 xl:text-2xl"
        >
          {{ dorm.name }}
        </h2>
        <!-- Address -->
        <div @click="dormInfo()" class="flex py-2 cursor-pointer text-gray-500 md:py-5 xl:text-sm">
          <span class="material-symbols-outlined">location_on</span>
          <p class="text-xs px-1 md:pr-44 xl:flex xl:items-center xl:p-0">
            {{ dorm.address }}
          </p>
        </div>

        <!-- Water&Electric -->
        <div  @click="dormInfo()" class="flex flex-wrap text-xs cursor-pointer text-gray-500">
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

        <!-- Room remainning -->
        <div  @click="dormInfo()" class="pt-5 cursor-pointer flex justify-start md:justify-end xl:hidden">
          <div class="badge badge-accent">
            <div >มีห้องว่าง {{ dorm.rooms.filter((x) => x.status == "ว่าง").length }} ห้อง</div>
			<!-- <div v-else>ไม่มีห้องว่างเหลือแล้ว!</div> -->
          </div>
        </div>

        <!-- Beginning Price&Deposit Mobile to Ipad -->
        <div class="flex flex-col xl:hidden">
          <div @click="dormInfo()" class="text-xl cursor-pointer ml-auto text-imperialRed font-medium md:pr-1">
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

        <!-- Permission Button: 1024px or more than -->
        <div
          class="hidden h-full items-end lg:flex"
          v-if="
            $store.state.userAccount.role == 'Owner' &&
            $route.path.includes('dormList/owner')
          "
        >
          <div class="flex flex-row w-full">
            <!-- Edit Dorm -->
            <div class="pl-3 pr-1 py-3 w-4/5 xl:pb-0">
              <button
                @click="dormInfo('edit')"
                class="btn btn-warning w-full duration-300 ease-in-out"
              >
                <span class="material-symbols-outlined"> border_color </span>
              </button>
            </div>

            <!-- Delete Dorm -->
            <div class="pl-1 pr-3 py-3 w-1/5 xl:pb-0">
              <button
                @click="confirmDelete = true"
                class="btn btn-accent w-full duration-300 ease-in-out"
              >
                <span class="material-symbols-outlined"> delete </span>
              </button>
            </div>
            <vs-dialog width="550px" not-center v-model="confirmDelete">
              <template #header>
                <h4 class="not-margin">
                  คุณกำลังจะลบหอพัก : <b>{{ dorm.name }}</b>
                </h4>
              </template>

              <div class="con-content">
                <ul>
                  <li>ข้อกำหนดในการลบหอพัก :</li>
                  <li>
                    1. สถานะการจองห้องพักทั้งหมดต้องเป็น "ยืนยันการโอน" หรือ
                    "ยกเลิก" เท่านั้น
                  </li>
                  <li>2. ข้อมูลที่ถูกลบไปเเล้วจะไม่สามารถกู้คืนได้</li>
                  <li>คุณยืนยันในการลบหรือไม่?</li>
                </ul>
              </div>

              <template #footer>
                <div class="con-footer">
                  <vs-button @click="deleteDorm" transparent> Ok </vs-button>
                  <vs-button @click="confirmDelete = false" dark transparent>
                    Cancel
                  </vs-button>
                </div>
              </template>
            </vs-dialog>
          </div>
        </div>
      </div>

      <!-- Mobile to Ipad -->
      <div
        @click="dormInfo()"
        class="flex items-center justify-end w-0 xl:hidden"
      >
        <span class="material-symbols-outlined"> arrow_forward_ios </span>
      </div>

      <!-- Permission Button: mobile to Ipad -->
      <div
        class="w-full lg:hidden"
        v-if="
          $store.state.userAccount.role == 'Owner' &&
          $route.path.includes('dormList/owner')
        "
      >
        <div class="flex flex-row w-full">
          <!-- Edit Dorm -->
          <div class="w-3/4 pl-3 pr-1 py-3">
            <button
              v-if="
                $store.state.userAccount.role == 'Owner' &&
                $route.path.includes('dormList/owner')
              "
              @click="dormInfo('edit')"
              class="btn btn-warning w-full duration-300 ease-in-out"
            >
              <span class="material-symbols-outlined"> border_color </span>
            </button>
          </div>

          <!-- Delete Dorm -->
          <div class="w-1/4 pl-1 pr-3 py-3">
            <button
              v-if="
                $store.state.userAccount.role == 'Owner' &&
                $route.path.includes('dormList/owner')
              "
              @click="confirmDelete = true"
              class="btn btn-accent w-full duration-300 ease-in-out"
            >
              <span class="material-symbols-outlined"> delete </span>
            </button>
          </div>
          <vs-dialog width="550px" not-center v-model="confirmDelete">
            <template #header>
              <h4 class="not-margin">
                คุณกำลังจะลบหอพัก : <b>{{ dorm.name }}</b>
              </h4>
            </template>

            <div class="con-content">
              <ul>
                <li>ข้อกำหนดในการลบหอพัก :</li>
                <li>
                  1. สถานะการจองห้องพักทั้งหมดต้องเป็น "ยืนยันการโอน" หรือ
                  "ยกเลิก" เท่านั้น
                </li>
                <li>2. ข้อมูลที่ถูกลบไปเเล้วจะไม่สามารถกู้คืนได้</li>
                <li>คุณยืนยันในการลบหรือไม่?</li>
              </ul>
            </div>

            <template #footer>
              <div class="con-footer">
                <vs-button @click="deleteDorm" transparent> Ok </vs-button>
                <vs-button @click="confirmDelete = false" dark transparent>
                  Cancel
                </vs-button>
              </div>
            </template>
          </vs-dialog>
        </div>
      </div>

      <!-- 1440px to 4k -->
      <div class="hidden xl:flex xl:w-1/3 xl:items-end border-l">
        <div class="w-full flex flex-col p-5">
          <!-- Room remainning -->
          <div class="flex justify-end items-center">
            <div class="badge badge-accent">
             มีห้องว่าง {{ dorm.rooms.filter((x) => x.status == "ว่าง").length }} ห้อง
            </div>
          </div>
          <!-- Beginning Price&Deposit -->
          <div
            class="text-xl text-imperialRed font-medium flex flex-col justify-end py-5"
          >
            <div class="flex justify-end">
              <span class="text-gray-400"
                ><span class="text-xs">เริ่มต้นที่</span> ฿&nbsp;</span
              >
              {{ minPrice }} - {{ maxPrice }}
            </div>
            <div class="flex justify-end">
              <span class="text-black text-xs"
                >ค่าจองเริ่มต้นที่ ฿
                <span class="text-error"
                  >{{ minDeposit }} - {{ maxDeposit }}</span
                >
              </span>
            </div>
          </div>

          <div>
            <button
              @click="dormInfo()"
              class="btn btn-primary w-full duration-300 ease-in-out hover:shadow-xl"
            >
              รายละเอียดเพิ่มเติม
              <span class="material-symbols-outlined"> arrow_forward_ios </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "AllDormInfo",
  props: ["dorm"],
  data() {
    return {
      checkDormImg: this.$props.dorm != null,
      rand: Math.random(),
      confirmDelete: false,
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
    async deleteDorm() {
      const loading = this.$vs.loading();
      try {
        await this.$axios.$delete(
          `${this.$store.state.Backend_URL}/dorm/${this.dorm.dormId}`,
          {
            withCredentials: true,
          }
        );
        const noti = this.$vs.notification({
          progress: "auto",
          icon: `<i class='bx bx-folder-open' ></i>`,
          color: "success",
          position: "top-right",
          title: `ลบหอพักเรียบร้อย`,
          text: `หอพัก ${this.dorm.name} ได้ถูกลบเเล้ว`,
        });
        loading.close();
      } catch (error) {
        loading.close();
        const noti = this.$vs.notification({
          progress: "auto",
          icon: `<i class='bx bx-folder-open' ></i>`,
          color: "warn",
          position: "top-right",
          title: `Data Update`,
          text: error.response.data.error.message,
        });
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
