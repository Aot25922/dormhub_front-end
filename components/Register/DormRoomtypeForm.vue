<template>
  <div class="bg-cream p-3 rounded-lg mb-3 relative">
	<button
      @click="removeRoomType"
      class="absolute top-0 right-0"
      v-if="index>0"
    >
	<span class="material-icons text-white">close</span>
	</button>
    <h1 class="text-black text-lg ml-2 mb-2 font-bold">ประเภทห้อง</h1>
    <label class="label-text text-gray-soil tracking-wide font-bold my-2"
      >ชื่อประเภทห้อง <span class="text-cancelButton">*</span></label
    >
    <input
      type="text"
      class="
        p-2
        mb-5
        rounded
        text-gray-soil
        bg-cream-light
        border-none
        focus:bg-cream-lightest focus:text-gray-soil
        input input-sm
        w-full
        disabled:bg-green-darker disabled:text-dark-gray
      "
      placeholder="ห้องนี้สีเขียว"
      v-model="roomType.type"
      @blur="validateForm"
      :disabled = "disableForm"
    />
    <p class="text-cancelButton text-right" v-if="validateType">
      กรุณาใส่ชื่อประเภทห้อง
    </p>

    <label class="label-text text-gray-soil tracking-wide font-bold my-2"
      >ราคาห้องพัก <span class="text-cancelButton">*</span></label
    >
    <input
      type="number"
      class="
        p-2
        mb-5
        rounded
        text-gray-soil
        bg-cream-light
        border-none
        focus:bg-cream-lightest focus:text-gray-soil
        input input-sm
        w-full
        disabled:bg-green-darker disabled:text-dark-gray
      "
      placeholder="200"
      v-model="roomType.price"
      min="1"
      max="100000"
      @blur="validateForm"
      :disabled = "disableForm"
    />
    <p class="text-cancelButton text-right" v-if="validatePrice">
      ราคาได้ตั้งแต่ 1-100000
    </p>

    <label class="label-text text-gray-soil tracking-wide font-bold my-2"
      >ราคาค่าเช่าห้องพัก <span class="text-cancelButton">*</span></label
    >
    <input
      type="number"
      class="
        p-2
        mb-5
        rounded
        text-gray-soil
        bg-cream-light
        border-none
        focus:bg-cream-lightest focus:text-gray-soil
        input input-sm
        w-full
        disabled:bg-green-darker disabled:text-dark-gray
      "
      placeholder="200"
      v-model="roomType.deposit"
      min="1"
      max="100000"
      @blur="validateForm"
      :disabled = "disableForm"
    />
    <p class="text-cancelButton text-right" v-if="validateDeposit">
      ราคาได้ตั้งแต่ 1-100000
    </p>

    <label class="label-text text-gray-soil tracking-wide font-bold my-2"
      >ขนาดพื้นที่ (ตารางเมตร) <span class="text-cancelButton">*</span></label
    >
    <input
      type="number"
      class="
        p-2
        mb-5
        rounded
        text-gray-soil
        bg-cream-light
        border-none
        focus:bg-cream-lightest focus:text-gray-soil
        input input-sm
        w-full
        disabled:bg-green-darker disabled:text-dark-gray
      "
      placeholder="999.99"
      min="1"
      max="999.99"
      v-model="roomType.area"
      @blur="validateForm"
      :disabled = "disableForm"
    />
    <p class="text-cancelButton text-right" v-if="validateArea">
      พื้นที่ได้ตั้งแต่ 1-999.99
    </p>
    <h1 class="text-black text-lg ml-2 mb-2 font-bold">ภาพประเภทห้อง</h1>
    <div class="">
      <div class="mb-3 w-full">
        <label
          for="formFileMultiple"
          class="label-text text-gray-soil tracking-wide font-bold my-2"
          >เลือกได้มากกว่า1รูป <span class="text-cancelButton">*</span></label
        >
        <input
          class="
            mb-5
            focus:outline-none
            form-control
            block
            w-full
            bg-cream-light
            text-gray-soil
            input input-sm
            rounded
            transition
            ease-in-out
            border-none
            disabled:bg-green-darker disabled:text-dark-gray
          "
          type="file"
          id="formFileMultiple"
          @change="onFileChange"
          multiple
          :disabled = "disableForm"
        />
      </div>
      <p class="text-cancelButton text-right" v-if="validateFile">
        ต้องมีอย่างน้อย1ภาพ
      </p>
      <div class="md:grid md:grid-cols-2 lg:grid lg:grid-cols-4">
        <img
          v-for="image in roomTypeImageUrl"
          :key="image"
          :src="image"
          class="py-2 md:p-2"
        />
      </div>
    </div>
    <h1 class="text-black text-lg ml-2 mb-2 font-bold">
      สิ่งอำนวยความสะดวก/บริการเสริม
    </h1>
    <div
      v-for="(item, index) in roomType.facility"
      :key="index"
      class="relative"
    >
      <h2 class="label-text text-gray-soil tracking-wide font-bold my-2">
        ชื่อ <span class="text-cancelButton">*</span>
      </h2>
      <input
        type="text"
        class="
          p-2
          mb-5
          rounded
          text-gray-soil
          bg-cream-light
          border-none
          focus:bg-cream-lightest focus:text-gray-soil
          input input-sm
          w-full
          disabled:bg-green-darker disabled:text-dark-gray
        "
        placeholder="ห้องนี้สีเขียว"
        v-model="roomType.facility[index].name"
        @blur="validateForm"
        :disabled = "disableForm"
      />
      <p class="text-cancelButton text-right" v-if="validateFacility">
        กรุณาใส่ชื่อสิ่งอำนวยความสะดวก
      </p>
      <h2 class="label-text text-gray-soil tracking-wide font-bold my-2">
        รายละเอียด
      </h2>
      <input
        type="text"
        class="
          p-2
          mb-5
          rounded
          text-gray-soil
          bg-cream-light
          border-none
          focus:bg-cream-lightest focus:text-gray-soil
          input input-sm
          w-full
          disabled:bg-green-darker disabled:text-dark-gray
        "
        placeholder="คำอธิบายเพิ่มเติม"
        v-model="roomType.facility[index].description"
        :disabled = "disableForm"
      />
      <button
        class="btn btn-ghost text-cancelButton absolute -top-4 -right-5"
        @click="roomType.facility.splice(index, 1)"
        v-if="roomType.facility.length > 1"
      >
        <p class="material-icons">remove_circle</p>
      </button>
      <hr class="py-2 text-gray-soil" />
    </div>
    <div class="flex flex-wraps">
      <div class="px-1" v-if="!disableForm">
        <button
          class="btn btn-neutral mx-auto block"
          @click="roomType.facility.push({ name: '', description: '' })"
        >
          เพิ่มสิ่งอำนวยความสะดวก
        </button>
      </div>
      <div class="px-1" v-if="!disableForm">
        <button class="btn btn-neutral mx-auto block" @click="addRoomTypes">
          ยืนยันข้อมูลประเภทห้องพัก
        </button>
      </div>
      <div class="px-1">
        <button class="btn btn-neutral mx-auto block" @click="disableForm = false" v-if="disableForm">
          เเก้ไขข้อมูลประเภทห้องพัก
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["index"],
  data() {
    return {
      roomType: {
        type: "",
        price: 0,
        deposit: 0,
        area: 0,
        facility: [{ name: "", description: "" }],
      },
      confirmThisroomType: false,
      validateType: false,
      validatePrice: false,
      validateDeposit: false,
      validateArea: false,
      validateFacility: false,
      validateFile: false,
      roomTypeInputImage: [],
      roomTypeImageUrl: [],
      disableForm: false,
      oldRoomType: ""
    };
  },
  methods: {
    addRoomTypes() {
      this.validateForm();
      if (
        this.validateType == false &&
        this.validatePrice == false &&
        this.validateDeposit == false &&
        this.validateArea == false &&
        this.validateFacility == false
      ) {
        let newRoomType = JSON.parse(JSON.stringify(this.roomType));
        newRoomType.oldRoomType = this.oldRoomType
        let newRoomTypeImg = Object.assign({},this.roomTypeInputImage);
        this.$store.commit("SET_ROOMTYPE", newRoomType);
        this.$store.dispatch("setNewRoomTypeImg",{image:newRoomTypeImg,roomType:newRoomType.type})
        this.oldRoomType = newRoomType.type
        this.disableForm = true
        const noti = this.$vs.notification({
          progress: "auto",
          icon: `<i class='bx bx-folder-open' ></i>`,
          color: "success",
          position: "top-right",
          title: `Data Update`,
          text: `Add you room type data complete!`,
        });
      }else {
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
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      for (let i in files) {
        if (typeof files[i] == "object") {
          this.roomTypeInputImage.push(files[i]);
          this.roomTypeImageUrl.push(URL.createObjectURL(files[i]));
        }
      }
      this.validateForm();
    },
    removeRoomType() {
      this.$emit('removeRoomType',this.roomType)
    },
    validateForm() {
      this.validateType = this.roomType.type == "" ? true : false;
      this.validatePrice = this.roomType.price <= 0 ? true : false;
      this.validateDeposit = this.roomType.deposit <= 0 ? true : false;
      this.validateArea = this.roomType.area <= 0 ? true : false;
      this.validateFacility =
        this.roomType.facility[0].name == "" ? true : false;
      this.validateFile = this.roomTypeInputImage.length == 0 ? true : false;
    },
  },
};
</script>