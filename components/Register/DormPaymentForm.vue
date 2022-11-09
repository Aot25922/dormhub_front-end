<template>
  <div>
    <div class="border bg-neutral p-5 rounded-lg my-3 shadow-lg">
      <h1 class="text-lg ml-2 mb-2 font-bold">เพิ่มช่องทางการชำระเงิน</h1>
      <div>
        <div
          v-for="(bankAccount, index) in bankAccounts"
          :key="index"
          class="relative flex flex-wrap"
        >
          <div class="w-1/2 px-1 md:w-1/4">
            <label class="label-text tracking-wide font-bold my-2 text-gray-500"
              >เลขบัญชี <span class="text-accent">*</span></label
            >
            <input
              type="text"
              class="py-4 px-2 w-full input-md rounded border-gray-200 disabled:text-gray-400 disabled:bg-gray-800"
              placeholder="101100000"
              maxlength="10"
              v-model="bankAccount.accountNum"
              @blur="validate(bankAccount)"
              :disabled="disableForm"
            />
            <div class="text-gray-300 pt-1 font-bold text-xs md:text-sm">
              <span v-text="10 - bankAccount.accountNum.length"></span>
              <span>/10</span>
            </div>
          </div>

          <div class="w-1/2 px-1 md:w-1/4">
            <label class="label-text tracking-wide font-bold my-2 text-gray-500"
              >ชื่อบัญชี <span class="text-accent">*</span></label
            >
            <input
              type="text"
              class="py-4 mb-3 px-2 w-full input-md rounded border-gray-200 disabled:text-gray-400 disabled:bg-gray-800"
              placeholder="เจ้าของบัญชี เท่มาก"
              v-model="bankAccount.accountName"
              @blur="validate(bankAccount)"
              :disabled="disableForm"
            />
          </div>

          <div class="w-1/2 px-1 md:w-1/4">
            <label class="label-text tracking-wide font-bold my-2 text-gray-500"
              >ธนาคาร <span class="text-accent">*</span></label
            >
            <select
              v-model="bankAccount.bankId"
              class="select w-full border-gray-200 disabled:text-gray-400"
              @click="validate(bankAccount)"
              :disabled="disableForm"
            >
              <option option disabled selected>กรุณาเลือกธนาคาร</option>
              <option
                v-for="option in bankList"
                :value="option"
                :key="option.bankId"
              >
                {{ option.name }}
              </option>
            </select>
            <p class="text-accent text-right" v-if="bankValidate">
              กรุณาเลือกธนาคาร
            </p>
          </div>

          <div class="w-1/2 px-1 pt-6 md:w-1/4 md:flex md:justify-end">
            <button
              @click="removeBankAccount(index)"
              class="btn btn-accent w-2/3"
              v-if="index > 0"
              :disabled="disableForm"
            >
              <span class="material-icons">delete</span>
            </button>
          </div>
          <div class="w-full divider"></div>
        </div>
      </div>
    </div>
    <span v-if="accountNumValidate" class="text-error"
      >บางกล่องข้อความเลขบัญชียังไม่สมบูรณ์</span
    >
    <span v-if="accountNameValidate" class="text-error"
      >บางกล่องของชื่อบัญชีไม่สมบูรณ์</span
    >
    <div class="py-5">
      <button
        class="btn btn-accent w-full"
        v-if="disableForm"
        @click="disableForm = false"
      >
        เเก้ไขข้อมูล
      </button>
    </div>
    <div v-if="!disableForm && bankAccounts.length<5" class="flex items-center justify-center">
      <!-- Mobile Button -->
      <button

        @click="
          bankAccounts.push({
            accountNum: '',
            accountName: '',
			bankId: ''
          })
        "
        class="btn btn-secondary p-5 w-full"
      >
        เพิ่มบัญชีธนาคาร
      </button>
    </div>
    <div class="py-5">
    <button
      v-if="editForm"
      @click="submit()"
      class="btn btn-success w-full"
    >
      ยืนยันการเเก้ไขข้อมูล
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
  props: ["editForm"],
  data() {
    return {
      bankAccounts: [
        {
          accountNum: "",
          accountName: "",
          bankId: "",
        },
      ],
      bankList: [],
      deleteBankAccount: [],
      accountNumValidate: false,
      accountNameValidate: false,
      bankValidate: false,
      disableForm: false,
    };
  },
  methods: {
    async submit() {
      if(this.bankAccounts.length > 5){
        const noti = this.$vs.notification({
          progress: "auto",
          icon: `<i class='bx bx-error' ></i>`,
          color: "warn",
          position: "top-right",
          title: "บัญชีของคุณเกิน 5 บัญชี",
          text: "จำกัดไม่เกิน 5 บัญชี",
        });
        return
      }
      for (let i in this.bankAccounts) {
        this.validate(this.bankAccounts[i]);
      }
      if (
        !this.accountNumValidate &&
        !this.accountNameValidate &&
        !this.bankValidate
      ) {
        let newBankAccount = JSON.parse(JSON.stringify(this.bankAccounts));
        if (this.editForm) {
          const loading = this.$vs.loading();
          let formData = new FormData();
          for (let i in this.deleteBankAccount) {
            newBankAccount.push(this.deleteBankAccount[i]);
          }
          for (let i in newBankAccount) {
            newBankAccount[i].bankId = newBankAccount[i].bankId.bankId;
            newBankAccount[i].dormId = this.$store.state.selectedDorm.dormId;
          }
          const data = {
            bankAccount: newBankAccount,
          };
          formData.append("data", JSON.stringify(data));
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
        } else {
          this.$store.commit("SET_BANKACCOUNT", newBankAccount);
          this.disableForm = true;
          this.$emit("validate", true);
        }
      } else {
        const noti = this.$vs.notification({
          progress: "auto",
          icon: `<i class='bx bx-error' ></i>`,
          color: "warn",
          position: "top-right",
          title: "ข้อมูลของคุญยังไม่สมบูรณ์",
          text: "กรุณากรอกข้อมูลให้ครบ",
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
      if (this.bankAccounts[index].bankAccId != undefined) {
        this.bankAccounts[index].delete = true;
        this.deleteBankAccount.push(this.bankAccounts[index]);
      }
      this.$delete(this.bankAccounts, index);
    },
  },
  created() {
    if (this.editForm) {
      if (!this.$store.state.selectedDorm) {
        this.$router.push({ path: "/dormList" });
        return;
      }
      this.bankAccounts = [];
      for (let i in this.$store.state.selectedDorm.bankAccounts) {
        this.bankAccounts.push({
          bankAccId: this.$store.state.selectedDorm.bankAccounts[i].bankAccId,
          accountNum: this.$store.state.selectedDorm.bankAccounts[i].accountNum,
          accountName:
            this.$store.state.selectedDorm.bankAccounts[i].accountName,
          bankId: this.$store.state.selectedDorm.bankAccounts[i].bank,
        });
      }
    }
  },
};
</script>
