<template>
  <!-- Using in dormList page -->
  <div>
    <div class="allDorm-card">
      <!-- Img -->
      <div @click="dormInfo()" v-if="checkDormImg" class="allDorm-clickImg">
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
          class="allDorm-imgSize"
        />
      </div>

      <!-- Error Img -->
      <div @click="dormInfo()" v-else class="allDorm-clickImg">
        <img
          src="@/assets/error/noData.png"
          class="allDorm-imgSize"
          alt="No Image"
        />
      </div>

      <!-- Info -->
      <div class="allDorm-desDorm">
        <!-- Dorm name -->
        <h2 @click="dormInfo()" class="allDorm-h2">
          {{ dorm.name }}
        </h2>
        <!-- Address -->
        <div @click="dormInfo()" class="allDorm-contAddr">
          <span class="material-symbols-outlined">location_on</span>
          <p class="allDorm-Addr">
            {{ dorm.address }}
          </p>
        </div>

        <!-- Water&Electric -->
        <div @click="dormInfo()" class="allDorm-contParentWE">
          <!-- Water Per Unit -->
          <div class="allDorm-contWE">
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
          <div class="allDorm-contWE">
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
        <div @click="dormInfo()" class="allDorm-roomRem">
          <div class="badge badge-accent">
            <div>
              มีห้องว่าง
              {{ dorm.rooms.filter((x) => x.status == "ว่าง").length }} ห้อง
            </div>
            <!-- <div v-else>ไม่มีห้องว่างเหลือแล้ว!</div> -->
          </div>
        </div>

        <!-- Beginning Price&Deposit Mobile to Ipad -->
        <div class="flex flex-col xl:hidden">
          <div @click="dormInfo()" class="allDorm-dep">
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
                class="allDorm-ownerbtn btn-warning"
              >
                <span class="material-symbols-outlined"> border_color </span>
              </button>
            </div>

            <!-- Delete Dorm -->
            <div class="pl-1 pr-3 py-3 w-1/5 xl:pb-0">
              <button
                @click="confirmDelete = true"
                class="allDorm-ownerbtn btn-accent"
              >
                <span class="material-symbols-outlined"> delete </span>
              </button>
            </div>
            <!-- Dialog Pop Up -->
            <vs-dialog class="font-Kanit" not-center v-model="confirmDelete">
              <template #header>
                <h4>
                  คุณกำลังจะลบหอพัก : <b>{{ dorm.name }}</b>
                </h4>
              </template>

              <div class="con-content">
                <b>ข้อกำหนดในการลบหอพัก :</b>
                <ul class="list-inside list-decimal">
                  <li>
                    สถานะการจองห้องพักทั้งหมดต้องเป็น
                    <span class="font-medium">"ยืนยันการโอน"</span> หรือ
                    <span class="font-medium">"ยกเลิก"</span> เท่านั้น
                  </li>
                  <li>ข้อมูลที่ถูกลบไปเเล้วจะ<b>ไม่สามารถกู้คืนได้</b></li>
                </ul>
                <p>คุณยืนยันในการลบหรือไม่?</p>
              </div>

              <template #footer>
                <div class="con-footer flex justify-end">
                  <vs-button @click="deleteDorm" transparent>
                    ยืนยัน
                  </vs-button>
                  <vs-button @click="confirmDelete = false" dark transparent>
                    ยกเลิก
                  </vs-button>
                </div>
              </template>
            </vs-dialog>
          </div>
        </div>
      </div>

      <!-- Mobile to Ipad -->
      <div @click="dormInfo()" class="allDorm-arrrow">
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
              class="allDorm-ownerbtn btn-warning"
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
              class="allDorm-ownerbtn btn-accent"
            >
              <span class="material-symbols-outlined"> delete </span>
            </button>
            <!-- Dialog line at 136-163 -->
          </div>
        </div>
      </div>

      <!-- 1440px to 4k -->
      <div class="allDorm-cont">
        <div class="w-full flex flex-col p-5">
          <!-- Room remainning -->
          <div class="flex justify-end items-center">
            <div class="badge badge-accent">
              มีห้องว่าง
              {{ dorm.rooms.filter((x) => x.status == "ว่าง").length }} ห้อง
            </div>
          </div>
          <!-- Beginning Price&Deposit -->
          <div class="allDorm-priceDep">
            <div class="flex justify-end">
              <span class="text-gray-400"
                ><span class="text-xs md:text-sm">เริ่มต้นที่</span>
                ฿&nbsp;</span
              >
              {{ minPrice }} - {{ maxPrice }}
            </div>
            <div class="flex justify-end">
              <span class="text-black text-xs md:text-sm"
                >ค่าจองเริ่มต้นที่ ฿
                <span class="text-error"
                  >{{ minDeposit }} - {{ maxDeposit }}</span
                >
              </span>
            </div>
          </div>

          <div>
            <button @click="dormInfo()" class="allDorm-info">
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
