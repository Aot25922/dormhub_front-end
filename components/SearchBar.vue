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

    <!-- Advance Filter Button -->
    <div class="w-full flex items-end py-3 md:w-1/2">
      <button
        @click="advanceFilter = !advanceFilter"
        class="btn btn-secondary w-full"
      >
        ตัวเลือกเพิ่มเติม<span class="material-symbols-outlined"> build </span>
      </button>
    </div>
    <div v-if="advanceFilter" class="md:flex md:flex-wrap">
      <!--pricePerMonth Filter-->
      <div class="py-2 md:px-2 md:w-1/2">
        <h1 class="font-bold p-1">ราคาห้องพักต่อเดือน</h1>
        <div class="flex">
          <input
            v-model="minPrice"
            type=" number"
            class="input w-full border-x-0 border-t-0 border-b-gray-400"
            min="1"
            max="100000"
            placeholder="3000"
          />
          <h1 class="px-1 flex items-center">-</h1>
          <input
            v-model="maxPrice"
            type=" number"
            class="input w-full border-x-0 border-t-0 border-b-gray-400"
            min="1"
            max="100000"
            placeholder="100000"
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
            min="1"
            max="100000"
            placeholder="3000"
          />
          <h1 class="px-1 flex items-center">-</h1>
          <input
            v-model="maxDeposit"
            type=" number"
            class="input w-full border-x-0 border-t-0 border-b-gray-400"
            min="1"
            max="100000"
            placeholder="100000"
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
            min="0.01"
            max="50"
            placeholder="0.01"
          />
          <h1 class="px-1 flex items-center">-</h1>
          <input
            v-model="maxElecPerUnit"
            type=" number"
            class="input w-full border-x-0 border-t-0 border-b-gray-400"
            min="0.01"
            max="50"
            placeholder="50.00"
          />
        </div>
      </div>

      <!--waterPermonth Filter-->
      <div class="py-2 md:px-2 md:w-1/2">
        <h1 class="font-bold p-1">ค่าน้ำต่อหน่วย</h1>
        <div class="flex">
          <input
            v-model="minWaterPerUnit"
            type=" number"
            class="input w-full border-x-0 border-t-0 border-b-gray-400"
            min="0.01"
            max="50"
            placeholder="0.01"
          />
          <h1 class="px-1 flex items-center">-</h1>
          <input
            v-model="maxWaterPerUnit"
            type=" number"
            class="input w-full border-x-0 border-t-0 border-b-gray-400"
            min="0.01"
            max="50"
            placeholder="50.00"
          />
        </div>
      </div>

      <!--area Filter-->
      <div class="py-2 md:px-2 md:w-1/2">
        <h1 class="font-bold p-1">ขนาดห้องพัก</h1>
        <div class="flex">
          <input
            v-model="minArea"
            type=" number"
            class="input w-full border-x-0 border-t-0 border-b-gray-400"
            min="1"
            max="999.99"
            placeholder="20"
          />
          <h1 class="px-1 flex items-center">-</h1>
          <input
            v-model="maxArea"
            type=" number"
            class="input w-full border-x-0 border-t-0 border-b-gray-400"
            min="1"
            max="999.99"
            placeholder="999.99"
          />
        </div>
      </div>

      <!--roomTypeDes Filter-->
      <div class="py-2 md:px-2 md:w-1/2">
        <h1 class="font-bold p-1">ข้อมูลห้องพักเพิ่มเติม</h1>
        <input
          v-model="roomTypeDes"
          type=" text"
          class="input w-full border-x-0 border-t-0 border-b-gray-400"
          placeholder="เล็ก ใหญ่ ทั่วไป รวม"
        />
      </div>
    </div>
    <div class="py-3 w-full flex flex-wrap md:py-0 md:mt-10">
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
        <div class="w-1/2">
          <button @click="searchDorm(true)" class="btn btn-ghost w-full mb-5">
            <span class="material-icons">clear</span>ล้างการกรอง
          </button>
        </div>
        <div class="w-1/2">
          <button @click="searchDorm(false)" class="btn btn-primary w-full">
            ค้นหา
          </button>
        </div>
      </div>
      <div v-else class="w-full">
        <button @click="searchDorm(false)" class="btn btn-primary w-full">
          <span class="material-symbols-outlined"> search </span>ค้นหา
        </button>
      </div>
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
      minPrice: null,
      maxPrice: null,
      minDeposit: null,
      maxDeposit: null,
      minElecPerUnit: null,
      maxElecPerUnit: null,
      minWaterPerUnit: null,
      maxWaterPerUnit: null,
      minArea: null,
      maxArea: null,
      roomTypeDes: "",
      advanceFilter: false,
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
          this.selectedSubDistrict == "" &&
          this.minPrice == null &&
          this.maxPrice == null &&
          this.minDeposit == null &&
          this.maxDeposit == null &&
          this.minElecPerUnit == null &&
          this.maxElecPerUnit == null &&
          this.minWaterPerUnit == null &&
          this.maxWaterPerUnit == null &&
          this.minArea == null &&
          this.maxArea == null &&
          this.roomTypeDes == "" &&
          !this.advanceFilter)
      ) {
        loading.close();
        this.$store.commit("SET_SEARCH", null);
        await this.$store.dispatch("fetchDormList", 0);
        if (this.$route.path == "/") {
          this.$router.push({
            name: "dormList",
          });
        }
        this.search = "";
        this.selectedRegion = "";
        this.selectedProvince = "";
        this.selectedDistrict = "";
        this.selectedSubDistrict = "";
        this.minPrice = null;
        this.maxPrice = null;
        this.minDeposit = null;
        this.maxDeposit = null;
        this.minElecPerUnit = null;
        this.maxElecPerUnit = null;
        this.minWaterPerUnit = null;
        this.maxWaterPerUnit = null;
        this.minArea = null;
        this.maxArea = null;
        this.roomTypeDes = "";
        this.advanceFilter = false;
      } else {
        if (this.$route.path == "/") {
          this.$router.push({
            name: "dormList",
          });
        }
        let existedSearchData = {
          search: this.search,
          addressOption: this.$store.state.addressOption,
          selectedRegion: this.selectedRegion,
          selectedProvince: this.selectedProvince,
          selectedDistrict: this.selectedDistrict,
          selectedSubDistrict: this.selectedSubDistrict,
          minPrice: this.minPrice,
          maxPrice: this.maxPrice,
          minDeposit: this.minDeposit,
          maxDeposit: this.maxDeposit,
          minElecPerUnit: this.minElecPerUnit,
          maxElecPerUnit: this.maxElecPerUnit,
          minWaterPerUnit: this.minWaterPerUnit,
          maxWaterPerUnit: this.maxWaterPerUnit,
          minArea: this.minArea,
          maxArea: this.maxArea,
          roomTypeDes: this.roomTypeDes,
          advanceFilter: this.advanceFilter,
        };
        this.$store.commit("SET_SEARCH", existedSearchData);
        this.$store.dispatch("fetchDormList", 0);
        loading.close();
      }
    },
  },
  created() {
    if (this.$store.state.searchData) {
      let searchData = this.$store.state.searchData;
      this.search = searchData.search;
      this.addressOption = searchData.addressOption;
      this.selectedRegion = searchData.selectedRegion;
      this.selectedProvince = searchData.selectedProvince;
      this.selectedDistrict = searchData.selectedDistrict;
      this.selectedSubDistrict = searchData.selectedSubDistrict;
      this.minPrice = searchData.minPrice;
      this.maxPrice = searchData.maxPrice;
      this.minDeposit = searchData.minDeposit;
      this.maxDeposit = searchData.maxDeposit;
      this.minElecPerUnit = searchData.minElecPerUnit;
      this.maxElecPerUnit = searchData.maxElecPerUnit;
      this.minWaterPerUnit = searchData.minWaterPerUnit;
      this.maxWaterPerUnit = searchData.maxWaterPerUnit;
      this.minArea = searchData.minArea;
      this.maxArea = searchData.maxArea;
      this.roomTypeDes = searchData.roomTypeDes;
      this.advanceFilter = searchData.advanceFilter;
    }
  },
};
</script>
