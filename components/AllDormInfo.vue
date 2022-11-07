<template>
  <!-- Using in dormList page -->
  <div>
    <div
      @click="dormInfo()"
      class="flex flex-row w-full rounded-lg shadow border my-2 hover:shadow-xl hover:duration-300"
    >
      <!-- Img -->
      <div v-if="checkDormImg" class="relative float-left w-2/5 xl:w-1/3">
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
          class="h-full object-cover md:w-full md:max-h-40 lg:max-h-72"
        />
      </div>

      <!-- Error Img -->
      <div v-else class="relative float-left w-2/5 xl:w-1/3">
        <img
          src="@/assets/error/noData.png"
          class="h-full object-cover md:w-full md:max-h-40 lg:max-h-72"
          alt="No Image"
        />
      </div>

      <!-- Info -->
      <div class="p-2 w-3/5 md:flex md:flex-col xl:py-5 xl:1/3">
        <h2 class="font-bold text-celadonBlue xl:text-2xl">
          {{ dorm.name }}
        </h2>
        <div class="flex py-2 text-gray-500 md:py-5 xl:text-sm">
          <span class="material-symbols-outlined">location_on</span>
          <p class="text-xs px-1 md:pr-44 xl:flex xl:items-center">
            {{ dorm.address }}
          </p>
        </div>
        <div class="flex xl:hidden">
          <div class="text-2xl ml-auto text-imperialRed font-medium lg:ml-0">
            <span class="text-gray-400 text-xs">฿</span> {{ minPrice }}
          </div>
        </div>
        <!-- Permission Button -->
        <div
          class="flex flex-wrap md:flex-row"
          v-if="
            $store.state.userAccount.role == 'Owner' &&
            $route.path.includes('dormList/owner')
          "
        >
          <div class="w-full lg:w-1/2">
            <button
              v-if="
                $store.state.userAccount.role == 'Owner' &&
                $route.path.includes('dormList/owner')
              "
              @click="dormInfo('edit')"
              class="btn btn-accent w-full duration-300 ease-in-out"
            >
              เเก้ไขข้อมูลหอพัก
            </button>
            <button
              v-if="
                $store.state.userAccount.role == 'Owner' &&
                $route.path.includes('dormList/owner')
              "
              @click="confirmDelete = true"
              class="btn btn-accent w-full duration-300 ease-in-out"
            >
              ลบหอพักนี้
            </button>
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
          <!-- <div class="w-full lg:w-1/2">
            <button
              @click="dormInfo()"
              class="hidden lg:block btn btn-primary w-full duration-300 ease-in-out"
            >
              รายละเอียดทั้งหมด
            </button>
          </div> -->
        </div>
      </div>
      <!-- Mobile to Ipad -->
      <div class="flex items-center xl:hidden">
        <span class="material-symbols-outlined"> arrow_forward_ios </span>
      </div>

      <!-- 1440px to 4k -->
      <div class="hidden xl:flex xl:w-1/3 xl:items-end border-l">
        <div class="w-full flex flex-col p-5">
			<div class="text-2xl text-imperialRed font-medium flex justify-end py-5">
			<span class="text-gray-400">฿&nbsp;</span> {{ minPrice }}
			</div>
			<div>
				<button
				@click="dormInfo()"
				class="btn btn-primary w-full duration-300 ease-in-out hover:shadow-xl"
				>
				เลือกห้องพัก
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
  },
};
</script>
