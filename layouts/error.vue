<template>
    <div>
        <h1>This is error page.</h1>
    </div>
</template>
<script>
  export default {
    props: ['error'],
    layout: 'error' // you can set a custom layout for the error page
  }
</script>