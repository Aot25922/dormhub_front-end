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
          <vs-td v-if="$store.state.userAccount.role == 'Customer'">
            {{ tr.status }}
          </vs-td>
          <vs-td v-if="$store.state.userAccount.role == 'Owner'">
            <select
              v-model="tr.status"
              class="select w-full text-gray-500 border-0"
              @change="updateStatus(tr)"
            >
              <option
                v-for="(option, index) in statusList"
                :value="option"
                :key="index"
              >
                {{ option }}
              </option>
            </select>
          </vs-td>
        </vs-tr>
      </template>
      <template #footer>
        <vs-pagination
          v-if="bookingList"
          v-model="page"
          :length="$vs.getLength(bookingList, max)"
        />
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
      for (let i in this.bookingList) {
      }
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
      statusList: ["ยืนยันแล้ว", "ยกเลิก", "รอการยืนยัน"],
      selectedStatus: null,
    };
  },
  methods: {
    async updateStatus(booking) {
      console.log(booking);
      const loading = this.$vs.loading();
      let formData = new FormData();
      const data = {
        status: booking.status,
        bookingId: booking.bookingId,
        roomId: booking.roomId,
        roomTypeId: booking.room.roomTypeId,
        dormId: booking.room.dormId,
      };
      formData.append("data", JSON.stringify(data));
      try {
        await this.$axios.$put(
          `${this.$store.state.Backend_URL}/booking/owner/update`,
          formData,
          {
            withCredentials: true,
          }
        );
        const noti = this.$vs.notification({
          progress: "auto",
          icon: `<i class='bx bx-folder-open' ></i>`,
          color: "success",
          position: "top-right",
          title: `Data Update`,
          text: `Update status complete!`,
        });
        loading.close();
      } catch (error) {
        loading.close();
        const noti = this.$vs.notification({
          progress: "auto",
          icon: `<i class='bx bx-folder-open' ></i>`,
          color: "warn",
          position: "top-right",
          title: `Data Update`,
          text: error.response.data.error.message,
        });
      }
    },
  },
};
</script>

<style>
</style>
