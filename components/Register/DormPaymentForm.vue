<template>
  <div>
    <div class="bg-cream p-3 rounded-lg my-3">
      <h1 class="text-black text-lg ml-2 mb-2 font-bold">
        เพิ่มช่องทางการชำระเงิน
      </h1>
      <div class="grid grid-cols-3 gap-4">
        <div
          v-for="(bankAccount, index) in bankAccounts"
          :key="index"
          class="relative"
        >
          <button
            @click="removeBankAccount(index)"
            class="absolute top-0 right-0"
            v-if="index > 0"
          >
            <span class="material-icons text-white">close</span>
          </button>
          <label
            for=""
            class="label-text text-gray-soil tracking-wide font-bold my-2"
            >เลขบัญชี</label
          >
          <input
            type="text"
            class="
              py-4
              mb-3
              px-2
              w-full
              input-sm
              rounded
              text-gray-soil
              bg-cream-light
              border-0
              focus:outline-none focus:bg-cream-lightest focus:text-gray-soil
              disabled:bg-green-darker disabled:text-dark-gray
            "
            placeholder="101"
            v-model="bankAccount.accountNum"
            @blur="validate(bankAccount)"
            :disabled="disableForm"
          />
          <label
            for=""
            class="label-text text-gray-soil tracking-wide font-bold my-2"
            >ชื่อบัญชี</label
          >
          <input
            type="text"
            class="
              py-4
              mb-3
              px-2
              w-full
              input-sm
              rounded
              text-gray-soil
              bg-cream-light
              border-0
              focus:outline-none focus:bg-cream-lightest focus:text-gray-soil
              disabled:bg-green-darker disabled:text-dark-gray
            "
            placeholder="101"
            v-model="bankAccount.accountName"
            @blur="validate(bankAccount)"
            :disabled="disableForm"
          />
        </div>
      </div>
    </div>
    <button
      class="text-black bg-confirmButton"
      v-if="!disableForm"
      @click="submit"
    >
      <p>Submit</p>
    </button>
    <button
      class="text-black bg-confirmButton"
      v-if="disableForm"
      @click="disableForm = false"
      type="button"
    >
      <p>เเก้ไขข้อมูล</p>
    </button>
    <span v-if="accountNumValidate" class="text-error"
      >Some account number field not complete</span
    >
    <span v-if="accountNameValidate" class="text-error"
      >Some account name field not complete</span
    >
    <div class="flex items-center justify-center">
      <button
        class="text-black hover:text-gray-soil hover:bg-cream rounded-lg"
        type="button"
      >
        <span
          class="material-icons"
          style="font-size: 60px"
          @click="
            bankAccounts.push({
              accountNum: '',
              accountName: '',
            })
          "
          >add_box</span
        >
        <p>เพิ่มบัญชีธนาคาร</p>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bankAccounts: [
        {
          accountNum: "",
          accountName: "",
        },
      ],
      accountNumValidate: false,
      accountNameValidate: false,
      disableForm: false,
    };
  },
  methods: {
    submit() {
      for (let i in this.bankAccounts) {
        this.validate(this.bankAccounts[i]);
      }
      if (!this.accountNumValidate && !this.accountNameValidate) {
        let newBankAccount = JSON.parse(JSON.stringify(this.bankAccounts));
        this.$store.commit("SET_BANKACCOUNT", newBankAccount);
        this.disableForm = true;
        const noti = this.$vs.notification({
          progress: "auto",
          icon: `<i class='bx bx-folder-open' ></i>`,
          color: "success",
          position: "top-right",
          title: `Data Update`,
          text: `Add you payment data complete!`,
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
    validate(input) {
      this.accountNumValidate = input.accountNum == "" ? true : false;
      this.accountNameValidate = input.accountName == "" ? true : false;
    },
    removeBankAccount(index){
      this.$delete(this.bankAccounts, index);
    }
  },
};
</script>
