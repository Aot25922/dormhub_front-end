<template>
  <div>
    <div class="infoForm-bg">
      <h1 class="infoForm-h1">เกี่ยวกับหอพัก</h1>
      <div class="mb-2 md:px-1 md:w-full">
        <label class="form-label"
          >ชื่อหอพัก <span class="text-imperialRed">*</span></label
        >
        <input
          type="text"
          autofocus
          class="form-input"
          placeholder="แฮปปี้ดอร์ม"
          @blur="checkForm"
          v-model="dorm.name"
        />
        <p v-if="!validateName" class="text-imperialRed text-right mt-2">
          กรุณากรอกชื่อหอพัก
        </p>
        <p v-if="!validateNameLength" class="text-imperialRed text-right mt-2">
          กรุณากรอกชื่อหอพักไม่เกิน 50 ตัว
        </p>
      </div>
      <div class="infoForm-cont">
        <label class="form-label"
          >เวลาเปิด</label
        >
        <input
          type="time"
          class="form-input"
          placeholder="06.00"
          @blur="checkForm"
          v-model="dorm.openTime"
        />
      </div>
      <div class="infoForm-cont">
        <label class="form-label">เวลาปิด</label>
        <input
          type="time"
          class="form-input"
          placeholder="22.00"
          @blur="checkForm"
          v-model="dorm.closeTime"
        />
      </div>
      <div class="infoForm-cont">
        <label class="form-label"
          >ค่าน้ำต่อหน่วย <span class="text-imperialRed">*</span></label
        >
        <input
          type="number"
          step="0.01"
          @blur="checkForm"
          v-model="dorm.waterPerUnit"
          class="form-input"
          placeholder="0.01 - 50.00"
        />
        <p v-if="!validateWater" class="text-imperialRed text-right mt-2">
          ใส่ค่าได้ตั้งแต่ 0.01 - 50.00
        </p>
      </div>
      <div class="infoForm-cont">
        <label class="form-label"
          >ค่าไฟต่อหน่วย <span class="text-imperialRed">*</span></label
        >
        <input
          type="number"
          step="0.01"
          @blur="checkForm"
          v-model="dorm.elecPerUnit"
          class="form-input"
          placeholder="0.01 - 50.00"
        />
        <p
          v-if="!validateElec"
          @blur="checkForm"
          class="text-imperialRed text-right mt-2"
        >
          ใส่ค่าได้ตั้งแต่ 0.01 - 50.00
        </p>
      </div>
      <div class="mb-5 md:px-1 md:w-full">
        <label class="form-label">ข้อมูลเพิ่มเติม</label>
        <textarea
          v-model="dorm.description"
          placeholder="คำอธิบายเพิ่มเติม"
        />
      </div>
      <div class="mb-5 md:px-1 md:w-full">
        <label class="form-label"
          >เลือกภาพปกที่ใช้แสดงบนหน้าเว็ป<span class="text-imperialRed"
            >*</span
          ></label
        >
        <input
          type="file"
          class="infoForm-upImg"
          @change="
            onFileChange($event);
            checkForm();
          "
          multiple
        />
        <div>
          <div class="infoForm-gridImg" v-if="dormImgUrl.length != 0">
            <img
              v-for="i in dormImgUrl"
              :key="i"
              :src="i"
              class="infoForm-img"
            />
          </div>
          <div
            class="infoForm-gridImg"
            v-else-if="
              dormImgUrl.length == 0 &&
              editForm &&
              this.$store.state.selectedDorm != null
            "
          >
            <img
              v-for="i in this.$store.state.selectedDorm.media.filter(
                (x) => x.roomTypeId == null
              )"
              :key="i.mediaId"
              :src="
                $store.state.Backend_URL +
                '/dorm/image/' +
                $store.state.selectedDorm.dormId +
                '/' +
                i.mediaId
              "
              class="infoForm-img"
            />
          </div>
        </div>
        <p v-if="!validateDormImg" class="text-imperialRed text-right mt-2">
          ต้องมีอย่างน้อย 1 ภาพ
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
  </div>
