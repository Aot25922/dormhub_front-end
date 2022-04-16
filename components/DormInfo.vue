<template>
  <div class="card sm:card-side bg-base-100 shadow-xl">
  <figure><img src="https://api.lorem.space/image/album?w=400&h=400" class="h-64 w-64" alt="Album"></figure>
  <div class="card-body">
    <h2 class="card-title">{{Dorm.name}}</h2>
    <h1>ราคาเท่าไตข้างซ้าย/Month</h1>
    <p>{{Dorm.number}} {{Dorm.street}} {{Dorm.alley}} {{Dorm.zipCode}} {{Dorm.state}} {{Dorm.district}} {{Dorm.city}} {{Dorm.region}} {{Dorm.country}}</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">{{Dorm.rate}}</button>
    </div>
  </div>
</div>
</template>
<script>
export default {
    name: 'DormInfo',
    props:['Dorm']
}
</script>
