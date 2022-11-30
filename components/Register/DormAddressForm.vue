<template>
  <div class="addressForm-bg">
    <h1 class="addressForm-h1">สถานที่ตั้งหอพัก</h1>
    <div class="addressForm-container">
      <label class="form-label"
        >เลขที่/เลขห้อง <span class="text-imperialRed">*</span></label
      >
      <input
        v-model="address.number"
        class="form-input"
        placeholder="999/999"
        @blur="checkForm"
      />
      <p class="text-imperialRed text-right" v-if="!validateNumber">
        กรุณาใส่เลขที่/เลขห้อง
      </p>
    </div>

    <div class="addressForm-container">
      <label class="form-label"
        >ถนน <span class="text-imperialRed">*</span></label
      >
      <input
        v-model="address.street"
        class="form-input"
        placeholder="ถนนของเรา"
        @blur="checkForm"
      />
      <p class="text-imperialRed text-right" v-if="!validateStreet">
        กรุณาใส่ถนน
      </p>
    </div>

    <div class="addressForm-container">
      <label class="form-label">ซอย</label>
      <input
        v-model="address.alley"
        class="form-input"
        placeholder="69"
      />
    </div>

    <!--เลือกภูมิภาค-->
    <div class="addressForm-cont-sel">
      <label class="form-label"
        >ภูมิภาค <span class="text-imperialRed">*</span></label
      >
      <select
        v-model="selectedRegion"
        class="addressForm-select"
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
    <div class="addressForm-cont-sel" v-if="selectedRegion">
      <label class="form-label"
        >จังหวัด <span class="text-imperialRed">*</span></label
      >
      <select
        v-model="selectedProvince"
        class="addressForm-select"
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
    <div class="addressForm-cont-sel" v-if="selectedProvince">
      <label class="form-label"
        >เขต/อำเภอ <span class="text-imperialRed">*</span></label
      >
      <select
        v-model="selectedDistrict"
        class="addressForm-select"
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
    <div class="addressForm-cont-sel" v-if="selectedDistrict">
      <label class="form-label"
        >แขวง/ตำบล <span class="text-imperialRed">*</span></label
      >
      <select
        v-model="selectedSubDistrict"
        class="addressForm-select"
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
    <div class="addressForm-cont-sel" v-if="selectedSubDistrict">
      <label class="form-label"
        >เลขไปรณีย์ <span class="text-imperialRed">*</span></label
      >
      <select
        v-model="selectedZipCode"
        class="addressForm-select"
        @change="checkForm()"
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
    <div class="py-5 w-full md:flex md:justify-end">
      <div class="md:w-1/2">
        <button
          v-if="editForm"
          @click="submit()"
          class="btn btn-success w-full"
        >
          ยืนยันการเเก้ไขข้อมูล
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Address",
  props: ["editForm"],
  data() {
    return {
      addressOption: this.$store.state.addressOption,
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
    async submit() {
      this.checkForm();
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
        let newAddress =
          this.address.number +
          " " +
          this.address.alley +
          " " +
          this.address.street +
          " " +
          this.selectedRegion.name +
          " " +
          this.selectedDistrict.name_th +
          " " +
          this.selectedSubDistrict.name_th +
          " " +
          this.selectedProvince.name_th +
          " " +
          this.selectedZipCode;
        if (this.editForm) {
          const loading = this.$vs.loading();
          let formData = new FormData();
          let data = {
            dormId: this.$store.state.selectedDorm.dormId,
            dorm: {
              address: newAddress,
            },
          };
          formData.append("data", JSON.stringify(data));
          try {
            await this.$axios.$put(
              `${this.$store.state.Backend_URL}/dorm/edit`,
              formData,
              {
                withCredentials: true,
              }
            );
            const noti = this.$vs.notification({
              progress: "auto",
              icon: `<i class='bx bx-folder-open' ></i>`,
              color: "success",
              position: "top-right",
              title: `Data Update`,
              text: `Update Dorm Address complete!`,
            });
            loading.close();
            let dormInfo = {
              dorm: null,
              id: this.$store.state.selectedDorm.dormId,
            };
            await this.$store.dispatch("dormSelected", dormInfo);
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
          this.$store.commit("SET_DORMADDRESS", newAddress);
          this.disableForm = true;
          this.$emit("validate", true);
        }
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
      this.validateZipcode = this.selectedZipCode != null ? true : false;
    },
  },
  created() {
    if (this.editForm) {
      if (!this.$store.state.selectedDorm) {
        this.$router.push({ path: "/dormList" });
        return;
      }
      const address = this.$store.state.selectedDorm.address.split(" ");
      this.address.number = address[0];
      this.address.street = address[1];
      this.address.alley = address[2];
      this.selectedRegion = this.addressOption.filter((x) =>
        this.$store.state.selectedDorm.address.includes(x.name)
      )[0];
      this.selectedProvince = this.selectedRegion.provinces.filter((x) =>
        this.$store.state.selectedDorm.address.includes(x.name_th)
      )[0];
      this.selectedDistrict = this.selectedProvince.districts.filter((x) =>
        this.$store.state.selectedDorm.address.includes(x.name_th)
      )[0];
      this.selectedSubDistrict = this.selectedDistrict.subDistricts.filter(
        (x) => this.$store.state.selectedDorm.address.includes(x.name_th)
      )[0];
      this.selectedZipCode = this.selectedSubDistrict.zip_code;
      this.checkForm();
    }
  },
};
</script>
