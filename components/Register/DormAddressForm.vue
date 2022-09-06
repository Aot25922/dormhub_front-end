<template>
  <div div class="p-3 rounded-lg my-3 md:p-5 md:flex md:flex-wrap">
    <h1 class="text-lg ml-2 mb-2 font-bold md:w-full">สถานที่ตั้งหอพัก</h1>
    <div class="mb-5 md:px-1 md:w-1/2 lg:w-1/3">
      <label class="label-text text-gray-500 tracking-wide font-bold my-2"
        >เลขที่/เลขห้อง <span class="text-imperialRed">*</span></label
      >
      <input
        v-model="address.number"
        class="py-4 px-2 w-full input input-sm md:input-md rounded"
        placeholder="999/999"
        @blur="checkForm"
      />
      <p class="text-imperialRed text-right" v-if="!validateNumber">
        กรุณาใส่เลขที่/เลขห้อง
      </p>
    </div>

    <div class="mb-5 md:px-1 md:w-1/2 lg:w-1/3">
      <label class="label-text text-gray-500 tracking-wide font-bold my-2"
        >ถนน <span class="text-imperialRed">*</span></label
      >
      <input
        v-model="address.street"
        class="py-4 px-2 w-full input input-sm md:input-md rounded"
        placeholder="ถนนของเรา"
        @blur="checkForm"
      />
      <p class="text-imperialRed text-right" v-if="!validateStreet">
        กรุณาใส่ถนน
      </p>
    </div>

    <div class="mb-5 md:px-1 md:w-1/2 lg:w-1/3">
      <label class="label-text text-gray-500 tracking-wide font-bold my-2"
        >ซอย</label
      >
      <input
        v-model="address.alley"
        class="py-4 px-2 w-full input input-sm md:input-md rounded"
        placeholder="69"
      />
    </div>

    <!--เลือกภูมิภาค-->
    <div class="mb-5 md:px-1 md:w-1/2 lg:w-1/4">
      <label class="label-text text-gray-500 tracking-wide font-bold my-2"
        >ภูมิภาค <span class="text-imperialRed">*</span></label
      >
      <select
        v-model="selectedRegion"
        class="select w-full text-gray-500 border-0"
         @change="
          selectedProvince = null;
          selectedDistrict = null;
          selectedSubDistrict = null;
          selectedZipCode = null;
          checkForm();
        "
      >
        <option option disabled selected>กรุณาเลือกภูมิภาค</option>
        <option
          v-for="option in this.addressOption"
          :value="option"
          :key="option.geographiesId"
        >
          {{ option.name }}
        </option>
      </select>
      <p class="text-imperialRed text-right" v-if="!validateRegion">
        กรุณาเลือกภูมิภาค
      </p>
    </div>

    <!--เลือกจังหวัด-->
    <div class="mb-5 md:px-1 md:w-1/2 lg:w-1/4" v-if="selectedRegion">
      <label class="label-text text-gray-500 tracking-wide font-bold my-2"
        >จังหวัด <span class="text-imperialRed">*</span></label
      >
      <select
        v-model="selectedProvince"
        class="select w-full text-gray-500 border-0"
        @change="
          selectedDistrict = null;
          selectedSubDistrict = null;
          selectedZipCode = null;
          checkForm();
        "
      >
        <option option disabled selected>กรุณาเลือกจังหวัด</option>
        <option
          v-for="option in selectedRegion.provinces"
          :value="option"
          :key="option.provincesId"
        >
          {{ option.name_th }}
        </option>
      </select>
      <p class="text-imperialRed text-right" v-if="!validateProvince">
        กรุณาเลือกจังหวัด
      </p>
    </div>

    <!--เลือกเขต/อำเภอ-->
    <div class="mb-5 md:px-1 md:w-1/2 lg:w-1/4" v-if="selectedProvince">
      <label class="label-text text-gray-500 tracking-wide font-bold my-2"
        >เขต/อำเภอ <span class="text-imperialRed">*</span></label
      >
      <select
        v-model="selectedDistrict"
        class="select w-full text-gray-500 border-0"
        @change="
          selectedSubDistrict = null;
          selectedZipCode = null;
          checkForm();
        "
      >
        <option option disabled selected>กรุณาเลือกเขต/อำเภอ</option>
        <option
          v-for="option in selectedProvince.districts"
          :value="option"
          :key="option.districtsId"
        >
          {{ option.name_th }}
        </option>
      </select>
      <p class="text-imperialRed text-right" v-if="!validateDistrict">
        กรุณาเลือกเขต/อำเภอ
      </p>
    </div>

    <!--เลือกแขวง/ตำบล-->
    <div class="mb-5 md:px-1 md:w-1/2 lg:w-1/4" v-if="selectedDistrict">
      <label class="label-text text-gray-500 tracking-wide font-bold my-2"
        >แขวง/ตำบล <span class="text-imperialRed">*</span></label
      >
      <select
        v-model="selectedSubDistrict"
        class="select w-full text-gray-500 border-0"
        @change="
          selectedZipCode = null;
          checkForm();
        "
      >
        <option option disabled selected>กรุณาเลือกแขวง/ตำบล</option>
        <option
          v-for="option in selectedDistrict.subDistricts"
          :value="option"
          :key="option.subDistrictsId"
        >
          {{ option.name_th }}
        </option>
      </select>
      <p class="text-imperialRed text-right" v-if="!validateSubdistrict">
        กรุณาเลือกเเขวง/ตำบล
      </p>
    </div>

    <!--เลขไปรณีย์-->
    <div class="mb-5 md:px-1 md:w-1/2 lg:w-1/4" v-if="selectedSubDistrict">
      <label class="label-text text-gray-500 tracking-wide font-bold my-2"
        >เลขไปรณีย์ <span class="text-imperialRed">*</span></label
      >
      <select
        v-model="selectedZipCode"
        class="select w-full text-gray-500 border-0"
         @change="
          checkForm();
        "
      >
        <option option disabled selected>กรุณาเลือกเลขไปรณีย์</option>
        <option
          v-for="option in selectedDistrict.subDistricts.filter(
            (x) => x.name_th == selectedSubDistrict.name_th
          )"
          :value="option.zip_code"
          :key="option.subDistrictsId"
        >
          {{ option.zip_code }}
        </option>
      </select>
      <p class="text-imperialRed text-right" v-if="!validateZipcode">
        กรุณาเลือกเลขไปรณีย์
      </p>
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
      this.addressOption.push(addressInfo[i]);
    }
  },
  data() {
    return {
      addressOption: [],
      selectedDistrict: null,
      selectedSubDistrict: null,
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
      validateZipcode: false,
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
        this.validateZipcode
      ) {
        this.address.zipCodeId = this.selectedZipCode;
        this.address.district = this.selectedDistrict.name_th;
        this.address.region = this.selectedRegion.name;
        this.address.province = this.selectedProvince.name_th;
        this.address.subDistrict = this.selectedSubDistrict.name_th;
        let newAddress = { ...this.address };
        this.$store.commit("SET_DORMADDRESS", newAddress);
        this.disableForm = true;
        this.$emit("validate", true);
      } else {
        this.$emit("validate", false);
        const noti = this.$vs.notification({
          progress: "auto",
          icon: `<i class='bx bx-error' ></i>`,
          color: "warn",
          position: "top-right",
          title: "ข้อมูลของคุญยังได้สมบูรณ์",
          text: "กรุณาเติมข้อมูลให้ครบ",
        });
      }
    },
    checkForm() {
      this.validateNumber = this.address.number != "" ? true : false;
      this.validateStreet = this.address.street != "" ? true : false;
      this.validateDistrict = this.selectedDistrict != null ? true : false;
      this.validateSubdistrict =
        this.selectedSubDistrict != null ? true : false;
      this.validateRegion = this.selectedRegion != null ? true : false;
      this.validateProvince = this.selectedProvince != null ? true : false;
      this.validateZipcode = this.selectedZipCode != null ? true : false
    },
  },
};
</script>
