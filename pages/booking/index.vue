<template>
  <div class="center pt-24 flex flex-col">
    <div class="flex-grow md:h-[calc(100vh-5rem-13rem)]">
	<vs-table class="overflow-x-auto flex flex-col h-full justify-between">
      <template #thead class="flex justify-center">
        <vs-tr>
          <vs-th> ชื่อหอพัก </vs-th>
          <vs-th> ประเภทห้อง </vs-th>
          <vs-th> ราคา </vs-th>
          <vs-th> เลขห้อง </vs-th>
          <vs-th> ภาพสลิป </vs-th>
          <vs-th> วันที่เริ่มการเข้าพัก </vs-th>
          <vs-th> วันที่สิ้นสุดการเข้าพัก </vs-th>
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
            <div
              v-if="tr.status == 'รอการโอน' && tr.bookingId == chosenBookingId"
            >
              <img
                @click="watchImage = true"
                :src="slipImgUrl"
                class="object-cover object-center w-full h-full cursor-pointer"
              />
              <vs-dialog not-close auto-width not-padding v-model="watchImage">
                <div class="con-image">
                  <img :src="slipImgUrl" alt="" />
                </div>
              </vs-dialog>
            </div>
            <div v-else-if="tr.moneySlip">
              <img
                @click="watchImage = true"
                :src="
                  $store.state.Backend_URL + '/booking/image/' + tr.bookingId
                "
                class="object-cover object-center w-full h-full cursor-pointer"
              />
              <vs-dialog not-close auto-width not-padding v-model="watchImage">
                <div class="con-image">
                  <img
                    :src="
                      $store.state.Backend_URL +
                      '/booking/image/' +
                      tr.bookingId
                    "
                    alt=""
                  />
                </div>
              </vs-dialog>
            </div>
            <div v-else>
              <div
                v-if="tr.status == 'รอการยืนยัน'"
                class="font-medium text-warning"
              >
                {{ tr.status }}
              </div>
              <div v-if="tr.status == 'รอการโอน'" class="font-medium text-info">
                {{ tr.status }}
              </div>
              <div v-if="tr.status == 'ยกเลิก'" class="font-medium text-error">
                {{ tr.status }}
              </div>
            </div>
          </vs-td>
          <vs-td class="lg:w-20">
            {{ tr.startDate }}
          </vs-td>
          <vs-td>
            {{ tr.endDate }}
          </vs-td>
          <vs-td
            v-if="$store.state.userAccount.role == 'Owner'"
            class="flex flex-col"
          >
            <div class="flex justify-start items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3934/3934228.png"
                class="w-5 mr-1 md:w-6 lg:w-7"
              />
              {{ tr.userAccount.fname }} {{ tr.userAccount.lname }}
            </div>
            <div class="flex justify-start items-center py-3">
              <img
                src="https://cdn-icons-png.flaticon.com/512/726/726623.png"
                class="w-5 mr-1 md:w-6 lg:w-7"
              />{{ tr.userAccount.email }}
            </div>
            <div class="flex justify-start items-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3014/3014736.png"
                class="w-5 mr-1 md:w-6 lg:w-7"
              />{{ tr.userAccount.phone }}
            </div>
          </vs-td>

          <!-- Status&Slip Customer -->
          <vs-td v-if="$store.state.userAccount.role == 'Customer'">
            <div v-if="tr.status == 'รอการโอน' || tr.status == 'ยืนยันการโอน'">
              <p v-if="tr.status == 'รอการโอน'" class="font-medium text-info">
                {{ tr.status }}
              </p>
              <p
                v-if="tr.status == 'ยืนยันการโอน'"
                class="font-medium text-success"
              >
                {{ tr.status }}
              </p>
              <div class="pt-5">
                <p>เเนบหลักฐานการโอนเงิน</p>
                <input type="file" @change="onFileChange($event, tr)" />
              </div>
            </div>
            <div
              class="flex items-center"
              v-else-if="tr.status == 'รอการยืนยัน'"
            >
              <div class="font-medium text-warning">{{ tr.status }}</div>
              <!-- Cancel Button Modal -->
              <div class="px-5">
                <button
                  @click="active = !active"
                  class="btn btn-accent btn-sm btn-circle"
                >
                  <span class="material-symbols-outlined"> close </span>
                </button>
                <vs-dialog class="font-Kanit" width="550px" v-model="active">
                  <div class="con-content">
                    <div>
                      คูณแน่ใจว่าต้องการที่จะ<b class="underline-offset-auto"
                        >ยกเลิกการจองห้อง?</b
                      >
                    </div>
                    <div class="pt-5 flex flex-wrap">
                      <div class="w-1/2 p-1">
                        <button
                          @click="
                            updateStatus(tr, 'ยกเลิก');
                            active = false;
                          "
                          class="btn btn-success w-full"
                        >
                          ยืนยัน
                        </button>
                      </div>
                      <div class="w-1/2 p-1">
                        <button
                          @click="active = false"
                          class="btn btn-accent w-full"
                        >
                          ยกเลิก
                        </button>
                      </div>
                    </div>
                  </div>
                </vs-dialog>
              </div>
            </div>
            <p v-else class="text-imperialRed font-medium">{{ tr.status }}</p>
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
                      เปลี่ยนสถานะ
                      <span class="font-medium">"รอการยืนยัน"</span> ของ
                      <b
                        >{{ tr.userAccount.fname }}
                        {{ tr.userAccount.lname }}</b
                      >
                      เป็นยืนยันเพื่อ
                      <span class="font-medium">"รอการโอน"</span> ใช่หรือไม่?
                      <p>หากกดยกเลิกจะเป็นการยกเลิกการจอง</p>
                    </div>
                    <div class="p-1 pt-3 w-2/3">
                      <button
                        class="btn btn-success w-full"
                        @click="
                          updateStatus(tr, 'รอการโอน');
                          active = false;
                        "
                      >
                        ยืนยัน
                      </button>
                    </div>
                    <div class="p-1 pt-3 w-1/3">
                      <button
                        class="btn btn-accent w-full"
                        @click="
                          updateStatus(tr, 'ยกเลิก');
                          active = false;
                        "
                      >
                        ยกเลิก
                      </button>
                    </div>
                  </div>
                </div>
              </vs-dialog>
            </div>

            <div
              v-else-if="tr.status == 'ยืนยันการโอน' || tr.status == 'รอการโอน'"
            >
              <div v-if="tr.status == 'รอการโอน'" class="font-medium text-info">
                {{ tr.status }}
              </div>
              <div
                v-if="tr.status == 'ยืนยันการโอน'"
                class="font-medium text-success"
              >
                {{ tr.status }}
              </div>
            </div>
            <div
              v-else-if="tr.status == 'ยกเลิก'"
              class="font-medium text-imperialRed"
            >
              ยกเลิกการจองเเล้ว
            </div>
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
      <template #notFound>
        <tr class="md:max-h-screen py-5 flex items-center justify-center">
          <ContentEmptyItem msg="ยังไม่มีการจอง" imgSize="xl:w-1/2" />
        </tr>
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
      watchImage: false,
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
