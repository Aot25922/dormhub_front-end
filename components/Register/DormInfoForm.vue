<template>
  <div>
    <div class="bg-cream p-3 rounded-lg my-3 md:p-5 md:flex md:flex-wrap">
      <h1 class="text-black text-lg ml-2 mb-2 font-bold md:w-full">เกี่ยวกับหอพัก</h1>
      <div class="mb-2 md:px-1 md:w-full">
        <label class="label-text text-gray-soil tracking-wide font-bold my-2"
          >ชื่อหอพัก <span class="text-cancelButton">*</span></label>
          <input
            type="text"
            autofocus
            class="
              py-4
              px-2
              w-full
              input input-sm md:input-md
              rounded
              text-gray-soil
              bg-cream-light
              focus:outline-none focus:bg-cream-lightest focus:text-gray-soil
              border-none
              disabled:text-white disabled:bg-dark-gray
            "
            placeholder="แฮปปี้ดอร์ม"
            @blur="checkForm"
            v-model="dorm.name"
          />
          <p v-if="!validateName" class="text-cancelButton text-right mt-2">
            กรุณากรอกชื่อหอพัก
          </p>
      </div>
      <div class="mb-5 md:px-1 md:w-1/2">
        <label class="label-text text-gray-soil tracking-wide font-bold"
          >เวลาเปิด</label
        >
        <input
          type="time"
          class="
            py-4
            px-2
            w-full
            input input-sm md:input-md
            rounded
            text-gray-soil
            bg-cream-light
            focus:outline-none focus:bg-cream-lightest focus:text-gray-soil
            border-none
            disabled:text-white disabled:bg-dark-gray
          "
          placeholder="06.00"
          @blur="checkForm"
          v-model="dorm.openTime"
        />
        <!-- <p v-if="!validateOpenTime" class="text-cancelButton text-right mt-2">
            ระบุเวลาเปิดหอพัก
          </p> -->
      </div>
      <div class="mb-5 md:px-1 md:w-1/2">
        <label class="label-text text-gray-soil tracking-wide font-bold my-2"
          >เวลาปิด</label
        >
        <input
          type="time"
          class="
            py-4
            px-2
            w-full
            input input-sm md:input-md
            rounded
            text-gray-soil
            bg-cream-light
            focus:outline-none focus:bg-cream-lightest focus:text-gray-soil
            border-none
            disabled:text-white disabled:bg-dark-gray
          "
          placeholder="22.00"
          @blur="checkForm"
          v-model="dorm.closeTime"
        />
        <!-- <p v-if="!validateCloseTime" class="text-cancelButton text-right mt-2">
            ระบุเวลาปิดหอพัก
          </p> -->
      </div>
      <div class="mb-2 md:px-1 md:w-1/2">
        <label class="label-text text-gray-soil tracking-wide font-bold my-2"
          >ค่าน้ำต่อหน่วย <span class="text-cancelButton">*</span></label
        >
        <input
          type="number"
          step="0.01"
          @blur="checkForm"
          v-model="dorm.waterPerUnit"
          class="
            py-4
            px-2
            w-full
            input input-sm md:input-md
            rounded
            text-gray-soil
            bg-cream-light
            focus:outline-none focus:bg-cream-lightest focus:text-gray-soil
            border-none
            disabled:text-white disabled:bg-dark-gray
          "
          placeholder="0.01 - 9.99"
        />
        <p v-if="!validateWater" class="text-cancelButton text-right mt-2">
          ใส่ค่าได้ตั้งแต่ 0.01 - 9.99
        </p>
      </div>
      <div class="mb-2 md:px-1 md:w-1/2">
        <label class="label-text text-gray-soil tracking-wide font-bold my-2"
          >ค่าไฟต่อหน่วย <span class="text-cancelButton">*</span></label
        >
        <input
          type="number"
          step="0.01"
          @blur="checkForm"
          v-model="dorm.elecPerUnit"
          class="
            py-4
            px-2
            w-full
            input input-sm md:input-md
            rounded
            text-gray-soil
            bg-cream-light
            focus:outline-none focus:bg-cream-lightest focus:text-gray-soil
            border-none
            disabled:text-white disabled:bg-dark-gray
          "
          placeholder="0.01 - 9.99"
        />
        <p
          v-if="!validateElec"
          @blur="checkForm"
          class="text-cancelButton text-right mt-2"
        >
          ใส่ค่าได้ตั้งแต่ 0.01 - 9.99
        </p>
      </div>
      <div class="mb-5 md:px-1 md:w-full">
        <label class="label-text text-gray-soil tracking-wide font-bold my-2"
          >ข้อมูลเพิ่มเติม</label
        >
        <textarea
          v-model="dorm.description"
          class="
            h-[80px]
            md:h-24
            p-2
            w-full
            input input-sm md:input-md
            rounded
            text-gray-soil
            bg-cream-light
            focus:outline-none focus:bg-cream-lightest focus:text-gray-soil
            border-none
            disabled:text-white disabled:bg-dark-gray
          "
          placeholder="คำอธิบายเพิ่มเติม"
        />
      </div>
      <div class="mb-5 md:px-1 md:w-full">
        <label class="label-text text-gray-soil tracking-wide font-bold my-2"
          >เลือกภาพปกที่ใช้แสดงบนหน้าเว็ป
          <span class="text-cancelButton">*</span></label
        >
        <input
          type="file"
          class="
            focus:outline-none
            form-control
            block
            w-full
            bg-cream-light
            text-gray-soil
            rounded
            transition
            ease-in-out
            border-none
            disabled:text-white disabled:bg-dark-gray
          "
          @change="
            onFileChange($event);
            checkForm();
          "
          multiple
        />
        <div v-if="dormImgUrl">
          <div class="md:grid md:grid-cols-2 lg:grid lg:grid-cols-4">
            <img
              v-for="i in dormImgUrl"
              :key="i"
              :src="i"
              class="py-2 md:p-2"
            />
          </div>
        </div>
        <p v-if="!validateDormImg" class="text-cancelButton text-right mt-2">
          ต้องมีอย่างน้อย 1 ภาพ
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dormImgUrl: [],
      dorm: {
        name: "",
        openTime: null,
        closeTime: null,
        description: "",
        rating: 0,
        acceptPercent: 0,
        elecPerUnit: 0,
        waterPerUnit: 0,
      },
      disableForm: false,
      dormInputImage: [],
      validateName: false,
      validateOpenTime: false,
      validateCloseTime: false,
      validateElec: false,
      validateWater: false,
      validateDormImg: false,
    };
  },
  methods: {
    checkForm() {
      this.validateName = this.dorm.name != "" ? true : false;
      this.validateOpenTime = this.dorm.openTime != "" ? true : false;
      this.validateCloseTime = this.dorm.closeTime != "" ? true : false;
      this.validateElec =
        0 < this.dorm.elecPerUnit && this.dorm.elecPerUnit < 10 ? true : false;
      this.validateWater =
        0 < this.dorm.waterPerUnit && this.dorm.waterPerUnit < 10
          ? true
          : false;
      this.validateDormImg = this.dormImgUrl.length != 0 ? true : false;
    },
    onFileChange(e) {
      this.dormImgUrl = [];
      let files = e.target.files || e.dataTransfer.files;
      for (let i in files) {
        if (typeof files[i] == "object") {
          this.dormInputImage.push(files[i]);
          this.dormImgUrl.push(URL.createObjectURL(files[i]));
        }
      }
    },
    submit() {
      if (
        this.validateName &&
        this.validateOpenTime &&
        this.validateCloseTime &&
        this.validateWater &&
        this.validateElec &&
        this.validateDormImg
      ) {
        const dormCopy = { ...this.dorm };
        const dormImgCopy = { ...this.dormInputImage };
        this.$store.commit("SET_DORMINFO", dormCopy);
        this.$store.commit("SET_DORMIMG", dormImgCopy);
        this.disableForm = true;
        this.$emit("validate", true);
        const noti = this.$vs.notification({
          progress: "auto",
          icon: `<i class='bx bx-folder-open' ></i>`,
          color: "success",
          position: "top-right",
          title: `Data Update`,
          text: `Add you dorm detail data complete!`,
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
  },
};
</script>
