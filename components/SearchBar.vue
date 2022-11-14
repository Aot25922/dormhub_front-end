<template>
  <!--  Search Bar with filter -->
  <div class="bg-white p-5 shadow rounded-xl md:flex md:flex-wrap md:p-8">
    <div class="w-full py-2 md:px-2">
      <div class="pt-1 py-5 flex items-center">
        <span class="flex justify-start font-bold w-2/3 md:w-4/5">ค้นหาหอพักที่ต้องการ</span>
        <!-- Advance Filter Button -->
        <div class="flex w-1/3 md:w-1/4 xl:w-1/5">
          <button
            @click="advanceFilter = !advanceFilter"
            class="w-full flex justify-end items-center cursor-pointer hover:text-info hover:delay-100 hover:duration-300"
          >
            ตัวเลือกขั้นสูง<span class="material-symbols-outlined"> build </span>
          </button>
        </div>
      </div>
      <div class="flex w-full rounded-lg overflow-hidden">
        <div
          class="flex w-full border-b border-b-gray-400 shadow-md input px-0 border-x-0 border-t-0"
        >
          <input
            v-model="search"
            type="text"
            class="w-full border-0"
            placeholder="ค้นหาหอพัก..."
          />
          <button v-if="search" @click="searchDorm(true)" class="w-1/6 md:w-10">
            <span class="material-icons bg-transparent xl:w-10">clear</span>
          </button>
        </div>
        <button
          @click="searchDorm(false)"
          class="w-2/6 md:w-20 xl:w-24 bg-primary duration-300 delay-300"
        >
          <span class="material-symbols-outlined bg-transparent text-white">
            search
          </span>
        </button>
      </div>
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

    <div class="w-full py-3 flex justify-end">
      <!-- Clear Filter -->
      <div class="w-1/3 md:w-1/6">
        <button
          v-if="
            orderBy.length != 0 ||
            search ||
            selectedRegion ||
            selectedProvince ||
            selectedDistrict ||
            selectedSubDistrict ||
            haveFilter
          "
          @click="searchDorm(true)"
          class="w-full btn btn-secondary"
        >
          <span class="material-symbols-outlined"> mop </span>
        </button>
      </div>
    </div>

    <!-- Modal Advanced Filter -->
    <vs-dialog
      scroll
      overflow-hidden
      not-close
      auto-width
      v-model="advanceFilter"
      class="font-Kanit"
    >
      <template #header>
        <h3 class="font-bold py-3 text-lg flex items-center">
          การกรองขั้นสูง<span class="material-symbols-outlined"> build </span>
        </h3>
      </template>
      <div class="con-content flex flex-wrap">
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
        <!-- Multiple Filter -->
        <div class="w-full mt-5 md:px-1 md:w-1/2 lg:w-1/4">
          <h1 class="font-bold p-1">จัดลำดับโดย</h1>
          <vs-select
            class="w-full"
            filter
            multiple
            placeholder="กรองหลายทางเลือก"
            v-model="orderBy"
          >
            <vs-option-group>
              <div slot="title" class="text-sm text-black">จำนวนห้องพักที่ว่าง</div>
              <vs-option
                label="จำนวนห้องพักที่ว่าง(น้อย-มาก)"
                value='{"freeRoom":"ASC"}'
              >
                น้อย-มาก
              </vs-option>
              <vs-option
                label="จำนวนห้องพักที่ว่าง(มาก-น้อย)"
                value='{"freeRoom":"DESC"}'
              >
                มาก-น้อย
              </vs-option>
            </vs-option-group>
            <vs-option-group>
              <div slot="title" class="text-sm text-black">ชื่อ</div>
              <vs-option label="ชื่อ(น้อย-มาก)" value='{"name":"ASC"}'>
                น้อย-มาก
              </vs-option>
              <vs-option label="ชื่อ(มาก-น้อย)" value='{"name":"DESC"}'>
                มาก-น้อย
              </vs-option>
            </vs-option-group>
            <vs-option-group>
              <div slot="title" class="text-sm text-black">ที่อยู่</div>
              <vs-option label="ที่อยู่(น้อย-มาก)" value='{"address":"ASC"}'>
                น้อย-มาก
              </vs-option>
              <vs-option label="ที่อยู่(มาก-น้อย)" value='{"address":"DESC"}'>
                มาก-น้อย
              </vs-option>
            </vs-option-group>
            <vs-option-group>
              <div slot="title" class="text-sm text-black">ค่าไฟต่อหน่วย</div>
              <vs-option
                label="ค่าไฟต่อหน่วย(น้อย-มาก)"
                value='{"elecPerUnit":"ASC"}'
              >
                น้อย-มาก
              </vs-option>
              <vs-option
                label="ค่าไฟต่อหน่วย(มาก-น้อย)"
                value='{"elecPerUnit":"DESC"}'
              >
                มาก-น้อย
              </vs-option>
            </vs-option-group>
            <vs-option-group>
              <div slot="title" class="text-sm text-black">ค่าน้ำต่อหน่วย</div>
              <vs-option
                label="ค่าน้ำต่อหน่วย(น้อย-มาก)"
                value='{"waterPerUnit":"ASC"}'
              >
                น้อย-มาก
              </vs-option>
              <vs-option
                label="ค่าน้ำต่อหน่วย(มาก-น้อย)"
                value='{"waterPerUnit":"DESC"}'
              >
                มาก-น้อย
              </vs-option>
            </vs-option-group>
            <vs-option-group>
              <div slot="title" class="text-sm text-black">ค่าเช่าต่อเดือน</div>
              <vs-option
                label="ค่าเช่าต่อเดือน(น้อย-มาก)"
                value='{"price":"ASC"}'
              >
                น้อย-มาก
              </vs-option>
              <vs-option
                label="ค่าเช่าต่อเดือน(มาก-น้อย)"
                value='{"price":"DESC"}'
              >
                มาก-น้อย
              </vs-option>
            </vs-option-group>
            <vs-option-group>
              <div slot="title" class="text-sm text-black">ค่าจอง</div>
              <vs-option label="ค่าจอง(น้อย-มาก)" value='{"deposit":"ASC"}'>
                น้อย-มาก
              </vs-option>
              <vs-option label="ค่าจอง(มาก-น้อย)" value='{"deposit":"DESC"}'>
                มาก-น้อย
              </vs-option>
            </vs-option-group>
            <vs-option-group>
              <div slot="title" class="text-sm text-black">พื้นที่</div>
              <vs-option label="พื้นที่(น้อย-มาก)" value='{"area":"ASC"}'>
                น้อย-มาก
              </vs-option>
              <vs-option label="พื้นที่(มาก-น้อย)" value='{"area":"DESC"}'>
                มาก-น้อย
              </vs-option>
            </vs-option-group>
          </vs-select>
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
      <template #footer>
        <div class="con-footer flex justify-end">
          <vs-button
            @click="
              searchDorm(false);
              advanceFilter = false;
            "
            transparent
            cla
          >
            ยืนยัน
          </vs-button>
          <vs-button @click="advanceFilter = false" dark transparent>
            ยกเลิก
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      search: null,
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
      roomTypeDes: null,
      orderBy: [],
      advanceFilter: false,
      haveFilter: false,
    };
  },
  methods: {
    async searchDorm(clearFilter) {
      this.$emit("resetPage");
      const loading = this.$vs.loading();
      if (
        clearFilter ||
        (this.search == null &&
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
          this.roomTypeDes == null &&
          this.orderBy.length == 0 &&
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
        this.haveFilter = false;
        this.search = null;
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
        this.roomTypeDes = null;
        this.advanceFilter = false;
        this.orderBy = [];
      } else {
        if (this.$route.path == "/") {
          this.$router.push({
            name: "dormList",
          });
        }
        let newOrderBy = {};
        for (let i in this.orderBy) {
          Object.assign(newOrderBy, JSON.parse(this.orderBy[i]));
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
          orderBy: newOrderBy,
          oldOrderBy: this.orderBy,
          haveFilter: true,
        };
        this.haveFilter = true;
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
      this.orderBy = searchData.oldOrderBy;
      this.advanceFilter = false;
      this.haveFilter = searchData.haveFilter;
    }
  },
};
</script>
