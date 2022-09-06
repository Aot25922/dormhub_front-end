<template>
  <div>
    <div class="border border-gray-400 p-3 rounded-lg my-3">
      <h1 class="text-lg ml-2 mb-2 font-bold">เพิ่มช่องทางการชำระเงิน</h1>
      <div>
        <div v-for="(bankAccount, index) in bankAccounts" :key="index" class="relative flex flex-wrap">
          <div class="w-1/2 px-1">
            <label class="label-text tracking-wide font-bold my-2">เลขบัญชี <span class="text-accent">*</span></label>
            <input type="text" class="py-4 mb-3 px-2 w-full input-md rounded border-0"
              placeholder="101" v-model="bankAccount.accountNum" @blur="validate(bankAccount)" :disabled="disableForm" />
          </div>

          <div class="w-1/2 px-1">
            <label class="label-text tracking-wide font-bold my-2">ชื่อบัญชี <span class="text-accent">*</span></label>
            <input type="text" class="py-4 mb-3 px-2 w-full input-md rounded border-0"
            placeholder="เจ้าของบัญชี เท่มาก" v-model="bankAccount.accountName" @blur="validate(bankAccount)" :disabled="disableForm"/>
          </div>

          <div class="w-1/2 px-1">
            <label class="label-text tracking-wide font-bold my-2">ธนาคาร <span class="text-accent">*</span></label>
            <select v-model="bankAccount.bankId" class="select w-full border-0" @click="validate(bankAccount)">
              <option option disabled selected>กรุณาเลือกธนาคาร</option>
              <option
                v-for="option in bankList"
                :value="option"
                :key="option.bankId">
                {{ option.name }}
              </option>
            </select>
            <p class="text-accent text-right" v-if="bankValidate">กรุณาเลือกธนาคาร</p>
          </div>

          <div class="w-1/2 px-1 pt-6 ml-auto">
            <button @click="removeBankAccount(index)" class="btn btn-accent w-1/2" v-if="index > 0">
              <span class="material-icons">delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <span v-if="accountNumValidate" class="text-error">Some account number field not complete</span>
    <span v-if="accountNameValidate" class="text-error">Some account name field not complete</span>
    <div class="py-5">
      <button class="btn btn-accent w-full" v-if="disableForm" @click="disableForm = false">เเก้ไขข้อมูล</button>
    </div>
    <div class="flex items-center justify-center">
      <button class="hover:bg-gray-500 rounded-lg mt-10 text-center p-5 w-full md:m-0 md:h-[600px] md:border-2 md:border-gray-400">
        <span class="material-icons" style="font-size: 60px"
          @click="
            bankAccounts.push({
              accountNum: '',
              accountName: '',
            })">add_box</span>
        <p>เพิ่มบัญชีธนาคาร</p>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  async fetch() {
    this.bankList = await this.$axios.$get(
      `${this.$store.state.Backend_URL}/bank`
    );
  },
  data() {
    return {
      bankAccounts: [
        {
          accountNum: "",
          accountName: "",
          bankId:""
        },
      ],
      bankList: [],
      accountNumValidate: false,
      accountNameValidate: false,
      bankValidate: false,
      disableForm: false,
    };
  },
  methods: {
    submit() {
      for (let i in this.bankAccounts) {
        this.validate(this.bankAccounts[i]);
      }
      if (!this.accountNumValidate && !this.accountNameValidate && !this.bankValidate) {
        let newBankAccount = JSON.parse(JSON.stringify(this.bankAccounts));
        this.$store.commit("SET_BANKACCOUNT", newBankAccount);
        this.disableForm = true;
        this.$emit("validate", true);
      } else {
        const noti = this.$vs.notification({
          progress: "auto",
          icon: `<i class='bx bx-error' ></i>`,
          color: "warn",
          position: "top-right",
          title: "ข้อมูลของคุญยังได้สมบูรณ์",
          text: "กรุณาเติมข้อมูลให้ครบ",
        });
        this.$emit("validate", false);
      }
    },
    validate(input) {
      this.accountNumValidate = input.accountNum == "" ? true : false;
      this.accountNameValidate = input.accountName == "" ? true : false;
      this.bankValidate = input.bankId == "" ? true : false;
    },
    removeBankAccount(index) {
      this.$delete(this.bankAccounts, index);
    },
  },
};
</script>
