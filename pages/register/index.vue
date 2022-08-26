<template>
  <div class="p-5 md:px-20 lg:px-96">
    <h1 class="pb-5 md:pt-5 text-2xl md:text-3xl font-bold text-cream-darker text-center">
      สมัครสมาชิก
    </h1>

    <div class="bg-cream p-3 rounded-lg my-3 md:p-5 md:mt-5 md:my-8">
      <h1 class="text-black text-lg ml-2 mb-2 font-bold">
        สำหรับการเข้าสู่ระบบ
      </h1>
      <input
        class="
          py-4
          px-2
          w-full
          input input-sm md:input-md
          rounded
          text-gray-soil
          bg-cream-light
          my-2
        "
        placeholder="อีเมล"
        v-model="userAccount.email"
        @blur="validateForm"
        @keypress.enter="submit"
      />
      <span class="text-cancelButton" v-if="!validateEmail"
        >กรุณากรอกอีเมล</span
      >
      <input
        class="
          py-4
          px-2
          w-full
          input input-sm md:input-md
          rounded
          text-gray-soil
          bg-cream-light
          my-2
        "
        placeholder="รหัสผ่าน"
        v-model="userAccount.password"
        @blur="validateForm"
        @keypress.enter="submit"
      />
      <span class="text-cancelButton" v-if="!validatePassword"
        >กรุณากรอกรหัสผ่าน</span
      >
    </div>

    <div class="bg-cream p-3 rounded-lg my-3 md:p-5 md:flex md:flex-wrap">
      <h1 class="text-black text-lg ml-2 mb-2 font-bold md:w-full">
        รายละเอียดส่วนบุคคล
      </h1>
      <div class="mb-2 md:px-1 md:w-1/2">
        <label class="label-text text-gray-soil tracking-wide font-bold my-2"
          >ชื่อ</label
        >
        <input
          type="text"
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
          placeholder="สมบัติ"
          v-model="userAccount.fname"
          @blur="validateForm"
          @keypress.enter="submit"
        />
        <span class="text-cancelButton" v-if="!validateFname"
          >กรุณากรอกชื่อ</span
        >
      </div>
      <div class="mb-2 md:px-1 md:w-1/2">
        <label class="label-text text-gray-soil tracking-wide font-bold my-2"
          >นามสกุล</label
        >
        <input
          type="text"
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
          placeholder="สั้นสุดฤทธิ์"
          v-model="userAccount.lname"
          @blur="validateForm"
          @keypress.enter="submit"
        />
        <span class="text-cancelButton" v-if="!validateLname"
          >กรุณากรอกนามสกุล</span
        >
      </div>
      <div class="mb-2 md:px-1 md:w-1/2">
        <label class="label-text text-gray-soil tracking-wide font-bold my-2"
          >เพศ</label
        >
        <input
          type="text"
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
          placeholder="จ๊าบ"
          v-model="userAccount.sex"
          @blur="validateForm"
          @keypress.enter="submit"
        />
        <span class="text-cancelButton" v-if="!validateSex"
          >กรุณากรอกเพศ</span
        >
      </div>
      <div class="mb-2 md:px-1 md:w-1/2">
        <label class="label-text text-gray-soil tracking-wide font-bold my-2"
          >เบอร์โทรศัพท์</label
        >
        <input
          type="text"
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
          placeholder="0941111111"
          v-model="userAccount.phone"
          @blur="validateForm"
          @keypress.enter="submit"
        />
        <span class="text-cancelButton" v-if="!validatePhone"
          >กรุณากรอกเบอร์</span
        >
      </div>
      <h1 class="text-black text-lg mt-5 ml-2 mb-2 font-bold md:w-full">เลือกบทบาท</h1>
      <div class="flex flex-wrap text-black md:w-full md:py-3">
        <!-- เดี๋ยวหาภาพมาแปะแทนปุ่ม -->
        <div class="w-1/2">
          <input
            type="radio"
            name="radio-2"
            class="radio radio-primary"
            id="customer"
            value="Customer"
            v-model="userAccount.role"
            @blur="validateForm"
            @keypress.enter="submit"
          />
          <label for="customer">ผู้เช่า</label>
        </div>
        <div class="w-1/2">
          <input
            type="radio"
            name="radio-2"
            class="radio radio-primary"
            id="owner"
            value="Owner"
            v-model="userAccount.role"
            @blur="validateForm"
            @keypress.enter="submit"
          />
          <label for="owner">เจ้าของหอพัก</label>
        </div>
        <span class="text-cancelButton" v-if="!validateRole"
          >กรุณาเลือกบทบาท</span
        >
      </div>
    </div>


    <div class="flex flex-wrap my-5 md:my-8 md:px-20">
      <div class="w-1/2 px-1">
        <button class="btn btn-secondary w-full">ยกเลิก</button>
      </div>
      <div class="w-1/2 px-1">
        <button class="btn btn-accent w-full" @click="submit">ยืนยัน</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'accountExist',
  data() {
    return {
      userAccount: {
        email: "",
        password: "",
        fname: "",
        lname: "",
        sex: "",
        phone: "",
        role: "",
      },
      validateEmail: false,
      validatePassword: false,
      validateFname: false,
      validateLname: false,
      validateSex: false,
      validatePhone: false,
      validateRole: false,
    };
  },
  methods: {
    async submit() {
      let formData = new FormData();
      formData.append("data", JSON.stringify(this.userAccount));
      try {
        let data = await this.$axios.$post(
          `${this.$store.state.Backend_URL}/account/register`,
          formData,
          {
            withCredentials: true,
          }
        );
        this.$store.commit("SET_USERACCOUNT", data)
        this.$router.push({path:'/'})
        const noti = this.$vs.notification({
          progress: "auto",
          icon: `<i class='bx bx-folder-open' ></i>`,
          color: "success",
          position: "top-right",
          title: `Data Update`,
          text: `Register account complete!`,
        });
      } catch (error) {
        const noti = this.$vs.notification({
          progress: "auto",
          icon: `<i class='bx bx-folder-open' ></i>`,
          color: "warn",
          position: "top-right",
          title: `Data Update`,
          text: error.response.data.error.message,
        });
      }
    },
    validateForm() {
      this.validateEmail = this.userAccount.email != "" ? true : false;
      this.validatePassword = this.userAccount.password != "" ? true : false;
      this.validateFname = this.userAccount.fname != "" ? true : false;
      this.validateLname = this.userAccount.lname != "" ? true : false;
      this.validateSex = this.userAccount.sex != "" ? true : false;
      this.validatePhone = this.userAccount.phone != "" ? true : false;
      this.validateRole = this.userAccount.role != "" ? true : false;
    },
  },
};
</script>

<style>
</style>
