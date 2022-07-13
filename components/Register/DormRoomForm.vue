<template>
  <div>
    <div class="px-3 md:px-20 lg:px-[335px]">
      <div
        class="relative "
        v-for="(i, index) in roomTypeCount"
        :key="i.id"
      >
        <RegisterDormRoomtypeForm />
        <button
          @click="$delete(roomTypeCount, index);"
          class="absolute top-0 right-0"
          v-if="roomTypeCount.length > 1"
        >
          <h1>{{ i.id }}</h1>
          <span class="material-icons text-white">close</span>
        </button>
      </div>
    </div>
    <button>
      <span
        class="material-icons text-white"
        @click="
          roomTypeCount.push({
            id: roomTypeCount[roomTypeCount.length - 1].id + 1,
          })
        "
        >add_box</span
      >
    </button>
    <!-- <RegisterDormRoomForm />  -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      roomTypeCount: [{ id: 0 }],
    };
  },
};
</script>