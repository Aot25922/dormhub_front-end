<template>
  <div>
    <ul class="steps">
      <li class="step step-primary">Start Here!</li>
      <li class="step" :class="{ 'step-primary': step1 }">Dorm Information</li>
      <li class="step" :class="{ 'step-primary': step2 }">Room Information</li>
      <li class="step" :class="{ 'step-primary': step3 }">
        Purchase Information
      </li>
      <li class="step" :class="{ 'step-primary': step4 }">
        Confirm/Cancel Data
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
        this.$route.path == "/dormForm/registerDormRoomDetail"
      );
    },
    step2() {
      return this.$route.path == "/dormForm/registerDormRoomDetail";
    },
    step3() {
      return false;
    },
    step4() {
      return false;
    },
  },
};
</script>