</template>
<script>
export default {
  props: ["editForm"],
  data() {
    return {
      dormImgUrl: [],
      dorm: {
        name: "",
        openTime: null,
        closeTime: null,
        description: "",
        elecPerUnit: null,
        waterPerUnit: null,
      },
      disableForm: false,
      dormInputImage: [],
      validateName: false,
      validateOpenTime: false,
      validateCloseTime: false,
      validateElec: false,
      validateWater: false,
      validateDormImg: false,
      validateNameLength: false,
    };
  },
  methods: {
    checkForm() {
      this.validateNameLength = this.dorm.name.length <= 50 ? true : false;
      this.validateName = this.dorm.name != "" ? true : false;
      this.validateOpenTime = this.dorm.openTime != "" ? true : false;
      this.validateCloseTime = this.dorm.closeTime != "" ? true : false;
      this.validateElec =
        0 < this.dorm.elecPerUnit && this.dorm.elecPerUnit < 50.01
          ? true
          : false;
      this.validateWater =
        0 < this.dorm.waterPerUnit && this.dorm.waterPerUnit < 50.01
          ? true
          : false;
      if (this.editForm) {
        this.validateDormImg = true;
      } else {
        this.validateDormImg = this.dormImgUrl.length != 0 ? true : false;
      }
    },
    onFileChange(e) {
      this.dormImgUrl = [];
      this.dormInputImage = [];
      let files = e.target.files || e.dataTransfer.files;
      for (let i in files) {
        if (typeof files[i] == "object") {
          this.dormInputImage.push(files[i]);
          this.dormImgUrl.push(URL.createObjectURL(files[i]));
        }
      }
    },
    async submit() {
      this.checkForm();
      if (
        this.validateName &&
        this.validateOpenTime &&
        this.validateCloseTime &&
        this.validateWater &&
        this.validateElec &&
        this.validateDormImg &&
        this.validateNameLength
      ) {
        let dormCopy = { ...this.dorm };
        const dormImgCopy = { ...this.dormInputImage };
        if (this.editForm) {
          const loading = this.$vs.loading();
          dormCopy.ownerId = this.$store.state.userAccount.userId;
          let formData = new FormData();
          let data = {
            dormId: this.$store.state.selectedDorm.dormId,
            dorm: dormCopy,
          };
          formData.append("data", JSON.stringify(data));
          for (let i in dormImgCopy) {
            formData.append(
              `dorm_${dormCopy.name}`,
              dormImgCopy[i],
              "test.jpg"
            );
          }
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
              text: `Update Dorm complete!`,
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
              title: `error`,
              text: error.response.data.error.message,
            });
          }
        } else {
          this.$store.commit("SET_DORMINFO", dormCopy);
          this.$store.commit("SET_DORMIMG", dormImgCopy);
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
          title: "Form data not complete",
          text: "Please, input all data in field",
        });
      }
    },
  },
  created() {
    if (this.editForm) {
      if (!this.$store.state.selectedDorm) {
        this.$router.push({ path: "/dormList" });
        return;
      }
      this.dorm.name = this.$store.state.selectedDorm.name;
      this.dorm.openTime = this.$store.state.selectedDorm.openTime;
      this.dorm.closeTime = this.$store.state.selectedDorm.closeTime;
      this.dorm.description = this.$store.state.selectedDorm.description;
      this.dorm.rating = this.$store.state.selectedDorm.rating;
      this.dorm.acceptPercent = this.$store.state.selectedDorm.acceptPercent;
      this.dorm.elecPerUnit = this.$store.state.selectedDorm.elecPerUnit;
      this.dorm.waterPerUnit = this.$store.state.selectedDorm.waterPerUnit;
      this.checkForm();
    }
  },
};
</script>
