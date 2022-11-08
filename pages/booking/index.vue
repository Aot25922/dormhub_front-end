<template>
  <div class="center pt-[6rem]">
    <vs-table class="overflow-x-auto">
      <template #thead class="flex justify-center">
        <vs-tr>
          <vs-th> ชื่อหอพัก </vs-th>
          <vs-th> ประเภทห้อง </vs-th>
          <vs-th> ราคา </vs-th>
          <vs-th> เลขห้อง </vs-th>
          <vs-th> ภาพสลิป </vs-th>
          <vs-th> วันที่การเข้าพัก </vs-th>
          <!--          <vs-th> วันที่สิ้นสุดการเข้าพัก </vs-th>-->
          <vs-th v-if="$store.state.userAccount.role == 'Owner'">
            ผู้จอง
          </vs-th>
          <vs-th> สถานะ </vs-th>
        </vs-tr>
      </template>
      <template #tbody v-if="bookingList" class="text-xs flex justify-center">
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
            <img
              v-if="tr.status == 'รอการโอน' && tr.bookingId == chosenBookingId"
              :src="slipImgUrl"
              class="object-cover object-center w-full h-full"
            />
            <img
              v-else-if="tr.moneySlip"
              :src="$store.state.Backend_URL + '/booking/image/' + tr.bookingId"
              class="object-cover object-center w-full h-full"
            />
            <p v-else>
              {{ tr.status }}
            </p>
          </vs-td>
          <vs-td>
            <b>เริ่ม: </b> {{ new Date(tr.startDate).toDateString() }} <br /><b
              >สิ้นสุด:
            </b>
            {{ new Date(tr.endDate).toDateString() }}
          </vs-td>
          <!--          <vs-td>-->
          <!--            {{ new Date(tr.endDate).toDateString() }}-->
          <!--          </vs-td>-->
          <vs-td v-if="$store.state.userAccount.role == 'Owner'">
            <p>E-mail : {{ tr.userAccount.email }}</p>
            <p>เบอร์โทรศัพท์ : {{ tr.userAccount.phone }}</p>
            <p>ชื่อ : {{ tr.userAccount.fname }} {{ tr.userAccount.lname }}</p>
          </vs-td>

          <!-- Status&Slip Customer -->
          <vs-td v-if="$store.state.userAccount.role == 'Customer'">
            <div v-if="tr.status == 'รอการโอน' || tr.status == 'ยืนยันการโอน'">
              <p>{{ tr.status }}</p>
              <p>เเนบหลักฐานการโอนเงิน</p>
              <input type="file" @change="onFileChange($event, tr)" />
            </div>
            <div v-else-if="tr.status == 'รอการยืนยัน'">
              {{ tr.status }}
              <button
                class="btn btn-accent btn-sm my-2"
                @click="updateStatus(tr, 'ยกเลิก')"
              >
                ยกเลิกการจอง
              </button>
            </div>
            <p v-else>{{ tr.status }}</p>
          </vs-td>

          <!-- Status Owner -->
          <vs-td v-if="$store.state.userAccount.role == 'Owner'">
            <!-- Pop-up Button  -->
            <div v-if="tr.status == 'รอการยืนยัน'">
              <vs-button @click="active = !active" color="warn" type="border"
                ><span class="material-symbols-outlined">
                  priority_high
                </span></vs-button
              >
              <vs-dialog class="font-Kanit" not-center v-model="active">
                <template #header>
                  <h4 class="font-bold">เลือกสถานะการจอง</h4>
                </template>
                <div class="con-content">
                  <div class="flex flex-wrap">
                    <div class="w-full">
                      เปลี่ยนสถานะ <span class="font-medium">"รอการยืนยัน"</span> ของ
                      <b
                        >{{ tr.userAccount.fname }}
                        {{ tr.userAccount.lname }}</b
                      >
                      เป็นยืนยันเพื่อ <span class="font-medium">"รอการโอน"</span> ใช่หรือไม่?
                    </div>
                    <div class="p-1 pt-3 w-2/3">
                      <button
                        class="btn btn-success w-full"
                        @click="updateStatus(tr, 'รอการโอน')"
                      >
                        ยืนยัน
                      </button>
                    </div>
                    <div class="p-1 pt-3 w-1/3">
                      <button
                        class="btn btn-accent w-full"
                        @click="updateStatus(tr, 'ยกเลิก')"
                      >
                        ยกเลิก
                      </button>
                    </div>
                  </div>
                </div>
              </vs-dialog>
            </div>

            <p
              v-else-if="tr.status == 'ยืนยันการโอน' || tr.status == 'รอการโอน'"
            >
              {{ tr.status }}
            </p>
            <p v-else-if="tr.status == 'ยกเลิก'">ยกเลิกการจองเเล้ว</p>
            <button
              v-else
              class="btn btn-accent"
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
      chosenBookingId: null,
      active: false,
    };
  },
  methods: {
    async updateStatus(booking, status) {
      booking.status = status;
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
        if (this.$store.state.userAccount.role == "Owner") {
          await this.$axios.$put(
            `${this.$store.state.Backend_URL}/booking/owner/update`,
            formData,
            {
              withCredentials: true,
            }
          );
        } else if (this.$store.state.userAccount.role == "Customer") {
          await this.$axios.$put(
            `${this.$store.state.Backend_URL}/booking/update`,
            formData,
            {
              withCredentials: true,
            }
          );
        }
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
      this.chosenBookingId = booking.bookingId;
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

<style></style>
