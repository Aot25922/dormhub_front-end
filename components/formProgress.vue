<template>
  <div class="overflow-auto mb-5 md:mb-8 lg:mb-10">
    <ul class="steps">
      <li class="step step-primary">เริ่มต้นเพิ่มหอพัก</li>
      <li class="step" :class="{ 'step-primary': step1 }"></li>
      <li class="step" :class="{ 'step-primary': step2 }"></li>
      <li class="step" :class="{ 'step-primary': step3 }"></li>
      <li class="step" :class="{ 'step-primary': step4 }"></li>
      <li class="step" :class="{ 'step-primary': step5 }"></li>
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
        this.$route.path == "/dormForm/registerDormPaymentDetail"
      );
    },
    step2() {
      return (
        this.$route.path == "/dormForm/registerDormRoomTypeDetail" ||
        this.$route.path == "/dormForm/registerDormRoomDetail" ||
        this.$route.path == "/dormForm/registerDormPaymentDetail"
      );
    },
    step3() {
      return this.$route.path == "/dormForm/registerDormRoomDetail"||this.$route.path == "/dormForm/registerDormPaymentDetail";
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
