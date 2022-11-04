<template>
  <!-- Using in dormList page -->
  <div>
    <div class="card w-full shadow-xl my-5 md:card-side">
      <figure v-if="checkDormImg" class="relative md:w-1/2 lg:w-1/3">
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
          class="w-full h-full object-cover"
        />
      </figure>
      <figure v-else class="relative md:w-1/2 lg:w-1/3">
        <img
          src="https://placeimg.com/400/225/arch"
          class="h-full w-full object-cover"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">
          {{ dorm.name }}
        </h2>
        <div class="flex space-x-0 text-gray-500">
          <span class="material-icons">location_on</span>
          <p class="text-xs mt-1 px-1 lg:text-base">
            {{ dorm.address }}
          </p>
        </div>
        <div class="flex py-1 text-gray-500">
          <span class="material-icons">schedule</span>
          <div class="text-xs flex px-1 mt-1 lg:text-base">
            <h1 v-if="dorm.openTime != null">{{ dorm.openTime }}-</h1>
            <h1 v-if="dorm.closeTime != null">&nbsp;{{ dorm.closeTime }} น.</h1>
            <h1 v-if="dorm.openTime != null && dorm.closeTime == null">
              เปิด {{ dorm.openTime }} น.
            </h1>
            <h1 v-if="dorm.openTime == null && dorm.closeTime != null">
              ปิด {{ dorm.closeTime }} น.
            </h1>
            <span v-if="dorm.openTime == null && dorm.closeTime == null"
              >ไม่มีข้อมูล</span
            >
          </div>
        </div>
        <div class="flex py-1 text-gray-500">
          <span class="material-icons">local_offer</span>
          <div
            class="text-xs px-1 mt-1 lg:text-base"
            v-if="minPrice != maxPrice"
          >
            {{ minPrice }} ถึง {{ maxPrice }} บาท<span
              class="text-gray-400 font-normal"
              >/ เดือน</span
            >
          </div>
          <div class="text-xs px-1 mt-1 lg:text-base" v-else>
            {{ minPrice }} บาท<span class="text-gray-400 font-normal"
              >/ เดือน</span
            >
          </div>
        </div>
        <div class="flex flex-wrap md:flex-row">
          <div class="w-full p-1 lg:w-1/2">
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
                  <vs-button @click="deleteDorm" transparent>
                    Ok
                  </vs-button>
                  <vs-button @click="confirmDelete = false" dark transparent>
                    Cancel
                  </vs-button>
                </div>
              </template>
            </vs-dialog>
          </div>
          <div class="w-full p-1 lg:w-1/2">
            <button
              @click="dormInfo()"
              class="btn btn-primary w-full duration-300 ease-in-out"
            >
              รายละเอียดทั้งหมด
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
      try{
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
      }catch(error){
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
