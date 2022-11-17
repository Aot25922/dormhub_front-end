<template>
    <div class="pt-[6rem] py-10">
        <ContentEmptyItem imgSize="xl:w-1/2" msg="เกิดข้อผิดพลาด กรุณาลองใหม่"/>
		<div class="flex justify-center pt-5">
			<nuxt-link to="/" class="btn btn-primary w-full md:w-1/2 lg:w-1/3">กลับไปยังหน้าแรก</nuxt-link>
		</div>
    </div>
</template>
<script>
  export default {
    props: ['error'],
    layout: 'error' // you can set a custom layout for the error page
  }
</script>