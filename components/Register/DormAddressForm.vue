<template>
  <form class="px-3 md:px-20 lg:px-[335px]" @submit.prevent="submit">
    <div div class="bg-cream p-3 rounded-lg my-3">
      <h1 class="text-black text-lg ml-2 mb-2 font-bold">{{ msg }}</h1>
      <label
        for=""
        class="label-text text-gray-soil tracking-wide font-bold my-2"
        >เลขที่/เลขห้อง
      </label>
      <input
        v-model="address.number"
        class="
          py-4
          px-2
          mb-5
          w-full
          input input-sm
          rounded
          text-gray-soil
          bg-cream-light
          focus:outline-none focus:bg-cream-lightest focus:text-gray-soil
          border-none
        "
        placeholder="999/999"
        @blur="checkForm"
        :disabled="disableForm"
      />
      <p class="text-cancelButton text-right" v-if="!validateNumber">
        กรุณาใส่เลขที่/เลขห้อง
      </p>

      <label
        for=""
        class="label-text text-gray-soil tracking-wide font-bold my-2"
        >ถนน
      </label>
      <input
        v-model="address.street"
        class="
          py-4
          px-2
          mb-5
          w-full
          input input-sm
          rounded
          text-gray-soil
          bg-cream-light
          focus:outline-none focus:bg-cream-lightest focus:text-gray-soil
          border-none
        "
        placeholder="ถนนของเรา"
        @blur="checkForm"
        :disabled="disableForm"
      />
      <p class="text-cancelButton text-right" v-if="!validateStreet">
        กรุณาใส่ถนน
      </p>

      <label
        for=""
        class="label-text text-gray-soil tracking-wide font-bold my-2"
        >ซอย</label
      >
      <input
        v-model="address.alley"
        class="
          py-4
          px-2
          mb-5
          w-full
          input input-sm
          rounded
          text-gray-soil
          bg-cream-light
          focus:outline-none focus:bg-cream-lightest focus:text-gray-soil
          border-none
        "
        placeholder="69"
        :disabled="disableForm"
      />

      <label
        for=""
        class="label-text text-gray-soil tracking-wide font-bold my-2"
        >ภูมิภาค <span class="text-cancelButton">*</span></label
      >
      <select
        v-model="selectedRegion"
        class="select w-full mb-5 text-gray-soil bg-cream-light border-0"
        @change="
          selectedProvince = null;
          selectedDistrict = null;
          selectedsubDistrict = null;
          zipCode = null;
          checkForm();
        "
        :disabled="disableForm"
      >
        <option option disabled selected>กรุณาเลือกภูมิภาค</option>
        <option
          v-for="option in this.addressOption"
          :value="option"
          :key="option.regions"
        >
          {{ option.regions }}
        </option>
      </select>
      <p class="text-cancelButton text-right" v-if="!validateRegion">
        กรุณาเลือกภูมิภาค
      </p>

      <div v-if="selectedRegion">
        <label
          for=""
          class="label-text text-gray-soil tracking-wide font-bold my-2"
          >จังหวัด <span class="text-cancelButton">*</span></label
        >
        <select
          v-model="selectedProvince"
          class="select mb-5 w-full text-gray-soil bg-cream-light border-0"
          @change="
            selectedDistrict = null;
            selectedsubDistrict = null;
            zipCode = null;
            checkForm();
          "
          :disabled="disableForm"
        >
          <option option disabled selected>กรุณาเลือกจังหวัด</option>
          <option
            v-for="option in selectedRegion.provinces"
            :value="option"
            :key="option"
          >
            {{ option }}
          </option>
        </select>
        <p class="text-cancelButton text-right" v-if="!validateProvince">
          กรุณาเลือกจังหวัด
        </p>
      </div>

      <div v-if="selectedProvince">
        <label
          for=""
          class="label-text text-gray-soil tracking-wide font-bold my-2"
          >เขต/อำเภอ <span class="text-cancelButton">*</span></label
        >
        <select
          v-model="selectedDistrict"
          class="select mb-5 w-full text-gray-soil bg-cream-light border-0"
          @change="
            selectedSubdistrict = null;
            zipCode = null;
            checkForm();
          "
          :disabled="disableForm"
        >
          <option option disabled selected>กรุณาเลือกเขต/อำเภอ</option>
          <option
            v-for="option in selectedRegion.districts"
            :value="option"
            :key="option"
          >
            {{ option }}
          </option>
        </select>
        <p class="text-cancelButton text-right" v-if="!validateDistrict">
          กรุณาเลือกเขต/อำเภอ
        </p>
      </div>

      <div v-if="selectedDistrict">
        <label
          for=""
          class="label-text text-gray-soil tracking-wide font-bold my-2"
          >แขวง/ตำบล <span class="text-cancelButton">*</span></label
        >
        <select
          v-model="selectedSubdistrict"
          class="select mb-5 w-full text-gray-soil bg-cream-light border-0"
          @change="
            zipCode = null;
            checkForm();
          "
          :disabled="disableForm"
        >
          <option option disabled selected>กรุณาเลือกแขวง/ตำบล</option>
          <option
            v-for="option in selectedRegion.subDistricts"
            :value="option.subDistrict"
            :key="option.subDistrict"
          >
            {{ option.subDistrict }}
          </option>
        </select>
        <p class="text-cancelButton text-right" v-if="!validateSubdistrict">
          กรุณาเลือกเเขวง/ตำบล
        </p>
      </div>

      <div v-if="selectedDistrict">
        <label
          for=""
          class="label-text text-gray-soil tracking-wide font-bold my-2"
          >รหัสไปรษณีย์ <span class="text-cancelButton">*</span></label
        >
        <select
          v-model="zipCode"
          class="select mb-5 w-full text-gray-soil bg-cream-light border-0"
          @change="checkForm"
          :disabled="disableForm"
        >
          <option option disabled selected>กรุณาเลือกรหัสไปรษณีย์</option>
          <option
            v-for="option in selectedRegion.subDistricts"
            :value="option.zipCodeId"
            :key="option.zipCodeId"
          >
            {{ option.zipCodeId }}
          </option>
        </select>
		 <p class="text-cancelButton text-right" v-if="!validatezipCode">
          กรุณาเลือกรหัสไปรษณีย์
        </p>
      </div>
      <button
        v-if="Object.keys(this.$store.state.newDorm.address).length != 0"
        class="btn btn-neutral mt-3 ml-auto block"
        type="button"
        @click="disableForm = false"
      >
        เเก้ไขข้อมูล
      </button>
      <button class="btn btn-neutral mt-3 ml-auto block" type="submit">
        ยืนยันข้อมูล
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "Address",
  props: { msg: String },
  async fetch() {
    let addressInfo = await this.$axios.$get(
      `${this.$store.state.Backend_URL}/dorm/address`
    );
    for (let i in addressInfo) {
      let provinceList = [];
      let districtList = [];
      let subDistrictList = [];
      for (let j in addressInfo[i].provinces) {
        provinceList.push(addressInfo[i].provinces[j].name);
        for (let k in addressInfo[i].provinces[j].districts) {
          districtList.push(addressInfo[i].provinces[j].districts[k].name);
          for (let l in addressInfo[i].provinces[j].districts[k].subDistricts) {
            subDistrictList.push({
              subDistrict:
                addressInfo[i].provinces[j].districts[k].subDistricts[l].name,
              zipCodeId:
                addressInfo[i].provinces[j].districts[k].subDistricts[l]
                  .zipCodeId,
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
      address: {
        number: "",
        street: "",
        alley: "",
      },
      zipCode: null,
      validateNumber: false,
      validateStreet: false,
      validateDistrict: false,
      validateSubdistrict: false,
      validateRegion: false,
      validateProvince: false,
      validatezipCode: false,
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
        this.validateProvince &&
        this.validatezipCode
      ) {
        this.address.zipCodeId = this.zipCode;
        this.address.district = this.selectedDistrict;
        this.address.region = this.selectedRegion.regions;
        this.address.province = this.selectedProvince;
        this.address.subDistrict = this.selectedSubdistrict;
        this.$store.commit("SET_DORMADDRESS", this.address);
        this.disableForm = true;
        const noti = this.$vs.notification({
          progress: "auto",
          icon: `<i class='bx bx-folder-open' ></i>`,
          color: "success",
          position: "top-right",
          title: `Data Update`,
          text: `Add you dorm address data complete!`,
        });
      } else {
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
      this.validatezipCode = this.zipCode != null ? true : false;
    },
  },
};
</script>