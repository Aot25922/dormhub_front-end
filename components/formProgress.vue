<template>
  <div>
    <ul class="steps">
      <li class="step step-primary">Start Here!</li>
      <li class="step" :class="{ 'step-primary': step1 }">Dorm Information</li>
      <li class="step" :class="{ 'step-primary': step2 }">
        RoomType Information
      </li>
      <li class="step" :class="{ 'step-primary': step3 }">Room Information</li>
      <li class="step" :class="{ 'step-primary': step4 }">
        Payment Information
      </li>
      <li class="step" :class="{ 'step-primary': step5 }">
        Confirm/Cancel Information
      </li>
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
      return this.$route.path == "/dormForm/registerDormPaymentDetail"
    },
    step5() {
      return false;
    },
  },
};
</script>