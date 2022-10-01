<template>
  <div class="center">
    <vs-table>
      <template #thead>
        <vs-tr>
          <vs-th> ชื่อหอพัก </vs-th>
          <vs-th> ประเภทห้องพัก </vs-th>
          <vs-th> ราคา </vs-th>
          <vs-th> เลขห้องพัก </vs-th>
          <vs-th> วันที่เริ่มเข้าพัก </vs-th>
          <vs-th> วันที่สิ้นสุดการเข้าพัก </vs-th>
          <vs-th> สถานะ </vs-th>
        </vs-tr>
      </template>
      <template #tbody v-if="bookingList">
        <vs-tr
          :key="i"
          v-for="(tr, i) in $vs.getPage(bookingList, page, max)"
          :data="tr"
        >
          <vs-td>
            {{ tr.room.roomType.dorms[0].name }}
          </vs-td>
          <vs-td>
            {{ tr.room.roomType.type }}
          </vs-td>
          <vs-td>
            {{ tr.room.roomType.dorms[0].dormHasRoomType.price }}
          </vs-td>
          <vs-td>
            {{ tr.room.roomNum }}
          </vs-td>
          <vs-td>
            {{ tr.startDate }}
          </vs-td>
          <vs-td>
            {{ tr.endDate }}
          </vs-td>
          <vs-td>
            {{ tr.status }}
          </vs-td>
        </vs-tr>
      </template>
      <template #footer>
        <vs-pagination v-if="bookingList" v-model="page" :length="$vs.getLength(bookingList, max)" />
      </template>
    </vs-table>
  </div>
</template>

<script>
export default {
  async fetch() {
    if (this.$store.state.userAccount.role == "Customer") {
      this.bookingList = await this.$axios.$get(
        `${this.$store.state.Backend_URL}/booking/${this.$store.state.userAccount.userId}`
      );
    } else if (this.$store.state.userAccount.role == "Owner") {
      this.bookingList = await this.$axios.$get(
        `${this.$store.state.Backend_URL}/booking/owner/${this.$store.state.userAccount.userId}`
      );
    } else {
      this.$router.push({ path: "/" });
    }
  },
  data() {
    return {
      page: 1,
      max: 5,
      bookingList: null,
    };
  },
  methods: {},
};
</script>

<style>
</style>
