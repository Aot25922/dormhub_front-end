<template>
  <div>
    <ul class="steps">
      <li class="step step-primary">Start Here!</li>
      <li class="step" :class="{ 'step-primary': step1 }">Dorm Information</li>
      <li class="step" :class="{ 'step-primary': step2 }">RoomType Information</li>
      <li class="step" :class="{ 'step-primary': step3 }">
        Room Information
      </li>
      <li class="step" :class="{ 'step-primary': step4 }">
        Payment Information
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
        this.$route.path == "/dormForm/registerDormRoomDetail"
      );
    },
    step2() {
      return this.$route.path == "/dormForm/registerDormRoomTypeDetail" || this.$route.path == "/dormForm/registerDormRoomDetail";
    },
    step3() {
      return this.$route.path == "/dormForm/registerDormRoomDetail";
    },
    step4() {
      return false;
    },
  },
};
</script>