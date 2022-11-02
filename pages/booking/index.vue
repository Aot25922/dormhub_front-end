<template>
  <div class="center pt-[6rem]">
    <vs-table>
      <template #thead>
        <vs-tr>
          <vs-th> ชื่อหอพัก </vs-th>
          <vs-th> ประเภทห้องพัก </vs-th>
          <vs-th> ราคา </vs-th>
          <vs-th> เลขห้องพัก </vs-th>
          <vs-th> ภาพสลิป </vs-th>
          <vs-th> วันที่เริ่มเข้าพัก </vs-th>
          <vs-th> วันที่สิ้นสุดการเข้าพัก </vs-th>
          <vs-th v-if="$store.state.userAccount.role == 'Owner'">
            ผู้จอง
          </vs-th>
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
            <p v-if="tr.status != 'ยืนยันการโอน' && !slipImgUrl">
              {{ tr.status }}
            </p>
            <img
              v-else-if="tr.status == 'รอการโอน'"
              :src="slipImgUrl"
              class="object-cover object-center w-full h-full"
            />
            <img
              v-else
              :src="$store.state.Backend_URL + '/booking/image/' + tr.bookingId"
              class="object-cover object-center w-full h-full"
            />
          </vs-td>
          <vs-td>
            {{ new Date(tr.startDate).toDateString()}}
          </vs-td>
          <vs-td>
            {{ new Date(tr.endDate).toDateString() }}
          </vs-td>
          <vs-td v-if="$store.state.userAccount.role == 'Owner'">
            <p>E-mail : {{ tr.userAccount.email }}</p>
            <p>เบอร์โทรศัพท์ : {{ tr.userAccount.phone }}</p>
            <p>ชื่อ : {{ tr.userAccount.fname }} {{ tr.userAccount.lname }}</p>
          </vs-td>
          <vs-td v-if="$store.state.userAccount.role == 'Customer'">
            <div v-if="tr.status == 'รอการโอน' || tr.status == 'ยืนยันการโอน'">
              <p>{{tr.status}}</p>
              <p>เเนบหลักฐานการโอนเงิน</p>
              <input type="file" @change="onFileChange($event, tr)" />
            </div>
            <p v-else>{{ tr.status }}</p>
          </vs-td>
          <vs-td v-if="$store.state.userAccount.role == 'Owner'">
            <button
              v-if="tr.status == 'รอการยืนยัน'"
              class="bg-emerald-600"
              @click="updateStatus(tr, 'รอการโอน')"
            >
              ยืนยัน
            </button>
            <button
              v-if="tr.status == 'รอการยืนยัน'"
              class="bg-imperialRed"
              @click="updateStatus(tr, 'ยกเลิก')"
            >
              ยกเลิก
            </button>
            <p
              v-else-if="tr.status == 'ยืนยันการโอน' || tr.status == 'รอการโอน'"
            >
              {{ tr.status }}
            </p>
            <p v-else-if="tr.status == 'ยกเลิก'">ยกเลิกการจองเเล้ว</p>
            <button
              v-else
              class="bg-imperialRed"
              @click="updateStatus(tr, 'ยกเลิก')"
            >
              ยกเลิกการจอง
            </button>
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
  data() {
    return {
      page: 1,
      max: 5,
      bookingList: null,
      slipImgUrl: null,
    };
  },
  methods: {
    async updateStatus(booking, status) {
      booking.status = status
      const loading = this.$vs.loading();
      let formData = new FormData();
      const data = {
        status: status,
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
    async onFileChange(e, booking) {
      const loading = this.$vs.loading();
      let formData = new FormData();
      let files = e.target.files || e.dataTransfer.files;
      this.slipImgUrl = URL.createObjectURL(files[0]);
      const data = {
        status: "ยืนยันการโอน",
        bookingId: booking.bookingId,
        roomId: booking.roomId,
      };
      formData.append("data", JSON.stringify(data));
      formData.append("moneySlip", files[0]);
      try {
        await this.$axios.$put(
          `${this.$store.state.Backend_URL}/booking/update`,
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
  async created() {
    try {
      if (this.$store.state.userAccount.role == "Customer") {
        this.bookingList = await this.$axios.$get(
          `${this.$store.state.Backend_URL}/booking`,
          {
            withCredentials: true,
          }
        );
        for (let i in this.bookingList) {
        }
      } else if (this.$store.state.userAccount.role == "Owner") {
        this.bookingList = await this.$axios.$get(
          `${this.$store.state.Backend_URL}/booking/owner`,
          {
            withCredentials: true,
          }
        );
      } else {
        this.$router.push({ path: "/" });
      }
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style>
</style>
