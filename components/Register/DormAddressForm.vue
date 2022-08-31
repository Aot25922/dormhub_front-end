<template>
  <div div class="p-3 rounded-lg my-3 md:p-5 md:flex md:flex-wrap">
    <h1 class="text-lg ml-2 mb-2 font-bold md:w-full">สถานที่ตั้งหอพัก</h1>
    <div class="mb-5 md:px-1 md:w-1/2 lg:w-1/3">
      <label class="label-text text-gray-500 tracking-wide font-bold my-2">เลขที่/เลขห้อง <span class="text-imperialRed">*</span></label>
      <input v-model="address.number"
        class="py-4 px-2 w-full input input-sm md:input-md rounded"
        placeholder="999/999"
        @blur="checkForm" />
      <p class="text-imperialRed text-right" v-if="!validateNumber">กรุณาใส่เลขที่/เลขห้อง</p>
    </div>

    <div class="mb-5 md:px-1 md:w-1/2 lg:w-1/3">
      <label class="label-text text-gray-500 tracking-wide font-bold my-2">ถนน <span class="text-imperialRed">*</span></label>
      <input v-model="address.street" class="py-4 px-2 w-full input input-sm md:input-md rounded" placeholder="ถนนของเรา" @blur="checkForm" />
      <p class="text-imperialRed text-right" v-if="!validateStreet">กรุณาใส่ถนน</p>
    </div>

    <div class="mb-5 md:px-1 md:w-1/2 lg:w-1/3">
      <label class="label-text text-gray-500 tracking-wide font-bold my-2">ซอย</label>
      <input v-model="address.alley" class="py-4 px-2 w-full input input-sm md:input-md rounded" placeholder="69" />
    </div>

    <div class="mb-5 md:px-1 md:w-1/2 lg:w-1/4">
      <label class="label-text text-gray-500 tracking-wide font-bold my-2">ภูมิภาค <span class="text-imperialRed">*</span></label>
      <select v-model="selectedRegion" class="select w-full text-gray-500 border-0"
        @change="selectedProvince = null; selectedDistrict = null; selectedsubDistrict = null; zipCode = null; checkForm();">
        <option option disabled selected>กรุณาเลือกภูมิภาค</option>
        <option v-for="option in this.addressOption" :value="option" :key="option.regions">
          {{ option.regions }}
        </option>
      </select>
      <p class="text-imperialRed text-right" v-if="!validateRegion">กรุณาเลือกภูมิภาค</p>
    </div>

    <div class="mb-5 md:px-1 md:w-1/2 lg:w-1/4" v-if="selectedRegion">
      <label class="label-text text-gray-500 tracking-wide font-bold my-2">จังหวัด <span class="text-imperialRed">*</span></label>
      <select v-model="selectedProvince" class="select w-full text-gray-500 border-0"
        @change="selectedDistrict = null; selectedsubDistrict = null; zipCode = null; checkForm();">
        <option option disabled selected>กรุณาเลือกจังหวัด</option>
        <option
          v-for="option in selectedRegion.provinces"
          :value="option"
          :key="option">
          {{ option }}
        </option>
      </select>
      <p class="text-imperialRed text-right" v-if="!validateProvince">กรุณาเลือกจังหวัด</p>
    </div>

    <div class="mb-5 md:px-1 md:w-1/2 lg:w-1/4" v-if="selectedProvince">
      <label class="label-text text-gray-500 tracking-wide font-bold my-2">เขต/อำเภอ <span class="text-imperialRed">*</span></label>
      <select v-model="selectedDistrict" class="select w-full text-gray-500 border-0"
        @change=" selectedSubdistrict = null; zipCode = null; checkForm();">
        <option option disabled selected>กรุณาเลือกเขต/อำเภอ</option>
        <option
          v-for="option in selectedRegion.districts"
          :value="option"
          :key="option">
          {{ option }}
        </option>
      </select>
      <p class="text-imperialRed text-right" v-if="!validateDistrict">กรุณาเลือกเขต/อำเภอ</p>
    </div>

    <div class="mb-5 md:px-1 md:w-1/2 lg:w-1/4" v-if="selectedDistrict">
      <label class="label-text text-gray-500 tracking-wide font-bold my-2">แขวง/ตำบล <span class="text-imperialRed">*</span></label>
      <select v-model="selectedSubdistrict" class="select w-full text-gray-500 border-0"
        @change="zipCode = null; checkForm();">
        <option option disabled selected>กรุณาเลือกแขวง/ตำบล</option>
        <option v-for="option in selectedRegion.subDistricts" :value="option" :key="option.zip_code">
          {{ option.subDistrict }}
        </option>
      </select>
      <p class="text-imperialRed text-right" v-if="!validateSubdistrict">กรุณาเลือกเเขวง/ตำบล</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Address",
  async fetch() {
    let addressInfo = await this.$axios.$get(
      `${this.$store.state.Backend_URL}/address`
    );
    for (let i in addressInfo) {
      let provinceList = [];
      let districtList = [];
      let subDistrictList = [];
      for (let j in addressInfo[i].provinces) {
        provinceList.push(addressInfo[i].provinces[j].name_th);
        for (let k in addressInfo[i].provinces[j].districts) {
          districtList.push(addressInfo[i].provinces[j].districts[k].name_th);
          for (let l in addressInfo[i].provinces[j].districts[k].subDistricts) {
            subDistrictList.push({
              subDistrict:
                addressInfo[i].provinces[j].districts[k].subDistricts[l]
                  .name_th,
              zipCodeId:
                addressInfo[i].provinces[j].districts[k].subDistricts[l]
                  .zip_code,
            });
          }
        }
      }
      this.addressOption.push({
        regions: addressInfo[i].name,
        provinces: provinceList,
        districts: districtList,
        subDistricts: subDistrictList,
      });
    }
  },
  data() {
    return {
      addressOption: [],
      selectedDistrict: null,
      selectedSubdistrict: null,
      selectedRegion: null,
      selectedProvince: null,
      selectedZipCode: null,
      address: {
        number: "",
        street: "",
        alley: "",
      },
      validateNumber: false,
      validateStreet: false,
      validateDistrict: false,
      validateSubdistrict: false,
      validateRegion: false,
      validateProvince: false,
      disableForm: false,
    };
  },
  methods: {
    submit() {
      if (
        this.validateNumber &&
        this.validateStreet &&
        this.validateDistrict &&
        this.validateSubdistrict &&
        this.validateRegion &&
        this.validateProvince
      ) {
        console.log(this.selectedSubdistrict)
        this.address.zipCodeId = this.selectedSubdistrict.zipCodeId;
        this.address.district = this.selectedDistrict;
        this.address.region = this.selectedRegion.regions;
        this.address.province = this.selectedProvince;
        this.address.subDistrict = this.selectedSubdistrict.subDistrict;
        let newAddress = { ...this.address };
        this.$store.commit("SET_DORMADDRESS", newAddress);
        this.disableForm = true;
        this.$emit("validate", true);
        const noti = this.$vs.notification({
          progress: "auto",
          icon: `<i class='bx bx-folder-open' ></i>`,
          color: "success",
          position: "top-right",
          title: `Data Update`,
          text: `Add you dorm address data complete!`,
        });
      } else {
        this.$emit("validate", false);
        const noti = this.$vs.notification({
          progress: "auto",
          icon: `<i class='bx bx-error' ></i>`,
          color: "warn",
          position: "top-right",
          title: "Form data not complete",
          text: "Please, input all data in field",
        });
      }
    },
    checkForm() {
      this.validateNumber = this.address.number != "" ? true : false;
      this.validateStreet = this.address.street != "" ? true : false;
      this.validateDistrict = this.selectedDistrict != null ? true : false;
      this.validateSubdistrict =
        this.selectedSubdistrict != null ? true : false;
      this.validateRegion = this.selectedRegion != null ? true : false;
      this.validateProvince = this.selectedProvince != null ? true : false;
    },
  },
};
</script>
