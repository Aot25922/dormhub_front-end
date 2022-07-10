<template>
  <div>
    <h1 class="text-cheese font-bold text-center text-xl">เพิ่มหอพัก</h1>
    <form class="px-3 md:px-20 lg:px-[335px]" @submit.prevent="submit">
      <div class="bg-dark-blue p-3 rounded-lg my-3">
        <h1 class="text-white text-lg ml-2 mb-2 font-bold">เกี่ยวกับหอพัก</h1>
        <div class="mb-2">
          <label class="label-text text-light-blue tracking-wide font-bold my-2"
            >ชื่อหอพัก <span class="text-cancelButton">*</span></label
          >
          <input
            type="text"
            autofocus
            class="
              py-4
              px-2
              w-full
              input input-sm
              rounded
              text-light-blue
              bg-dark-gray
              focus:outline-none focus:bg-gray-soil focus:text-light-blue
              border-none
            "
            placeholder="แฮปปี้ดอร์ม"
            @blur="checkForm"
            v-model="dorm.name"
            :disabled = "disableForm"
          />
          <p v-if="!validateName" class="text-error text-right mt-2">
            กรุณาใส่ชื่อหอพัก
          </p>
        </div>
        <div class="mb-5">
          <label class="label-text text-light-blue tracking-wide font-bold"
            >เวลาเปิด</label
          >
          <input
            type="time"
            class="
              py-4
              px-2
              w-full
              input input-sm
              rounded
              text-light-blue
              bg-dark-gray
              focus:outline-none focus:bg-gray-soil focus:text-light-blue
              border-none
            "
            placeholder="06.00"
            @blur="checkForm"
            v-model="dorm.openTime"
            :disabled = "disableForm"
          />
          <p v-if="!validateOpenTime" class="text-error text-right mt-2">
            ระบุเวลาเปิดหอพัก
          </p>
        </div>
        <div class="mb-5">
          <label class="label-text text-light-blue tracking-wide font-bold my-2"
            >เวลาปิด</label
          >
          <input
            type="time"
            class="
              py-4
              px-2
              w-full
              input input-sm
              rounded
              text-light-blue
              bg-dark-gray
              focus:outline-none focus:bg-gray-soil focus:text-light-blue
              border-none
            "
            placeholder="22.00"
            @blur="checkForm"
            v-model="dorm.closeTime"
            :disabled = "disableForm"
          />
          <p v-if="!validateCloseTime" class="text-error text-right mt-2">
            ระบุเวลาปิดหอพัก
          </p>
        </div>
        <div class="mb-2">
          <label class="label-text text-light-blue tracking-wide font-bold my-2"
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
              input input-sm
              rounded
              text-light-blue
              bg-dark-gray
              focus:outline-none focus:bg-gray-soil focus:text-light-blue
              border-none
            "
            placeholder="0.01 - 9.99"
            :disabled = "disableForm"
          />
          <p v-if="!validateWater" class="text-error text-right mt-2">
            ใส่ค่าได้ตั้งแต่ 0.01 - 9.99
          </p>
        </div>
        <div class="mb-2">
          <label class="label-text text-light-blue tracking-wide font-bold my-2"
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
              input input-sm
              rounded
              text-light-blue
              bg-dark-gray
              focus:outline-none focus:bg-gray-soil focus:text-light-blue
              border-none
            "
            placeholder="0.01 - 9.99"
            :disabled = "disableForm"
          />
          <p
            v-if="!validateElec"
            @blur="checkForm"
            class="text-error text-right mt-2"
          >
            ใส่ค่าได้ตั้งแต่ 0.01 - 9.99
          </p>
        </div>
        <div class="mb-5">
          <label class="label-text text-light-blue tracking-wide font-bold my-2"
            >ข้อมูลเพิ่มเติม</label
          >
          <textarea
            v-model="dorm.description"
            class="
              h-[80px]
              p-2
              w-full
              input input-sm
              rounded
              text-light-blue
              bg-dark-gray
              focus:outline-none focus:bg-gray-soil focus:text-light-blue
              border-none
            "
            placeholder="คำอธิบายเพิ่มเติม"
            :disabled = "disableForm"
          />
        </div>
        <div class="mb-5">
          <label class="label-text text-light-blue tracking-wide font-bold my-2"
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
              bg-dark-gray
              text-gray-soil
              rounded
              transition
              ease-in-out
              border-none
            "
            @change="
              onFileChange($event);
              checkForm();
            "
            multiple
            :disabled = "disableForm"
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
          <p v-if="!validateDormImg" class="text-error text-right mt-2">
            ต้องมีอย่างน้อย 1 ภาพ
          </p>
        </div>

        <button
          v-if="Object.keys(this.$store.state.newDorm.dorm).length != 0"
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
        this.disableForm = true
        const noti = this.$vs.notification({
          progress: "auto",
          icon: `<i class='bx bx-folder-open' ></i>`,
          color: "success",
          position: "top-right",
          title: `Data Update`,
          text: `Add you dorm detail data complete!`,
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
  },
};
</script>
