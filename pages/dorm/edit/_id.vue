<template>
  <div>
    <h1
      class="font-bold text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl"
    >
      เเก้ไขข้อมูล
    </h1>

    <!--เเถบเลือกข้อมูลที่ต้องการเเก้ไข-->
    <div class="grid grid-cols-5 gap-4">
      <button
        class="btn btn-primary w-full"
        @click="
          editDormInfo = true;
          editAddressInfo = false;
          editRoomTypeInfo = false;
          editRoomInfo = false;
          editBankAccountInfo = false;
        "
      >
        เเก้ไขข้อมูลหอพัก
      </button>
      <button
        class="btn btn-primary w-full"
        @click="
          editDormInfo = false;
          editAddressInfo = true;
          editRoomTypeInfo = false;
          editRoomInfo = false;
          editBankAccountInfo = false;
        "
      >
        เเก้ไขข้อมูลที่อยู่หอพัก
      </button>
      <button
        class="btn btn-primary w-full"
        @click="
          editDormInfo = false;
          editAddressInfo = false;
          editRoomTypeInfo = true;
          editRoomInfo = false;
          editBankAccountInfo = false;
        "
      >
        เเก้ไขข้อมูลประเภทห้องพัก
      </button>
      <button
        class="btn btn-primary w-full"
        @click="
          editDormInfo = false;
          editAddressInfo = false;
          editRoomTypeInfo = false;
          editRoomInfo = true;
          editBankAccountInfo = false;
        "
      >
        เเก้ไขข้อมูลของห้องพัก
      </button>
      <button
        class="btn btn-primary w-full"
        @click="
          editDormInfo = false;
          editAddressInfo = false;
          editRoomTypeInfo = false;
          editRoomInfo = false;
          editBankAccountInfo = true;
        "
      >
        เเก้ไขข้อมูลช่องทางการชำระเงิน
      </button>
    </div>

    <!--Form ของข้อมูลที่ต้องการเเก้ไข-->
    <div>
      <div v-if="editDormInfo">
        <RegisterDormInfoForm editForm="true" />
      </div>
      <div v-if="editAddressInfo">
        <RegisterDormAddressForm editForm="true"/>
      </div>
      <div v-if="editRoomTypeInfo">
        <RegisterDormRoomtypeForm editForm="true"/>
      </div>
      <div v-if="editRoomInfo">
        <RegisterDormRoomForm editForm="true"/>
      </div>
      <div v-if="editBankAccountInfo">
        <RegisterDormPaymentForm editForm="true"/>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      editDormInfo: true,
      editAddressInfo: false,
      editRoomTypeInfo: false,
      editRoomInfo: false,
      editBankAccountInfo: false,
    };
  },
  methods: {},
  computed: {},
};
</script>
