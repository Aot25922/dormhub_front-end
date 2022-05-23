<template>
  <div div class="bg-dark-blue p-3 rounded-lg my-3">
    <h1 class="text-white text-lg ml-2 mb-2 font-bold">{{ msg }}</h1>
			<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">เลขที่/เลขห้อง</label>
			<input v-model="address.number" class="py-4 px-2 mb-5 w-full input input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue"
			placeholder="999/999"/>

			<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">ถนน</label>
			<input v-model="address.street" class="py-4 px-2 mb-5 w-full input input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue"
			placeholder="ถนนของเรา"/>

			<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">ซอย</label>
			<input v-model="address.alley" class="py-4 px-2 mb-5 w-full input input-sm rounded text-light-blue bg-dark-gray focus:outline-none focus:bg-gray-soil focus:text-light-blue"
			placeholder="69"/>

			<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">ภูมิภาค</label>
			<select v-model="selectedRegion" class="select w-full mb-5 text-light-blue bg-dark-gray border-0">
				<option	option disabled selected>กรุณาเลือกภูมิภาค</option>
				<option v-for="option in this.addressOption" :value="option" :key="option.regions">{{option.regions}}</option>
			</select>

            <div v-if="selectedRegion">
				<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">จังหวัด</label>
				<select v-model="selectedProvince" class="select mb-5 w-full text-light-blue bg-dark-gray border-0">
					<option	option disabled selected>กรุณาเลือกจังหวัด</option>
					<option v-for="option in selectedRegion.provinces" :value="option" :key="option">
                       {{option}}
					</option>
				</select>
			</div>

			<div v-if="selectedProvince">
				<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">เขต/อำเภอ</label>
				<select v-model="selectedDistrict" class="select mb-5 w-full text-light-blue bg-dark-gray border-0">
					<option	option disabled selected>กรุณาเลือกเขต/อำเภอ</option>
					<option v-for="option in selectedRegion.districts" :value="option" :key="option">{{option}}</option>
				</select>
			</div>

			<div v-if="selectedDistrict">
				<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">แขวง/ตำบล</label>
				<select v-model="selectedSubdistrict" class="select mb-5 w-full text-light-blue bg-dark-gray border-0">
					<option	option disabled selected>กรุณาเลือกแขวง/ตำบล</option>
					<option v-for="option in selectedRegion.subDistricts" :value="option.subDistrict" :key="option.subDistrict">{{option.subDistrict}}</option>
				</select>
			</div>

			<div v-if="selectedDistrict">
				<label for="" class="label-text text-light-blue tracking-wide font-bold my-2">รหัสไปรษณีย์</label>
				<select v-model="zipCode" class="select mb-5 w-full text-light-blue bg-dark-gray border-0">
					<option	option disabled selected>กรุณาเลือกรหัสไปรษณีย์</option>
					<option v-for="option in selectedRegion.subDistricts" :value="option.zipCodeId" :key="option.zipCodeId">{{option.zipCodeId}}</option>
				</select>
			</div>
    <button
      class="btn btn-neutral mt-3 ml-auto block"
      @click="addressData"
      type="button" v-if="confirmAddress"
    >
      ยืนยันข้อมูล
    </button>
  </div>
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
            subDistrictList.push({subDistrict:addressInfo[i].provinces[j].districts[k].subDistricts[l].name,zipCodeId:addressInfo[i].provinces[j].districts[k].subDistricts[l].zipCodeId});
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
	console.log(this.addressOption)
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
	  zipCode:null
    };
  },
  methods: {
    addressData() {
      this.address.zipCodeId = this.zipCode;
      this.address.district = this.selectedDistrict;
      this.address.region = this.selectedRegion.regions;
      this.address.province = this.selectedProvince;
      this.address.subDistrict = this.selectedSubdistrict;
       this.$emit("enterAddressData", this.address);
    },
  },
  computed : {
    confirmAddress(){
            return this.zipCode!=null && this.selectedDistrict != null && this.selectedSubdistrict != null 
      && this.selectedRegion != null && this.selectedProvince != null && this.address.number != ""
      && this.address.street != "" && this.address.alley != "" ? true : false
    }
  }
};
</script>