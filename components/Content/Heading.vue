<template>
  <div class="heading-bg">
    <div class="heading-pathName">
      <ul>
        <li>หน้าหลัก</li>
        <li>{{ pageName }}</li>
      </ul>
    </div>
    <h1 class="heading-name">
      {{ headingName }}
    </h1>
  </div>
</template>

<script>
export default {
  name: "Heading",
  props: {
    pageName: String,
    headingName: String,
  },
};
</script>
