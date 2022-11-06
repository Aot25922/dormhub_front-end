<template>
  <!--  Search Bar with filer -->
  <div class="bg-white p-5 shadow rounded-xl md:flex md:flex-wrap md:p-8">
    <div class="py-2 md:px-2 md:w-1/2">
      <h1 class="font-bold p-1">ค้นหาหอพักที่ต้องการ</h1>
      <input
        v-model="search"
        type="text"
        class="input w-full border-x-0 border-t-0 border-b-gray-400"
        placeholder="ค้นหาหอพัก..."
      />
    </div>

    <!--เลือกภูมิภาค-->
    <div class="py-2 md:px-2 md:w-1/4">
      <p class="font-bold p-1">ภูมิภาค</p>
      <select
        class="select border-x-0 border-t-0 border-b-gray-400 w-full"
        v-model="selectedRegion"
        @change="
          selectedProvince = '';
          selectedDistrict = '';
          selectedSubDistrict = '';
        "
      >
        <option disabled selected value="">เลือกภูมิภาค</option>
        <option
          v-for="option in this.addressOption"
          :value="option"
          :key="option.geographiesId"
        >
          {{ option.name }}
        </option>
      </select>
    </div>

    <!--เลือกจังหวัด-->
    <div class="py-2 md:px-2 md:w-1/4">
      <p class="font-bold p-1">จังหวัด</p>
      <select
        class="select border-x-0 border-t-0 border-b-gray-400 w-full"
        v-model="selectedProvince"
        @change="
          selectedDistrict = '';
          selectedSubDistrict = '';
        "
      >
        <option v-if="selectedRegion == ''" value="" disabled selected>
          กรุณาเลือกเลือกภูมิภาคก่อน
        </option>
        <option disabled selected value="" v-if="selectedRegion != ''">
          เลือกจังหวัด
        </option>
        <option
          v-for="option in selectedRegion.provinces"
          :value="option"
          :key="option.provincesId"
        >
          {{ option.name_th }}
        </option>
      </select>
    </div>

    <!--เลือกเขต/อำเภอ-->
    <div class="py-2 md:px-2 md:w-1/4">
      <p class="font-bold p-1">เขต/อำเภอ</p>
      <select
        v-model="selectedDistrict"
        class="select border-x-0 border-t-0 border-b-gray-400 w-full"
        @change="selectedSubDistrict = ''"
      >
        <option v-if="selectedProvince == ''" value="" disabled selected>
          กรุณาเลือกจังหวัดก่อน
        </option>
        <option v-if="selectedProvince != ''" value="" disabled selected>
          เลือกเขต/อำเภอ
        </option>
        <option
          v-for="option in selectedProvince.districts"
          :value="option"
          :key="option.districtsId"
        >
          {{ option.name_th }}
        </option>
      </select>
    </div>

    <div class="py-2 md:px-2 md:w-1/4">
      <p class="font-bold p-1">แขวง/ตำบล</p>
      <select
        v-model="selectedSubDistrict"
        class="select border-x-0 border-t-0 border-b-gray-400 w-full"
      >
        <option v-if="selectedDistrict == ''" value="" disabled selected>
          กรุณาเลือกเขต/อำเภอก่อน
        </option>
        <option v-if="selectedDistrict != ''" value="" disabled selected>
          เลือกแขวง/อำเภอ
        </option>
        <option
          v-for="option in selectedDistrict.subDistricts"
          :value="option"
          :key="option.subDistrictsId"
        >
          {{ option.name_th }}
        </option>
      </select>
    </div>

    <div
      class="py-3 w-full md:py-0 md:mt-10 md:w-1/2 md:px-2 md:flex md:flex-wrap"
    >
      <div
        class="w-full flex flex-wrap"
        v-if="
          search ||
          selectedRegion ||
          selectedProvince ||
          selectedDistrict ||
          selectedSubDistrict
        "
      >
        <div class="w-full md:w-1/2">
          <button @click="searchDorm(true)" class="btn btn-ghost w-full mb-5">
            <span class="material-icons">clear</span>ล้างการกรอง
          </button>
        </div>
        <div class="w-full md:w-1/2">
          <button @click="searchDorm(false)" class="btn btn-primary w-full">
            ค้นหา
          </button>
        </div>
      </div>
      <div v-else class="w-full">
        <button @click="searchDorm(false)" class="btn btn-primary w-full">
          ค้นหา
        </button>
      </div>
    </div>
     <!--pricePerMonth Filter-->
    <div class="py-2 md:px-2 md:w-1/2">
      <h1 class="font-bold p-1">ราคาห้องพักต่อเดือน</h1>
      <div class="flex">
        <input
          v-model="minPrice"
          type=" number"
          class="input w-full border-x-0 border-t-0 border-b-gray-400"
          placeholder="0"
        />
        <h1>-</h1>
        <input
          v-model="maxPrice"
          type=" number"
          class="input w-full border-x-0 border-t-0 border-b-gray-400"
          placeholder="0"
        />
      </div>
    </div>

    <!--Deposit Filter-->
    <div class="py-2 md:px-2 md:w-1/2">
      <h1 class="font-bold p-1">ราคาค่าจองห้องพัก</h1>
      <div class="flex">
        <input
          v-model="minDeposit"
          type=" number"
          class="input w-full border-x-0 border-t-0 border-b-gray-400"
          placeholder="0"
        />
        <h1>-</h1>
        <input
          v-model="maxDeposit"
          type=" number"
          class="input w-full border-x-0 border-t-0 border-b-gray-400"
          placeholder="0"
        />
      </div>
    </div>

    <!--electricPermonth Filter-->
    <div class="py-2 md:px-2 md:w-1/2">
      <h1 class="font-bold p-1">ค่าไฟต่อหน่วย</h1>
      <div class="flex">
        <input
          v-model="minElecPerUnit"
          type=" number"
          class="input w-full border-x-0 border-t-0 border-b-gray-400"
          placeholder="0"
        />
        <h1>-</h1>
        <input
          v-model="maxElecPerUnit"
          type=" number"
          class="input w-full border-x-0 border-t-0 border-b-gray-400"
          placeholder="0"
        />
      </div>
    </div>

    <!--waterPermonth Filter-->
    <div class="py-2 md:px-2 md:w-1/2 flex">
      <h1 class="font-bold p-1">ค่าน้ำต่อหน่วย</h1>
      <div class="flex">
        <input
          v-model="minWaterPerUnit"
          type=" number"
          class="input w-full border-x-0 border-t-0 border-b-gray-400"
          placeholder="0"
        />
        <h1>-</h1>
        <input
          v-model="maxWaterPerUnit"
          type=" number"
          class="input w-full border-x-0 border-t-0 border-b-gray-400"
          placeholder="0"
        />
      </div>
    </div>

    <!--area Filter-->
    <div class="py-2 md:px-2 md:w-1/2 flex">
      <h1 class="font-bold p-1">ขนาดห้องพัก</h1>
      <div class="flex">
        <input
          v-model="minArea"
          type=" number"
          class="input w-full border-x-0 border-t-0 border-b-gray-400"
          placeholder="0"
        />
        <h1>-</h1>
        <input
          v-model="maxArea"
          type=" number"
          class="input w-full border-x-0 border-t-0 border-b-gray-400"
          placeholder="0"
        />
      </div>
    </div>

    <!--roomTypeDes Filter-->
    <div class="py-2 md:px-2 md:w-1/2 flex">
      <h1 class="font-bold p-1">ข้อมูลห้องพักเพิ่มเติม</h1>
      <input
        v-model="roomTypeDes"
        type=" text"
        class="input w-full border-x-0 border-t-0 border-b-gray-400"
        placeholder="พัดลม ทีวี เเอร์"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      search: "",
      addressOption: this.$store.state.addressOption,
      selectedRegion: "",
      selectedProvince: "",
      selectedDistrict: "",
      selectedSubDistrict: "",
      minPrice: 0,
      maxPrice: 0,
      minDeposit: 0,
      maxDeposit: 0,
      minElecPerUnit: 0,
      maxElecPerUnit: 0,
      minWaterPerUnit: 0,
      maxWaterPerUnit: 0,
      minArea: 0,
      maxArea: 0,
      roomTypeDes: "",
      advanceFilter:false
    };
  },
  methods: {
    async searchDorm(clearFilter) {
      const loading = this.$vs.loading();
      if (
        clearFilter ||
        (this.search == "" &&
          this.selectedRegion == "" &&
          this.selectedProvince == "" &&
          this.selectedDistrict == "" &&
          this.selectedSubDistrict == "" && this.advanceFilter)
      ) {
        this.search = "";
        this.selectedRegion = "";
        this.selectedProvince = "";
        this.selectedDistrict = "";
        this.selectedSubDistrict = "";
        let existedSearchData = {
          search: this.search,
          region: this.selectedRegion,
          province: this.selectedProvince,
          district: this.selectedDistrict,
          subDistrict: this.selectedSubDistrict,
        };
        try {
          let data = await this.$axios.$get(
            `${this.$store.state.Backend_URL}/dorm`,
            {
              withCredentials: true,
            }
          );
          loading.close();
          this.$store.commit("SET_DORMLIST", data);
          if (this.$route.path == "/") {
            this.$router.push({
              name: "dormList",
              params: { search: existedSearchData },
            });
          }
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
      } else {
        let searchData = {
          search: this.search,
          region: this.selectedRegion.name,
          province: this.selectedProvince.name_th,
          district: this.selectedDistrict.name_th,
          subDistrict: this.selectedSubDistrict.name_th,
          roomTypeDes:this.roomTypeDes,
          elecPerUnit: this.maxElecPerUnit != 0 ? [this.minElecPerUnit,this.maxElecPerUnit] : null,
          waterPerUnit: this.maxWaterPerUnit != 0 ? [this.minWaterPerUnit,this.maxWaterPerUnit] : null,
          price: this.maxPrice != 0 ? [this.minPrice,this.maxPrice] : null,
          deposit: this.maxDeposit != 0 ? [this.minDeposit,this.maxDeposit] : null,
          area: this.maxArea != 0 ? [this.minArea,this.maxArea] : null
        };
        let formData = new FormData();
        formData.append("data", JSON.stringify(searchData));
        let existedSearchData = {
          search: this.search,
          region: this.selectedRegion,
          province: this.selectedProvince,
          district: this.selectedDistrict,
          subDistrict: this.selectedSubDistrict,
        };
        try {
          let data = await this.$axios.$post(
            `${this.$store.state.Backend_URL}/dorm/search`,
            formData,
            {
              withCredentials: true,
            }
          );
          loading.close();
          this.$store.commit("SET_DORMLIST", data);
          if (this.$route.path == "/") {
            this.$router.push({
              name: "dormList",
              params: { search: existedSearchData },
            });
          }
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
      }
    },
  },
  created() {
    if (this.$router.history.current.params.search) {
      let oldSearchData = this.$router.history.current.params.search;
      this.search = oldSearchData.search;
      this.selectedRegion = oldSearchData.region;
      this.selectedProvince = oldSearchData.province;
      this.selectedDistrict = oldSearchData.district;
      this.selectedSubDistrict = oldSearchData.subDistrict;
    }
  },
};
</script>
