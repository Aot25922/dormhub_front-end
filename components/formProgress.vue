<template>
  <div class="overflow-auto my-10 lg:my-20 flex justify-center">
    <ul class="steps">
      <li class="step step-primary">เริ่มต้นเพิ่มหอพัก</li>
      <li class="step" :class="{ 'step-primary': step1 }">ข้อมูลหอพัก</li>
      <li class="step" :class="{ 'step-primary': step2 }">ประเภทห้อง</li>
      <li class="step" :class="{ 'step-primary': step3 }">ข้อมูลห้อง</li>
      <li class="step" :class="{ 'step-primary': step4 }">การจ่ายเงิน</li>
      <li class="step" :class="{ 'step-primary': step5 }">สรุปผล</li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    step1() {
      return (
        this.$route.path == "/dormForm/registerDormDetail" ||
        this.$route.path == "/dormForm/registerDormRoomTypeDetail" ||
        this.$route.path == "/dormForm/registerDormRoomDetail" ||
        this.$route.path == "/dormForm/registerDormPaymentDetail" ||
        this.$route.path == "/dormForm/confirmForm"
      );
    },
    step2() {
      return (
        this.$route.path == "/dormForm/registerDormRoomTypeDetail" ||
        this.$route.path == "/dormForm/registerDormRoomDetail" ||
        this.$route.path == "/dormForm/registerDormPaymentDetail" ||
        this.$route.path == "/dormForm/confirmForm"
      );
    },
    step3() {
      return this.$route.path == "/dormForm/registerDormRoomDetail"||this.$route.path == "/dormForm/registerDormPaymentDetail" || this.$route.path == "/dormForm/confirmForm";
    },
    step4() {
      return this.$route.path == "/dormForm/registerDormPaymentDetail" || this.$route.path == "/dormForm/confirmForm"
    },
    step5() {
      return this.$route.path == "/dormForm/confirmForm"
    },
  },
};
</script>
