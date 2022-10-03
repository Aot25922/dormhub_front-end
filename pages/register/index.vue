<template>
  <div class="bg-ghostWhite px-5 py-20 md:py-32 md:grid md:grid-cols-2 xl:px-48">
    <div>
      <img src="@/assets/specify/identify.png" class="hidden md:block"/>
    </div>

    <div class="md:py-10 lg:py-20 xl:px-10">
      <h1 class=" pb-10 text-2xl md:text-3xl font-bold text-PrussianBlue text-center md:py-5 xl:py-10">สมัครสมาชิก</h1>

      <!--ขั้นตอนที่ 1-->
      <div v-if="firstStep">
        <input
          class="py-6 px-2 w-full input input-sm md:input-md rounded-lg text-gray-soil border-x-0 border-t-0 border-b-gray-400 my-2 md:my-4"
          placeholder="อีเมล"
          v-model="userAccount.email"
          @blur="validateForm"
        />
        <span class="text-imperialRed" v-if="validateEmail">กรุณากรอกอีเมล</span>

        <input
          class="py-6 px-2 w-full input input-sm md:input-md rounded-lg text-gray-soil border-x-0 border-t-0 border-b-gray-400 my-2 md:my-4"
          placeholder="รหัสผ่าน"
          v-model="userAccount.password"
          @blur="validateForm"
        />
        <span class="text-imperialRed" v-if="validatePassword">กรุณากรอกรหัสผ่าน</span>

        <!--      <input class="py-6 px-2 w-full input input-sm md:input-md rounded-lg text-gray-soil border-x-0 border-t-0 border-b-gray-400 my-2 md:my-4"-->
        <!--        placeholder="ยืนยันรหัสผ่าน" v-model="userAccount.password" @blur="validateForm" @keypress.enter="submit" />-->
        <!--      <span class="text-imperialRed" v-if="!validatePassword">รหัสไม่ตรงกัน</span>-->

        <div class="w-1/2 ml-auto mt-5">
          <button class="btn btn-primary w-full" @click="nextFirstStep">ต่อไป</button>
        </div>
      </div>

      <!--ขั้นตอนที่ 2-->
      <div v-if="secondStep" class="md:flex md:flex-wrap">
        <h1 class="text-black text-lg mt-5 ml-2 mb-2 font-bold md:w-full">รายละเอียดส่วนบุคคล</h1>
        <div class="mb-2 md:px-1 md:w-1/2">
          <label class="label-text text-gray-soil tracking-wide font-bold my-2">ชื่อ</label>
          <input type="text" class="py-6 px-2 w-full input input-sm md:input-md rounded-lg text-gray-soil border-x-0 border-t-0 border-b-gray-400 my-2 md:my-4"
            placeholder="สมบัติ"
            v-model="userAccount.fname"
            @blur="validateForm"
          />
          <span class="text-imperialRed" v-if="validateFname">กรุณากรอกชื่อ</span>
        </div>
        <div class="mb-2 md:px-1 md:w-1/2">
          <label class="label-text text-gray-soil tracking-wide font-bold my-2">นามสกุล</label>
          <input type="text" class=" py-6 px-2 w-full input input-sm md:input-md rounded-lg text-gray-soil border-x-0 border-t-0 border-b-gray-400 my-2 md:my-4"
            placeholder="สั้นสุดฤทธิ์"
            v-model="userAccount.lname"
            @blur="validateForm"
          />
          <span class="text-imperialRed" v-if="validateLname">กรุณากรอกนามสกุล</span>
        </div>
        <div class="mb-2 md:px-1 md:w-1/2">
          <label class="label-text text-gray-soil tracking-wide font-bold my-2">เพศ</label>
          <input type="text" class="py-6 px-2 w-full input input-sm md:input-md rounded-lg text-gray-soil border-x-0 border-t-0 border-b-gray-400 my-2 md:my-4"
            placeholder="จ๊าบ"
            v-model="userAccount.sex"
            @blur="validateForm"
          />
          <span class="text-imperialRed" v-if="validateSex">กรุณากรอกเพศ</span>
        </div>
        <div class="mb-2 md:px-1 md:w-1/2">
          <label class="label-text text-gray-soil tracking-wide font-bold my-2">เบอร์โทรศัพท์</label>
          <input type="text" class=" py-6 px-2 w-full input input-sm md:input-md rounded-lg text-gray-soil border-x-0 border-t-0 border-b-gray-400 my-2 md:my-4"
            placeholder="0941111111"
            v-model="userAccount.phone"
            @blur="validateForm"
          />
          <span class="text-imperialRed" v-if="validatePhone">กรุณากรอกเบอร์</span>
        </div>
        <div class="flex flex-wrap my-5 md:my-8 md:w-full">
          <div class="w-1/2 px-1">
            <button class="btn btn-ghost w-full" @click="firstStep = true; secondStep = false;">ย้อนกลับ</button>
          </div>
          <div class="w-1/2 px-1">
            <button class="btn btn-primary w-full" @click="nextSecondStep">ต่อไป</button>
          </div>
        </div>
      </div>

      <!--ขั้นตอนที่ 3-->
      <div v-if="thirdStep" @click="validateForm">
        <h1 class="text-black text-lg mt-5 ml-2 mb-2 font-bold md:w-full">เลือกบทบาท</h1>
        <div class="flex flex-wrap text-black md:w-full md:py-3">
          <div class="w-1/2 md:px-1">
            <div class="md:border md:border-gray-500 md:rounded-lg">
              <div class="md:p-2">
                <input type="radio" name="radio-2" class="radio radio-primary" id="Customer" value="Customer" v-model="userAccount.role"/>
                <label class="block text-center font-bold" for="Customer">
                  <img src="@/assets/specify/customer.png" id="customer" value="Customer"/>ผู้เช่า</label>
              </div>
            </div>
          </div>

          <div class="w-1/2 md:px-1">
            <div class="md:border md:border-gray-500 md:rounded-lg">
              <div class="md:p-2 drop-shadow transition ease-in-out duration300 delay-150">
                <input type="radio" name="radio-2" class="radio radio-primary" id="Owner" value="Owner" v-model="userAccount.role"/>
                <label class="block text-center font-bold" for="Owner">
                  <img src="@/assets/specify/owner.png" id="Owner" value="Owner"/>เจ้าของหอพัก</label>
              </div>
            </div>
          </div>

          <span class="text-imperialRed md:mt-5" v-if="!validateRole">กรุณาเลือกบทบาท</span>
        </div>

        <div class="flex flex-wrap my-5 md:my-8 md:w-full">
          <div class="w-1/2 px-1">
            <button class="btn btn-ghost w-full" @click="secondStep = true; thirdStep = false;">ย้อนกลับ</button>
          </div>
          <div class="w-1/2 px-1">
            <button class="btn btn-primary w-full" @click="submit">ยืนยัน</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: "accountExist",
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
      firstStep: true,
      secondStep: false,
      thirdStep: false,
    };
  },
  methods: {
    nextFirstStep() {
      this.validateForm();
      if (!this.validateEmail && !this.validatePassword) {
        this.firstStep = false;
        this.secondStep = true;
      }
    },
    nextSecondStep(){
      this.validateForm();
      if (!this.validatePhone && !this.validateSex && !this.validateLname && !this.validateFname) {
        this.secondStep = false;
        this.thirdStep = true;
      }
    },
    async submit() {
      if (
        !this.validateEmail &&
        !this.validatePassword &&
        !this.validateFname &&
        !this.validateLname &&
        !this.validateSex &&
        !this.validatePhone &&
        this.validateRole
      ) {
        let formData = new FormData();
        formData.append("data", JSON.stringify(this.userAccount));
        const loading = this.$vs.loading();
        try {
          let data = await this.$axios.$post(
            `${this.$store.state.Backend_URL}/account/register`,
            formData,
            {
              withCredentials: true,
            }
          );
          this.$store.commit("SET_USERACCOUNT", data);
          this.userAccount = {
            email: "",
            password: "",
            fname: "",
            lname: "",
            sex: "",
            phone: "",
            role: "",
          };
          loading.close();
          this.$router.push({ path: "/" });
          const noti = this.$vs.notification({
            progress: "auto",
            icon: `<i class='bx bx-folder-open' ></i>`,
            color: "success",
            position: "top-right",
            title: `Data Update`,
            text: `Register account complete!`,
          });
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
      }else{
        const noti = this.$vs.notification({
            progress: "auto",
            icon: `<i class='bx bx-folder-open' ></i>`,
            color: "warn",
            position: "top-right",
            title: `Data Update`,
            text: "Please input all form",
          });
      }
    },
    validateForm() {
      this.validateEmail = this.userAccount.email == "" ? true : false;
      this.validatePassword = this.userAccount.password == "" ? true : false;
      this.validateFname = this.userAccount.fname == "" ? true : false;
      this.validateLname = this.userAccount.lname == "" ? true : false;
      this.validateSex = this.userAccount.sex == "" ? true : false;
      this.validatePhone = this.userAccount.phone == "" ? true : false;
      this.validateRole = this.userAccount.role != "" ? true : false;
    },
  },
};
</script>

<style>
</style>
