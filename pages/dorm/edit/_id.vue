<template>
  <div class="bg-ghostWhite xl:px-52 2xl:px-96">
    <div class="py-5">
      <h1
        class="p-5 font-bold text-center text-xl md:text-2xl lg:text-3xl xl:text-4xl"
      >
        เเก้ไขข้อมูล
      </h1>

      <!--เเถบเลือกข้อมูลที่ต้องการเเก้ไข-->
      <div class="flex flex-row overflow-x-auto px-5 md:justify-center">
        <button
          class="btn btn-primary w-1/4 mx-1 md:w-1/6"
          @click="
            editDormInfo = true;
            editAddressInfo = false;
            editRoomTypeInfo = false;
            editRoomInfo = false;
            editBankAccountInfo = false;
          "
        >
          ข้อมูลหอพัก
        </button>
        <button
          class="btn btn-primary w-1/4 mx-1 md:w-1/6"
          @click="
            editDormInfo = false;
            editAddressInfo = true;
            editRoomTypeInfo = false;
            editRoomInfo = false;
            editBankAccountInfo = false;
          "
        >
          ที่อยู่หอพัก
        </button>
        <button
          class="btn btn-primary w-1/4 mx-1 md:w-1/6"
          @click="
            editDormInfo = false;
            editAddressInfo = false;
            editRoomTypeInfo = true;
            editRoomInfo = false;
            editBankAccountInfo = false;
          "
        >
          ประเภทห้องพัก
        </button>
        <button
          class="btn btn-primary w-1/4 mx-1 md:w-1/6"
          @click="
            editDormInfo = false;
            editAddressInfo = false;
            editRoomTypeInfo = false;
            editRoomInfo = true;
            editBankAccountInfo = false;
          "
        >
          ข้อมูลของห้องพัก
        </button>
        <button
          class="btn btn-primary w-1/4 mx-1 md:w-1/6"
          @click="
            editDormInfo = false;
            editAddressInfo = false;
            editRoomTypeInfo = false;
            editRoomInfo = false;
            editBankAccountInfo = true;
          "
        >
          ช่องทางการชำระเงิน
        </button>
      </div>

      <!--Form ของข้อมูลที่ต้องการเเก้ไข-->
      <div class="p-5">
        <div v-if="editDormInfo">
          <RegisterDormInfoForm editForm="true" />
        </div>
        <div v-if="editAddressInfo">
          <RegisterDormAddressForm editForm="true"/>
        </div>
        <div v-if="editRoomTypeInfo">
          <h1 class="font-bold text-lg md:text-xl xl:text-2xl 2xl:text-3xl">จำนวนประเภทในตอนนี้ : {{roomType.length}}</h1>
          <RegisterDormRoomtypeForm editForm="true" :roomTypeProp="i" v-for="i in roomType" :key="i.roomTypeId"/>
        </div>
        <div v-if="editRoomInfo">
          <RegisterDormRoomForm editForm="true"/>
        </div>
        <div v-if="editBankAccountInfo">
          <RegisterDormPaymentForm editForm="true"/>
        </div>
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
  computed: {
    roomType(){
      return this.$store.state.selectedDorm.roomTypes
    },
  },
};
</script>
