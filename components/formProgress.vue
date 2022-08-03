<template>
  <div>
    <ul class="steps">
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
  props: { currentPath: String },
  data() {
    return {
      step1: false,
      step2: false,
      step3: false,
      step4: false,
    };
  },
  mounted() {
    if (this.currentPath == "/dormForm/registerDormDetail") {
      this.step1 = true;
      this.step2 = false;
      this.step3 = false;
      this.step4 = false;
    }
    else if (this.currentPath == "/dormForm/registerDormRoomDetail") {
      this.step1 = true;
      this.step2 = true;
      this.step3 = false;
      this.step4 = false;
    } else{
      this.step1 = true;
      this.step2 = false;
      this.step3 = false;
      this.step4 = false;
    }
  },
};
</script>