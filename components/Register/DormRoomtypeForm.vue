<template>
  <div
    class="p-3 rounded-lg mb-3 relative border shadow-lg lg:flex lg:flex-wrap"
  >
    <button
      @click="removeRoomType"
      class="absolute top-0 right-0"
      v-if="index > 0"
    >
      <span class="material-icons btn btn-ghost pt-3 pr-3">delete</span>
    </button>
    <h1 class="text-lg ml-2 mb-2 font-bold lg:w-full">ประเภทห้อง</h1>
    <div class="lg:px-1 lg:w-1/2">
      <label class="label-text text-gray-500 tracking-wide font-bold my-2"
        >ชื่อประเภทห้อง <span class="text-imperialRed">*</span></label
      >
      <input
        type="text"
        class="
          p-2
          mb-5
          rounded
          border-none
          input input-sm
          md:input-md
          w-full
          disabled:text-gray-400
        "
        placeholder="ห้องนี้สีเขียว"
        v-model="roomType.type"
        @blur="validateForm"
        :disabled="disableForm"
      />
      <p class="text-imperialRed text-right" v-if="validateType">
        กรุณาใส่ชื่อประเภทห้อง
      </p>
    </div>

    <div class="lg:px-1 lg:w-1/2">
      <label class="label-text text-gray-500 tracking-wide font-bold my-2"
        >ราคาค่าเช่าห้องพัก <span class="text-imperialRed">*</span></label
      >
      <input
        type="number"
        class="
          p-2
          mb-5
          rounded
          border-none
          input input-sm
          md:input-md
          w-full
          disabled:text-gray-400
        "
        placeholder="200"
        v-model="roomType.price"
        min="1"
        max="100000"
        @blur="validateForm"
        :disabled="disableForm"
      />
      <p class="text-imperialRed text-right" v-if="validatePrice">
        ราคาได้ตั้งแต่ 1-100000
      </p>
    </div>

    <div class="lg:px-1 lg:w-1/2">
      <label class="label-text text-gray-500 tracking-wide font-bold my-2"
        >ราคาค่ามัดจำ <span class="text-imperialRed">*</span></label
      >
      <input
        type="number"
        class="
          p-2
          mb-5
          rounded
          border-none
          input input-sm
          md:input-md
          w-full
          disabled:text-gray-400
        "
        placeholder="2000"
        v-model="roomType.deposit"
        min="1"
        max="100000"
        @blur="validateForm"
        :disabled="disableForm"
      />
      <p class="text-imperialRed text-right" v-if="validateDeposit">
        ราคาได้ตั้งแต่ 1-100000
      </p>
    </div>

    <div class="lg:px-1 lg:w-1/2">
      <label class="label-text text-gray-500 tracking-wide font-bold my-2"
        >ขนาดพื้นที่ (ตารางเมตร) <span class="text-imperialRed">*</span></label
      >
      <input
        type="number"
        class="
          p-2
          mb-5
          rounded
          border-none
          input input-sm
          md:input-md
          w-full
          disabled:text-gray-400
        "
        placeholder="999.99"
        min="1"
        max="999.99"
        v-model="roomType.area"
        @blur="validateForm"
        :disabled="disableForm"
      />
      <p class="text-imperialRed text-right" v-if="validateArea">
        พื้นที่ได้ตั้งแต่ 1-999.99
      </p>
    </div>

    <div class="lg:w-full">
      <h1 class="text-lg ml-2 mb-2 font-bold">
        สิ่งอำนวยความสะดวก/บริการเสริม
      </h1>
      <textarea
        class="textarea w-full disabled:text-gray-400"
        placeholder="สิ่งอำนวยความสะดวกต่าง ๆ"
        v-model="roomType.facility"
        @blur="validateForm"
        :disabled="disableForm"
      />
    </div>

    <h1 class="text-lg ml-2 mb-2 font-bold lg:w-full">ภาพประเภทห้อง</h1>
    <div class="lg:w-full">
      <div class="mb-3 w-full">
        <label
          for="formFileMultiple"
          class="label-text text-gray-500 tracking-wide font-bold my-2"
          >เลือกได้มากกว่า1รูป <span class="text-imperialRed">*</span></label
        >
        <input
          class="
            focus:outline-none
            form-control
            block
            w-full
            text-gray-500
            rounded
            transition
            ease-in-out
            border-none
          "
          type="file"
          id="formFileMultiple"
          @change="onFileChange"
          multiple
          :disabled="disableForm"
        />
      </div>
      <p class="text-imperialRed text-right" v-if="validateFile">
        ต้องมีอย่างน้อย1ภาพ
      </p>
      <div
        class="md:grid md:grid-cols-2 lg:grid lg:grid-cols-4"
        v-if="checkForImageChangeOnEdit && editForm"
      >
        <img
          v-for="(image, index) in roomTypeImageUrl"
          :key="index"
          :src="
            $store.state.Backend_URL +
            '/dorm/image/' +
            image.dormId +
            '/' +
            image.mediaId +
            '/' +
            image.roomTypeId
          "
          class="py-2 md:p-2 md:max-h-80 md:max-w-full md:object-cover"
        />
      </div>
      <div
        class="md:grid md:grid-cols-2 lg:grid lg:grid-cols-4"
        v-else-if="!checkForImageChangeOnEdit && editForm"
      >
        <img
          v-for="(image, index) in roomTypeImageUrl"
          :key="index"
          :src="image"
          class="py-2 md:p-2 md:max-h-80 md:max-w-full md:object-cover"
        />
      </div>
      <div v-else class="md:grid md:grid-cols-2 lg:grid lg:grid-cols-4">
        <img
          v-for="(i, index) in roomTypeImageUrl"
          :key="index"
          :src="i"
          class="py-2 md:p-2 md:max-h-80 md:max-w-full md:object-cover"
        />
      </div>
    </div>

    <div class="flex flex-wraps">
      <div class="px-1 w-full">
        <button
          class="btn btn-neutral w-full"
          @click="disableForm = false"
          v-if="disableForm"
        >
          เเก้ไขข้อมูลประเภทห้องพัก
        </button>
      </div>
    </div>
    <div class="py-5 w-full md:flex md:justify-end">
      <div class="md:w-1/2">
        <button v-if="editForm" @click="addRoomTypes()" class="btn btn-success w-full">
          ยืนยันการเเก้ไขข้อมูล
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["index", "editForm", "roomTypeProp"],
  data() {
    return {
      roomType: {
        type: "",
        price: null,
        deposit: null,
        area: null,
        facility: "",
      },
      checkForImageChangeOnEdit: true,
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
      oldRoomType: "",
    };
  },
  methods: {
    async addRoomTypes() {
      this.validateForm();
      if (
        this.validateType == false &&
        this.validatePrice == false &&
        this.validateDeposit == false &&
        this.validateArea == false &&
        this.validateFacility == false
      ) {
        this.roomType.description = this.roomType.facility
        let newRoomType = JSON.parse(JSON.stringify(this.roomType));
        newRoomType.oldRoomType = this.oldRoomType;
        let newRoomTypeImg = Object.assign({}, this.roomTypeInputImage);
        if (this.editForm) {
          const loading = this.$vs.loading();
          let formData = new FormData();
          let data = {
            roomType: {
              dormId: this.roomTypeProp.dormHasRoomType.dormId,
              roomTypeId: this.roomTypeProp.dormHasRoomType.roomTypeId,
              type: this.roomType.type,
              price: this.roomType.price,
              deposit: this.roomType.deposit,
              area: this.roomType.area,
              description: this.roomType.facility,
            },
          };
          console.log(this.roomType.facility)
          formData.append("data", JSON.stringify(data));
          for (let i in this.roomTypeInputImage) {
            formData.append(
              `dorm_roomType_${this.roomType.type}`,
              this.roomTypeInputImage[i],
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
              text: `Update Dorm roomType complete!`,
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
          this.$store.commit("SET_ROOMTYPE", newRoomType);
          this.$store.dispatch("setNewRoomTypeImg", {
            image: newRoomTypeImg,
            roomType: newRoomType.type,
            oldRoomType: this.oldRoomType,
          });
          this.oldRoomType = newRoomType.type;
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
    onFileChange(e) {
      this.roomTypeInputImage = [];
      this.roomTypeImageUrl = [];
      this.checkForImageChangeOnEdit = false;
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
      this.$emit("removeRoomType", this.roomType);
    },
    validateForm() {
      this.validateType = this.roomType.type == "" ? true : false;
      this.validatePrice = this.roomType.price <= 0 ? true : false;
      this.validateDeposit = this.roomType.deposit <= 0 ? true : false;
      this.validateArea =
        this.roomType.area <= 0 || this.roomType.area >= 1000 ? true : false;
      this.validateFacility == "" ? true : false;
      this.validateFile = this.roomTypeImageUrl.length == 0 ? true : false;
    },
  },
  created() {
    if (this.editForm) {
      if (!this.$store.state.selectedDorm) {
        this.$router.push({ path: "/dormList" });
        return;
      }
      this.roomType.type = this.roomTypeProp.type;
      this.roomType.price = this.roomTypeProp.dormHasRoomType.price;
      this.roomType.deposit = this.roomTypeProp.dormHasRoomType.deposit;
      this.roomType.area = this.roomTypeProp.dormHasRoomType.area;
      this.roomType.facility = this.roomTypeProp.description;
      this.roomTypeImageUrl = this.$store.state.selectedDorm.media.filter(
        (i) => i.roomTypeId == this.roomTypeProp.roomTypeId
      );
    }
  },
};
</script>
